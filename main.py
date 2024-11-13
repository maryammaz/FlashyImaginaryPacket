from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# initialize the board and current player
board = [["" for _ in range(3)] for _ in range(3)]
current_player = "X"  # player 1 begins
game_mode = "two_player"  # default mode is two-player

@app.route("/")
def index():
    return render_template("tic_tac_toe.html")  # load the tic tac toe HTML page

@app.route("/move", methods=["POST"])
def make_move():
    global current_player, game_mode, board

    data = request.json
    row, col = data["row"], data["col"]
    game_mode = data["game_mode"]  # get the game mode from the request

    # make a move only if the cell is empty
    if board[row][col] == "":
        board[row][col] = current_player

        # toggle player (if it's 2-player, both players alternate, if it's 1-player, AI moves next)
        if game_mode == "two_player":
            current_player = "O" if current_player == "X" else "X"
        else:
            if current_player == "X":  # player X (Human)
                current_player = "O"  # AI turn (Player O)
                ai_move()

    return jsonify(board=board)

def ai_move():
    """AI makes a random move"""
    available_moves = [(r, c) for r in range(3) for c in range(3) if board[r][c] == ""]
    if available_moves:
        row, col = random.choice(available_moves)  # randomly pick an empty spot
        board[row][col] = "O"  # AI plays as O
        global current_player
        current_player = "X"  # switch back to player X (Human)

if __name__ == "__main__":
    app.run(debug=True)


# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route for the Unscramble game
@app.route('/unscramble', methods=['GET', 'POST'])
def play_unscramble():
    if request.method == 'POST':
        user_answer = request.form.get('user_answer')
        correct_word = request.form.get('correct_word')

        # Check if the player's answer matches the correct word
        if unscramble.check_answer(user_answer, correct_word):
            result = "Correct! You unscrambled the word."
        else:
            result = "Incorrect. Try again!"

        # Get a new scrambled word for the next round
        scrambled_word, new_word = unscramble.get_scrambled_word()
        return render_template('unscramble.html', scrambled_word=scrambled_word, correct_word=new_word, result=result)

    # Initial GET request: Display a scrambled word
    scrambled_word, word = unscramble.get_scrambled_word()
    return render_template('unscramble.html', scrambled_word=scrambled_word, correct_word=word)

# Route for the doodle game
@app.route("/doodle")
def doodle():
    return render_template("doodle.html")  # Load the doodle game HTML page

if __name__ == '__main__':
    app.run(debug=True)