# Project Dynamo

Dynamo is an endless top-down shmup, with the goal of getting the highest score. If a score is high enough it's placed on the online score board (still WIP, don't have online highscore board, but I have a local one).

<!-- vscode-markdown-toc -->
* [Flow](#Flow)
	* [Start up](#Startup)
	* [Main Menu](#MainMenu)
	* [Game](#Game)
	* [Game over](#Gameover)
* [Sound](#Sound)
* [Game mechanics](#Gamemechanics)
	* [Movement](#Movement)
	* [Shooting](#Shooting)
	* [Player hit box](#Playerhitbox)
	* [Player stats](#Playerstats)
* [Tech stack](#Techstack)
* [Roadmap](#Roadmap)
	* [v0.2.0 (basics)](#v0.2.0basics)
	* [v0.3.0 (enemies)](#v0.3.0enemies)
	* [v0.4.0 (menu)](#v0.4.0menu)
	* [v0.5.0 (game over screen)](#v0.5.0gameoverscreen)
	* [v0.5.1 (feedback from andrew + other stuff)](#v0.5.1feedbackfromandrewotherstuff)
	* [v0.5.2 (Loading Screen fix up)](#v0.5.2LoadingScreenfixup)
	* [v0.6.0 (audio)](#v0.6.0audio)
	* [v0.x.0 (polishing)](#v0.x.0polishing)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='Flow'></a>Flow

### <a name='Startup'></a>Start up

- [x] Game startup is when we show the loading bar as we load all the assets. No boot stage or showing of logo during loading.
    - [x] Loading bar is a light gray background with black bar being filled. Use PIXI Graphics
- [x] ~~When this is done, we'll show the audio prompt, which is always going to be "yes".~~

### <a name='MainMenu'></a>Main Menu

- [x] After assets have loaded and the user has been forced to play audio we show the `main-menu`.
    - [x] This will be built using PIXI's components and not HTML.
- [x] The main menu will have it's logo and play button on the left side.
- [ ] Highscore list in the middle (or middle-right) section.
- [ ] There will be a video playing in the background with footage from WW2 and an editted version of Edith Piaf's "Non je ne regrette rien" playing in the background.
- [ ] Check to make sure that there's good contrast between bg and foreground.

### <a name='Game'></a>Game

- [ ] When player presses the start button, the music quickly fades out (use 520ms) and they are taken into the game itself.
- [ ] The plane will be placed a few pixels above the bottom border and horizontally centered.
- [ ] The spawner will have a certain number of seconds setup for spawning units.
    - [ ] This number of seconds will change based on how long the player has been playing (e.g. it will take 5 minutes for the player to reach the most difficult point of game).
    - [ ] The spawner will also only start spawning certain units after certain points are hit within that 5 minute span.
- [ ] Wave types:
    - [x] Have first wave be just fighters, flying down.
        - [x] Planes can fly in formation if needed.
    - [x] In wave two, have fighters like the previous wave but they shoot down and need x3 the damage to destroy.
    - [ ] ~~Wave three, fighters that move to make sure they are in front of you as they shoot. (x5 needed. Comparing with wave 1 fighters)~~
        - [ ] ~~A cool trick would be to put them in a formation as bomber escort~~
    - [ ] ~~Wave four, bombers show up. They can't hit you from far but can be tricky at close range (bombers take x9 fighter damage)~~
- [ ] Getting hit takes out one of your 9 lives.
- [ ] Hitting an enemy can cause fumes to come out
- [ ] Also, destroying an enemy plane has the chance of dropping a parachuted pilot.
    - [ ] Honestly I don't know how easy it will be to get the asset for this, but maybe we can do a simple parachute without trying to show a human body. Then do a point vs circle comparison
- [ ] Two Player (co-op) mode:
    - [ ] Players share score
    - [ ] Players can quick revive each other for free if they grab the dog tag. But this can be done only once per life.

### <a name='Gameover'></a>Game over

- [x] The "Game Over" title at the top
- [x] Show score right below that
    - [ ] Can have a "new record" text top right of it
- [x] Lastly, place the ~~"Play Again"~~"Shoot to Play Again" button

## <a name='Sound'></a>Sound

- [ ] Main Menu
    - [ ] Button hover
    - [ ] Button press
- [ ] Game
    - [ ] Move
    - [ ] Shoot
    - [ ] Hit enemy
    - [ ] Enemy shoot
    - [ ] Enemy explode
    - [ ] *Enemy Swoop in
    - [ ] *Pick up other player's dog tag
    - [ ] Player lost life
    - [ ] Player lost life because tag not picked

## <a name='Gamemechanics'></a>Game mechanics

### <a name='Movement'></a>Movement

- [ ] Player can move up, down, left, and right
- [ ] Use `WASD` for movement.
- [ ] As time passes you lose fuel. The lower your fuel is the less you can move forward and backwards. But with lower levels comes nimbleness and thus you'll be able to fly left and right with greater speed (this will in turn make it easier to catch any dropping fuel)

### <a name='Shooting'></a>Shooting

- [x] You shoot with the `N` key on the keyboard.
- [x] Bullets will always have a short range, so they'll die out at some point. You can't snipe a plane from one end of the screen to the other
- [ ] If your bullet hits the enemy plane, it will flash white.
- [ ] When a hit enemy's health drops below 50% then it switches to being in a damaged state.
    - [ ] Smoke should start coming out.
    - [ ] Whenever the health drops below 40%/30%/20%/10% a new smoke blume is created where the crippling bullet hit (this could look messy)

### <a name='Playerhitbox'></a>Player hit box

- [ ] The player's hit box will be smaller than the other planes whole have full body (normal) hit boxes. The player will only have a hit box around it's cockpit.
- [ ] This should give the player more breathing room.

### <a name='Playerstats'></a>Player stats

- [ ] Hitpoints: you have 1
- [ ] Lives: you have 9 (This is to show the player that this will not be easy)
- [ ] Fuel: Starts out at 100 drops as time goes by.

## <a name='Techstack'></a>Tech stack

- Pixi.js as renderer
- Howler.js for audio
- Keyboard-js for handling keyboard input

## <a name='Roadmap'></a>Roadmap

### <a name='v0.2.0basics'></a>v0.2.0 (basics)

- [x] Add the loader bar into the game
    - [x] Load plane
- [x] Then move on to movement for plane
- [x] Followed by plane shooting (alternating fire)
- [x] Add scrolling background using tiledSprite

### <a name='v0.3.0enemies'></a>v0.3.0 (enemies)

- [x] Basic enemy spawning
- [x] Add collision (see if you'll need a quad tree for this, usually do for shmups anyways)
- [x] Add custom collision for player
- [x] Spawning in formations
- [x] Spawning in waves (Timed waves just like in Game Maker 8 tut)
- [x] Show UI, show score
    - Place Score top left

### <a name='v0.4.0menu'></a>v0.4.0 (menu)

- [x] Add menu elements (title and button)
    - [x] For the initial setup use only the white text and white button with 
- [x] For now avoid showing highscore section

### <a name='v0.5.0gameoverscreen'></a>v0.5.0 (game over screen)

- [x] Add title
- [x] Add Score
- [x] Add "Play Again" button

### <a name='v0.5.1feedbackfromandrewotherstuff'></a>v0.5.1 (feedback from andrew + other stuff)

- [x] Implement arrows+spacebar control combo into game.
- [x] 4 point bomber should have different smaller sprite
- [x] Easier way to kill bombers.

### <a name='v0.5.2LoadingScreenfixup'></a>v0.5.2 (Loading Screen fix up)

- [ ] shoot to move to next screen (loading -> menu, menu -> play, game-over -> play)
- [ ] Move click prompt to loading screen
    - [ ] Loading text and loader should disappear and "Press an key" text should show centre of the screen
- [ ] Add instructions on how to play
    - [ ] WASD or Arrow keys to move player (put this on the left side)
    - [ ] N or Spacebar to fire (put this on the right side)


### <a name='v0.6.0audio'></a>v0.6.0 (audio)

- [ ] Main Menu
    - [ ] Button hover
    - [ ] Button press
- [ ] Game
    - [ ] Move
    - [ ] Shoot
    - [ ] Hit enemy
    - [ ] Enemy shoot
    - [ ] Enemy explode
    - [ ] *Enemy Swoop in
    - [ ] *Pick up other player's dog tag
    - [ ] Player lost life
    - [ ] Player lost life because tag not picked

### <a name='v0.x.0polishing'></a>v0.x.0 (polishing)

- [x] Add video background for menu
    - [x] Don't forget the music
- [ ] Add smoke trails
- [ ] Add bullet trails
- [ ] Add "dynamic" music
- [ ] Damage signs
- [ ] Add lives right below score in UI
- [ ] Pick ups
- [ ] Fuel speed change
- [ ] Parachuting enemies
- [ ] Add a second player in a sort of co-op mode