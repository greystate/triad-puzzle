# The Triad Puzzle

Spawned from concepts learned while going through [The Advancing Guitarist][TAG] by Mick Goodrick, and a technique I've been using to navigate the fretboard in both chord- and solo-context.

This is the development repository - codewise, I use [Less][LESS] and [CoffeeScript][COFFEE]. I have [CodeKit][CK] doing the compiles and build into a `build/` directory which is then published to the `gh-pages` branch - that branch is served with [GitHub Pages][GH] at https://triad-puzzle.com

Currently, you get a sheet with 8 random triads and when you've played through them, hit the <kbd>SPACE</kbd> key (or tap any of the pieces if you're on a touch-enabled device) to get a new sheet.

## Concepts

Most musicians know this (either because they know theory or because they've played a lot and gradually arrived at the same conclusions :-) - but here's a basic rundown of what I'm doing with this:

A **triad** is a chord that consist of three notes: _Root_, _third_ and _fifth_. Depending on the intervals between those, the triad has a different symbol/name, e.g., if you stack the notes _C_, _E_ and _G_, you have what's called a **C major triad** and its symbol is just a `C`. If you lower the third (E) a half step to Eb (which is pronounced "E-flat"), the chord becomes a **C minor triad**, which has the symbol `Cm`.

Similarly, there is a **C diminished triad** and a **C augmented triad** with the symbols `Cdim` and `C+`.

That's all well and good for learning them in the key of C, but there are 11 other notes we could start on. For instance, starting just a half-step higher, these four triads would be named after their new root, `C#` (pronounced "C sharp" - yep 😁) - so: `C#`, `C#m`, `C#dim` & `C#+`.

This app just picks 8 random triads and shows their symbols on a sheet, so you can practice playing them and most importantly, learn to move between any two in the smoothest possible way.

[TAG]: https://www.amazon.com/Advancing-Guitarist-Mick-Goodrick/dp/0881885894
[LESS]: http://lesscss.org
[COFFEE]: http://coffeescript.org
[CK]: https://codekitapp.com
[GH]: https://pages.github.com
