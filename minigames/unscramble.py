# minigames/unscramble.py
import random

# List of Dork Diary-themed words to be scrambled
words = [
    "science",
    "mathlete",
    "geek",
    "comic",
    "robotics",
    "nerd",
    "astronomy"
]

def get_scrambled_word():
    """
    Selects a random word from the list, scrambles it, and returns both the scrambled and original words.
    """
    word = random.choice(words)
    scrambled = list(word)
    random.shuffle(scrambled)
    scrambled_word = ''.join(scrambled)

    # Ensure the scrambled word is different from the original
    while scrambled_word == word:
        random.shuffle(scrambled)
        scrambled_word = ''.join(scrambled)

    return scrambled_word, word  # Return both scrambled word and original

def check_answer(user_answer, correct_word):
    """
    Checks if the user's answer matches the correct word.
    """
    return user_answer.lower() == correct_word.lower()
