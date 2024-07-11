//global
// import 'joypad.js';
import { VibrationSettings } from "../../types/types";
import { AnimationNames } from "../constants";
import { PlayerPlane } from "../GameObjects";
import { ObjectPoolEntity } from "../GameObjects/ObjectPoolHandler";
import { Vector2D } from "../Math";
import { lerp } from "../Utils";
import { CameraController } from "./CameraController";
import { EventController } from "./EventController";
import { TweenController } from "./TweenController";

export enum GamepadButtons {
    FACE_1,
    FACE_2,
    FACE_3,
    FACE_4,
    LEFT_TOP_SHOULDER,
    RIGHT_TOP_SHOULDER,
    LEFT_BOTTOM_SHOULDER,
    RIGHT_BOTTOM_SHOULDER,
    SELECT_BACK,
    START_FORWARD,
    LEFT_STICK,
    RIGHT_STICK,
    DPAD_UP,
    DPAD_DOWN,
    DPAD_LEFT,
    DPAD_RIGHT,
    HOME,
}

export enum GamepadAxes {
    LEFT_STICK_X,
    LEFT_STICK_Y,
    RIGHT_STICK_X,
    RIGHT_STICK_Y,
}

export enum EVENT_ALIASES {
    CONNECT = "connect",
    DISCONNECT = "disconnect",
    BUTTON_PRESS = "button_press",
    AXIS_MOVEMENT = "axis_move",
}

export type GamepadButtonMapping = [GamepadButtons, string];

export type ExplosionEventProps = [ObjectPoolEntity, ObjectPoolEntity, number];

export interface IChromeGamepad extends Gamepad {
    vibrationActuator: {
        type: string;
        playEffect(type: string, options: VibrationSettings): void;
    };
}

export interface IVibrateParams {
    weakMagnitude: number;
    strongMagnitude: number;
}

export type LEFT_STICK_X = [number, number];
export type LEFT_STICK_Y = [number, number];
export type DeadZoneValues = [LEFT_STICK_X, LEFT_STICK_Y];

export class GamepadController<PlayerType> {
    protected activeGamepad: IChromeGamepad | null = null;
    protected events: EventController;
    protected deadZone: DeadZoneValues = [
        [-0.34, 0.34],
        [-0.34, 0.34],
    ];
    public isActive = true;

    constructor(protected player: PlayerType, protected controlMapping: GamepadButtonMapping[]) {
        this.events = EventController.getInstance();
        this.initEvents();
    }

    protected initEvents(): void {
        this.events.on<ExplosionEventProps>(AnimationNames.EXPLOSION1, (...props: ExplosionEventProps | unknown[]) => {
            const player = props[0] as unknown as Vector2D;
            const enemy = props[1] as unknown as Vector2D;
            const explosionRadius = props[2] as number;

            this.explosion1(player, enemy, explosionRadius);
        });
    }

    public update(): void {
        this.activeGamepad = navigator.getGamepads().find((gamepad) => !!gamepad) as IChromeGamepad;
        if (this.activeGamepad) {
            const player = this.player as unknown as PlayerPlane;

            this.controlMapping.forEach((mapping) => {
                const buttonIndex = mapping[0];
                const actionSeg = mapping[1];

                if (this.activeGamepad?.buttons && this.activeGamepad.buttons[buttonIndex].pressed) {
                    (player as unknown as Record<string, () => void>)["activate" + actionSeg].bind(player)();
                    this.isActive = true;
                } else if (this.isActive) {
                    (player as unknown as Record<string, () => void>)["deactivate" + actionSeg].bind(player)();
                }

                const axes = this.activeGamepad?.axes;

                if (axes) {
                    const axisXValue = axes[GamepadAxes.LEFT_STICK_X];
                    const axisYValue = axes[GamepadAxes.LEFT_STICK_Y];

                    // Check if the left stick is being used
                    if (this.notInDeadZone(axisXValue, GamepadAxes.LEFT_STICK_X)) {
                        if (axisXValue < 0) {
                            // Move left
                            player.activateLeft(axisXValue);
                        } else {
                            // Move Right
                            player.activateRight(axisXValue);
                        }
                    }
                    if (this.notInDeadZone(axisYValue, GamepadAxes.LEFT_STICK_Y)) {
                        if (axisYValue < 0) {
                            // Move up
                            player.activateUp(axisYValue);
                        } else {
                            // Move down
                            player.activateDown(axisYValue);
                        }
                    }
                }
            });
        }
    }

    protected notInDeadZone(axisValue: number, ix: number): boolean {
        const deadZone = this.deadZone[ix];

        if (axisValue <= deadZone[0] || axisValue >= deadZone[1]) {
            return true;
        }
        return false;
    }

    public static buttonPressed(): boolean {
        let buttonPressed = false;

        const gamepad = navigator.getGamepads().find((gamepad) => !!gamepad) as IChromeGamepad;

        if (gamepad) {
            const buttons = gamepad.buttons;

            for (let ix = 0; ix < buttons.length; ix++) {
                const button = buttons[ix];

                if (button.pressed) {
                    buttonPressed = true;
                    break;
                }
            }
        }
        return buttonPressed;
    }

    private explosion1(player: Vector2D, enemy: Vector2D, explosionRadius: number): void {
        const from = {
            weakMagnitude: 0.7,
            strongMagnitude: 0.65,
        };

        const to = {
            weakMagnitude: 0.0,
            strongMagnitude: 0.0,
        };

        this.explosionFromPlayer(from, to, 700, player, enemy, explosionRadius);
    }

    private explosionFromPlayer(
        from: IVibrateParams,
        to: IVibrateParams,
        duration: number,
        player: Vector2D,
        enemy: Vector2D,
        explosionRadius: number
    ): void {
        const target = {
            weakMagnitude: 0.0,
            strongMagnitude: 0.0,
        };

        TweenController.getInstance().createUpdateTween(
            target,
            from,
            to,
            duration,
            () => {
                // Find out how far the player is from the explosion
                const dist = Vector2D.distance(player as unknown as Vector2D, enemy as unknown as Vector2D);

                const intensity = 1 - Math.min(1, dist / explosionRadius);

                CameraController.getInstance().screenShake(intensity * 7, 16);

                this.vibrate({
                    duration: 16,
                    startDelay: 0,
                    strongMagnitude: target.strongMagnitude * intensity,
                    weakMagnitude: target.weakMagnitude * intensity,
                });
            },
            this
        );
    }

    public vibrate(options: VibrationSettings): void {
        if (this.isActive && this.activeGamepad) {
            this.activeGamepad.vibrationActuator.playEffect("dual-rumble", options);
        }
    }

    public vibrateRamped(from: IVibrateParams, to: IVibrateParams, duration: number): void {
        const target = {
            weakMagnitude: 0.0,
            strongMagnitude: 0.0,
        };

        TweenController.getInstance().createUpdateTween(
            target,
            from,
            to,
            duration,
            (time) => {
                const progress = time / duration;

                this.vibrate({
                    duration: 16,
                    startDelay: 0,
                    strongMagnitude: lerp(from.strongMagnitude, to.strongMagnitude, progress),
                    weakMagnitude: lerp(from.weakMagnitude, to.weakMagnitude, progress),
                });
            },
            this
        );
    }
}
