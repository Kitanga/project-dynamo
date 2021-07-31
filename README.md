# Project Dynamo

A top-down shoot em' up (shmup) built with PixiJS.

<!-- vscode-markdown-toc -->
* [Demo](#Demo)
* [Design spec](#Designspec)
* [Controls](#Controls)
* [Change log](#Changelog)
	* [v0.5.1](#v0.5.1)
	* [v0.5.0](#v0.5.0)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='Demo'></a>Demo

Play it [here](https://dynamo-shmup.herokuapp.com/)

## <a name='Designspec'></a>Design spec

[Design.md](./Design.md)

## <a name='Controls'></a>Controls

- `WASD`/`Arrow Keys` for movement
- `n`/`Spacebar` for shooting

## <a name='Changelog'></a>Change log

### <a name='v0.5.1'></a>v0.5.1

First patch version for 0.5. Doesn't really have bug fixes, more like feedback implementations. Changed how controls are set for a player, new system is way better and should make switching to two player so much easier. Aiming for the cockpit of a bomber does double the damage now.

- [x] Implement arrows+spacebar control combo into game.
- [x] 4 point bomber should have different smaller sprite
- [x] Easier way to kill bombers (aim for the cockpit/nose).

### <a name='v0.5.0'></a>v0.5.0

This was the first version that got uploaded to GitHub.

- [x] Added Loading page
- [x] Player plane movement and shooting
- [x] A scrolling background
- [x] Basic enemy spawning
- [x] Enemy spawning and being shot at (so I added collision system at this point)
- [x] Added support for game entities to have custom collision bounding box
- [x] Enemies spawn in timed waves.
- [x] Enemies can spawn in formations with varying types of enemies.
- [x] Added UI and placed score and highscore on screen (also, highscore is stored locally)
- [x] Added a "cinematic" menu lol
- [x] Added a game over screen