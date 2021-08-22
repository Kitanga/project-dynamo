import { Texture } from 'pixi.js';
import { AUDIO_ENEMY_SHOOT } from '../../constants';
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
	protected shootAudioName: string;

	constructor(texture: Texture) {
		super(texture);

		this.TIME_BETWEEN_SHOTS = 1000 / this.RPS;
		this.canShoot = false;

		this.bulletPool = new ObjectPoolHandler<EnemyBullet, EnemyBulletProps>(20, EnemyBullet);
		this.shootAudioName = AUDIO_ENEMY_SHOOT;
	}

	/**
	 * Shoot a bullet(s)
	 */
	protected shoot(): void {
		const now = performance.now();

		if (now > this.lastShot + this.TIME_BETWEEN_SHOTS && this.y > this.height * 0.5) {
			this.lastShot = now;

			// this.soundController.playEnemyShoot(this.shootAudioName, { volume: 0.5 });
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

	public update(dt?: number): void {
		super.update(dt);

		if (this.canShoot) {
			this.shoot();
		}
	}
}