import { Texture } from 'pixi.js';
import KeyController from 'keycon';
import { Vector2D } from '../../Math';
import { GAME_HEIGHT, GAME_WIDTH, QuadEntityType } from '../../constants';
import { Bullet, ObjectPoolEntity, ObjectPoolHandler, PlayerBullet, PlayerBulletProps } from '../ObjectPoolHandler';
import Quadtree from '@timohausmann/quadtree-js';

export class PlayerPlane extends Bullet {
	protected kb: KeyController;

	protected velocity = new Vector2D();

	protected readonly MAX_VELOCITY_X = 4;
	protected readonly MAX_VELOCITY_Y = 4;
	/** Rounds Per Second */
	protected readonly RPS = 7;
	protected readonly TIME_BETWEEN_SHOTS: number;

	/** Last timestamp of when player shoot */
	protected lastShot = 0;

	public bulletPool = new ObjectPoolHandler<PlayerBullet, PlayerBulletProps>(20, PlayerBullet);

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

	constructor() {
		super(Texture.from('player_plane_1.png'));

		this.kb = new KeyController();
		this.initEvents();

		this.TIME_BETWEEN_SHOTS = 1000 / this.RPS;
		this.frameCount = this.FRAME_BEFORE_ALT;

		this.active = true;
		this.visible = true;

		this._collisionBound.width = this.collisionBoundOffsets.width;
		this._collisionBound.height = this.collisionBoundOffsets.height;
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

		// Move up
		kb.keydown('n', () => {
			controls.shoot = true;
		});

		// Move up
		kb.keydown('w', () => {
			controls.up = true;
		});

		// Move down
		kb.keydown('s', () => {
			controls.down = true;
		});

		// Move left
		kb.keydown('a', () => {
			controls.left = true;
		});

		// Move right
		kb.keydown('d', () => {
			controls.right = true;
		});

		// Stop shooting
		kb.keyup('n', () => {
			controls.shoot = false;
		});

		// Stop moving up
		kb.keyup('w', () => {
			controls.up = false;
		});

		// Stop moving down
		kb.keyup('s', () => {
			controls.down = false;
		});

		// Stop moving left
		kb.keyup('a', () => {
			controls.left = false;
		});

		// Stop moving right
		kb.keyup('d', () => {
			controls.right = false;
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
				} else {
					x -= 4;
				}

				bullet.position.set(x, y);
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

	public update(deltaTime: number): void {
		if (!--this.frameCount) {
			this.fireRight = !this.fireRight;
			this.frameCount = this.FRAME_BEFORE_ALT;
		}

		this.bulletPool.update(deltaTime);
		const { x: velX, y: velY } = this.velocity;
		this.updateMovement();

		if (this.controls.shoot) {
			this.shoot();
		}

		const halfWidth = (this.width * 0.5);

		const newX = this.x + (velX * deltaTime);
		const newY = this.y + (velY * deltaTime);

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

	public collision(gameObject: ObjectPoolEntity): void {
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