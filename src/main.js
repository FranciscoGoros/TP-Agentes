import './style.css'
import Phaser from 'phaser'
import MenuScene from './game/scenes/MenuScene.js'

const config = {
  type: Phaser.AUTO,
  parent: 'app',
  width: 640,
  height: 960,
  backgroundColor: '#16171d',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [MenuScene],
}

new Phaser.Game(config)