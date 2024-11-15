from flask import Flask, render_template, request, jsonify
import random
from minigames.unscramble import get_scrambled_word, check_answer

app = Flask(__name__)

# Initialize the Tic Tac Toe board
board = [["" for _ in range(3)] for _ in range(3)]
current_player = "X"  # Player 1 begins
game_mode = "two_player"  # Default mode is two-player

# Homepage route
@app.route("/")
def index():
    return render_template("mainPage.html")  # Main game hub

# Tic Tac Toe route
@app.route("/tictactoe_game")
def tictactoe():
    return render_template("tictactoe.html")

# Doodle game route
@app.route("/doodle_game")
def doodle():
    return render_template("doodle.html")

# Memory game route
@app.route("/memory_game")
def memory():
    return render_template("memory.html")

# Unscramble game route
@app.route("/unscramble_game", methods=['GET', 'POST'])
def play_unscramble():
    if request.method == 'POST':
        user_answer = request.form.get('user_answer')
        correct_word = request.form.get('correct_word')

        # Check the player's answer
        if check_answer(user_answer, correct_word):
            result = "Correct! You unscrambled the word."
        else:
            result = "Incorrect. Try again!"

        # Get a new scrambled word for the next round
        scrambled_word, new_word = get_scrambled_word()
        return render_template('unscramble.html', scrambled_word=list(scrambled_word), correct_word=new_word, result=result)

    # Initial GET request: Display a scrambled word
    scrambled_word, word = get_scrambled_word()
    return render_template('unscramble.html', scrambled_word=list(scrambled_word), correct_word=word)

# Route for Tic Tac Toe move handling
@app.route("/move", methods=["POST"])
def make_move():
    global current_player, game_mode, board

    data = request.json
    row, col = data["row"], data["col"]
    game_mode = data["game_mode"]

    # Make a move only if the cell is empty
    if board[row][col] == "":
        board[row][col] = current_player

        # Toggle player
        if game_mode == "two_player":
            current_player = "O" if current_player == "X" else "X"
        else:
            if current_player == "X":  # Human turn
                current_player = "O"  # AI turn
                ai_move()

    return jsonify(board=board)

def ai_move():
    """AI makes a random move in Tic Tac Toe"""
    available_moves = [(r, c) for r in range(3) for c in range(3) if board[r][c] == ""]
    if available_moves:
        row, col = random.choice(available_moves)  # Randomly pick an empty spot
        board[row][col] = "O"
        global current_player
        current_player = "X"  # Switch back to Human player

if __name__ == "__main__":
    app.run(debug=True)
