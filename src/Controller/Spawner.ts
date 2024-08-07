import { GAME_WIDTH } from '../constants';
import { EnemyBullet, EnemyBulletProps, ObjectPoolHandler } from '../GameObjects/ObjectPoolHandler';
import { ArmedPlane, BomberPlaneProps, EightShotBomberPlane, FourShotBomberPlane, Plane, PlayerPlane, ShooterFighterPlane, ShooterFighterPlaneProps } from '../GameObjects/Planes';
import { NormalPlane, NormalPlaneProps } from '../GameObjects/Planes/NormalPlane';
import { lerp, random } from '../Utils';

enum ENEMY_TYPE {
	FIGHTER = 1,
	SHOOTING_FIGHTER,
	EIGHT_SHOT_BOMBERS,
	FOUR_SHOT_BOMBERS
}

const f = ENEMY_TYPE.FIGHTER;
const s = ENEMY_TYPE.SHOOTING_FIGHTER;
const b = ENEMY_TYPE.FOUR_SHOT_BOMBERS;
const B = ENEMY_TYPE.EIGHT_SHOT_BOMBERS;

export class Spawner {

	protected gameStarted: number;

	public readonly bulletPool = new ObjectPoolHandler<EnemyBullet, EnemyBulletProps>(200, EnemyBullet);
	public readonly fighterPool = new ObjectPoolHandler<NormalPlane, NormalPlaneProps>(30, NormalPlane);
	public readonly shootingFightersPool = new ObjectPoolHandler<ShooterFighterPlane, ShooterFighterPlaneProps>(30, ShooterFighterPlane);
	public readonly fourShotBomberPool = new ObjectPoolHandler<FourShotBomberPlane, BomberPlaneProps>(40, FourShotBomberPlane);
	public readonly eightShotBomberPool = new ObjectPoolHandler<EightShotBomberPlane, BomberPlaneProps>(40, EightShotBomberPlane);
	// public readonly battleshipPool = new ObjectPoolHandler<NormalPlane, any[]>(3, NormalPlane);
	// public readonly carrierPool = new ObjectPoolHandler<NormalPlane, any[]>(3, NormalPlane);

	protected formations = [
		[
			[0, 0, 0],
			[f, 0, f],
			[0, f, 0],
		],
		[
			[f, 0, f],
			[0, 0, 0],
			[0, f, 0],
		],
		[
			[b, 0, 0, 0],
			[0, b, 0, b],
			[0, 0, b, 0],
		],
		[
			[0, 0, 0, b],
			[b, 0, b, 0],
			[0, b, 0, 0],
		],
		// Shooting variants
		[
			[0, 0, 0],
			[s, 0, s],
			[0, s, 0],
		],
		[
			[s, 0, s],
			[0, 0, 0],
			[0, s, 0],
		],
		[
			[0, 0, 0],
			[b, 0, b],
			[0, b, 0],
		],
		[
			[b, 0, b],
			[0, 0, 0],
			[0, b, 0],
		],
		[
			[0, 0, 0],
			[B, 0, B],
			[0, B, 0],
		],
		[
			[B, 0, B],
			[0, 0, 0],
			[0, B, 0],
		],
		[
			[B, 0, 0, 0],
			[0, B, 0, B],
			[0, 0, B, 0],
		],
		[
			[0, 0, 0, B],
			[B, 0, B, 0],
			[0, B, 0, 0],
		],
		[
			[0, 0, 0],
			[B, 0, B],
			[0, B, 0],
		],
		[
			[B, 0, B],
			[0, 0, 0],
			[0, B, 0],
		],
	];

