import { Sprite, Texture } from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH, QuadEntityType } from '../../constants';
import { Vector2D } from '../../Math/Vector2D';
import { getGraphicTexture, Graphic_List } from '../../Utils';
import { Bullet } from './Bullet';

export type EnemyBulletProps = [];

/**
 * Represents a gameObject that can be spawned onto the screen and usually moves in one direction.
 */
export class EnemyBullet extends Bullet {
	protected velocity = new Vector2D();
	public active = false;
	public entityType = QuadEntityType.ENEMY_BULLET;

	protected TIME_BETWEEN_SHOTS: number;
	
	constructor() {
		super(getGraphicTexture(Graphic_List.ENEMY_BULLET));

		this.anchor.set(0.5);
		// N.B. yes, I should use reset here, it's just that I had an issue with the Bullet class at some point.
		// Reset wouldn't work.
		// This was when I was setting up PlayerBullet, for some reason reset couldn't get the reference for the baseVelocity prop.
		// Should have probably initialized it in the constructor instead of when I'm creating it.
		// For now though I'll just leave this unrolled here.
		this.visible = false;
		this.active = false;
		this.setVelocity(0, 2.9);

		this.TIME_BETWEEN_SHOTS = 1500;
	}

	public reset(): void {
		super.reset();
		this.setVelocity(0, 2.9);
	}
}
