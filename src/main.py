import functools
import nltk
import time
import typing

from nltk.corpus import brown



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


def get_proposed_words(characters: str, dictionary: typing.List[str], word_freq: nltk.FreqDist) -> typing.List[typing.Tuple[str, float]]:
    print('********************')
    print(f"Chatecters: {characters}")
    words_shortlist = get_word_shortlist(characters=characters, words=dictionary)
    points = [(l, word_freq.freq(l)) for l in words_shortlist]
    return(points[0:20])


words = brown.words()
word_freq = get_word_distribution(words)
dictionary = list(word_freq.keys())

callback = functools.partial(get_proposed_words, dictionary=dictionary, word_freq=word_freq)

