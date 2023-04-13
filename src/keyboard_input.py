import pynput
import typing


class KeyboardListener:
    def __init__(self, callback: typing.Callable) -> None:
        self._listener = pynput.keyboard.Listener(on_press=self._keypress_callback)
        self._listener.start()
        self._buffer = ""
        self._callback = callback

    @property
    def buffer(self) -> str:
        return self._buffer
    
    def _keypress_callback(self, key: pynput.keyboard.KeyCode) -> None: 
        if key == pynput.keyboard.Key.backspace:
            self._buffer = self._buffer[:-1]
        else:
            try:
                self._buffer += key.char
            except (AttributeError, TypeError):
                pass

        if len(self._buffer) == 0:
            return
    
        if callable(self._callback):
            self._callback(self.buffer)
