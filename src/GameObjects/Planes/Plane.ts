/**
 * Create an enemy plane
 */

import { Texture } from 'pixi.js';
import { GAME_HEIGHT, GAME_WIDTH, QuadEntityType } from '../../constants';
import { UIController } from '../../Controller';
import { Vector2D } from '../../Math/Vector2D';
import { Bullet, ObjectPoolEntity } from '../ObjectPoolHandler';

export type PlaneProps = [Texture];

export class Plane extends Bullet {
	public entityType = QuadEntityType.ENEMY_PLANE;

	protected BASE_HP = 1;
	protected hp = 1;
	protected PLAYER_BULLET_DAMAGE: number = 1;

	constructor(texture: Texture) {
		super(texture);

		this.scale.set(1, -1);

		this.setVelocity(0, 2);
		this.hp = this.BASE_HP;
	}

	public despawn(): void {
		const x = this.x;
		const y = this.y;
		const w = this.width;
		const h = this.height;
		const hw = w * 0.5;
		const hh = h * 0.5;

		// Changed the top border check so that there's more space for a plane to spawn when in a formation
		if (x + hw < 0 || x - hw > GAME_WIDTH || y - hh > GAME_HEIGHT + hh || y + hh < -(hh * 3)) {
			this.active = this.visible = false;
		}
	}

	public damage(damage: number, pointsOnDeath: number): void {
		this.hp -= damage;

		if (this.hp <= 0) {
			this.onDead(pointsOnDeath);
			this.reset();
		}
	}

	public collision(gameObject: ObjectPoolEntity): void {
		switch (gameObject.entityType) {
			case QuadEntityType.PLAYER_BULLET:
				this.damage(this.PLAYER_BULLET_DAMAGE, this.BASE_HP);
				break;
			case QuadEntityType.PLAYER:
				this.damage(1, 0);
				break;
		}
	}

	public reset(): void {
		super.reset();
		this.hp = this.BASE_HP;
	}

	protected onDead(points: number): void {
		UIController.getInstance().addToScore(points);
	}
};