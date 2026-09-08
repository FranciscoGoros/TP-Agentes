import Phaser from 'phaser'

const BOX_SIZE = 40
const PUSH_SPEED = 90
const DRAG_X = 600
const EDGE_PADDING = 36

export const BOX_COLORS = {
  yellow: { fill: 0xfacc15, stroke: 0xa16207 },
  red: { fill: 0xef4444, stroke: 0x991b1b },
  purple: { fill: 0xa855f7, stroke: 0x6b21a8 },
}

export default class Box extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, colorKey = 'yellow') {
    const { fill, stroke } = BOX_COLORS[colorKey]
    super(scene, x, y, BOX_SIZE, BOX_SIZE, fill)
    this.colorId = colorKey
    this.setStrokeStyle(3, stroke)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setDragX(DRAG_X)
    this.body.setMaxVelocityX(PUSH_SPEED)
  }

  update(player, worldWidth) {
    const playerPushing = Math.abs(player.body.velocity.x) > 0

    if (playerPushing && this.body.touching.left && player.body.velocity.x > 0) {
      this.body.setVelocityX(PUSH_SPEED)
    } else if (
      playerPushing &&
      this.body.touching.right &&
      player.body.velocity.x < 0
    ) {
      this.body.setVelocityX(-PUSH_SPEED)
    }

    const minX = EDGE_PADDING + BOX_SIZE / 2
    const maxX = worldWidth - EDGE_PADDING - BOX_SIZE / 2
    const clampedX = Phaser.Math.Clamp(this.x, minX, maxX)
    if (clampedX !== this.x) {
      this.x = clampedX
      this.body.setVelocityX(0)
    }
  }
}