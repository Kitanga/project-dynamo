/**
 * Create an enemy plane
 */

import { Texture } from 'pixi.js';
import { QuadEntityType } from '../../constants';
import { Vector2D } from '../../Math/Vector2D';
import { ObjectPoolEntity } from '../ObjectPoolHandler';
import { ArmedPlane } from './ArmedPlane';
import { Plane } from './Plane';

export type ShooterFighterPlaneProps = [];

export class ShooterFighterPlane extends ArmedPlane {
	protected velocity = new Vector2D();
	public active = false;
	public entityType = QuadEntityType.ENEMY_PLANE;

	/** Rounds Per Second */
	protected RPS = 1;
	protected readonly TIME_BETWEEN_SHOTS: number;

	/** Last timestamp of when player shoot */
	protected lastShot = 0;

	protected PLAYER_BULLET_DAMAGE: number = 1;

	protected chanceToShoot = 0.4;

	constructor() {
		super(Texture.from('aircraft_1e.png'));

		this.scale.set(1, -1);
		this.TIME_BETWEEN_SHOTS = 2 * 1000;

		this.setVelocity(0, 2);
		this.BASE_HP = 3;
		this.hp = this.BASE_HP;
		this.canShoot = true;
	}

	/**
	 * Shoot a bullet
	 */
	protected shoot(): void {
		const now = performance.now();

		if (now > this.lastShot + this.TIME_BETWEEN_SHOTS) {
			if (Math.random() < this.chanceToShoot) {
				this.lastShot = now;

				this.spawnBullets();
			}
		}
	}
};