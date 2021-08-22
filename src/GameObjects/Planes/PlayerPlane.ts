import { Texture } from 'pixi.js';
import KeyController from 'keycon';
import { Vector2D } from '../../Math';
import { GAME_HEIGHT, GAME_WIDTH, QuadEntityType } from '../../constants';
import { Bullet, ObjectPoolHandler, PlayerBullet, PlayerBulletProps } from '../ObjectPoolHandler';
import Quadtree from '@timohausmann/quadtree-js';
import { GamepadButtons, GamepadController, SoundController } from '../../Controller';

export enum PrimaryControls {
	SHOOT = 'n',
	LEFT = 'a',
	RIGHT = 'd',
	UP = 'w',
	DOWN = 's',
}

export enum alternateControls {
	SHOOT = 'space',
	LEFT = 'left',
	RIGHT = 'right',
	UP = 'up',
	DOWN = 'down',
}

export enum GamepadControls {
	SHOOT = 'space',
	LEFT = 'left',
	RIGHT = 'right',
	UP = 'up',
	DOWN = 'down',
}

export class PlayerPlane extends Bullet {
	protected kb: KeyController;
	protected gc: GamepadController<PlayerPlane>;

	protected velocity = new Vector2D();

	protected readonly MAX_VELOCITY_X = 4;
	protected readonly MAX_VELOCITY_Y = 4;
	/** Rounds Per Second */
	protected readonly RPS = 7;
	protected readonly TIME_BETWEEN_SHOTS: number;

	/** Last timestamp of when player shoot */
	protected lastShot = 0;

	public bulletPool: ObjectPoolHandler<PlayerBullet, PlayerBulletProps>;

	protected controls = {
		shoot: false,
		up: false,
		down: false,
		left: false,
		right: false,
	};

	public fuel = 1;
	public lives = 9;

	public entityType = QuadEntityType.PLAYER;

	protected readonly FRAME_BEFORE_ALT = 3;
	protected fireRight = true;
	protected frameCount: number;
	protected controlMapping: [(PrimaryControls | alternateControls), string][];

	public shootFeedbackDuration = 50;

	constructor() {
		super(Texture.from('player_plane_1.png'));

		this.bulletPool = new ObjectPoolHandler<PlayerBullet, PlayerBulletProps>(20, PlayerBullet, this);

		this.TIME_BETWEEN_SHOTS = 1000 / this.RPS;
		this.frameCount = this.FRAME_BEFORE_ALT;

		this.active = true;
		this.visible = true;

		this._collisionBound.width = this.collisionBoundOffsets.width;
		this._collisionBound.height = this.collisionBoundOffsets.height;

		this.controlMapping = [
			[PrimaryControls.SHOOT, 'Shoot'],
			[PrimaryControls.UP, 'Up'],
			[PrimaryControls.DOWN, 'Down'],
			[PrimaryControls.LEFT, 'Left'],
			[PrimaryControls.RIGHT, 'Right'],
			[alternateControls.SHOOT, 'Shoot'],
			[alternateControls.UP, 'Up'],
			[alternateControls.DOWN, 'Down'],
			[alternateControls.LEFT, 'Left'],
			[alternateControls.RIGHT, 'Right'],
		];

		this.gc = new GamepadController<PlayerPlane>(this, [
			[GamepadButtons.RIGHT_BOTTOM_SHOULDER, 'Shoot'],
			[GamepadButtons.DPAD_UP, 'Up'],
			[GamepadButtons.DPAD_DOWN, 'Down'],
			[GamepadButtons.DPAD_LEFT, 'Left'],
			[GamepadButtons.DPAD_RIGHT, 'Right'],
		]);

		this.soundController = SoundController.getInstance();

		this.kb = new KeyController();
		this.initEvents();
	}

	activateShoot(): void {
		this.controls.shoot = true;
	}

	activateUp(): void {
		this.controls.up = true;
	}

	activateDown(): void {
		this.controls.down = true;
	}

	activateLeft(): void {
		this.controls.left = true;
	}

	activateRight(): void {
		this.controls.right = true;
	}

	deactivateShoot(): void {
		this.controls.shoot = false;
	}

	deactivateUp(): void {
		this.controls.up = false;
	}

