import * as PIXI_M from 'pixi.js';

declare enum EVENT_ALIASES {
	CONNECT = 'connect',
	DISCONNECT = 'disconnect',
	BUTTON_PRESS = 'button_press',
	AXIS_MOVEMENT = 'axis_move',
}

type VibrationSettings = {
	startDelay: number,
	duration: number,
	weakMagnitude: number,
	strongMagnitude: number
};

type CustomButtonMappingSettings = {
	button_0: 0,
	button_1: 1,
	button_2: 2,
	button_3: 3,
	button_4: 4,
	button_5: 5,
	button_6: 6,
	button_7: 7,
	button_8: 8,
	button_9: 9,
	button_10: 10,
	button_11: 11,
	button_12: 12,
	button_13: 13,
	button_14: 14,
	button_15: 15,
	button_16: 16,
	button_17: 17,
};

declare enum ButtonMapping {
	button_0,
	button_1,
	button_2,
	button_3,
	button_4,
	button_5,
	button_6,
	button_7,
	button_8,
	button_9,
	button_10,
	button_11,
	button_12,
	button_13,
	button_14,
	button_15,
	button_16,
	button_17,
}

declare enum ButtonMappingNames {
	button_0 = 'button_0',
	button_1 = 'button_1',
	button_2 = 'button_2',
	button_3 = 'button_3',
	button_4 = 'button_4',
	button_5 = 'button_5',
	button_6 = 'button_6',
	button_7 = 'button_7',
	button_8 = 'button_8',
	button_9 = 'button_9',
	button_10 = 'button_10',
	button_11 = 'button_11',
	button_12 = 'button_12',
	button_13 = 'button_13',
	button_14 = 'button_14',
	button_15 = 'button_15',
	button_16 = 'button_16',
	button_17 = 'button_17',
}

declare enum DIRECTIONS {
	LEFT = 'left',
	RIGHT = 'right',
	TOP = 'top',
	BOTTOM = 'bottom',
}

declare enum STICKS {
	LEFT = 'left_stick',
	RIGHT = 'right_stick',
}

type ButtonPressEventData = {
	buttonName: ButtonMappingNames,
	button: GamepadButton,
	index: number,
	gamepad: Gamepad
};

// interface Joypad {
// 	loopStarted: boolean,
// 	instances: Gamepad[];
// 	buttonEvents: {
// 		joypad: any[]
// 	};
// 	settings: {
// 		axisMovementThreshold: number
// 	};
// 	remove(index: number): boolean;
// 	on(event: EVENT_ALIASES.BUTTON_PRESS, callback: (event: CustomEvent<ButtonPressEventData>) => void): void;
// 	on(event: EVENT_ALIASES.CONNECT, callback: (event: GamepadEvent) => void): void;
// 	on(event: EVENT_ALIASES.DISCONNECT, callback: (event: GamepadEvent) => void): void;
// 	on(event: EVENT_ALIASES.AXIS_MOVEMENT, callback: (event: GamepadEvent) => void): void;
// 	vibrate(gamepadInstance: Gamepad, options: VibrationSettings): void;
// 	set(settings: {
// 		axisMovementThreshold?: number,
// 		vibration?: VibrationSettings,
// 		customButtonMapping?: CustomButtonMappingSettings,
// 	}): void;
// 	trigger(event: EVENT_ALIASES.BUTTON_PRESS, data: CustomEvent<ButtonPressEventData>): void;
// 	trigger(event: EVENT_ALIASES.CONNECT, data: GamepadEvent): void;
// 	trigger(event: EVENT_ALIASES.DISCONNECT, data: GamepadEvent): void;
// 	trigger(event: EVENT_ALIASES.AXIS_MOVEMENT, data: GamepadEvent): void;
// }

export class TweenManager {
	constructor();
	tweens: Tween[];
	update(delta?: number): void;
	removeTween(tween: Tween): void;
	addTween(tween: Tween): void;
	createTween(target: Record<string, unknown>): Tween;
	getTweensForTarget(target: Record<string, unknown>): Tween[];
}

export class Tween extends PIXI_M.utils.EventEmitter {
	constructor(target: Record<string, unknown>, manager?: TweenManager);
	target: Record<string, unknown>;
	manager: TweenManager;
	time: number;
	active: boolean;
	easing: (num: number) => number;
	expire: boolean;
	repeat: number;
	loop: boolean;
	delay: number;
	pingPong: boolean;
	isStarted: boolean;
	isEnded: boolean;
	path: TweenPath;
	pathReverse: boolean;
	addTo(manager: TweenManager): void;
	chain(tween: Tween): Tween;
	start(): void;
	stop(): void;
	to(object: Record<string, unknown>): Tween;
	from(object: Record<string, unknown>): Tween;
	remove(): void;
	clear(): void;
	reset(): void;
	update(delta: number, deltaMS?: number): void;
}

export class TweenPath {
	constructor();
	closed: boolean;
	length: number;
	moveTo(x: number, y: number): TweenPath;
	lineTo(x: number, y: number): TweenPath;
	bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): TweenPath;
	quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): TweenPath;
	arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): TweenPath;
	arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): TweenPath;
	drawShape(shape: Record<string, unknown>): TweenPath;
	clear(): TweenPath;
}

export class Easing {
	static linear(): (num: number) => number;
	static inQuad(): (num: number) => number;
	static outQuad(): (num: number) => number;
	static inOutQuad(): (num: number) => number;
	static inCubic(): (num: number) => number;
	static outCubic(): (num: number) => number;
	static inOutCubic(): (num: number) => number;
	static inQuart(): (num: number) => number;
	static outQuart(): (num: number) => number;
	static inOutQuart(): (num: number) => number;
	static inQuint(): (num: number) => number;
	static outQuint(): (num: number) => number;
	static inOutQuint(): (num: number) => number;
	static inSine(): (num: number) => number;
	static outSine(): (num: number) => number;
	static inOutSine(): (num: number) => number;
	static inExpo(): (num: number) => number;
	static outExpo(): (num: number) => number;
	static inOutExpo(): (num: number) => number;
	static inCirc(): (num: number) => number;
	static outCirc(): (num: number) => number;
	static inOutCirc(): (num: number) => number;
	static inElastic(): (num: number) => number;
	static outElastic(): (num: number) => number;
	static inOutElastic(): (num: number) => number;
	static inBack(): (num: number) => number;
	static outBack(): (num: number) => number;
	static inOutBack(): (num: number) => number;
	static inBounce(): (num: number) => number;
	static outBounce(): (num: number) => number;
	static inOutBounce(): (num: number) => number;
}