import { QuadEntityType } from '../../constants';
import { Vector2D } from '../../Math/Vector2D';
import { getGraphicTexture, Graphic_List } from '../../Utils';
import { Bullet } from './';

export type PlayerBulletProps = [];

export class PlayerBullet extends Bullet {
	protected acceleration = new Vector2D(0, -0.06);
	protected baseVelocity = new Vector2D(0, -2);
	public entityType = QuadEntityType.PLAYER_BULLET;
	
	constructor() {
		super(getGraphicTexture(Graphic_List.BULLET));

		this.reset();
	}

	public despawn(): void {
		const y = this.y;
		const hh = this.height * 0.5;

		if (y + hh < 0) {
			this.active = this.visible = false;
			this.reset();
		}
	}

	protected updateMovement(dt: number): void {
		const velocity = this.velocity;
		const acceleration = this.acceleration;
		const velY = velocity.y + (acceleration.y * dt);
		velocity.y = Math.min(velY, -8);
		this.y += velY * dt;

		const offset = Math.round(Math.random() * 1);
		this.x += Math.random() > 0.5 ? offset : -offset;
	}

	public reset(): void {
		super.reset();
		this.velocity.setFromObject(this.baseVelocity);
	}
}