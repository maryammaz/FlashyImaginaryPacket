from flask import Flask, render_template, request, jsonify
import random
from minigames.unscramble import get_scrambled_word, check_answer

app = Flask(__name__)

# Initialize the puzzle board (example sliding tile puzzle)
puzzle = [["1", "2", "3"], ["4", "5", "6"], ["7", "8", ""]]  # Solved state
completion_counter = 0
is_scrambled = False  # Tracks if the puzzle was scrambled

# Tic Tac Toe variables
board = [["" for _ in range(3)] for _ in range(3)]
current_player = "X"  # Player 1 begins
game_mode = "two_player"  # Default mode is two-player

# Homepage route
@app.route("/")
def index():
    return render_template("mainPage.html")

@app.route("/puzzle_game")
def puzzle():
    return render_template("puzzle.html")

# Scramble the puzzle
@app.route("/scramble_puzzle", methods=["POST"])
def scramble_puzzle():
    global puzzle, is_scrambled
    flattened_puzzle = sum(puzzle, [])  # Flatten the puzzle into a single list
    random.shuffle(flattened_puzzle)
    # Ensure the puzzle is solvable and not already solved
    while not is_solvable(flattened_puzzle) or is_solved(flattened_puzzle):
        random.shuffle(flattened_puzzle)
    puzzle = [flattened_puzzle[i:i+3] for i in range(0, 9, 3)]  # Reconstruct 2D puzzle
    is_scrambled = True
    return jsonify(puzzle=puzzle)

# Check if the puzzle is completed
@app.route("/check_puzzle_completion", methods=["POST"])
def check_puzzle_completion():
    global completion_counter, is_scrambled
    if is_solved(sum(puzzle, [])) and is_scrambled:
        completion_counter += 1
        is_scrambled = False  # Reset scramble flag after completion
    return jsonify(completion_counter=completion_counter)

# Helper functions
def is_solvable(puzzle):
    # Check if the puzzle can be solved (sliding tile puzzle rules)
    inversions = 0
    for i in range(len(puzzle)):
        for j in range(i + 1, len(puzzle)):
            if puzzle[i] and puzzle[j] and puzzle[i] > puzzle[j]:
                inversions += 1
    return inversions % 2 == 0

def is_solved(puzzle):
    # Check if the puzzle is in the solved state
    return puzzle == ["1", "2", "3", "4", "5", "6", "7", "8", ""]

if __name__ == "__main__":
    app.run(debug=True)
