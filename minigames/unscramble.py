import random

# List of Dork Diary-themed words to be scrambled
words = [
    "science",
    "mathlete",
    "geek",
    "comic",
    "robotics",
    "nerd",
    "astronomy",
    "crush",
    "diary",
    "friend",
    "drama",
    "frenemy",
    "journalist",
    "locker",
    "adventure",
    "bourgeoisie",
    "relationship"
]

used_words = []  # List to track used words

def get_scrambled_word():
    """
    Selects a random word from the list, scrambles it, and returns both the scrambled and original words.
    """
    available_words = [word for word in words if word not in used_words]

    if not available_words:
        used_words.clear()  # Reset if all words are used

    word = random.choice(available_words)
    scrambled = list(word)
    random.shuffle(scrambled)
    scrambled_word = ''.join(scrambled)

    # Ensure the scrambled word is different from the original
    while scrambled_word == word:
        random.shuffle(scrambled)
        scrambled_word = ''.join(scrambled)

    used_words.append(word)  # Add the word to used list
    return scrambled_word, word  # Return both scrambled word and original

def check_answer(user_answer, correct_word):
    """
    Checks if the user's answer matches the correct word.
    """
    return user_answer.lower() == correct_word.lower()