/**
 * Create an enemy plane
 */

import { Texture } from 'pixi.js';
import { BomberPlane } from './BomberPlane';

export class FourShotBomberPlane extends BomberPlane {
	constructor() {
		super(Texture.from('aircraft_2d.png'));
	}
};