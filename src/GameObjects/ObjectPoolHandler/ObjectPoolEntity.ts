import Quadtree from '@timohausmann/quadtree-js';
import { QuadEntityType } from '../../constants';

export interface ObjectPoolEntity extends Quadtree.Rect {
	active: boolean;
	visible: boolean;
	collisionBounds?: Quadtree.Rect;
	entityType: QuadEntityType;
	update: (...props: any[]) => void;
	collision?: (object: ObjectPoolEntity) => void;
}