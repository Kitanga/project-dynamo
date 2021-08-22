//  Adapted from [Phaser 3's Vector2 class](https://github.com/photonstorm/phaser/blob/v3.51.0/src/math/Vector2.js) by Photomstorm
//  and [vecmath](https://github.com/mattdesl/vecmath) by mattdesl
//  Made a few augmentations here and there

type Vector2DLike = { x: number, y: number };

/**
 * A representation of a vector in 2D space.
 *
 * A two-component vector.
 *
 * @class Vector2D
 * @constructor
 */
export class Vector2D {
	/**
	 * The x component of this Vector.
	 */
	x = 0;
	/**
	 * The y component of this Vector.
	 */
	y = 0;

	constructor(x?: number | Vector2DLike, y?: number) {
		this.x = 0;
		this.y = 0;

		if (typeof x === 'object') {
			this.x = x.x || 0;
			this.y = x.y || 0;
		}
		else {
			if (y === undefined) { y = x; }

			this.x = x || 0;
			this.y = y || 0;
		}
	}

	/**
	 * Make a clone of this Vector2.
	 */
	clone(): Vector2D {
		return new Vector2D(this.x, this.y);
	}

	/**
	 * Copy the components of a given Vector into this Vector.
	 * 
	 */
	copy(src: Vector2D): Vector2D {
		this.x = src.x || 0;
		this.y = src.y || 0;

		return this;
	}

	/**
	 * Set the component values of this Vector from a given Vector2Like object.
	 */
	setFromObject(obj: Vector2DLike): Vector2D {
		this.x = obj.x || 0;
		this.y = obj.y || 0;

		return this;
	}

	/**
	 * Set the `x` and `y` components of the this Vector to the given `x` and `y` values.
	 */
	set(x: number, y = x): Vector2D {
		if (y === undefined) { y = x; }

		this.x = x;
		this.y = y;

		return this;
	}

	/**
	 * This method is an alias for `Vector2.set`.
	 */
	setTo(x: number, y = x): Vector2D {
		return this.set(x, y);
	}

	/**
	 * Sets the `x` and `y` values of this object from a given polar coordinate.
	 */
	setToPolar(azimuth: number, radius: number): Vector2D {
		if (radius == null) { radius = 1; }

		this.x = Math.cos(azimuth) * radius;
		this.y = Math.sin(azimuth) * radius;

		return this;
	}

	/**
	 * Check whether this Vector is equal to a given Vector.
	 *
	 * Performs a strict equality check against each Vector's components.
	 */
	equals(v: Vector2D): boolean {
		return ((this.x === v.x) && (this.y === v.y));
	}

	/**
	 * Calculate the angle between this Vector and the positive x-axis, in radians.
	 */
	angle(): number {
		// computes the angle in radians with respect to the positive x-axis

		let angle = Math.atan2(this.y, this.x);

		if (angle < 0) {
			angle += 2 * Math.PI;
		}

		return angle;
	}

	/**
	 * Set the angle of this Vector.
	 */
	setAngle(angle: number): Vector2D {
		return this.setToPolar(angle, this.length());
	}

	/**
	 * Add a given Vector to this Vector. Addition is component-wise.
	 */
	add(src: Vector2D): Vector2D {
		this.x += src.x;
		this.y += src.y;

		return this;
	}

	/**
	 * Subtract the given Vector from this Vector. Subtraction is component-wise.
	 */
	subtract(src: Vector2D): Vector2D {
		this.x -= src.x;
		this.y -= src.y;

		return this;
	}

	/**
	 * Perform a component-wise multiplication between this Vector and the given Vector.
	 *
	 * Multiplies this Vector by the given Vector.
	 */
	multiply(src: Vector2D): Vector2D {
		this.x *= src.x;
		this.y *= src.y;

		return this;
	}

	/**
	 * Scale this Vector by the given value.
	 */
	scale(value: number): Vector2D {
		if (isFinite(value)) {
			this.x *= value;
			this.y *= value;
		}
		else {
			this.x = 0;
			this.y = 0;
		}

		return this;
	}

	/**
	 * Perform a component-wise division between this Vector and the given Vector.
	 *
	 * Divides this Vector by the given Vector.
	 */
	divide(src: Vector2D): Vector2D {
		this.x /= src.x;
		this.y /= src.y;

		return this;
	}

	/**
	 * Negate the `x` and `y` components of this Vector.
	 */
	negate(): Vector2D {
		this.x = -this.x;
		this.y = -this.y;

		return this;
	}

	/**
	 * Calculate the distance between this Vector and the given Vector.
	 */
	distance(src: Vector2D): number {
		return Vector2D.distance(src, this);
	}

