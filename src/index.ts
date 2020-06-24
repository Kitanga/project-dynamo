import { Loader, Sprite, Texture, AnimatedSprite } from 'pixi.js';
import type PIXI from 'pixi.js';
import { getApp } from './get-app';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';

let app: PIXI.Application;
const loader = Loader.shared;

function getBunny(): PIXI.Sprite {
  const bunnyRotationPoint = {
    x: 0.5,
    y: 0.5,
  };

  const bunny = Sprite.from('rabbit');
  bunny.anchor.set(bunnyRotationPoint.x, bunnyRotationPoint.y);
  bunny.scale.set(2, 2);

  return bunny;
}

function getBird(): PIXI.AnimatedSprite {
  const bird = new AnimatedSprite([
    Texture.from('birdUp.png'),
    Texture.from('birdMiddle.png'),
    Texture.from('birdDown.png'),
  ]);
  bird.loop = true;
  bird.animationSpeed = 0.1;
  bird.play();
  bird.scale.set(3);

  return bird;
}

function startLoadingAssets(): void {
  loader.add('rabbit', './assets/rabbit.png');
  loader.add('spriteExample', './assets/spriteSheets/spritesData.json'); // example of loading spriteSheet
  loader.load();
}

function onAssetsLoaded(): void {
  const stage = app.stage;

  const bunny = getBunny();
  bunny.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2);

  const birdFromSprite = getBird();
  birdFromSprite.anchor.set(0.5, 0.5);
  birdFromSprite.position.set(GAME_WIDTH / 2, GAME_HEIGHT / 2 + bunny.height);

  stage.addChild(bunny);
  stage.addChild(birdFromSprite);

  app.ticker.add(() => {
    bunny.rotation += 0.05;
  });
}

window.onload = () => {
  app = getApp();
  startLoadingAssets();
  loader.onComplete.once(() => {
    onAssetsLoaded();
  });
};
