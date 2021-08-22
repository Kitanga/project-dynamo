import Alea from "alea";
import * as PIXI from "pixi.js";
import { Container, Loader, Sprite, Text, TextStyle, Texture, TilingSprite } from "pixi.js";
import { ASSETS_LIST, GAME_HEIGHT, GAME_WIDTH } from "./constants";
import {
	CameraController,
	CAMERA_CONTAINER_NAME,
	ShockwaveController,
	SoundController,
	Spawner,
	TweenController,
	UIController,
} from "./Controller";
import { PlayerPlane } from "./GameObjects/Planes";
import { Topple } from "./Topple";
import {
	calculateImageAssetArrayCount,
	createBackgroundWaterTexture,
	generateCustomTextures,
	getGraphicTexture,
	Graphic_List,
} from "./Utils";
import { getApp } from "./Utils/get-app";

(window as { PIXI?: Record<string, unknown> }).PIXI = PIXI;
import "pixi-tween";
import { ObjectPoolEntity } from './GameObjects';

let app: PIXI.Application;
const loader = Loader.shared;

const HALF_GAME_WIDTH = GAME_WIDTH * 0.5;
const HALF_GAME_HEIGHT = GAME_HEIGHT * 0.5;

const Assets = ASSETS_LIST;
const Sounds = [];
const TOTAL_ASSETS = calculateImageAssetArrayCount(Assets) + Sounds.length;
let currentlyDownloadedAssets = 0;
let preloaderSprite = new Sprite();
Math.random = Alea();
let assetCache: Record<string, PIXI.ILoaderResource>;

function createPreloaderSprite(): PIXI.Sprite {
	const preloader = new Sprite(getGraphicTexture(Graphic_List.PRELOADER));
	preloader.anchor.set(0, 0.5);
	const x = -preloader.width * 0.5 + HALF_GAME_WIDTH;
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

	Assets.forEach((resource) => {
		loader.add(...resource);
	});
	loader.onLoad.add(() => {
		// Update the counter
		++currentlyDownloadedAssets;

		// Calc. the progress
		const progress = Math.max(currentlyDownloadedAssets / TOTAL_ASSETS, 0.1);

		// Update the preloader
		preloaderSprite.scale.set(progress, 1);

		console.log("Progress:", progress);
	});
	loader.load();

	// TODO: Add audio loading here as well.
}

function onAssetsLoaded(): void {
	showMenu();
}

function showBoot(): void {
	const readyText = new Text("Click to start game!");

	readyText.x = app.renderer.width * 0.5;
	readyText.y = app.renderer.height * 0.5;

	readyText.interactive = true;
	readyText.buttonMode = true;

	readyText.anchor.set(0.5);

	readyText.on("pointerup", () => {
		showLoadingScreen();
		startLoadingAssets();
	});

	app.stage.addChild(readyText);
}

function clearStage(): void {
	generateCustomTextures();

	app.stage.children.forEach((child) => {
		(child as Container).destroy({
			children: true,
		});
	});
	app.stage.removeChildren();
}