	public static distance(vA: Vector2D, vB: Vector2D): number {
		const dx = vA.x - vB.x;
		const dy = vA.y - vB.y;

		return Math.sqrt(dx * dx + dy * dy);
	}

	/**
	 * Calculate the distance between this Vector and the given Vector, squared.
	 */
	distanceSq(src: Vector2D): number {
		const dx = src.x - this.x;
		const dy = src.y - this.y;

		return dx * dx + dy * dy;
	}

	/**
	 * Calculate the length (or magnitude) of this Vector.
	 */
	length(): number {
		const x = this.x;
		const y = this.y;

		return Math.sqrt(x * x + y * y);
	}

	/**
	 * Set the length (or magnitude) of this Vector.
	 */
	setLength(length: number): Vector2D {
		return this.normalize().scale(length);
	}

	/**
	 * Calculate the length of this Vector squared.
	 */
	lengthSq(): number {
		const x = this.x;
		const y = this.y;

		return x * x + y * y;
	}

	/**
	 * Normalize this Vector.
	 *
	 * Makes the vector a unit length vector (magnitude of 1) in the same direction.
	 */
	normalize(): Vector2D {
		const x = this.x;
		const y = this.y;
		let len = x * x + y * y;

		if (len > 0) {
			len = 1 / Math.sqrt(len);

			this.x = x * len;
			this.y = y * len;
		}

		return this;
	}

	/**
	 * Rotate this Vector to its perpendicular, in the positive direction.
	 */
	normalizeRightHand(): Vector2D {
		const x = this.x;

		this.x = this.y * -1;
		this.y = x;

		return this;
	}

	/**
	 * Rotate this Vector to its perpendicular, in the negative direction.
	 */
	normalizeLeftHand(): Vector2D {
		const x = this.x;

		this.x = this.y;
		this.y = x * -1;

		return this;
	}

	/**
	 * Calculate the dot product of this Vector and the given Vector.
	 */
	dot(src: Vector2D): number {
		return this.x * src.x + this.y * src.y;
	}

	/**
	 * Calculate the cross product of this Vector and the given Vector.
	 */
	cross(src: Vector2D): number {
		return this.x * src.y - this.y * src.x;
	}

	/**
	 * Linearly interpolate between this Vector and the given Vector.
	 *
	 * Interpolates this Vector towards the given Vector.
	 */
	lerp(src: Vector2D, t: number): Vector2D {
		if (t === undefined) { t = 0; }

		const ax = this.x;
		const ay = this.y;

		this.x = ax + t * (src.x - ax);
		this.y = ay + t * (src.y - ay);

		return this;
	}

	/**
	 * Make this Vector the zero vector (0, 0).
	 */
	reset(): Vector2D {
		this.x = 0;
		this.y = 0;

		return this;
	}

	/**
	 * Limit the length (or magnitude) of this Vector.
	 */
	limit(max: number): Vector2D {
		const len = this.length();

		if (len && len > max) {
			this.scale(max / len);
		}

		return this;
	}

	/**
	 * Reflect this Vector off a line defined by a normal.
	 */
	reflect(normal: Vector2D): Vector2D {
		normal = normal.clone().normalize();

		return this.subtract(normal.scale(2 * this.dot(normal)));
	}

	/**
	 * Reflect this Vector across another.
	 */
	mirror(axis: Vector2D): Vector2D {
		return this.reflect(axis).negate();
	}

	/**
	 * Rotate this Vector by an angle amount.
	 */
	rotate(delta: number): Vector2D {
		const cos = Math.cos(delta);
		const sin = Math.sin(delta);

		return this.set(cos * this.x - sin * this.y, sin * this.x + cos * this.y);
	}

	public static ZERO: Vector2D;
	public static RIGHT: Vector2D;
	public static LEFT: Vector2D;
	public static UP: Vector2D;
	public static DOWN: Vector2D;
	public static ONE: Vector2D;
}


/**
 * A static zero Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 */
Vector2D.ZERO = new Vector2D();

/**
 * A static right Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 */
Vector2D.RIGHT = new Vector2D(1, 0);

/**
 * A static left Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 */
Vector2D.LEFT = new Vector2D(-1, 0);

/**
 * A static up Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 */
Vector2D.UP = new Vector2D(0, -1);

/**
 * A static down Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 */
Vector2D.DOWN = new Vector2D(0, 1);

/**
 * A static one Vector2 for use by reference.
 *
 * This constant is meant for comparison operations and should not be modified directly.
 */
Vector2D.ONE = new Vector2D(1, 1);