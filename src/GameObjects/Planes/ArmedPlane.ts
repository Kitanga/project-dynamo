import { Texture } from 'pixi.js';
import { Bullet, EnemyBullet, EnemyBulletProps, ObjectPoolHandler } from '../ObjectPoolHandler';
import { Plane } from './Plane';

export class ArmedPlane extends Plane {
	/** Rounds Per Second */
	protected RPS = 1;
	protected TIME_BETWEEN_SHOTS: number;

	/** Last timestamp of when player shoot */
	protected lastShot = 0;

	public bulletPool: ObjectPoolHandler<EnemyBullet, EnemyBulletProps>;
	protected canShoot;

	constructor(texture: Texture) {
		super(texture);

		this.TIME_BETWEEN_SHOTS = 1000 / this.RPS;
		this.canShoot = false;

		this.bulletPool = new ObjectPoolHandler<EnemyBullet, EnemyBulletProps>(20, EnemyBullet);
	}

	/**
	 * Shoot a bullet(s)
	 */
	protected shoot(): void {
		const now = performance.now();

		if (now > this.lastShot + this.TIME_BETWEEN_SHOTS) {
			this.lastShot = now;

			this.spawnBullets();
		}
	}

	protected spawnBullets(): Bullet[] {
		const bullets: Bullet[] = [];

		const bullet = this.bulletPool.get();

		if (bullet) {
			bullets.push(bullet);
			bullet.position.set(this.x, this.y);
		}

		return bullets;
	}

	public update(dt: number): void {
		super.update(dt);

		if (this.canShoot) {
			this.shoot();
		}
	}
}