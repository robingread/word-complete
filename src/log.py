import logging
import sys


def get_logger() -> logging.Logger:
    logger = logging.getLogger(name="Word Complete")
    logger.handlers.clear()

    format = logging.Formatter(
        "[%(levelname)s][%(asctime)s][%(name)s] %(message)s", "%m/%d/%Y %H:%M:%S"
    )

    debugHandler = logging.StreamHandler(sys.stdout)
    debugHandler.setFormatter(format)

    logger.setLevel(level=logging.INFO)
    logger.addHandler(debugHandler)

    return logger
