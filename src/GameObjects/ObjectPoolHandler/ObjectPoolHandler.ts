import { Application } from 'pixi.js';
import { getApp } from '../../Utils/get-app';
import { ObjectPoolEntity } from './ObjectPoolEntity';

/**
 * Inspired by this article on making shmups: https://blog.sklambert.com/html5-canvas-game-the-player-ship/
 */
export class ObjectPoolHandler<PoolEntity extends ObjectPoolEntity, PoolEntityProps extends any[]>{
	// This is public for performance reasons
	public pool: PoolEntity[] = [];
	protected size = 0;
	protected entityClass: { new (...props: PoolEntityProps): PoolEntity };
	protected entityProps: PoolEntityProps;
	protected app: Application;

	constructor(size: number, entityClass: { new (...props: PoolEntityProps): PoolEntity }, ...entityProps: PoolEntityProps) {
		this.size = size;
		this.entityClass = entityClass;
		this.entityProps = entityProps;
		
		this.app = getApp();
		this.initPool();
	}

	protected initPool(): void {
		const { size, entityClass, entityProps } = this;
		const pool = this.pool = new Array(size);

		for (let ix = 0; ix < size; ix++) {
			pool[ix] = new entityClass(...entityProps);

			this.app.stage.addChild(pool[ix]);
		}
	}

	public get(): PoolEntity | undefined {
		const pool = this.pool;
		const entity = pool[0];

		if (!entity.active) {
			pool.push(pool.shift() as PoolEntity);
			entity.active = true;
			entity.visible = true;
			return entity;
		}
	}

	public update(dt: number): void {
		const pool = this.pool;
		for (let ix = 0, size = this.size; ix < size; ix++) {
			const entity = pool[ix];
			
			if (entity.active) {
				entity.update(dt);
				if (!entity.active) {
					pool.push(pool.splice(ix, 1)[0]);
				}
			}
		}
	}
}