/**
 * Enemy plane
 */

import { Texture } from 'pixi.js';
import { AnimationNames, GAME_HEIGHT, GAME_WIDTH, QuadEntityType } from '../../constants';
import { EventController, ShockwaveController, TweenController, UIController } from '../../Controller';
import { lerp } from '../../Utils';
import { Bullet, ObjectPoolEntity, PlayerBullet } from '../ObjectPoolHandler';

export type PlaneProps = [Texture];

export class Plane extends Bullet {
	public entityType = QuadEntityType.ENEMY_PLANE;

	protected BASE_HP = 1;
	protected hp = 1;
	protected PLAYER_BULLET_DAMAGE = 1;
	protected CRITICAL_HIT_MULTIPLIER: number;
	protected eventController: EventController;

	protected explosionRadius: number;

	constructor(texture: Texture) {
		super(texture);

		this.scale.set(1, -1);

		this.setVelocity(0, 2);
		this.hp = this.BASE_HP;
		this.CRITICAL_HIT_MULTIPLIER = 1;

		this.eventController = EventController.getInstance();
		this.explosionRadius = 300;
	}

	public despawn(): void {
		const x = this.x;
		const y = this.y;
		const w = this.width;
		const h = this.height;
		const hw = w * 0.5;
		const hh = h * 0.5;

		// Changed the top border check so that there's more space for a plane to spawn when in a formation
		if (x + hw < 0 || x - hw > GAME_WIDTH || y - hh > GAME_HEIGHT + hh || y + hh < -(hh * 8)) {
			this.active = this.visible = false;
		}
	}

	public damage(damage: number, pointsOnDeath: number, gameObject: ObjectPoolEntity): void {
		this.hp -= damage;

		if (this.hp <= 0) {
			pointsOnDeath && (this.soundController.playEnemyRandomExplode(), this.soundController.playKillConfirmed());
			pointsOnDeath && ShockwaveController.getInstance().shockwave(this.x, this.y);
			pointsOnDeath && this.eventController.emit(AnimationNames.EXPLOSION1, gameObject, { x: this.x, y: this.y }, this.explosionRadius);
			this.onDead(pointsOnDeath);
			this.reset();
		} else {
			const startColor = 0xFFFFFF;
			const endColor = 0x000000;

			const target = { c: 0 };

			TweenController.getInstance().createUpdateTween(target, { c: 0 }, { c: 1 }, 340, () => {
				const { c } = target;

				if (c < 0.5) {
					this.tint = lerp(startColor, endColor, c);
				} else {
					this.tint = lerp(endColor, startColor, c);
				}
			}, this);

			this.soundController.playEnemyHit();
		}
	}

	public collision(gameObject?: ObjectPoolEntity): void {
		if (gameObject) {
			switch (gameObject.entityType) {
				case QuadEntityType.PLAYER_BULLET:
					const collisionX = Math.abs(this.x - gameObject.x);

					if (collisionX < 5) {
						this.damage(this.PLAYER_BULLET_DAMAGE * this.CRITICAL_HIT_MULTIPLIER, this.BASE_HP, (gameObject as PlayerBullet).poolParent as ObjectPoolEntity);
					} else {
						this.damage(this.PLAYER_BULLET_DAMAGE, this.BASE_HP, (gameObject as PlayerBullet).poolParent as ObjectPoolEntity);
					}
					break;
				case QuadEntityType.PLAYER:
					this.damage(1, 0, gameObject);
					break;
			}
		}
	}

	public reset(): void {
		super.reset();
		this.hp = this.BASE_HP;
	}

	protected onDead(points: number): void {
		UIController.getInstance().addToScore(points);
	}
}