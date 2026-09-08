import Phaser from 'phaser'

const BOX_SIZE = 40
const PUSH_SPEED = 90
const DRAG_X = 600
const EDGE_PADDING = 36

export default class Box extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, BOX_SIZE, BOX_SIZE, 0xd97706)
    this.setStrokeStyle(3, 0x92400e)
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