function createWaterTiles(): TilingSprite {
	// const tilingSprite = new TilingSprite(Texture.from('water_tile'), GAME_WIDTH, GAME_HEIGHT);
	const texture = createBackgroundWaterTexture();

	const width = texture.width * 2 + window.innerWidth;
	const height = texture.height * 2 + window.innerHeight;

	const tilingSprite = new TilingSprite(texture, width, height);

	tilingSprite.x = -texture.width * 0.5;
	tilingSprite.y = -texture.height * 0.5;

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
	// bg.name = 'tiledBG';
	const displacementSpr = Sprite.from("dm");
	displacementSpr.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
	const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSpr);
	bg.filters = [displacementFilter];

	stage.addChild(bg);

	// Create camera reference here
	const cameraContainer = new Container();
	cameraContainer.name = CAMERA_CONTAINER_NAME;
	app.stage.addChild(cameraContainer);
	CameraController.getInstance();

	// Player setup
	const player = createPlayer();
	SoundController.getInstance().setPlayerRef(player);
	stage.addChild(player);

	// Create spawner system
	const spawner = new Spawner(player);

	// Collision system setup
	let collisionSystems: { [key: string]: Topple<ObjectPoolEntity> } | null = {
		/** Anything that the player can collide with (i.e. enemy planes, bullets, etc.) */
		dangerToPlayer: new Topple(),
		/** Anything that the player can shoot (i.e. enemy planes) */
		playerShoots: new Topple(),
	};

	collisionSystems.dangerToPlayer.registerRetrievalPoints(player as ObjectPoolEntity);
	collisionSystems.dangerToPlayer.addToPool([
		...spawner.fighterPool.pool,
		...spawner.shootingFightersPool.pool,
		...spawner.fourShotBomberPool.pool,
		...spawner.bulletPool.pool,
		...spawner.eightShotBomberPool.pool,
	]);

	player.bulletPool.pool.forEach((entity) => {
		collisionSystems?.playerShoots.registerRetrievalPoints(entity);
	});
	collisionSystems.playerShoots.addToPool([
		...spawner.fighterPool.pool,
		...spawner.shootingFightersPool.pool,
		...spawner.fourShotBomberPool.pool,
		...spawner.eightShotBomberPool.pool,
	]);

	const UI = UIController.getInstance();
	const tweenManager = TweenController.getInstance();

	const update = (dt: number) => {
		try {
			spawner.update(dt);

			bg.tilePosition.y += 1 * dt;

			if (bg.tilePosition.y > GAME_HEIGHT) {
				bg.tilePosition.y = bg.tilePosition.y - GAME_HEIGHT;
			}

			player.update(dt);

			collisionSystems?.dangerToPlayer.update();
			collisionSystems?.playerShoots.update();

			tweenManager.update();
		} catch (err) {
			console.error(err);
		}
	};

	player.on("game-over", () => {
		console.log("Game Over!!!");
		spawner.gameOver();
		collisionSystems?.dangerToPlayer.destroy();
		collisionSystems?.playerShoots.destroy();
		collisionSystems = null;
		UI.gameEnded();
		app.ticker.remove(update);
		const score = UIController.getInstance().getScore();
		UIController.instance = undefined;
		TweenController.instance = undefined;
		CameraController.instance = undefined;
		ShockwaveController.getInstance().resetShockwave();
		ShockwaveController.instance = undefined;

		showGameOver(score);
	});

	app.ticker.add(update);
}

function showGameOver(score: number): void {
	resetStage();
	generateCustomTextures();

	SoundController.getInstance().stopAll();
	SoundController.getInstance().playGameOverMusic();

	// Black background
	const bg = new Sprite(getGraphicTexture(Graphic_List.GAME_OVER_BACKGROUND));

	app.stage.addChild(bg);

	const renderer = app.renderer;
	const centerX = renderer.width * 0.5;
	const centerY = renderer.height * 0.5;

	// Base font style
	const baseStyle = { fontFamily: "Courier New", fill: 0xd3d3d3 };

	const scoreFontBase = Math.round(window.innerWidth * 0.02);

	// Create the title
	const title = new Text("GAME OVER", new TextStyle({ ...baseStyle, fontSize: scoreFontBase + 40 }));
	title.x = centerX;
	title.y = renderer.height * 0.3333;
	title.anchor.set(0.5);

	app.stage.addChild(title);

	// Show score
	const scoreText = new Text(score.toString(), new TextStyle({ ...baseStyle, fontSize: scoreFontBase + 22 }));
	const scoreTitle = new Text("Score", new TextStyle({ ...baseStyle, fontSize: scoreFontBase }));

	scoreText.x = centerX;
	scoreText.y = centerY;
	scoreText.anchor.set(0.5);

	scoreTitle.x = centerX;
	scoreTitle.y = scoreText.getBounds().bottom + 4;
	scoreTitle.anchor.set(0.5, 0);

	app.stage.addChild(scoreText);
	app.stage.addChild(scoreTitle);

	// Place Play Again Button
	const playAgainButton = new Text("Play Again", new TextStyle({ ...baseStyle, fontSize: scoreFontBase + 22 }));

	playAgainButton.interactive = true;
	playAgainButton.buttonMode = true;

	playAgainButton.anchor.set(0.5);
	playAgainButton.x = centerX;
	playAgainButton.y = renderer.height * 0.68;

	playAgainButton.on("pointerup", () => {
		SoundController.getInstance().stopAll();
		showGame();
	});

	app.stage.addChild(playAgainButton);
}

