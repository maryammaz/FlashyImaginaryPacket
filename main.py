from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

    # List of words to be scrambled
words = [
        "science", "mathlete", "geek", "comic", "robotics",
        "nerd", "astronomy", "crush", "diary", "friend",
        "drama", "frenemy", "journalist", "locker", "adventure",
        "bourgeoisie", "relationship"
    ]

used_words = []

# Function to get a scrambled word
def get_scrambled_word():
    """
    Generates a scrambled word and ensures it's not already used.
    """
    available_words = [word for word in words if word not in used_words]
    if not available_words:  # Reset if all words are used
        used_words.clear()
        available_words = words
    
    word = random.choice(available_words)
    scrambled = list(word)
    random.shuffle(scrambled)
    scrambled_word = ''.join(scrambled)
    
    # Ensure scrambled word isn't the same as the original
    while scrambled_word == word:
        random.shuffle(scrambled)
        scrambled_word = ''.join(scrambled)
    
    used_words.append(word)
    return scrambled_word, word

# Function to check the answer
def check_answer(user_answer, correct_word):
    """
    Validates the user's answer.
    """
    return user_answer.strip().lower() == correct_word.strip().lower()

# Tic Tac Toe setup
board = [["" for _ in range(3)] for _ in range(3)]
current_player = "X"
game_mode = "two_player"

# Homepage route
@app.route("/")
def index():
    return render_template("mainPage.html")

# Tic Tac Toe game route
@app.route("/tictactoe_game")
def tictactoe():
    return render_template("tictactoe.html")

@app.route("/move", methods=["POST"])
def make_move():
    global board, current_player, game_mode
    data = request.json
    row, col = data["row"], data["col"]
    game_mode = data["game_mode"]

    if board[row][col] == "":
        board[row][col] = current_player
        winner = check_winner()  # Check for a winner
        if winner:
            return jsonify(board=board, winner=winner)

        if all(cell != "" for row in board for cell in row):  # Check for draw
            return jsonify(board=board, winner="Draw")

        if game_mode == "two_player":
            current_player = "O" if current_player == "X" else "X"
        elif game_mode == "one_player" and current_player == "X":
            current_player = "O"
            ai_move()

    return jsonify(board=board, winner=None)

@app.route("/reset", methods=["POST"])
def reset_game():
    global board, current_player
    board = [["" for _ in range(3)] for _ in range(3)]
    current_player = "X"
    return jsonify(success=True)

def ai_move():
    available_moves = [(r, c) for r in range(3) for c in range(3) if board[r][c] == ""]
    if available_moves:
        row, col = random.choice(available_moves)
        board[row][col] = "O"
        global current_player
        current_player = "X"

def check_winner():
    # Check rows, columns, and diagonals
    for row in board:
        if row[0] == row[1] == row[2] and row[0] != "":
            return row[0]  # Winner (X or O)
    for col in range(3):
        if board[0][col] == board[1][col] == board[2][col] and board[0][col] != "":
            return board[0][col]
    if board[0][0] == board[1][1] == board[2][2] and board[0][0] != "":
        return board[0][0]
    if board[0][2] == board[1][1] == board[2][0] and board[0][2] != "":
        return board[0][2]
    return None

# Doodle game route
@app.route("/doodle_game")
def doodle():
    return render_template("doodle.html")

# Memory game route
@app.route("/memory_game")
def memory():
    return render_template("memory.html")

# Puzzle game route
@app.route("/puzzle_game")
def puzzle_game():
    return render_template("puzzle.html")

# Unscramble game route (with AJAX support)
@app.route("/unscramble_game", methods=['GET', 'POST'])
def play_unscramble():
    if request.method == 'POST':
        data = request.get_json()  # Get the JSON data sent from the frontend
        user_answer = data.get("user_answer")
        correct_word = data.get("correct_word")

        if check_answer(user_answer, correct_word):
            result = "Correct! You unscrambled the word."
            # Get a new scrambled word for the next round
            scrambled_word, new_correct_word = get_scrambled_word()
        else:
            result = "Incorrect. Try again!"
            # Send back the same scrambled word if the answer is incorrect
            scrambled_word = correct_word  # Keep the same scrambled word
            new_correct_word = correct_word  # Same word as the correct one

        return jsonify({
            "result": result,
            "new_scrambled": scrambled_word,
            "correct_word": new_correct_word
        })

    # On GET request (initial page load)
    scrambled_word, correct_word = get_scrambled_word()
    return render_template("unscramble.html", scrambled_word=scrambled_word, correct_word=correct_word)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)