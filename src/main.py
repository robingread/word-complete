import nltk
import seaborn as sns
import time
import typing


def timer(func):
    def wrapper(*args, **kwargs):
        tic = time.perf_counter()
        ret = func(*args, **kwargs)
        toc = time.perf_counter()
        print(f"Function: {func}, time: {toc - tic:0.04f} seconds")
        return ret
    return wrapper

@timer
def get_word_shortlist(characters: str, words: typing.List[str]) -> typing.List[str]:
    return [w for w in words if w.startswith(characters)]


@timer
def get_word_distribution(words: typing.List[str]):
    return nltk.FreqDist(words)

#nltk.download('brown')

from nltk.corpus import brown

words = brown.words()
word_freq = get_word_distribution(words)
dictionary = list(word_freq.keys())

while True:
    ENTERED_CHARACTERS = input("Enter search characters: ")

    if ENTERED_CHARACTERS == "q":
        break

    words_shortlist = get_word_shortlist(characters=ENTERED_CHARACTERS, words=dictionary)
    points = [(l, word_freq.freq(l)) for l in words_shortlist]
    for p in points[0:20]:
        print(p[0], p[1])
