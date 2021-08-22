export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;
export const GAME_RATIO = GAME_WIDTH / GAME_HEIGHT;
export const GAME_BACKGROUND_COLOR = 0xd3d3d3;
export const enum QuadEntityType {
	PLAYER,
	PLAYER_BULLET,
	ENEMY_PLANE,
	ENEMY_BULLET,
	ENEMY_SHIP
}
export const enum AnimationNames {
	EXPLOSION1 = "EXPLOSION1"
}

// Audio file names
export const AUDIO_MENU_MUSIC = 'AUDIO_MENU_MUSIC';
export const AUDIO_GAME_OVER_MUSIC = 'AUDIO_GAME_OVER_MUSIC';
export const AUDIO_PLAYER_SHOOT_LEFT = 'AUDIO_PLAYER_SHOOT_LEFT';
export const AUDIO_PLAYER_SHOOT_RIGHT = 'AUDIO_PLAYER_SHOOT_RIGHT';
export const AUDIO_EXPLOSION_1 = 'AUDIO_EXPLOSION_1';
export const AUDIO_EXPLOSION_2 = 'AUDIO_EXPLOSION_2';
export const AUDIO_EXPLOSION_3 = 'AUDIO_EXPLOSION_3';
export const AUDIO_EXPLOSION_4 = 'AUDIO_EXPLOSION_4';
export const AUDIO_EXPLOSION_5 = 'AUDIO_EXPLOSION_5';
export const AUDIO_MOUSE_CLICK = 'AUDIO_MOUSE_CLICK';
export const AUDIO_ENEMY_HIT = 'AUDIO_ENEMY_HIT';
export const AUDIO_KILL_CONFIRMED = 'AUDIO_KILL_CONFIRMED';
export const AUDIO_ENEMY_SHOOT = 'AUDIO_ENEMY_SHOOT';

export const ASSETS_LIST: [string, string][] = [
	['air_units', './assets/spriteSheets/air_units-atlas.json'],
	['player_plane', './assets/spriteSheets/player_plane-atlas.json'],
	['water_tile', './assets/img/water_tile.jpg'],
	[AUDIO_MENU_MUSIC, './assets/snd/edith-piaf-non-je-ne-regrette.ogg'],
	[AUDIO_GAME_OVER_MUSIC, './assets/snd/game-over.mp3'],
	[AUDIO_PLAYER_SHOOT_LEFT, './assets/snd/player_shoot_left.mp3'],
	[AUDIO_PLAYER_SHOOT_RIGHT, './assets/snd/player_shoot_right.mp3'],
	[AUDIO_EXPLOSION_1, './assets/snd/explosion_1.ogg'],
	[AUDIO_EXPLOSION_2, './assets/snd/explosion_2.ogg'],
	[AUDIO_EXPLOSION_3, './assets/snd/explosion_3.ogg'],
	[AUDIO_EXPLOSION_4, './assets/snd/explosion_4.ogg'],
	[AUDIO_EXPLOSION_5, './assets/snd/explosion_5.ogg'],
	[AUDIO_MOUSE_CLICK, './assets/snd/mouse-click.ogg'],
	[AUDIO_ENEMY_HIT, './assets/snd/hit_enemy.ogg'],
	[AUDIO_KILL_CONFIRMED, './assets/snd/kill_confirmed.mp3'],
	[AUDIO_ENEMY_SHOOT, './assets/snd/enemy_shoot.ogg'],
	['menu-bg-video', './assets/vid/menu-bg-vid-3.mp4'],
	['dynamo', './assets/img/dynamo.png'],
	['dm', './assets/img/displacement_map.png'],
];