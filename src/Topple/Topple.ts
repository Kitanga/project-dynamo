import Quadtree from '@timohausmann/quadtree-js';
import { ObjectPoolEntity } from '../GameObjects/ObjectPoolHandler';
import { GAME_WIDTH, GAME_HEIGHT, QuadEntityType } from './../constants';
import { boxBox } from 'intersects';
import { PlayerPlane } from '../GameObjects/Planes';

export class Topple {
	protected retrievalPoints: ObjectPoolEntity[] = [];
	protected pool: ObjectPoolEntity[] = [];

	protected quadTree: Quadtree = new Quadtree({
		x: 0,
		y: 0,
		width: GAME_WIDTH,
		height: GAME_HEIGHT,
	});

	registerRetrievalPoints(targets: ObjectPoolEntity) {
		this.retrievalPoints.push(targets);
	}

	addToPool(entities: ObjectPoolEntity[]): void {
		this.pool.push(...entities);
	}

	update(dt: number): void {
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
					let rtv = retrievalPoint as PlayerPlane;
					let cld = collidable as PlayerPlane;

					let rtvCollisionBox;
					let rtvXOffset;
					let rtvYOffset;
					
					let cldCollisionBox;
					let cldXOffset;
					let cldYOffset;
					
					if (!!rtv.collisionBounds) {
						rtvCollisionBox = rtv.collisionBounds;
						const rtvCollisionBoundOffsets = rtv.collisionBoundOffsets;
						rtvXOffset = rtvCollisionBoundOffsets.x;
						rtvYOffset = rtvCollisionBoundOffsets.y;
					} else {
						rtvCollisionBox = rtv;
						rtvXOffset = rtv.anchor.x * rtv.width;
						rtvYOffset = rtv.anchor.y * rtv.height;
					}

					if (!!cld.collisionBounds) {
						cldCollisionBox = cld.collisionBounds;
						const cldCollisionBoundOffsets = cld.collisionBoundOffsets;
						cldXOffset = cldCollisionBoundOffsets.x;
						cldYOffset = cldCollisionBoundOffsets.y;
					} else {
						cldCollisionBox = cld;
						cldXOffset = cld.anchor.x * cld.width;
						cldYOffset = cld.anchor.y * cld.height;
					}

					if (cld.active && boxBox(rtvCollisionBox.x - rtvXOffset, rtvCollisionBox.y - rtvYOffset, rtvCollisionBox.width, rtvCollisionBox.height, cldCollisionBox.x - cldXOffset, cldCollisionBox.y - cldYOffset, cldCollisionBox.width, cldCollisionBox.height)) {
						cld.collision && cld?.collision(rtv);
						rtv.collision && rtv?.collision(cld);
					}
				});
			}
		});
	}
}