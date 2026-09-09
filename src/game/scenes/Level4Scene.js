import Phaser from 'phaser'
import Player from '../player.js'
import Box, { resolveBoxPushing } from '../box.js'
import DoorSystem from '../door.js'
import SpikeSystem from '../spikes.js'
import LaserSystem from '../lasers.js'
import timer from '../timer.js'
import addRestartButton from '../hud.js'

const PLATFORM_HEIGHT = 32

const LEDGES = [
  { x: 120, y: 386, w: 200 },
  { x: 330, y: 476, w: 180 },
  { x: 540, y: 566, w: 180 },
  { x: 730, y: 656, w: 180 },
]

const FLOOR = { x: 420, y: 944, w: 840 }

const ZONES = [
  { x: 540, y: 544, w: 56, h: 12, colorId: 'yellow' },
  { x: 730, y: 634, w: 56, h: 12, colorId: 'red' },
  { x: 320, y: 922, w: 56, h: 12, colorId: 'purple' },
  { x: 600, y: 922, w: 56, h: 12, colorId: 'green' },
]

const DOOR = { x: 775, y: 880, w: 48, h: 96 }

const SPIKE_STRIPS = [
  { x: 407, y: 460, w: 26, count: 2 },
  { x: 599, y: 550, w: 60, count: 3 },
  { x: 789, y: 640, w: 60, count: 3 },
]

const LASER_BEAMS = [
  { side: 'right', levelY: 420, length: 600, onMs: 1400, offMs: 900, phase: 0 },
  { side: 'right', levelY: 510, length: 360, onMs: 1200, offMs: 1000, phase: 500 },
  { side: 'right', levelY: 600, length: 170, onMs: 1500, offMs: 800, phase: 200 },
  { side: 'right', levelY: 720, length: 150, onMs: 1300, offMs: 900, phase: 900 },
]

export default class Level4Scene extends Phaser.Scene {
  constructor() {
    super('Level4')
  }

  create() {
    this.cameras.main.setBackgroundColor(0x1b1b22)
    timer.startLevel('Level4')
    this.gameOverTriggered = false
    this.timerText = this.add
      .text(this.scale.width - 12, 12, '', {
        fontFamily: 'monospace',
        fontSize: '18px',
        color: '#efdffc',
      })
      .setOrigin(1, 0)
    addRestartButton(this)

    this.platforms = []
    for (const { x, y, w } of LEDGES) {
      this.buildPlatform(x, y, w, 0x3f3f46, 0x71717a)
    }
    this.buildPlatform(FLOOR.x, FLOOR.y, FLOOR.w, 0x27272a, 0x3f3f46)

    this.player = new Player(this, 125, 354)
    this.boxes = [
      new Box(this, 60, 350, 'yellow'),
      new Box(this, 190, 350, 'red'),
      new Box(this, 290, 440, 'purple'),
      new Box(this, 370, 440, 'green'),
    ]
    this.cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.boxes, this.platforms)
    this.physics.add.collider(this.player, this.boxes)
    this.physics.add.collider(this.boxes, this.boxes)

    const onHit = () => this.onHazardHit()

    this.spikes = new SpikeSystem(this, {
      strips: SPIKE_STRIPS,
      player: this.player,
      onHit,
    })
    this.lasers = new LaserSystem(this, {
      beams: LASER_BEAMS,
      player: this.player,
      onHit,
    })

    this.door = new DoorSystem(this, {
      boxes: this.boxes,
      zones: ZONES,
      door: DOOR,
      targetScene: 'Level5',
    })
  }

  buildPlatform(x, y, w, fillColor, strokeColor) {
    const platform = this.add.rectangle(x, y, w, PLATFORM_HEIGHT, fillColor)
    platform.setStrokeStyle(2, strokeColor)
    this.physics.add.existing(platform, true)
    this.platforms.push(platform)
  }

  onHazardHit() {
    if (this.gameOverTriggered) return
    this.gameOverTriggered = true

    this.physics.pause()
    this.player.setVisible(false)
    this.cameras.main.fadeOut(400, 0, 0, 0)
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start('GameOver', { level: 'Level4' })
    })
  }

  update(time) {
    if (this.gameOverTriggered) return
    this.timerText.setText(timer.format(timer.levelElapsed()))
    this.lasers.update(time)
    this.player.update(this.cursors)
    this.boxes.forEach((box) => box.update(this.player, this.scale.width))
    resolveBoxPushing(this.boxes)
    this.door.update(this.player)
  }
}