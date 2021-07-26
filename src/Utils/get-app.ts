import { Application } from "pixi.js";
import { GAME_WIDTH, GAME_HEIGHT, GAME_BACKGROUND_COLOR } from "../constants";
import type PIXI from "pixi.js";

const S = {} as { app: PIXI.Application };

function setSize(): void {
	S.app.renderer.resize(window.innerWidth, window.innerHeight);
	S.app.stage.scale.x = window.innerWidth / GAME_WIDTH;
	S.app.stage.scale.y = window.innerHeight / GAME_HEIGHT;
}

function onResize(): void {
	S.app && setSize();
}

export function getApp(): PIXI.Application {
	if (!S.app) {
		S.app = new Application({
			width: GAME_WIDTH,
			height: GAME_HEIGHT,
			backgroundColor: GAME_BACKGROUND_COLOR,
			antialias: false,
		});
		document.body.appendChild(S.app.view);
		window.addEventListener("resize", onResize);
		setSize();
	}
	return S.app;
}