function showMenu(): void {
	resetStage();

	const renderer = app.renderer;
	const halfWidth = renderer.width * 0.5;
	const halfHeight = renderer.height * 0.5;

	const bgVideo: HTMLVideoElement = assetCache["menu-bg-video"].data;
	bgVideo.loop = true;

	const videoBgTexture = Texture.from(bgVideo);

	const videoBgSprite = new Sprite(videoBgTexture);

	if (halfHeight > halfWidth) {
		// Portrait
		const scale = window.innerHeight / bgVideo.videoHeight;
		videoBgSprite.width = bgVideo.videoWidth * scale;
		videoBgSprite.height = bgVideo.videoHeight * scale;
	} else {
		// Landscape
		const scale = window.innerWidth / bgVideo.videoWidth;
		videoBgSprite.width = bgVideo.videoWidth * scale;
		videoBgSprite.height = bgVideo.videoHeight * scale;

		if (videoBgSprite.height < window.innerHeight) {
			const newScale = window.innerHeight / bgVideo.videoHeight;
			videoBgSprite.width = bgVideo.videoWidth * newScale;
			videoBgSprite.height = bgVideo.videoHeight * newScale;
		}
	}

	videoBgSprite.anchor.set(0.5);

	videoBgSprite.x = halfWidth;
	videoBgSprite.y = halfHeight;

	bgVideo.play();
	SoundController.getInstance().playMenuMusic();

	app.stage.addChild(videoBgSprite);

	// Now we add the logo and the interactible
	const titleSprite = Sprite.from("dynamo");

	titleSprite.x = 20;
	titleSprite.y = renderer.height * 0.5;
	const titleAspectRatio = titleSprite.width / titleSprite.height;
	titleSprite.scale.x = (renderer.width * 0.502) / titleSprite.width;
	titleSprite.scale.y = titleSprite.width / titleAspectRatio / titleSprite.height;

	titleSprite.anchor.set(0, 1);

	// The interactible
	const playButtonStyle = new TextStyle({
		fill: "white",
	});
	const playButton = new Text("PLAY", playButtonStyle);
	playButton.anchor.set(0, 0);

	playButton.x = titleSprite.x;
	playButton.y = titleSprite.getBounds().bottom + 10;

	playButton.interactive = true;
	playButton.buttonMode = true;

	playButton.on("pointerup", () => {
		bgVideo.pause();
		bgVideo.currentTime = 0;
		SoundController.getInstance().stopAll();
		SoundController.getInstance().playMouseClick();
		showGame();
	});

	app.stage.addChild(titleSprite);
	app.stage.addChild(playButton);

	// Add the version number

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const versionNum = new Text('v' + VERSION, new TextStyle({ fill: "white" }));

	versionNum.updateText(true);

	versionNum.x = halfWidth;
	versionNum.y = renderer.height - versionNum.height;

	app.stage.addChild(versionNum);
}

function showLoadingScreen(): void {
	resetStage();

	preloaderSprite = createPreloaderSprite();
	const loading = new Text("Loading...", { fontSize: 34 });

	loading.anchor.set(0, 0.5);
	loading.position.set(preloaderSprite.x, preloaderSprite.y - preloaderSprite.height);

	app.stage.addChild(loading);
}

window.onload = () => {
	app = getApp();

	// Show the boot screen
	showBoot();

	loader.onComplete.once((resources: { resources: Record<string, PIXI.ILoaderResource> }) => {
		console.log("Resources:", resources);
		assetCache = resources.resources;
		onAssetsLoaded();
	});
};
