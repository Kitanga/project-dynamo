import { Loader, Sprite, Texture, AnimatedSprite, Graphics, SCALE_MODES, Container, Text, TilingSprite, Ticker, TextStyle } from 'pixi.js';
import type PIXI from 'pixi.js';
import { getApp } from './Utils/get-app';
import { GAME_WIDTH, GAME_HEIGHT, QuadEntityType } from './constants';
import { PlayerPlane } from "./GameObjects/Planes";
import { Spawner, UIController } from "./Controller";
import { calculateImageAssetArrayCount, createBackgroundWaterTexture, generateCustomTextures, getGraphicTexture, Graphic_List } from "./Utils";
import { Topple } from './Topple';
import Alea from 'alea';

let app: PIXI.Application;
const loader = Loader.shared;

const HALF_GAME_WIDTH = GAME_WIDTH * 0.5;
const HALF_GAME_HEIGHT = GAME_HEIGHT * 0.5;

const Assets: [string, string][] = [
	['air_units', './assets/spriteSheets/air_units-atlas.json'],
	['player_plane', './assets/spriteSheets/player_plane-atlas.json'],
	['water_tile', './assets/img/water_tile.jpg'],
	['menu-bg-music', './assets/snd/edith-piaf-non-je-ne-regrette.mp3'],
	['menu-bg-video', './assets/vid/menu-bg-vid-3.mp4'],
	['dynamo', './assets/img/dynamo.png'],
];
const Sounds = [];
const TOTAL_ASSETS = calculateImageAssetArrayCount(Assets) + Sounds.length;
let currentlyDownloadedAssets = 0;
let preloaderSprite = new Sprite();
Math.random = Alea();
let assetCache: any;

function createPreloaderSprite(): PIXI.Sprite {
	const preloader = new Sprite(getGraphicTexture(Graphic_List.PRELOADER));
	preloader.anchor.set(0, 0.5);
	const x = (-preloader.width * 0.5) + HALF_GAME_WIDTH;
	preloader.position.set(x, HALF_GAME_HEIGHT);
	preloader.scale.set(0.1, 1);

	return preloader;
}

function createPlayer(): PlayerPlane {

	const plane = new PlayerPlane();
	plane.anchor.set(0.5, 0.5);
	plane.position.set(HALF_GAME_WIDTH, GAME_HEIGHT - (plane.height + 10));
	plane.roundPixels = true;

	return plane;
}

function startLoadingAssets(): void {
	// Start by showing loader 
	app.stage.addChild(preloaderSprite);

	Assets.forEach(resource => {
		loader.add(...resource);
	});
	loader.onLoad.add(() => {
		// Update the counter
		++currentlyDownloadedAssets;

		// Calc. the progress
		const progress = Math.max(currentlyDownloadedAssets / TOTAL_ASSETS, 0.1);

		// Update the preloader
		preloaderSprite.scale.set(progress, 1);

		console.log('Progress:', progress);
	});
	loader.load();

	// TODO: Add audio loading here as well.
}

function onAssetsLoaded(): void {
	showMenu();
}

function showBoot(): void {
	const readyText = new Text('Game has loaded click on text to start game!')

	readyText.x = app.renderer.width * 0.5;
	readyText.y = app.renderer.height * 0.5;

	readyText.interactive = true;
	readyText.buttonMode = true;

	readyText.anchor.set(0.5);

	readyText.on('pointerup', () => {
		showLoadingScreen();
		startLoadingAssets();
	});

	app.stage.addChild(readyText);
}

function clearStage(): void {
	generateCustomTextures();

	app.stage.children.forEach(child => {
		(child as Container).destroy({
			children: true,
		});
	});
	app.stage.removeChildren();
	console.log('Stage children:', app.stage.children.length);
}

function createWaterTiles(): TilingSprite {
	// const tilingSprite = new TilingSprite(Texture.from('water_tile'), GAME_WIDTH, GAME_HEIGHT);
	const tilingSprite = new TilingSprite(createBackgroundWaterTexture(), GAME_WIDTH, GAME_HEIGHT);

	return tilingSprite;
}

function resetStage(): void {
	clearStage();
}

