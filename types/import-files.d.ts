declare module "*.json";
declare module "*.wav";
declare module "*.png";
declare module "*.jpg";

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

interface Joypad {
	loopStarted: boolean,
	instances: Gamepad[];
	buttonEvents: {
		joypad: any[]
	};
	settings: {
		axisMovementThreshold: number
	};
	remove(index: number): boolean;
	on(event: EVENT_ALIASES.BUTTON_PRESS, callback: (event: CustomEvent<ButtonPressEventData>) => void): void;
	on(event: EVENT_ALIASES.CONNECT, callback: (event: GamepadEvent) => void): void;
	on(event: EVENT_ALIASES.DISCONNECT, callback: (event: GamepadEvent) => void): void;
	on(event: EVENT_ALIASES.AXIS_MOVEMENT, callback: (event: GamepadEvent) => void): void;
	vibrate(gamepadInstance: Gamepad, options: VibrationSettings): void;
	set(settings: {
		axisMovementThreshold?: number,
		vibration?: VibrationSettings,
		customButtonMapping?: CustomButtonMappingSettings,
	}): void;
	trigger(event: EVENT_ALIASES.BUTTON_PRESS, data: CustomEvent<ButtonPressEventData>): void;
	trigger(event: EVENT_ALIASES.CONNECT, data: GamepadEvent): void;
	trigger(event: EVENT_ALIASES.DISCONNECT, data: GamepadEvent): void;
	trigger(event: EVENT_ALIASES.AXIS_MOVEMENT, data: GamepadEvent): void;
}