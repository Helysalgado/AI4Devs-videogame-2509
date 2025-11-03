// ========== CONFIGURACIÓN PRINCIPAL DEL JUEGO ==========
// Quetzalcóatl Runner - FASE 3

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: [MenuScene, GameScene, GameOverScene],
  parent: "game-container"
};

const game = new Phaser.Game(config);

