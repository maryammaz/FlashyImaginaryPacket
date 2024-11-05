from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# A simple AI opponent for rock-paper-scissors
choices = ["rock", "paper", "scissors"]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/play", methods=["POST"])
def play_game():
    user_choice = request.json.get("choice")
    ai_choice = random.choice(choices)
    
    # Determine the game outcome
    if user_choice == ai_choice:
        result = "It's a tie!"
    elif (user_choice == "rock" and ai_choice == "scissors") or \
         (user_choice == "scissors" and ai_choice == "paper") or \
         (user_choice == "paper" and ai_choice == "rock"):
        result = "You win!"
    else:
        result = "You lose!"
    
    # Update points here if needed, for now we'll send a simple response
    return jsonify({"result": result, "ai_choice": ai_choice})

if __name__ == "__main__":
    app.run(debug=True)