function showGame(): void {
	const stage = app.stage;
	resetStage();

	// Background tiles
	const bg = createWaterTiles();
	stage.addChild(bg);

	// Player setup
	const player = createPlayer();
	stage.addChild(player);

	// Create spawner system
	const spawner = new Spawner();

	// Collision system setup
	/** Anything that the player can collide with (i.e. enemy planes, bullets, etc.) */
	const dangerToPlayer = new Topple();
	dangerToPlayer.registerRetrievalPoints(player);
	dangerToPlayer.addToPool([...spawner.fighterPool.pool, ...spawner.shootingFightersPool.pool, ...spawner.fourShotBomberPool.pool, ...spawner.bulletPool.pool]);

	/** Anything that the player can shoot (i.e. enemy planes) */
	const playerShoots = new Topple();
	player.bulletPool.pool.forEach(entity => {
		playerShoots.registerRetrievalPoints(entity);
	});
	playerShoots.addToPool([...spawner.fighterPool.pool, ...spawner.shootingFightersPool.pool, ...spawner.fourShotBomberPool.pool]);

	const UI = UIController.getInstance();

	const update = (dt: number) => {
		try {
			spawner.update(dt);

			bg.tilePosition.y += 1 * dt;

			if (bg.tilePosition.y > GAME_HEIGHT) {
				bg.tilePosition.y = bg.tilePosition.y - GAME_HEIGHT;
			}

			player.update(dt);

			dangerToPlayer.update(dt);
			playerShoots.update(dt);
		} catch (err) {
			console.error(err);
		}
	};

	player.on('game-over', () => {
		console.log('Game Over!!!');
		spawner.gameOver();
		UI.gameEnded();
		app.ticker.remove(update);
		const score = UIController.getInstance().getScore();
		UIController.instance = undefined;

		showGameOver(score);
	});

	app.ticker.add(update);
}

function showGameOver(score: number): void {
	resetStage();
	generateCustomTextures();

	// Black background
	const bg = new Sprite(getGraphicTexture(Graphic_List.GAME_OVER_BACKGROUND));

	app.stage.addChild(bg);

	const renderer = app.renderer;
	const centerX = renderer.width * 0.5;
	const centerY = renderer.height * 0.5;

	// Base font style
	const baseStyle = { fontFamily: 'Courier New', fill: 0xd3d3d3 };

	// Create the title
	const title = new Text('GAME OVER', new TextStyle({ ...baseStyle, fontSize: 70 }));
	title.x = centerX;
	title.y = renderer.height * 0.3333;
	title.anchor.set(0.5);

	app.stage.addChild(title);

	// Show score
	const scoreText = new Text(score.toString(), new TextStyle({ ...baseStyle, fontSize: 52 }));
	const scoreTitle = new Text('Score', new TextStyle({ ...baseStyle, fontSize: 30 }));

	scoreText.x = centerX;
	scoreText.y = centerY;
	scoreText.anchor.set(0.5);

	scoreTitle.x = centerX;
	scoreTitle.y = scoreText.getBounds().bottom + 4;
	scoreTitle.anchor.set(0.5, 0);

	app.stage.addChild(scoreText);
	app.stage.addChild(scoreTitle);

	// Place Play Again Button
	const playAgainButton =  new Text('Play Again', new TextStyle({...baseStyle, fontSize: 52 }));

	playAgainButton.interactive = true;
	playAgainButton.buttonMode = true;

	playAgainButton.anchor.set(0.5);
	playAgainButton.x = centerX;
	playAgainButton.y = renderer.height * 0.68;

	playAgainButton.on('pointerup', () => {
		showGame();
	});

	app.stage.addChild(playAgainButton);
}

function showMenu(): void {
	resetStage();

	const renderer = app.renderer;

	const bgVideo: HTMLVideoElement = assetCache['menu-bg-video'].data;
	const bgMusic: HTMLAudioElement = assetCache['menu-bg-music'].data;
	bgMusic.loop = true;
	bgVideo.loop = true;

	const videoBgTexture = Texture.from(bgVideo);

	// console.log('bgVideo: ', bgVideo);
	// console.log('bgMusic: ', bgMusic);

	const videoBgSprite = new Sprite(videoBgTexture);

	videoBgSprite.width = renderer.width;
	videoBgSprite.height = renderer.height;

	bgVideo.play();
	// bgMusic.volume = 0.3;
	bgMusic.play();

	app.stage.addChild(videoBgSprite);

	// Now we add the logo and the interactible
	const titleSprite = Sprite.from('dynamo');

	titleSprite.x = 20;
	titleSprite.y = renderer.height * 0.5

	titleSprite.anchor.set(0, 1);

	// The interactible
	const playButtonStyle = new TextStyle({
		fill: 'white'
	});
	const playButton = new Text('PLAY', playButtonStyle);
	playButton.anchor.set(0, 0);

	playButton.x = titleSprite.x;
	playButton.y = titleSprite.getBounds().bottom + 10;

	playButton.interactive = true;
	playButton.buttonMode = true;

	playButton.on('pointerup', () => {
		bgVideo.pause();
		bgVideo.currentTime = 0;
		bgMusic.pause();
		bgMusic.currentTime = 0;
		showGame();
	});

	app.stage.addChild(titleSprite);
	app.stage.addChild(playButton);
}

function showLoadingScreen(): void {
	resetStage();

	preloaderSprite = createPreloaderSprite();
	const loading = new Text('Loading...', { fontSize: 34 });

	loading.anchor.set(0, 0.5);
	loading.position.set(preloaderSprite.x, preloaderSprite.y - preloaderSprite.height);

	app.stage.addChild(loading);
}

window.onload = () => {
	app = getApp();

	// Show the boot screen
	showBoot();

	loader.onComplete.once((resources) => {
		console.log('Resources:', resources);
		assetCache = resources.resources;
		onAssetsLoaded();
	});
};
