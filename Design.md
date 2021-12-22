# Project Dynamo

Dynamo is an endless top-down shmup, with the goal of getting the highest score. If a score is high enough it's placed on the online score board (still WIP, don't have online highscore board, but I have a local one).

<!-- vscode-markdown-toc -->

-   [Flow](#Flow)
    -   [Start up](#Startup)
    -   [Main Menu](#MainMenu)
    -   [Game](#Game)
    -   [Game over](#Gameover)
-   [Sound](#Sound)
-   [Game mechanics](#Gamemechanics)
    -   [Movement](#Movement)
    -   [Shooting](#Shooting)
    -   [Transitioning to mobile](#Transitioningtomobile)
    -   [Player hit box](#Playerhitbox)
    -   [Player stats](#Playerstats)
-   [Tech stack](#Techstack)
-   [Roadmap](#Roadmap)
    -   [v0.2.0 (basics)](#v0.2.0basics)
    -   [v0.3.0 (enemies)](#v0.3.0enemies)
    -   [v0.4.0 (menu)](#v0.4.0menu)
    -   [v0.5.0 (game over screen)](#v0.5.0gameoverscreen)
    -   [v0.5.1 (feedback from andrew + other stuff)](#v0.5.1feedbackfromandrewotherstuff)
    -   [v0.6.0 (game feel and pacing fixes)](#v0.6.0gamefeelandpacingfixes)
    -   [v0.7.0 Place highscore on a server](#v0.7.0Placehighscoreonaserver)
    -   [v0.7.1 Extras from v0.6.0](#v0.7.1Extrasfromv0.6.0)
    -   [v0.8.0 (Loading Screen fix up)](#v0.8.0LoadingScreenfixup)
    -   [v0.9.0 (new plane: Meandering plane)](#v0.9.0newplane:Meanderingplane)
    -   [v0.10.0 (audio)](#v0.10.0audio)
    -   [v0.x.0 (polishing)](#v0.x.0polishing)

<!-- vscode-markdown-toc-config
	numbering=false
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

## <a name='Flow'></a>Flow

### <a name='Startup'></a>Start up

-   [x] Game startup is when we show the loading bar as we load all the assets. No boot stage or showing of logo during loading.
    -   [x] Loading bar is a light gray background with black bar being filled. Use PIXI Graphics
-   [x] ~~When this is done, we'll show the audio prompt, which is always going to be "yes".~~

### <a name='MainMenu'></a>Main Menu

-   [x] After assets have loaded and the user has been forced to play audio we show the `main-menu`.
    -   [x] This will be built using PIXI's components and not HTML.
-   [x] The main menu will have it's logo and play button on the left side.
-   [ ] Highscore list in the middle (or middle-right) section.
-   [x] There will be a video playing in the background with footage from WW2 and an editted version of Edith Piaf's "Non je ne regrette rien" playing in the background.
-   [x] Check to make sure that there's good contrast between bg and foreground.

### <a name='Game'></a>Game

-   [ ] When player presses the start button, the music quickly fades out (use 520ms) and they are taken into the game itself.
-   [x] The plane will be placed a few pixels above the bottom border and horizontally centered.
-   [x] The spawner will have a certain number of seconds setup for spawning units.
    -   [x] This number of seconds will change based on how long the player has been playing (e.g. it will take 5 minutes for the player to reach the most difficult point of game).
    -   [x] The spawner will also only start spawning certain units after certain points are hit within that 5 minute span.
-   [ ] Wave types:
    -   [x] Have first wave be just fighters, flying down.
        -   [x] Planes can fly in formation if needed.
    -   [x] In wave two, have fighters like the previous wave but they shoot down and need x3 the damage to destroy.
    -   [ ] ~~Wave three, fighters that move to make sure they are in front of you as they shoot. (x5 needed. Comparing with wave 1 fighters)~~
        -   [ ] ~~A cool trick would be to put them in a formation as bomber escort~~
    -   [ ] ~~Wave four, bombers show up. They can't hit you from far but can be tricky at close range (bombers take x9 fighter damage)~~
-   [ ] Damage types:
    -   [x] Normal damage is how much damage a plane takes from one player shoot
    -   [x] Critical damage occurs when the Critical damage multiplier is greater than 1. Critical damage multiplier is a number multiplied by the plane's damage to get the new damage.
        -   [ ] This can happen when a plane is hit on a critical area (cockpit, engines). Smoke can come out of these areas.
-   [ ] Enemy types:
    -   [x] normal plane: it's a fighter plane but for some unknown reason it just doesn't shoot at you. It's also lightly armored (defense: 1; Critical: 1; Critical_areas: 0)
    -   [x] fighter plane: this plane shoots downwards as it moves (defense: 3; Critical: 1; Critical_areas: 0)
    -   [x] 4 shot bomber plane: this plane shoots in 4 directions (defense: 9; Critical: 2; Critical_areas: 3)
    -   [x] 8 shot bomber plane: this plane shoots in 8 directions (defense: 9; Critical: 2; Critical_areas: 3)
    -   [ ] meandering planes: this plane shoots whilst meandering (defense: 6; Critical: 1.5; Critical_areas: 3)
-   [ ] Getting hit takes out one of your 9 lives.
-   [ ] Hitting an enemy can cause fumes to come out
-   [ ] Also, destroying an enemy plane has the chance of dropping a parachuted pilot.
    -   [ ] Honestly I don't know how easy it will be to get the asset for this, but maybe we can do a simple parachute without trying to show a human body. Then do a point vs circle comparison
-   [ ] Two Player (co-op) mode:
    -   [ ] Players share score
    -   [ ] Players can quick revive each other for free if they grab the dog tag. But this can be done only once per life.

### <a name='Gameover'></a>Game over

-   [x] The "Game Over" title at the top
-   [x] Show score right below that
    -   [ ] Can have a "new record" text top right of it
-   [x] Lastly, place the ~~"Play Again"~~"Shoot to Play Again" button

## <a name='Sound'></a>Sound

-   [ ] Main Menu
    -   [ ] Button hover
    -   [ ] Button press
-   [ ] Game
    -   [ ] Move
    -   [ ] Shoot
    -   [ ] Hit enemy
    -   [ ] Enemy shoot
    -   [ ] Enemy explode
    -   [ ] \*Enemy Swoop in
    -   [ ] \*Pick up other player's dog tag
    -   [ ] Player lost life
    -   [ ] Player lost life because tag not picked

## <a name='Gamemechanics'></a>Game mechanics

### <a name='Movement'></a>Movement

-   [x] Player can move up, down, left, and right
-   [x] Use `WASD` for movement.
-   [ ] As time passes you lose fuel. The lower your fuel is the less you can move forward and backwards. But with lower levels comes nimbleness and thus you'll be able to fly left and right with greater speed (this will in turn make it easier to catch any dropping fuel)

### <a name='Shooting'></a>Shooting

-   [x] You shoot with the `N` key on the keyboard.
-   [x] Bullets will always have a short range, so they'll die out at some point. You can't snipe a plane from one end of the screen to the other
-   [ ] If your bullet hits the enemy plane, hit plane will flash white.
-   [ ] When a hit enemy's health drops below 50% then it switches to being in a damaged state.
    -   [ ] Smoke should start coming out.
    -   [ ] Whenever the health drops below 40%/30%/20%/10% a new smoke blume is created where the crippling bullet hit (this could look messy)
-   [ ] I like my controller/keyboard with all the buttons intact and working for as long as is possible. 1 issue with this genre is people hold the shoot button the whole time. What I'm going to do instead is add a meter that fills up as your gun fires.

### <a name='Transitioningtomobile'></a>Transitioning to mobile

The game looks fine on mobile, with a few exceptions, the formations might have to be tweaked in order to have the right type of pacing. That's not the only thing though:

-   [ ] The text needs to be responsive.
-   [ ] The game needs to have different formations for different device types, we can't have the same formations for mobile and desktop.
-   [ ] Overheat feature should be disabled.

### <a name='Playerhitbox'></a>Player hit box

-   [x] The player's hit box will be smaller than the other planes who have full body (normal) hit boxes. The player will only have a hit box around it's cockpit.
-   [x] This should give the player more breathing room.

### <a name='Playerstats'></a>Player stats

-   [x] Hitpoints: you have 1
-   [ ] Lives: you have 9 (This is to show the player that this will not be easy)
-   [ ] Fuel: Starts out at 100 drops as time goes by.
-   [ ] Overheat meter: starts at 0, maxes out at 100%. Increases the longer you hold the trigger. amountIncrease < amountDecrease.

## <a name='Techstack'></a>Tech stack

-   Pixi.js as renderer
-   Howler.js for audio
-   Keycon for handling keyboard input
-   Custom Gamepad input handler
-   Pixi-Tween for animations

## <a name='Roadmap'></a>Roadmap

### <a name='v0.2.0basics'></a>v0.2.0 (basics)

-   [x] Add the loader bar into the game
    -   [x] Load plane
-   [x] Then move on to movement for plane
-   [x] Followed by plane shooting (alternating fire)
-   [x] Add scrolling background using tiledSprite

### <a name='v0.3.0enemies'></a>v0.3.0 (enemies)

-   [x] Basic enemy spawning
-   [x] Add collision (see if you'll need a quad tree for this, usually do for shmups anyways)
-   [x] Add custom collision for player
-   [x] Spawning in formations
-   [x] Spawning in waves (Timed waves just like in Game Maker 8 tut)
-   [x] Show UI, show score
    -   Place Score top left

### <a name='v0.4.0menu'></a>v0.4.0 (menu)

-   [x] Add menu elements (title and button)
    -   [x] For the initial setup use only the white text and white button with
-   [x] For now avoid showing highscore section

### <a name='v0.5.0gameoverscreen'></a>v0.5.0 (game over screen)

-   [x] Add title
-   [x] Add Score
-   [x] Add "Play Again" button

### <a name='v0.5.1feedbackfromandrewotherstuff'></a>v0.5.1 (feedback from andrew + other stuff)

-   [x] Implement arrows+spacebar control combo into game.
-   [x] 4 point bomber should have different smaller sprite
-   [x] Easier way to kill bombers.

### <a name='v0.6.0gamefeelandpacingfixes'></a>v0.6.0 (game feel and pacing fixes)

-   [x] Implement Gamepad
-   [x] Implement gamepad vibration
    -   [x] When shooting
    -   [x] When things blow up
        -   [x] Vibrate when things blow up
        -   [x] Intensity based on how player is to explosion
-   [x] Screen responsiveness
    -   [x] Make menu responsive
    -   [x] Make game-over screen responsive
-   [x] Planes that spawn should have their value moved closer to the player's position
-   [x] When a plane spawns it should only shoot when it's on the screen
-   [x] Create `server.js` file for serving game on node server.
-   [x] Launch game onto heroku.
-   [x] Update: Wave 1 planes should move faster
    -   [x] This will be a wave 1 alternate, so pick between the 2, the standard version should have a higher likelihood of spawning.
-   [x] Screen shake when things blow up
    -   [x] The closer you are to an explosion the more the screen shakes.
-   [x] Blow up shockwave filter
-   [x] Add flash anim for hit enemies
-   [x] Fix responsiveness of video on menu page
-   [x] Game (Create sound manager for this. Also add blur event for game audio to be muted)
    -   [x] Shoot
    -   [x] Hit enemy
    -   [x] Kill Confirmed
    -   [x] Enemy explode
    -   [x] Game over music
-   [x] Water must wiggle
-   [x] Switch to parcel 2
-   [x] Add the version number (place javascript code into the `src/index.html` that creates a VERSION_TAG value and sets it to our package.json file's version. This way we always have the version update to date with the game code.)

### v0.6.1 Quality of life changes for gamepad and asset loading flow

-   [x] BUG: Allow user to switch control schemes during game (post using gamepad)
-   [x] NEW: Analog controls
-   [x] UPDATE: Move the "Click ME to start Game" to after assets load
-   [ ] UPDATE: Make game over scene background translucent
-   [ ] UPDATE: Allow user to move past input prompt and menu scene by pressing spacebar or controller buttons
-   [ ] UPDATE: Change "click on THIS..." to an audio prompt instead.
-   [ ] NEW: Add a way for controller to pick between the two options (A for yes and B for no)
-   [ ] NEW: Added firebase analytics to measure session time.
-   [ ] NEW: Add explosion animations
-   [ ] NEW: Add a plane falling from the sky on game over screen

### <a name='v0.7.0Placehighscoreonaserver'></a>v0.7.0 Place highscore on a server

-   [ ] Place highscore on a server
-   [ ] Have points fly to the score
-   [ ] Pulse score when receiving score

### <a name='v0.7.1Extrasfromv0.6.0'></a>v0.7.1 Extras from v0.6.0

-   [ ] Game audio
    -   [ ] ~Enemy shoot~ (Too much noise, will have to be implemented a bit differently)
    -   [ ] Player lost life
-   [ ] Add blur event for SoundController
-   [ ] Add system to load different formations depending on whether we are on mobile or not.

### <a name='v0.8.0LoadingScreenfixup'></a>v0.8.0 (Loading Screen fix up)

-   [ ] Update: add system for multiple critical areas
-   [ ] NEW: Add a help page with instructions on playing the game (Controls and such)
-   [x] Fix?: Apparently enemies can't shoot from outside the game's border.
-   [ ] Update: Move click prompt to loading screen
    -   [ ] Loading text and loader should disappear and "Press an key" text should show centre of the screen
-   [ ] Add touch controls. Disable overheat feature when touch is enabled.
-   [ ] Add code to disable controller controls when the keyboard is used.
-   [ ] New: Add instructions on how to play
    -   [ ] WASD or Arrow keys to move player (put this on the left side)
    -   [ ] N or Spacebar to fire (put this on the right side)

### <a name='v0.9.0newplane:Meanderingplane'></a>v0.9.0 (new plane: Meandering plane)

-   [ ] New: Plane that meanders

### v0.10.0 Add Localised text

-   [ ] Add text localisation

### <a name='v0.10.0audio'></a>v0.11.0 (audio)

-   [ ] Main Menu
    -   [ ] Button hover
    -   [ ] Button press
-   [ ] Game
    -   [ ] Move -->
    -   [ ] \*Enemy Swoop in
    -   [ ] \*Pick up other player's dog tag
    -   [ ] Player lost life because tag not picked

### <a name='v0.x.0polishing'></a>v0.x.0 (polishing)

-   [x] Add video background for menu
    -   [x] Don't forget the music
-   [ ] Add smoke trails
-   [ ] Add bullet trails
-   [ ] Add "dynamic" music
-   [ ] Damage signs
-   [ ] Add lives right below score in UI
-   [ ] Pick ups
-   [ ] Fuel speed change
-   [ ] Parachuting enemies
-   [ ] Add a second player in a sort of co-op mode
-   [ ] Add settings
    -   [ ] Audio control
    -   [ ] controller deadzone, mapping, vibration toggle, etc.
    -   [ ] Screen shake toggle
