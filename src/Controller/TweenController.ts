import * as PIXI from "pixi.js";
import { Tween, TweenManager } from "../../types/types";

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

    public createUpdateTween<UpdateTweenType extends Record<string, unknown>, CallbackThis>(
        target: UpdateTweenType,
        from: Partial<UpdateTweenType>,
        to: Partial<UpdateTweenType>,
        duration: number,
        updateCallback: (progress: number, dt: number) => void,
        callbackThis: CallbackThis
    ): Tween {
        const tween = this.tweenManager.createTween(target);

        tween.from(from).to(to);

        tween.time = duration;

        tween.on("update", updateCallback.bind(callbackThis));

        tween.start();

        return tween;
    }
}
