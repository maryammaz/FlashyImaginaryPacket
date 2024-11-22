from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

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
        if game_mode == "two_player":
            current_player = "O" if current_player == "X" else "X"
        elif game_mode == "one_player" and current_player == "X":
            current_player = "O"
            ai_move()

    return jsonify(board=board)

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

# Unscramble game route
@app.route("/unscramble_game", methods=['GET', 'POST'])
def play_unscramble():
    if request.method == 'POST':
        user_answer = request.form.get('user_answer')
        correct_word = request.form.get('correct_word')

        if user_answer == correct_word:  # Replace this with the real unscramble logic
            result = "Correct! You unscrambled the word."
        else:
            result = "Incorrect. Try again!"

        # Generate a new scrambled word (mockup)
        scrambled_word = "scrmabled"
        correct_word = "scrambled"
        return render_template('unscramble.html', scrambled_word=scrambled_word, correct_word=correct_word, result=result)

    scrambled_word = "scrmabled"
    correct_word = "scrambled"
    return render_template('unscramble.html', scrambled_word=scrambled_word, correct_word=correct_word)

if __name__ == "__main__":
    app.run(debug=True)
