"""Generate the original, seamless ambient loop used by the portfolio."""
from array import array
from math import cos, exp, pi, sin, tanh
from pathlib import Path
import struct
import wave

RATE = 32000
SECONDS = 24
COUNT = RATE * SECONDS
TAU = 2 * pi
samples = array('f', [0.0]) * COUNT


def pitch(midi: int) -> float:
    # Whole cycles across the loop keep the waveform continuous at the seam.
    hz = 440 * 2 ** ((midi - 69) / 12)
    return round(hz * SECONDS) / SECONDS


def envelope(time: float, center: float) -> float:
    distance = abs((time - center + SECONDS / 2) % SECONDS - SECONDS / 2)
    if distance <= 2:
        return 1.0
    if distance >= 4:
        return 0.0
    u = (4 - distance) / 2
    return u * u * (3 - 2 * u)


# Four slowly crossfading chords with a restrained, warm harmonic tone.
chords = [
    (0, [50, 53, 57, 60, 64]),     # Dm9
    (6, [46, 50, 53, 57, 60]),     # Bbmaj9
    (12, [41, 45, 48, 52, 55]),   # Fmaj9
    (18, [48, 50, 55, 57, 64]),   # C6sus2
]
for center, notes in chords:
    for note_index, note in enumerate(notes):
        frequency = pitch(note)
        phase = note_index * 0.43
        for index in range(COUNT):
            time = index / RATE
            amp = envelope(time, center)
            if amp == 0:
                continue
            movement = 0.12 * sin(TAU * time / SECONDS + phase)
            tone = (
                0.58 * sin(TAU * frequency * time + movement + phase)
                + 0.24 * sin(TAU * frequency * 2 * time + phase * 0.7)
                + 0.08 * sin(TAU * frequency * 3 * time + phase)
            )
            samples[index] += amp * tone * (0.048 if note_index else 0.062)

# The same four-note figure follows each chord, making the 24-second loop easy to hear.
arp = [62, 69, 72, 76, 58, 65, 69, 72, 65, 72, 76, 79, 60, 67, 74, 76]
for event, note in enumerate(arp):
    start = int(event * 1.5 * RATE)
    frequency = pitch(note)
    for offset in range(3 * RATE):
        age = offset / RATE
        decay = exp(-age * 2.1) * (1 - exp(-age * 110))
        tone = sin(TAU * frequency * age) + 0.28 * sin(TAU * frequency * 2 * age)
        samples[(start + offset) % COUNT] += 0.082 * decay * tone

# Wrap the echo taps as well, so the final sample meets the first.
first_delay = int(RATE * 0.31)
second_delay = int(RATE * 0.63)
peak = 0.0
rendered = array('f', [0.0]) * COUNT
for index in range(COUNT):
    value = samples[index] + 0.16 * samples[(index - first_delay) % COUNT] + 0.09 * samples[(index - second_delay) % COUNT]
    rendered[index] = value
    peak = max(peak, abs(value))

scale = 0.72 / peak if peak else 1.0
output = Path('public/audio/ambient-loop.wav')
with wave.open(str(output), 'wb') as file:
    file.setnchannels(1)
    file.setsampwidth(2)
    file.setframerate(RATE)
    chunk = bytearray()
    for value in rendered:
        chunk.extend(struct.pack('<h', int(tanh(value * scale) * 32767)))
        if len(chunk) >= 65536:
            file.writeframes(chunk)
            chunk.clear()
    if chunk:
        file.writeframes(chunk)
print(f'{output}: {SECONDS}s, {output.stat().st_size / 1024 / 1024:.2f} MiB')
