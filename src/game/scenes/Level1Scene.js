import Phaser from 'phaser'
import Player from '../player.js'
import Box from '../box.js'

const PLATFORM_HEIGHT = 32

const LEDGES = [
  { x: 125, y: 416, w: 250 },
  { x: 195, y: 796, w: 250 },
  { x: 650, y: 716, w: 300 },
  { x: 400, y: 566, w: 280 },
]

const FLOOR = { x: 320, y: 944, w: 1040 }

export default class Level1Scene extends Phaser.Scene {
  constructor() {
    super('Level1')
  }

  create() {
    this.cameras.main.setBackgroundColor(0x1b1b22)

    this.platforms = []
    for (const { x, y, w } of LEDGES) {
      this.buildPlatform(x, y, w, 0x3f3f46, 0x71717a)
    }
    this.buildPlatform(FLOOR.x, FLOOR.y, FLOOR.w, 0x27272a, 0x3f3f46)

    this.player = new Player(this, 125, 284)
    this.box = new Box(this, 60, 380)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.box, this.platforms)
    this.physics.add.collider(this.player, this.box)
  }

  buildPlatform(x, y, w, fillColor, strokeColor) {
    const platform = this.add.rectangle(x, y, w, PLATFORM_HEIGHT, fillColor)
    platform.setStrokeStyle(2, strokeColor)
    this.physics.add.existing(platform, true)
    this.platforms.push(platform)
  }

  update() {
    this.player.update(this.cursors)
    this.box.update(this.player, this.scale.width)
  }
}