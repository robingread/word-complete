import functools
import log
import nltk
import os
import time
import typing

nltk.download('brown')

from nltk.corpus import brown


LOGGER = log.get_logger()


def timer(func):
    def wrapper(*args, **kwargs):
        tic = time.perf_counter()
        ret = func(*args, **kwargs)
        toc = time.perf_counter()
        LOGGER.info(f"Function: {func}, time: {toc - tic:0.04f} seconds")
        return ret
    return wrapper

@timer
def get_word_shortlist(characters: str, words: typing.List[str]) -> typing.List[str]:
    return [w for w in words if w.startswith(characters)]


@timer
def get_word_distribution(words: typing.List[str]):
    return nltk.FreqDist(words)


def get_proposed_words(characters: str, dictionary: typing.List[str], word_freq: nltk.FreqDist, max_words: int) -> typing.List[typing.Tuple[str, float]]:
    words_shortlist = get_word_shortlist(characters=characters, words=dictionary)
    points = [(l, word_freq.freq(l)) for l in words_shortlist]
    return(points[0:max_words])


words = brown.words()
word_freq = get_word_distribution(words)
dictionary = list(word_freq.keys())
max_words = int(os.environ.get("MAX_WORDS", default=20))
LOGGER.info(f"Max Words: {max_words}")

callback = functools.partial(get_proposed_words, dictionary=dictionary, word_freq=word_freq, max_words=max_words)

