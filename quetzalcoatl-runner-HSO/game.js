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
  scene: {
    preload,
    create,
    update
  },
  parent: "game-container"
};

let player;
let cursors;
let obstacles;
let score = 0;
let scoreText;
let gameOver = false;
let gameStarted = false;
let background;
let obstacleTimer;
let gameSpeed = 150;
let spawnDelay = 2500;
let instructionsText;
let spaceKey;
let escKey;
let pauseOverlay;
let pauseMessage;
let miniGuideText;
let isPaused = false;

// Patrones de obstáculos
const obstaclePatterns = [
  { type: 'alto', y: 120 },
  { type: 'medio-alto', y: 200 },
  { type: 'medio', y: 300 },
  { type: 'medio-bajo', y: 400 },
  { type: 'bajo', y: 480 }
];

const game = new Phaser.Game(config);

function preload() {
  this.load.image("quetzalcoatl", "assets/quetzalcoatl.png");
  this.load.image("fondo", "assets/fondo.png");
  this.load.image("obstaculo", "assets/obstaculo.png");
}

function create() {
  // Fondo en bucle
  background = this.add.tileSprite(400, 300, 800, 600, "fondo");

  // Jugador
  player = this.physics.add.sprite(100, 300, "quetzalcoatl").setScale(0.7);
  player.setCollideWorldBounds(true);
  player.body.setSize(player.width * 0.7, player.height * 0.7); // Hitbox más pequeña

  // Controles
  cursors = this.input.keyboard.createCursorKeys();
  spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

  // Obstáculos
  obstacles = this.physics.add.group();
  
  // Sistema de spawn dinámico con dificultad progresiva
  obstacleTimer = this.time.addEvent({
    delay: spawnDelay,
    callback: spawnObstacle,
    callbackScope: this,
    loop: true,
    paused: true // Empieza pausado hasta que se presione espacio
  });

  // Colisión
  this.physics.add.collider(player, obstacles, hitObstacle, null, this);

  // Puntuación
  scoreText = this.add.text(16, 16, "Puntos: 0 | Velocidad: 1x", {
    fontSize: "24px",
    fill: "#fff",
    fontStyle: "bold"
  });
  updateScoreDisplay();

  // Panel de instrucciones
  const instructionsPanel = this.add.graphics();
  instructionsPanel.fillStyle(0x000000, 0.8);
  instructionsPanel.fillRoundedRect(250, 200, 300, 200, 10);
  instructionsPanel.lineStyle(3, 0xdaa520, 1);
  instructionsPanel.strokeRoundedRect(250, 200, 300, 200, 10);

  // Título del panel
  this.add.text(400, 230, "🎮 CONTROLES", {
    fontSize: "28px",
    fill: "#daa520",
    fontStyle: "bold"
  }).setOrigin(0.5);

  // Instrucciones
  instructionsText = this.add.text(400, 290, 
    "🪶 MANTÉN presionada\n" +
    "   la BARRA ESPACIADORA\n" +
    "   para volar\n\n" +
    "🪶 SUELTA para descender\n\n" +
    "🛑 Presiona ESC para pausar\n\n" +
    "Presiona ESPACIO para comenzar", 
    {
      fontSize: "16px",
      fill: "#ffffff",
      align: "center",
      lineSpacing: 8
    }
  ).setOrigin(0.5);

  // Guardar referencia al panel para ocultarlo después
  this.instructionsPanel = instructionsPanel;
}

function update() {
  if (gameOver) return;

  // Iniciar el juego al presionar espacio por primera vez
  if (!gameStarted && Phaser.Input.Keyboard.JustDown(spaceKey)) {
    gameStarted = true;
    obstacleTimer.paused = false;
    
    // Ocultar panel de instrucciones
    this.instructionsPanel.destroy();
    instructionsText.destroy();
    
    // Mostrar mini guía persistente
    miniGuideText = this.add.text(400, 570, "MANTÉN ESPACIO para volar | SUELTA para caer | ESC para pausar", {
      fontSize: "14px",
      fill: "#daa520",
      fontStyle: "bold"
    }).setOrigin(0.5);
  }

  if (gameStarted && Phaser.Input.Keyboard.JustDown(escKey)) {
    togglePause(this);
  }

  // Si el juego no ha empezado o está en pausa, no actualizar nada más
  if (!gameStarted || isPaused) return;

  // Velocidad del fondo aumenta gradualmente
  const scrollSpeed = 2 + (score * 0.05);
  background.tilePositionX += scrollSpeed;

  // NUEVO SISTEMA: Vuelo continuo mientras se mantiene presionada la barra
  if (spaceKey.isDown) {
    // Aplicar fuerza ascendente continua
    player.setVelocityY(-200);
  }
  // Cuando se suelta, la gravedad hace que caiga naturalmente

  // Actualizar obstáculos y aumentar dificultad
  obstacles.children.iterate(function (obstacle) {
    if (obstacle.x < -obstacle.width) {
      obstacle.destroy();
      score += 1;
      
      // Aumentar dificultad cada 5 puntos
      increaseDifficulty();
      
      updateScoreDisplay();
    }
  });
}

