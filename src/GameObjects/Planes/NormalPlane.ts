/**
 * Create an enemy plane
 */

import { Texture } from 'pixi.js';
import { QuadEntityType } from '../../constants';
import { Vector2D } from '../../Math/Vector2D';
import { Plane } from './Plane';

export type NormalPlaneProps = [];

export class NormalPlane extends Plane {
	protected velocity = new Vector2D();
	public active = false;
	public entityType = QuadEntityType.ENEMY_PLANE;

	protected readonly MAX_VELOCITY_X = 4;
	protected readonly MAX_VELOCITY_Y = 4;
	/** Rounds Per Second */
	protected readonly RPS = 1;
	protected readonly TIME_BETWEEN_SHOTS: number;

	/** Last timestamp of when player shoot */
	protected lastShot = 0;

	protected PLAYER_BULLET_DAMAGE = 1;

	constructor() {
		super(Texture.from('aircraft_1.png'));

		this.scale.set(1, -1);
		this.TIME_BETWEEN_SHOTS = 1000 / this.RPS;

		this.setVelocity(0, 2);
		this.BASE_HP = 1;
		this.hp = this.BASE_HP;
	}
}