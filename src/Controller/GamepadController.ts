//global 
// import 'joypad.js';
import { PlayerPlane } from '../GameObjects/Planes';

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
	HOME
}

export enum GamepadAxes {
	LEFT_STICK_X,
	LEFT_STICK_Y,
	RIGHT_STICK_X,
	RIGHT_STICK_Y
}

var joypad: Joypad = (window as any).joypad;

enum EVENT_ALIASES {
	CONNECT = 'connect',
	DISCONNECT = 'disconnect',
	BUTTON_PRESS = 'button_press',
	AXIS_MOVEMENT = 'axis_move',
}

type GamepadButtonMapping = [GamepadButtons, string];

interface ChromeGamepad extends Gamepad {
	vibrationActuator: {
		type: string;
		playEffect(type: string, options: VibrationSettings): void;
	};
}

export class GamepadController {
	protected activeGamepad: ChromeGamepad | null = null;

	constructor(protected player: PlayerPlane, protected controlMapping: GamepadButtonMapping[]) {
	}

	public update(dt: number): void {
		this.activeGamepad = navigator.getGamepads()[0] as ChromeGamepad;
		if (this.activeGamepad) {
			const player = this.player;

			this.controlMapping.forEach(mapping => {
				const buttonIndex = mapping[0];
				const actionSeg = mapping[1];

				if (this.activeGamepad?.buttons && this.activeGamepad.buttons[buttonIndex].pressed) {
					//@ts-ignore
					player['activate' + actionSeg].bind(player)();
				} else {
					//@ts-ignore
					player['deactivate' + actionSeg].bind(player)();
				}
			});
		}
	}

	public vibrate(options: VibrationSettings): void {
		if (this.activeGamepad) {
			this.activeGamepad.vibrationActuator.playEffect('dual-rumble', options);
		}
	}
}
