import Phaser from 'phaser'
import Player from '../player.js'

export default class Level1Scene extends Phaser.Scene {
  constructor() {
    super('Level1')
  }

  create() {
    this.cameras.main.setBackgroundColor(0x1b1b22)

    this.player = new Player(this, 320, 880)
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update() {
    this.player.update(this.cursors)
  }
}