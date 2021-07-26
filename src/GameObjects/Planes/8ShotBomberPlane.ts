/**
 * Create an enemy plane
 */

import { Texture } from 'pixi.js';
import { QuadEntityType } from '../../constants';
import { Vector2D } from '../../Math/Vector2D';
import { Bullet } from '../ObjectPoolHandler';
import { BomberPlane } from './BomberPlane';

export class EightShotBomberPlane extends BomberPlane {
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