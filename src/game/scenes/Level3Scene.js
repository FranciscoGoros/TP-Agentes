import Phaser from 'phaser'
import Player from '../player.js'
import Box from '../box.js'
import DoorSystem from '../door.js'
import SpikeSystem from '../spikes.js'

const PLATFORM_HEIGHT = 32

const LEDGES = [
  { x: 110, y: 406, w: 200 },
  { x: 695, y: 496, w: 190 },
  { x: 180, y: 556, w: 180 },
  { x: 650, y: 646, w: 200 },
  { x: 110, y: 746, w: 150 },
  { x: 550, y: 836, w: 180 },
]

const FLOOR = { x: 420, y: 944, w: 840 }

const ZONES = [
  { x: 180, y: 534, w: 56, h: 12, colorId: 'yellow' },
  { x: 730, y: 922, w: 56, h: 12, colorId: 'red' },
  { x: 520, y: 922, w: 56, h: 12, colorId: 'purple' },
]

const DOOR = { x: 790, y: 880, w: 48, h: 96 }

const SPIKE_STRIPS = [
  { x: 650, y: 630, w: 110, count: 4 },
  { x: 110, y: 730, w: 90, count: 3 },
  { x: 550, y: 820, w: 100, count: 4 },
]

export default class Level3Scene extends Phaser.Scene {
  constructor() {
    super('Level3')
  }

  create() {
    this.cameras.main.setBackgroundColor(0x1b1b22)
    this.gameOverTriggered = false

    this.platforms = []
    for (const { x, y, w } of LEDGES) {
      this.buildPlatform(x, y, w, 0x3f3f46, 0x71717a)
    }
    this.buildPlatform(FLOOR.x, FLOOR.y, FLOOR.w, 0x27272a, 0x3f3f46)

    this.player = new Player(this, 125, 374)
    this.boxes = [
      new Box(this, 60, 370, 'yellow'),
      new Box(this, 190, 370, 'red'),
      new Box(this, 695, 460, 'purple'),
    ]
    this.cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.boxes, this.platforms)
    this.physics.add.collider(this.player, this.boxes)

    this.spikes = new SpikeSystem(this, {
      strips: SPIKE_STRIPS,
      player: this.player,
      onHit: () => this.onSpikeHit(),
    })

    this.door = new DoorSystem(this, {
      boxes: this.boxes,
      zones: ZONES,
      door: DOOR,
      targetScene: 'Victory',
    })
  }

  buildPlatform(x, y, w, fillColor, strokeColor) {
    const platform = this.add.rectangle(x, y, w, PLATFORM_HEIGHT, fillColor)
    platform.setStrokeStyle(2, strokeColor)
    this.physics.add.existing(platform, true)
    this.platforms.push(platform)
  }

  onSpikeHit() {
    if (this.gameOverTriggered) return
    this.gameOverTriggered = true

    this.physics.pause()
    this.player.setVisible(false)
    this.cameras.main.fadeOut(400, 0, 0, 0)
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('GameOver', { level: 'Level3' })
    })
  }

  update() {
    if (this.gameOverTriggered) return
    this.player.update(this.cursors)
    this.boxes.forEach((box) => box.update(this.player, this.scale.width))
    this.door.update(this.player)
  }
}