import { Graphics, SCALE_MODES, Sprite, Texture } from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH } from '../constants';
import { getApp } from './get-app';

/**
 * Linear interpolation
 * @param a The starting value
 * @param b The destination value
 * @param n The normal value (between 0 and 1) to control the Linear Interpolation (a.k.a. time/progress)
 */
export function lerp(a: number, b: number, n: number): number {
	return (1 - n) * a + n * b;
}

/**
 * Returns the number of resources being downloaded for all assets in list. Atlases count as two (json+png)
 * @param assets The array of tuples with key+path of resources
 */
export function calculateImageAssetArrayCount(assets: [string, string][]): number {
	let count = 0;

	assets.forEach(asset => {
		if (asset[1].includes('-atlas.json')) {
			count += 2;
		} else {
			count++;
		}
	});

	return count;
}

/**
 * Converts a graphic object to a sprite
 * @param graphic The graphics object we are converting to a sprite
 * @param app The Pixijs Application that will create this sprite
 */
export function createSpriteFromGraphic(graphic: Graphics): Sprite {
	const texture = convertGraphicToTexture(graphic);

	return new Sprite(texture);
}

function convertGraphicToTexture(graphic: Graphics): Texture {
	const app = getApp();

	return app.renderer.generateTexture(graphic, SCALE_MODES.NEAREST, app.renderer.resolution);
}

const textures: Map<Graphic_List, Texture> = new Map();
export enum Graphic_List {
	PRELOADER,
	BULLET,
	ENEMY_BULLET,
	GAME_OVER_BACKGROUND
}

function createGraphicPreloader(): Graphics {
	// Generate bar
	const bar = new Graphics();
	bar.beginFill(0x444857);
	bar.lineStyle(0);
	bar.drawRect(0, 0, GAME_WIDTH * 0.25, GAME_HEIGHT * 0.05);
	bar.endFill();

	return bar;
}

function createGraphicPlayerBullet(): Graphics {
	// Generate player bullet
	const bullet = new Graphics();
	bullet.beginFill(0xffeb3b);
	// bullet.beginFill(0xff0000);
	bullet.lineStyle(0);
	bullet.drawRect(0, 0, 7, 7);
	bullet.endFill();

	return bullet;
}

function createGraphicEnemyBullet(): Graphics {
	// Generate enemy bullet
	const bullet = new Graphics();
	bullet.beginFill(0xffeb3b);
	bullet.lineStyle(1, 0xff0000);
	bullet.drawRect(0, 0, 7, 7);
	bullet.endFill();

	return bullet;
}

function createGraphicBackground(): Graphics {
	// Generate game over background
	const bullet = new Graphics();
	bullet.beginFill(0x000000);
	bullet.lineStyle(0);
	bullet.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
	bullet.endFill();

	return bullet;
}

export function createBackgroundWaterTexture(): Texture {
	const app = getApp();

	const renderCanvas = document.createElement('canvas');
	renderCanvas.width = GAME_WIDTH;
	renderCanvas.height = GAME_HEIGHT;
	const renderContext = renderCanvas.getContext('2d');

	const texture = Texture.from('water_tile');
	const sprite = new Sprite(texture);
	const sprCanvas = app.renderer.plugins.extract.canvas(sprite);

	const tileWidth = sprite.width;
	const tileHeight = sprite.height;
	const tileCountWidth = Math.ceil(GAME_WIDTH / tileWidth);
	const tileCountHeight = Math.ceil(GAME_HEIGHT / tileHeight);

	for (let x = 0; x < tileCountWidth; x++) {
		for (let y = 0; y < tileCountHeight; y++) {
			renderContext?.drawImage(sprCanvas, x * tileWidth, y * tileHeight);
		}
	}

	return Texture.from(renderCanvas);
}

export function generateCustomTextures(): void {
	textures.set(Graphic_List.PRELOADER, convertGraphicToTexture(createGraphicPreloader()));
	textures.set(Graphic_List.BULLET, convertGraphicToTexture(createGraphicPlayerBullet()));
	textures.set(Graphic_List.ENEMY_BULLET, convertGraphicToTexture(createGraphicEnemyBullet()));
	textures.set(Graphic_List.GAME_OVER_BACKGROUND, convertGraphicToTexture(createGraphicBackground()));
}

export function getGraphicTexture(index: Graphic_List): Texture {
	return textures.get(index) as Texture;
}

export function random(min = 0, max = 1): number {
	return (min + (Math.random() * (max - min)));
}

export * from './get-app';
