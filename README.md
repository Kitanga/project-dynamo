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

### <a name='v0.6.0'></a>v0.6.0

- [x] Implemented Gamepad
- [x] Implemented gamepad vibration
    - [x] When shooting
    - [x] When things blow up
        - [x] Vibrate when things blow up
        - [x] Intensity based on how player is to explosion
- [x] Screen responsiveness
    - [x] Make menu responsive
    - [x] Make game-over screen responsive
- [x] Planes that spawn should have their value moved closer to the player's position
- [x] When a plane spawns it should only shoot when it's on the screen
- [x] Create `server.js` file for serving game on node server.
- [x] Launch game onto heroku.
- [x] Update: Wave 1 planes should move faster
    - [x] This will be a wave 1 alternate, so pick between the 2, the standard version should have a higher likelihood of spawning.
- [x] Screen shake when things blow up
    - [x] The closer you are to an explosion the more the screen shakes.
- [x] Blow up shockwave filter
- [x] Add flash anim for hit enemies
- [x] Fix responsiveness of video on menu page
- [x] Game (Create sound manager for this. Also add blur event for game audio to be muted)
    - [x] Shoot
    - [x] Hit enemy
    - [x] Kill Confirmed
    - [x] Enemy explode
    - [x] Game over music
- [x] Water must wiggle
- [x] Switch to parcel 2
- [x] Add the version number (place javascript code into the `src/index.html` that creates a VERSION_TAG value and sets it to our package.json file's version. This way we always have the version update to date with the game code.)

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