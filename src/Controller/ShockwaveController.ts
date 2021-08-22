import { ShockwaveFilter } from 'pixi-filters';
import { Application, Filter, Point } from 'pixi.js';
import { getApp } from '../Utils';
import { TweenController } from './TweenController';

export class ShockwaveController {
	public static instance: ShockwaveController | undefined;

	public static getInstance(): ShockwaveController {
		if (!ShockwaveController.instance) {
			ShockwaveController.instance = new ShockwaveController();
		}

		return ShockwaveController.instance;
	}

	protected app: Application;
	protected shockwaveFilter: ShockwaveFilter;

	private constructor() {
		this.app = getApp();
		this.shockwaveFilter = new ShockwaveFilter(undefined, {
			amplitude: 10,
			wavelength: 70,
			brightness: 1,
			radius: 200,
		}, 0);

		// const target = this.app.stage.getChildByName('tiledBG');
		const target = this.app.stage;

		target.filters = [(this.shockwaveFilter as unknown) as Filter];
	}

	public shockwave(x: number, y: number): void {
		this.shockwaveFilter.center = { x, y } as Point;
		TweenController.getInstance().createUpdateTween<Partial<ShockwaveFilter>, this>(this.shockwaveFilter, { time: 0 }, { time: 200 / this.shockwaveFilter.speed }, 700, () => {
			// const progress = time / 2000;
			// console.log('T:', this.shockwaveFilter.time);
		}, this);
	}

	public resetShockwave(): void {
		this.shockwaveFilter.time = 0;
		this.app.stage.filters = [];
	}
}
