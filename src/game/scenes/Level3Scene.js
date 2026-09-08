import Phaser from 'phaser'

export default class Level3Scene extends Phaser.Scene {
  constructor() {
    super('Level3')
  }

  create() {
    this.cameras.main.setBackgroundColor(0x1b1b22)

    const { width, height } = this.scale

    this.add
      .text(width / 2, height / 2 - 20, 'NIVEL 3', {
        fontFamily: 'monospace',
        fontSize: '48px',
        color: '#efdffc',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height / 2 + 40, 'Próximamente', {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#9ca3af',
      })
      .setOrigin(0.5)

    this.add
      .text(width / 2, height * 0.85, 'ESPACIO: volver al menú', {
        fontFamily: 'monospace',
        fontSize: '16px',
        color: '#6b6375',
      })
      .setOrigin(0.5)

    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('Menu')
    })
  }
}