	deactivateDown(): void {
		this.controls.down = false;
	}

	deactivateLeft(): void {
		this.controls.left = false;
	}

	deactivateRight(): void {
		this.controls.right = false;
	}

	/**
	 * Create keyboard bindings here
	 */
	protected initEvents(): void {
		const kb = this.kb;
		const controls = this.controls;

		kb.on("blur", () => {
			controls.shoot = false;
			controls.up = false;
			controls.down = false;
			controls.left = false;
			controls.right = false;
		});

		this.controlMapping.forEach(controlMap => {
			const keyboardKey = controlMap[0];
			const action = controlMap[1];

			kb.keydown(keyboardKey, ((this as unknown) as Record<string, () => void>)['activate' + action].bind(this));
			kb.keyup(keyboardKey, ((this as unknown) as Record<string, () => void>)['deactivate' + action].bind(this));
		});

		// When we destroy the 
		this.on('destroyed', this.stopKeyboardListening, this);
	}

	protected updateMovement(): void {
		const { up, down, left, right } = this.controls;

		if (up) {
			this.setVelocityY(-this.MAX_VELOCITY_Y);
		} else if (down) {
			this.setVelocityY(this.MAX_VELOCITY_Y);
		} else {
			this.setVelocityY(0);
		}

		if (left) {
			this.setVelocityX(-this.MAX_VELOCITY_X);
		} else if (right) {
			this.setVelocityX(this.MAX_VELOCITY_X);
		} else {
			this.setVelocityX(0);
		}
	}

	/**
	 * Shoot a bullet
	 */
	protected shoot(): void {
		const now = performance.now();

		if (now > this.lastShot) {
			this.lastShot = now + this.TIME_BETWEEN_SHOTS;

			const bullet = this.bulletPool.get();

			if (bullet) {
				let x = this.x;
				const y = this.y;

				// Alternating fire
				if (this.fireRight) {
					x += 3;
					this.soundController.playPlayerShootRight();
				} else {
					x -= 4;
					this.soundController.playPlayerShootLeft();
				}

				bullet.position.set(x, y);

				// Shake controller
				this.gc.vibrateRamped({ weakMagnitude: 0.8, strongMagnitude: 0.7 }, { weakMagnitude: 0.0, strongMagnitude: 0.0 }, this.TIME_BETWEEN_SHOTS * 0.52);
			}
		}
	}

	public stopKeyboardListening(): void {
		this.kb.destroy();
	}

	public setVelocityX(x: number): void {
		this.velocity.x = x;
	}
	public setVelocityY(y: number): void {
		this.velocity.y = y;
	}

	public update(dt: number): void {
		this.gc.update();

		if (!--this.frameCount) {
			this.fireRight = !this.fireRight;
			this.frameCount = this.FRAME_BEFORE_ALT;
		}

		this.bulletPool.update(dt);
		const { x: velX, y: velY } = this.velocity;
		this.updateMovement();

		if (this.controls.shoot) {
			this.shoot();
		}

		const halfWidth = (this.width * 0.5);

		const newX = this.x + (velX * dt);
		const newY = this.y + (velY * dt);

		const leftBound = newX - halfWidth;
		const rightBound = newX + halfWidth;
		const topBound = newY - (this.height * 0.5);
		const bottomBound = newY + (this.height * 0.5);

		if (rightBound < GAME_WIDTH && leftBound > 0) {
			this.x = newX;
		}

		if (bottomBound < GAME_HEIGHT && topBound > 0) {
			this.y = newY;
		}
	}

	public collision(): void {
		this.emit('game-over');
	}

	// protected _collisionBoundOffsets: Quadtree.Rect = {
	// 	x: 31,
	// 	y: 22,
	// 	width: 7,
	// 	height: 16,
	// };
	public collisionBoundOffsets: Quadtree.Rect = {
		x: 3,
		y: 13,
		width: 7,
		height: 16,
	};

	protected _collisionBound: Quadtree.Rect = {
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	};

	get collisionBounds(): Quadtree.Rect {
		const position = this.position;
		const _collisionBound = this._collisionBound;

		_collisionBound.x = position.x;
		_collisionBound.y = position.y;

		return _collisionBound;
	}
}