	protected mixedFormation = [
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, b, 0, b, 0, 0, 0],
			[0, 0, b, 0, b, 0, b],
			[f, 0, f, 0, f, b, 0],
			[0, f, 0, f, 0, 0, 0],
		],
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, b, 0, b, 0, 0, 0],
			[0, 0, b, 0, b, 0, b],
			[f, 0, 0, 0, 0, b, 0],
			[0, f, 0, 0, 0, 0, 0],
		],
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, b, 0, b, 0, 0, 0],
			[0, 0, b, 0, b, 0, b],
			[f, 0, f, 0, f, b, 0],
			[0, f, 0, f, 0, 0, 0],
		],

		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, b, 0, b, 0, 0, 0],
			[0, 0, b, 0, b, 0, b],
			[s, 0, s, 0, s, b, 0],
			[0, s, 0, s, 0, 0, 0],
		],
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, b, 0, b, 0, 0, 0],
			[0, 0, b, 0, b, 0, b],
			[s, 0, 0, 0, 0, b, 0],
			[0, s, 0, 0, 0, 0, 0],
		],
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, b, 0, b, 0, 0, 0],
			[0, 0, b, 0, b, 0, b],
			[s, 0, s, 0, s, b, 0],
			[0, s, 0, s, 0, 0, 0],
		],
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, B, 0, B, 0, 0, 0],
			[0, 0, B, 0, B, 0, B],
			[f, 0, f, 0, f, B, 0],
			[0, f, 0, f, 0, 0, 0],
		],
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, B, 0, B, 0, 0, 0],
			[0, 0, B, 0, B, 0, B],
			[f, 0, 0, 0, 0, B, 0],
			[0, f, 0, 0, 0, 0, 0],
		],
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, B, 0, B, 0, 0, 0],
			[0, 0, B, 0, B, 0, B],
			[f, 0, f, 0, f, B, 0],
			[0, f, 0, f, 0, 0, 0],
		],

		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, B, 0, B, 0, 0, 0],
			[0, 0, B, 0, B, 0, B],
			[s, 0, s, 0, s, B, 0],
			[0, s, 0, s, 0, 0, 0],
		],
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, B, 0, B, 0, 0, 0],
			[0, 0, B, 0, B, 0, B],
			[s, 0, 0, 0, 0, B, 0],
			[0, s, 0, 0, 0, 0, 0],
		],
		[
			[0, 0, 0, 0, 0, 0, 0],
			[0, B, 0, B, 0, 0, 0],
			[0, 0, B, 0, B, 0, B],
			[s, 0, s, 0, s, B, 0],
			[0, s, 0, s, 0, 0, 0],
		],
	];

	protected timedActions: number[] = [];

	/** A list that holds the number of miliseconds until a spawn function can added to the spawn queue, the number of milliseconds between each spawn, and the spawn function */
	protected readonly spawnOrder: [number, number, () => (Plane | Plane[] | undefined)][] = [
		[0, 3000, this.spawnNoneFormationFighter.bind(this)],
		[4000, 3000, this.spawnNoneFormationShooterFighter.bind(this)],
		// [8000, 3000, this.spawnFormationFighter.bind(this)],
		// [8000, 3000, this.spawnFormationBomber.bind(this)],
		[16000, 3000, this.spawnMixedFormation.bind(this)],
	];

	protected shouldUpdate = true;

	constructor(protected player: PlayerPlane) {
		this.gameStarted = performance.now();

		this.applyBulletPoolTo<ObjectPoolHandler<ArmedPlane, ShooterFighterPlaneProps>>(this.shootingFightersPool);
		this.applyBulletPoolTo<ObjectPoolHandler<ArmedPlane, BomberPlaneProps>>(this.fourShotBomberPool);
		this.applyBulletPoolTo<ObjectPoolHandler<ArmedPlane, BomberPlaneProps>>(this.eightShotBomberPool);
		this.init();
	}

	protected applyBulletPoolTo<ObjectPool extends { pool: { bulletPool: ObjectPoolHandler<EnemyBullet, EnemyBulletProps> }[]; }>(objectPool: ObjectPool): void {
		objectPool.pool.forEach(entity => {
			entity.bulletPool = this.bulletPool;
		});
	}

	protected init(): void {
		this.spawnOrder.forEach(order => {
			const timeToSpawnStart = order[0];
			const timeBetweenSpawns = order[1];
			const spawnCallback = order[2];

			this.timedActions.push(window.setTimeout(() => {
				spawnCallback();
				this.timedActions.push(window.setInterval(spawnCallback, timeBetweenSpawns));
			}, timeToSpawnStart));
		});
	}

	/**
	 * Spawn a fighter randomly across the top border
	 */
	protected spawnNoneFormationFighter(): Plane | undefined {
		const fighter = this.fighterPool.get();

		if (fighter) {
			this.spawnSingleUnit(fighter);

			Math.random() > 0.6 && fighter.setVelocity(0, 2.8);

			return fighter;
		}
	}

	protected spawnNoneFormationShooterFighter(): Plane | undefined {
		const fighter = this.shootingFightersPool.get();

		if (fighter) {
			return this.spawnSingleUnit(fighter);
		}
	}

	protected spawnSingleUnit(plane: Plane): Plane {
		plane.y = -plane.height * 0.5;
		const halfW = plane.width * 0.5;
		plane.x = random(halfW, GAME_WIDTH - halfW);

		plane.x = lerp(plane.x, this.player.x, random(0, 1));

		return plane;
	}

	protected spawnMixedFormation(): Plane[] | undefined {
		const formationVariant = Math.random() > 0.5 ? this.formations : this.mixedFormation;

		const formation = formationVariant[Math.floor(Math.random() * formationVariant.length)];

		const planes: Plane[] = this.spawnFormation(formation);

		return planes;
	}

	private consoleFormation(formation: number[][]): void {
		console.log('Formation:', formation);
		formation.forEach(row => console.log(row.toString()));
		console.log('====');
	}

	protected spawnFormationFighter(): Plane[] | undefined {
		const formations = this.getFormationByType(ENEMY_TYPE.SHOOTING_FIGHTER, this.formations);

		const formation = formations[Math.floor(Math.random() * formations.length)];

		const planes: Plane[] = this.spawnFormation(formation);

		return planes;
	}

	protected spawnFormationBomber(): Plane[] | undefined {
		const formations = this.getFormationByType(ENEMY_TYPE.FOUR_SHOT_BOMBERS, this.formations);

		const formation = formations[Math.floor(Math.random() * formations.length)];

		const planes: Plane[] = this.spawnFormation(formation);

		return planes;
	}

	protected getFormationByType(type: ENEMY_TYPE, formations: number[][][]): number[][][] {
		const matches: number[][][] = [];

		formations.forEach(formation => {
			for (let ix = 0, length = formation.length; ix < length; ix++) {
				const row = formation[ix];

				if (row.includes(type)) {
					matches.push(formation);
					break;
				}
			}
		});

		return matches;
	}

	protected spawnFormation(formation: number[][]): Plane[] {
		const fighterPool = this.fighterPool;
		const shootingFightersPool = this.shootingFightersPool;
		const fourShotBomberPool = this.fourShotBomberPool;
		const eightShotBomberPool = this.eightShotBomberPool;

		const planes: Plane[] = [];

		// Values needed when spawning new planes
		const basePlane = fourShotBomberPool.pool[0];
		const halfWidth = basePlane.width * 0.5;
		const halfHeight = basePlane.height * 0.5;
		const xOffset = random(halfWidth, GAME_WIDTH - (halfWidth * formation[0].length));
		const yOffset = halfHeight * formation.length + 1;

		for (let y = 0, length = formation.length; y < length; y++) {
			const row = formation[y];
			for (let x = 0, rowLength = row.length; x < rowLength; x++) {
				const type = row[x];

				let possiblePlane;

				switch (type) {
					case ENEMY_TYPE.FIGHTER:
						possiblePlane = fighterPool.get();
						break;
					case ENEMY_TYPE.SHOOTING_FIGHTER:
						possiblePlane = shootingFightersPool.get();
						break;
					case ENEMY_TYPE.FOUR_SHOT_BOMBERS:
						possiblePlane = fourShotBomberPool.get();
						break;
					case ENEMY_TYPE.EIGHT_SHOT_BOMBERS:
						possiblePlane = eightShotBomberPool.get();
						break;
				}

				if (possiblePlane) {
					possiblePlane.x = (x * basePlane.width) + xOffset;
					possiblePlane.y = (y * basePlane.height) - yOffset;
					possiblePlane.despawn();
					planes.push(possiblePlane);
				}
			}
		}

		return planes;
	}

	update(dt: number): void {
		if (this?.shouldUpdate) {
			this.fighterPool.update(dt);
			this.shootingFightersPool.update(dt);
			this.fourShotBomberPool.update(dt);
			this.eightShotBomberPool.update(dt);
			// this.carrierPool.update(dt);
			// this.battleshipPool.update(dt);
			this.bulletPool.update(dt);
		}
	}

	public gameOver(): void {
		this.shouldUpdate = false;
		this.timedActions.forEach(id => {
			window.clearInterval(id);
			window.clearTimeout(id);
		});
	}
}