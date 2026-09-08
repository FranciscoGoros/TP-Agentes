import Phaser from 'phaser'

const SPEED = 220
const SIZE = 32

export default class Player extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
    super(scene, x, y, SIZE, SIZE, 0x7dd3fc)
    this.setStrokeStyle(2, 0x0ea5e9)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.body.setCollideWorldBounds(true)
  }

  update(cursors) {
    this.body.setVelocityX(0)

    if (cursors.left.isDown) {
      this.body.setVelocityX(-SPEED)
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(SPEED)
    }
  }
}