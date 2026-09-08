import './style.css'
import Phaser from 'phaser'
import MenuScene from './game/scenes/MenuScene.js'
import Level1Scene from './game/scenes/Level1Scene.js'

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 840,
  height: 960,
  backgroundColor: '#16171d',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 900 },
      debug: false,
    },
  },
  scene: [MenuScene, Level1Scene],
}

new Phaser.Game(config)