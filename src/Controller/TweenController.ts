import * as PIXI from 'pixi.js';
import { Tween, TweenManager } from '../../types/types';

export class TweenController {
	public static instance: TweenController | undefined;

	public static getInstance(): TweenController {
		if (!TweenController.instance) {
			TweenController.instance = new TweenController();
		}

		return TweenController.instance;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected tweenManager: TweenManager;

	private constructor() {
		this.tweenManager = (PIXI as Record<string, unknown>).tweenManager as TweenManager;
	}

	public update(): void {
		this.tweenManager.update();
	}

	public createUpdateTween<UpdateTweenType extends Record<string, unknown>, CallbackThis>(target: UpdateTweenType, from: Partial<UpdateTweenType>, to: Partial<UpdateTweenType>, duration: number, updateCallback: (progress: number, dt: number) => void, callbackThis: CallbackThis): Tween {
		const tween = this.tweenManager.createTween(target);

		// console.log('From:', from, 'To:', to);
		tween.from(from).to(to);

		tween.time = duration;
		// console.log('Duration:', tween.time);

		let dur = 0;

		tween.on('start', () => {
			console.log('Started animation');
			dur = performance.now();
		});

		tween.on('update', updateCallback.bind(callbackThis));

		tween.on('end', () => {
			console.log('Ended animation');
			console.log('This took:', performance.now() - dur);
		});

		tween.start();

		return tween;
	}
}