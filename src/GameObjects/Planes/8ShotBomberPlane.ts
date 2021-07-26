/**
 * Create an enemy plane
 */

import { Texture } from 'pixi.js';
import { QuadEntityType } from '../../constants';
import { Vector2D } from '../../Math/Vector2D';
import { Bullet } from '../ObjectPoolHandler';
import { ArmedPlane } from './ArmedPlane';

export class EightShotBomberPlane extends ArmedPlane {
	protected bulletSpeed = 2.9;

	protected velocity = new Vector2D();
	public active = false;
	public entityType = QuadEntityType.ENEMY_PLANE;

	/** Rounds Per Second */
	protected RPS = 1;
	protected TIME_BETWEEN_SHOTS: number;

	/** Last timestamp of when player shoot */
	protected lastShot = 0;

	protected PLAYER_BULLET_DAMAGE: number = 1;

	constructor() {
		super(Texture.from('aircraft_3e.png'));

		this.scale.set(1, -1);
		this.TIME_BETWEEN_SHOTS = 2000;

		this.setVelocity(0, 1.6);
		this.BASE_HP = 9;
		this.hp = this.BASE_HP;
		this.canShoot = true;
	}

	protected spawnBullets(): Bullet[] {
		const bullets: Bullet[] = [];
		const bulletSpeed = this.bulletSpeed;

		for (let x = -1; x < 2; x++) {
			for (let y = -1; y < 2; y++) {
				// Not the central block
				if (!(x == 0 && y == 0)) {
					console.log(x, y);
					const bullet = this.bulletPool.get();

					if (bullet) {
						bullets.push(bullet);
						bullet.position.set(this.x, this.y);
						bullet.setVelocity(x * bulletSpeed, y * bulletSpeed);
						bullet.limitVelocity(2.9);
					}
				}
			}
		}

		return bullets;
	}
};