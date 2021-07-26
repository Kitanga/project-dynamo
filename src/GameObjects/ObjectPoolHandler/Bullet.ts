import { Sprite, Texture } from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH, QuadEntityType } from '../../constants';
import { Vector2D } from '../../Math/Vector2D';
import { getGraphicTexture, Graphic_List } from '../../Utils';
import { ObjectPoolEntity } from './ObjectPoolEntity';

export type BulletProps = [Texture];

/**
 * Represents a gameObject that can be spawned onto the screen and usually moves in one direction.
 */
export class Bullet extends Sprite implements ObjectPoolEntity {
	protected velocity = new Vector2D();
	public active = false;
	public entityType = QuadEntityType.PLAYER_BULLET;

	constructor(texture: Texture) {
		super(texture);

		this.anchor.set(0.5);
		this.visible = false;
		this.active = false;
	}

	public setVelocity(x: number, y: number): void {
		this.velocity.set(x, y);
	}

	public update(dt: number): void {
		if (this.active) {
			this.despawn();
			this.active && this.updateMovement(dt);
		}
	}

	public despawn(): void {
		const x = this.x;
		const y = this.y;
		const w = this.width;
		const h = this.height;
		const hw = w * 0.5;
		const hh = h * 0.5;

		if (x + hw < 0 || x - hw > GAME_WIDTH || y - hh > GAME_HEIGHT + hh || y + hh < -hh) {
			this.reset();
		}
	}

	protected updateMovement(dt: number): void {
		this.x += this.velocity.x * dt;
		this.y += this.velocity.y * dt;
	}

	public reset(): void {
		this.visible = false;
		this.active = false;
	}

	public collision(gameObject: ObjectPoolEntity): void {
		this.reset();
	}

	public limitVelocity(limit: number): void {
		this.velocity.limit(limit);
	}
}
