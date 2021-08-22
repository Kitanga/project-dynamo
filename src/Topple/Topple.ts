import Quadtree from '@timohausmann/quadtree-js';
import { boxBox } from 'intersects';
import { Sprite } from 'pixi.js';
import { ObjectPoolEntity } from '../GameObjects/ObjectPoolHandler';
import { GAME_HEIGHT, GAME_WIDTH } from './../constants';

export class Topple<T extends ObjectPoolEntity>{
	protected retrievalPoints: ObjectPoolEntity[] = [];
	protected pool: ObjectPoolEntity[] = [];
	protected shouldUpdate = true;

	protected quadTree: Quadtree = new Quadtree({
		x: 0,
		y: 0,
		width: GAME_WIDTH,
		height: GAME_HEIGHT,
	});

	public registerRetrievalPoints(targets: ObjectPoolEntity): void {
		this.retrievalPoints.push(targets);
	}

	public addToPool(entities: T[]): void {
		this.pool.push(...entities);
	}

	public update(): void {
		if (this?.shouldUpdate) {
			// Clear the quad tree
			this.quadTree.clear();

			// Place the pool into the quad tree
			this.pool.forEach(entity => {
				this.quadTree.insert(entity);
			});

			// Check if the retrieval points collide with any of the points near them
			this.retrievalPoints.forEach((retrievalPoint) => {
				if (retrievalPoint.active) {
					const collidables = this.quadTree.retrieve(retrievalPoint) as [ObjectPoolEntity];

					collidables.forEach((collidable) => {
						const rtv = retrievalPoint as (ObjectPoolEntity);
						const cld = collidable as (ObjectPoolEntity);

						let rtvCollisionBox;
						let rtvXOffset;
						let rtvYOffset;

						let cldCollisionBox;
						let cldXOffset;
						let cldYOffset;

						// The next if statements check if the retrieval point and/or the collidable have custom collision bounds
						if (!!rtv.collisionBounds) {
							rtvCollisionBox = rtv.collisionBounds;
							const rtvCollisionBoundOffsets = rtv.collisionBoundOffsets as Quadtree.Rect;
							rtvXOffset = rtvCollisionBoundOffsets.x;
							rtvYOffset = rtvCollisionBoundOffsets.y;
						} else {
							rtvCollisionBox = rtv;
							rtvXOffset = ((rtv as unknown) as Sprite).anchor.x * rtv.width;
							rtvYOffset = ((rtv as unknown) as Sprite).anchor.y * rtv.height;
						}

						if (!!cld.collisionBounds) {
							cldCollisionBox = cld.collisionBounds;
							const cldCollisionBoundOffsets = cld.collisionBoundOffsets as Quadtree.Rect;
							cldXOffset = cldCollisionBoundOffsets.x;
							cldYOffset = cldCollisionBoundOffsets.y;
						} else {
							cldCollisionBox = cld;
							cldXOffset = ((cld as unknown) as Sprite).anchor.x * cld.width;
							cldYOffset = ((cld as unknown) as Sprite).anchor.y * cld.height;
						}

						// Check if the two objects can collide, if so run their collision method
						if (cld.active && boxBox(rtvCollisionBox.x - rtvXOffset, rtvCollisionBox.y - rtvYOffset, rtvCollisionBox.width, rtvCollisionBox.height, cldCollisionBox.x - cldXOffset, cldCollisionBox.y - cldYOffset, cldCollisionBox.width, cldCollisionBox.height)) {
							cld.collision && cld?.collision(rtv);
							rtv.collision && rtv?.collision(cld);
						}
					});
				}
			});
		}
	}

	public destroy(): void {
		this.shouldUpdate = false;
	}
}