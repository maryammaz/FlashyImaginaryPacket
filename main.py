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
    return render_template("mainPage.html")

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

        if check_answer(user_answer, correct_word):
            result = "Correct! You unscrambled the word."
        else:
            result = "Incorrect. Try again!"

        scrambled_word, new_word = get_scrambled_word()
        return render_template('unscramble.html', scrambled_word=list(scrambled_word), correct_word=new_word, result=result)

    scrambled_word, word = get_scrambled_word()
    return render_template('unscramble.html', scrambled_word=list(scrambled_word), correct_word=word)

# Route for Tic Tac Toe move handling
@app.route("/move", methods=["POST"])
def make_move():
    global current_player, game_mode, board

    data = request.json
    row, col = data["row"], data["col"]
    game_mode = data["game_mode"]

    if board[row][col] == "":
        board[row][col] = current_player
        if game_mode == "two_player":
            current_player = "O" if current_player == "X" else "X"
        else:
            if current_player == "X":
                current_player = "O"
                ai_move()

    return jsonify(board=board)

# Reset route for Tic Tac Toe
@app.route("/reset", methods=["POST"])
def reset_game():
    global board, current_player
    board = [["" for _ in range(3)] for _ in range(3)]  # Reset the board
    current_player = "X"  # Reset to initial player
    return jsonify(success=True)

def ai_move():
    available_moves = [(r, c) for r in range(3) for c in range(3) if board[r][c] == ""]
    if available_moves:
        row, col = random.choice(available_moves)
        board[row][col] = "O"
        global current_player
        current_player = "X"

if __name__ == "__main__":
    app.run(debug=True)