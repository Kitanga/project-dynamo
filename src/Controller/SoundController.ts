import { IMediaInstance, PlayOptions, sound } from '@pixi/sound';
import { AUDIO_ENEMY_HIT, AUDIO_ENEMY_SHOOT, AUDIO_EXPLOSION_1, AUDIO_EXPLOSION_2, AUDIO_EXPLOSION_3, AUDIO_EXPLOSION_4, AUDIO_EXPLOSION_5, AUDIO_GAME_OVER_MUSIC, AUDIO_KILL_CONFIRMED, AUDIO_MENU_MUSIC, AUDIO_MOUSE_CLICK, AUDIO_PLAYER_SHOOT_LEFT, AUDIO_PLAYER_SHOOT_RIGHT } from '../constants';
import { PlayerPlane } from '../GameObjects';
import { random } from '../Utils';

export class SoundController {
	public static instance: SoundController | undefined;

	public static getInstance(player?: PlayerPlane): SoundController {
		if (!SoundController.instance) {
			SoundController.instance = new SoundController(player);
		}

		return SoundController.instance;
	}

	protected player?: PlayerPlane;
	protected explosionSounds: string[] = [
		AUDIO_EXPLOSION_1,
		AUDIO_EXPLOSION_2,
		AUDIO_EXPLOSION_3,
		AUDIO_EXPLOSION_4,
		AUDIO_EXPLOSION_5,
	];

	private constructor(player?: PlayerPlane) {
		this.player = player as PlayerPlane;
	}

	public setPlayerRef(player: PlayerPlane): void {
		this.player = player;
	}

	public async playPlayerShootLeft(): Promise<IMediaInstance> {
		return sound.play(AUDIO_PLAYER_SHOOT_LEFT);
	}

	public async playPlayerShootRight(): Promise<IMediaInstance> {
		return sound.play(AUDIO_PLAYER_SHOOT_RIGHT);
	}

	public async playEnemyShoot(audioKey?: string, config?: PlayOptions): Promise<IMediaInstance> {
		return sound.play(audioKey || AUDIO_ENEMY_SHOOT, config);
	}

	public async playEnemyHit(): Promise<IMediaInstance> {
		return sound.play(AUDIO_ENEMY_HIT);
	}

	public async playKillConfirmed(): Promise<IMediaInstance> {
		return sound.play(AUDIO_KILL_CONFIRMED, {
			volume: 0.34
		});
	}

	public async playEnemyRandomExplode(): Promise<IMediaInstance> {
		const audioName = this.explosionSounds[Math.floor(random(1, 5))];
		return sound.play(audioName, {
			volume: 0.25,
		});
	}

	public async playMenuMusic(): Promise<IMediaInstance> {
		return sound.play(AUDIO_MENU_MUSIC, {
			loop: true,
		});
	}

	public async playGameOverMusic(): Promise<IMediaInstance> {
		return sound.play(AUDIO_GAME_OVER_MUSIC, {
			loop: true,
		});
	}

	public playMouseClick(): IMediaInstance | Promise<IMediaInstance> {
		return sound.play(AUDIO_MOUSE_CLICK, {
			volume: 0.5,
		});
	}

	public stopAll(): void {
		sound.stopAll();
	}
}