function spawnObstacle() {
  // Seleccionar patrón de obstáculo de forma inteligente
  const pattern = selectObstaclePattern();
  
  const obstacle = obstacles.create(850, pattern.y, "obstaculo").setScale(0.5);
  obstacle.setVelocityX(-gameSpeed);
  obstacle.setImmovable(true);
  obstacle.body.allowGravity = false;
  obstacle.body.setSize(obstacle.width * 0.8, obstacle.height * 0.8); // Hitbox más justa
}

function selectObstaclePattern() {
  // Dificultad baja (score 0-10): Usar solo 3 alturas
  if (score < 10) {
    const easyPatterns = [obstaclePatterns[0], obstaclePatterns[2], obstaclePatterns[4]];
    return Phaser.Math.RND.pick(easyPatterns);
  }
  
  // Dificultad media (score 10-20): Usar 4 alturas
  if (score < 20) {
    const mediumPatterns = obstaclePatterns.slice(0, 4);
    return Phaser.Math.RND.pick(mediumPatterns);
  }
  
  // Dificultad alta (score 20+): Usar todas las alturas
  return Phaser.Math.RND.pick(obstaclePatterns);
}

function increaseDifficulty() {
  // Cada 5 puntos aumenta la velocidad
  if (score % 5 === 0 && score > 0) {
    gameSpeed += 15;
    
    // Reducir el delay entre obstáculos (mínimo 1200ms)
    if (spawnDelay > 1200) {
      spawnDelay -= 150;
      obstacleTimer.delay = spawnDelay;
    }
  }
}

function updateScoreDisplay() {
  if (!scoreText) return;
  const speedMultiplier = (1 + (score * 0.1)).toFixed(1);
  let text = `Puntos: ${score} | Velocidad: ${speedMultiplier}x`;
  if (isPaused) {
    text += " | PAUSA";
  }
  scoreText.setText(text);
}

function togglePause(scene) {
  if (gameOver || !gameStarted) {
    return;
  }

  if (!isPaused) {
    isPaused = true;
    scene.physics.world.pause();
    if (obstacleTimer) {
      obstacleTimer.paused = true;
    }

    pauseOverlay = scene.add.graphics();
    pauseOverlay.fillStyle(0x000000, 0.6);
    pauseOverlay.fillRect(0, 0, config.width, config.height);

    pauseMessage = scene.add.text(config.width / 2, config.height / 2, "Juego en pausa\nPresiona ESC para continuar", {
      fontSize: "28px",
      fill: "#ffffff",
      align: "center",
      fontStyle: "bold",
      lineSpacing: 10
    }).setOrigin(0.5);
  } else {
    isPaused = false;
    scene.physics.world.resume();
    if (obstacleTimer) {
      obstacleTimer.paused = false;
    }

    if (pauseOverlay) {
      pauseOverlay.destroy();
      pauseOverlay = null;
    }

    if (pauseMessage) {
      pauseMessage.destroy();
      pauseMessage = null;
    }
  }

  updateScoreDisplay();
}

function hitObstacle() {
  this.physics.pause();
  if (obstacleTimer) {
    obstacleTimer.paused = true;
  }

  if (pauseOverlay) {
    pauseOverlay.destroy();
    pauseOverlay = null;
  }

  if (pauseMessage) {
    pauseMessage.destroy();
    pauseMessage = null;
  }

  isPaused = false;
  player.setTint(0xff0000);
  gameOver = true;
  scoreText.setText("¡Fin del vuelo! Puntos: " + score);
}

