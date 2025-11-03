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
let lastMictlanSpawn = 0;
let lastMeteorSpawn = 0;

// Variables para plumas sagradas (FASE 2)
let feathers;
let lastFeatherSpawn = 0;
let activePowers = {
  jaguar: { active: false, endTime: 0 },
  eagle: { active: false, endTime: 0 },
  quetzal: { active: false, endTime: 0 }
};
let powerIndicatorText;

// Patrones de obstáculos
const obstaclePatterns = [
  { type: 'alto', y: 120 },
  { type: 'medio-alto', y: 200 },
  { type: 'medio', y: 300 },
  { type: 'medio-bajo', y: 400 },
  { type: 'bajo', y: 480 }
];

// Configuración de plumas sagradas
const featherTypes = {
  jaguar: {
    name: 'Jaguar Nocturno',
    color: 0x1a1a1a,
    power: 'Invulnerabilidad',
    duration: 3000,
    message: '🐆 Yāōtl Ocelocopilli - El guerrero jaguar te protege',
    nahuatl: '"In ōcēlōtl, in cuāuhtli" (El jaguar, el águila)'
  },
  eagle: {
    name: 'Águila Solar',
    color: 0xFFD700,
    power: 'Ralentización',
    duration: 5000,
    message: '🦅 Cuāuhtli Tōnatiuh - El águila solar guía tu vuelo',
    nahuatl: '"Cuix oc nelli nemohua in tlalticpac?" (¿Acaso se vive de verdad en la tierra?)'
  },
  quetzal: {
    name: 'Quetzal Celestial',
    color: 0x00FF00,
    power: 'Doble puntuación',
    duration: 5000,
    message: '🕊️ Quetzaltōtōtl - El quetzal multiplica tu sabiduría',
    nahuatl: '"Xōchitl, cuīcatl" (Flor y canto - símbolo de belleza y verdad)'
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("quetzalcoatl", "assets/quetzalcoatl.png");
  this.load.image("fondo", "assets/fondo.png");
  this.load.image("obstaculo", "assets/obstaculo.png");
  this.load.image("mictlantecuhtli", "assets/mictlantecuhtli.png");
  this.load.image("xiuhnel", "assets/xiuhnel.png");
  
  // FASE 2: Plumas sagradas
  this.load.image("pluma-jaguar", "assets/pluma-jaguar.png");
  this.load.image("pluma-aguila", "assets/pluma-aguila.png");
  this.load.image("pluma-quetzal", "assets/pluma-quetzal.png");
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
  lastMictlanSpawn = 0;
  lastMeteorSpawn = 0;
  miniGuideText = null;
  
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

  // FASE 2: Plumas sagradas
  feathers = this.physics.add.group();
  lastFeatherSpawn = 0;
  
  // Colisión con plumas (overlap, no bounce)
  this.physics.add.overlap(player, feathers, collectFeather, null, this);

  // Puntuación
  scoreText = this.add.text(16, 16, "Puntos: 0 | Velocidad: 1x", {
    fontSize: "24px",
    fill: "#fff",
    fontStyle: "bold"
  });
  updateScoreDisplay();
  
  // Indicador de poderes activos
  powerIndicatorText = this.add.text(16, 50, "", {
    fontSize: "16px",
    fill: "#FFD700",
    fontStyle: "bold",
    stroke: "#000",
    strokeThickness: 3
  });

  // Panel de instrucciones
  const instructionsPanel = this.add.graphics();
  instructionsPanel.fillStyle(0x000000, 0.8);
  instructionsPanel.fillRoundedRect(250, 190, 300, 240, 12);
  instructionsPanel.lineStyle(3, 0xdaa520, 1);
  instructionsPanel.strokeRoundedRect(250, 190, 300, 240, 12);

  // Título del panel
  this.add.text(400, 215, "🎮 CONTROLES", {
    fontSize: "28px",
    fill: "#daa520",
    fontStyle: "bold"
  }).setOrigin(0.5);

  // Instrucciones
  instructionsText = this.add.text(400, 305, 
    "🪶 MANTÉN presionada\n" +
    "   la BARRA ESPACIADORA\n" +
    "   para volar\n\n" +
    "🪶 SUELTA para descender\n" +
    "🛑 ESC para pausar\n\n" +
    "⚡ Cuidado con Mictlantecuhtli\n" +
    "✨ Evita la lluvia Xiuhnel\n\n" +
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
  // Permitir reiniciar el juego después de game over
  if (gameOver) {
    if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
      restartGame.call(this);
    }
    return;
  }

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
      let points = obstacle.getData("scoreValue") || 1;
      
      // FASE 2: Duplicar puntos si el poder del Quetzal está activo
      if (activePowers.quetzal.active) {
        points *= 2;
      }
      
      obstacle.destroy();
      score += points;
      
      // Aumentar dificultad cada 5 puntos
      increaseDifficulty();
      
      updateScoreDisplay();
    }
  });
  
  // FASE 2: Actualizar plumas fuera de pantalla
  feathers.children.iterate(function (feather) {
    if (feather.x < -feather.width) {
      feather.destroy();
    }
  });
  
  // FASE 2: Spawn de plumas
  const now = this.time.now;
  if (score >= 2 && now - lastFeatherSpawn > 8000) {
    if (Phaser.Math.FloatBetween(0, 1) < 0.5) {
      spawnFeather.call(this);
      lastFeatherSpawn = now;
    }
  }
  
  // FASE 2: Actualizar poderes activos
  updateActivePowers(now);
}

function spawnObstacle() {
  if (gameOver) {
    return;
  }

  const now = this.time.now;
  const canSpawnMictlan = score >= 3 && now - lastMictlanSpawn > 6000;
  const canSpawnMeteor = score >= 1 && now - lastMeteorSpawn > 4000;

  // Mayor probabilidad de ver los nuevos obstáculos
  if (canSpawnMictlan && Phaser.Math.FloatBetween(0, 1) < 0.35) {
    spawnMictlantecuhtli.call(this);
    lastMictlanSpawn = now;
    return;
  }

  if (canSpawnMeteor && Phaser.Math.FloatBetween(0, 1) < 0.4) {
    spawnMeteorShower.call(this);
    lastMeteorSpawn = now;
    return;
  }

  spawnRegularObstacle.call(this);
}

function spawnRegularObstacle() {
  const pattern = selectObstaclePattern();

  const obstacle = obstacles.create(850, pattern.y, "obstaculo").setScale(0.5);
  obstacle.setVelocityX(-gameSpeed);
  obstacle.setImmovable(true);
  obstacle.body.allowGravity = false;
  obstacle.body.setSize(obstacle.width * 0.8, obstacle.height * 0.8);
  obstacle.setData("scoreValue", 1);
}

function spawnMictlantecuhtli() {
  const apparitionY = Phaser.Math.Between(220, 420);

  const entity = obstacles.create(880, apparitionY, "mictlantecuhtli").setScale(0.7);
  entity.setVelocityX(-Math.max(gameSpeed * 0.8, 160));
  entity.setImmovable(true);
  entity.body.allowGravity = false;
  entity.body.setSize(entity.width * 0.7, entity.height * 0.7);
  entity.setAlpha(0.2);
  entity.setData("scoreValue", 3);

  this.tweens.add({
    targets: entity,
    alpha: { from: 0.2, to: 1 },
    duration: 500,
    yoyo: true,
    repeat: 2,
    onComplete: () => {
      entity.setAlpha(0.95);
    }
  });
}

function spawnMeteorShower() {
  const meteorCount = Phaser.Math.Between(3, 4);
  const baseSpeed = Math.min(gameSpeed + 90, 340);

  for (let i = 0; i < meteorCount; i++) {
    const startX = 820 + i * 80;
    const startY = -80 - i * 70 + Phaser.Math.Between(-20, 20);
    const meteor = obstacles.create(startX, startY, "xiuhnel").setScale(0.6);
    meteor.setVelocityX(-baseSpeed - Phaser.Math.Between(0, 40));
    meteor.setVelocityY(baseSpeed * 0.7 + Phaser.Math.Between(20, 70));
    meteor.setImmovable(true);
    meteor.body.allowGravity = false;
    meteor.body.setSize(meteor.width * 0.55, meteor.height * 0.55);
    meteor.setAngle(-35);
    meteor.setAngularVelocity(100);
    meteor.setData("scoreValue", 1);
  }
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
  // Cada 5 puntos aumenta la velocidad (excepto si el águila está activa)
  if (score % 5 === 0 && score > 0 && !activePowers.eagle.active) {
    gameSpeed += 15;
    
    // Reducir el delay entre obstáculos (mínimo 1200ms)
    if (spawnDelay > 1200) {
      spawnDelay -= 150;
      obstacleTimer.delay = spawnDelay;
    }
  }
}

// ========== FASE 2: FUNCIONES DE PLUMAS SAGRADAS ==========

function spawnFeather() {
  const featherType = Phaser.Math.RND.pick(['jaguar', 'eagle', 'quetzal']);
  const config = featherTypes[featherType];
  const y = Phaser.Math.Between(150, 450);
  
  // Mapeo de tipo a imagen
  const spriteKeys = {
    'jaguar': 'pluma-jaguar',
    'eagle': 'pluma-aguila',
    'quetzal': 'pluma-quetzal'
  };
  
  let feather;
  
  // Intentar cargar sprite PNG, si falla usar círculo de respaldo
  try {
    feather = this.add.sprite(850, y, spriteKeys[featherType]);
    feather.setScale(0.5);
  } catch (error) {
    // Fallback: usar círculo si la imagen no existe
    console.warn(`Imagen ${spriteKeys[featherType]} no encontrada, usando círculo`);
    feather = this.add.circle(850, y, 15, config.color);
  }
  
  this.physics.add.existing(feather);
  feathers.add(feather);
  
  feather.body.setVelocityX(-120);
  feather.body.allowGravity = false;
  feather.setData('featherType', featherType);
  
  // Efecto visual: parpadeo suave y flotación
  this.tweens.add({
    targets: feather,
    alpha: { from: 1, to: 0.7 },
    scale: { from: feather.scale, to: feather.scale * 1.2 },
    y: { from: y, to: y - 20 },
    duration: 800,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });
  
  // Rotación suave para simular vuelo
  this.tweens.add({
    targets: feather,
    angle: { from: -10, to: 10 },
    duration: 1000,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut'
  });
}

function collectFeather(player, feather) {
  const featherType = feather.getData('featherType');
  const config = featherTypes[featherType];
  
  // Activar poder
  activatePower.call(this, featherType, config);
  
  // Destruir pluma
  feather.destroy();
  
  // Mostrar mensaje cultural
  showCulturalMessage.call(this, config);
}

function activatePower(type, config) {
  const now = this.time.now;
  activePowers[type].active = true;
  activePowers[type].endTime = now + config.duration;
  
  // Efectos especiales según el tipo
  switch(type) {
    case 'jaguar':
      // Invulnerabilidad: cambiar tinte del jugador
      player.setTint(0x444444);
      break;
      
    case 'eagle':
      // Ralentización: reducir velocidad del juego temporalmente
      gameSpeed = Math.max(gameSpeed * 0.6, 100);
      this.physics.world.timeScale = 0.7;
      player.setTint(0xFFD700);
      break;
      
    case 'quetzal':
      // Doble puntuación: cambiar tinte del jugador
      player.setTint(0x00FF00);
      break;
  }
  
  updatePowerIndicator();
}

function updateActivePowers(now) {
  let powersChanged = false;
  
  // Verificar si los poderes han expirado
  for (let type in activePowers) {
    if (activePowers[type].active && now >= activePowers[type].endTime) {
      deactivatePower(type);
      powersChanged = true;
    }
  }
  
  if (powersChanged) {
    updatePowerIndicator();
  }
}

function deactivatePower(type) {
  activePowers[type].active = false;
  
  // Restaurar efectos
  switch(type) {
    case 'jaguar':
    case 'quetzal':
      if (!activePowers.eagle.active) {
        player.clearTint();
      }
      break;
      
    case 'eagle':
      // Restaurar velocidad normal del tiempo
      game.scene.scenes[0].physics.world.timeScale = 1;
      if (!activePowers.jaguar.active && !activePowers.quetzal.active) {
        player.clearTint();
      }
      break;
  }
}

function updatePowerIndicator() {
  let text = "";
  
  if (activePowers.jaguar.active) {
    text += "🐆 Invulnerabilidad ";
  }
  if (activePowers.eagle.active) {
    text += "🦅 Tiempo lento ";
  }
  if (activePowers.quetzal.active) {
    text += "🕊️ x2 Puntos ";
  }
  
  powerIndicatorText.setText(text);
}

function showCulturalMessage(config) {
  // Mensaje principal
  const message = this.add.text(400, 250, config.message, {
    fontSize: "20px",
    fill: "#FFD700",
    fontStyle: "bold",
    align: "center",
    stroke: "#000",
    strokeThickness: 4
  }).setOrigin(0.5);
  
  // Frase en náhuatl
  const nahuatlText = this.add.text(400, 290, config.nahuatl, {
    fontSize: "14px",
    fill: "#FFF",
    fontStyle: "italic",
    align: "center",
    stroke: "#000",
    strokeThickness: 3
  }).setOrigin(0.5);
  
  // Desaparecer después de 3 segundos
  this.tweens.add({
    targets: [message, nahuatlText],
    alpha: { from: 1, to: 0 },
    duration: 1000,
    delay: 2000,
    onComplete: () => {
      message.destroy();
      nahuatlText.destroy();
    }
  });
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
  // FASE 2: Si el poder del Jaguar está activo, no morir
  if (activePowers.jaguar.active) {
    return; // Invulnerable, ignorar colisión
  }
  
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
  
  scoreText.setText(`¡Fin del vuelo! Puntos: ${score}\n\nPresiona ESPACIO para reiniciar`);
  scoreText.setFontSize("20px");
  scoreText.setAlign("center");
  scoreText.setPosition(400, 300);
  scoreText.setOrigin(0.5);
}

function restartGame() {
  // Resetear variables del juego
  gameOver = false;
  gameStarted = false;
  score = 0;
  gameSpeed = 150;
  spawnDelay = 2500;
  lastMictlanSpawn = 0;
  lastMeteorSpawn = 0;
  lastFeatherSpawn = 0;
  isPaused = false;
  
  // FASE 2: Resetear poderes
  activePowers.jaguar = { active: false, endTime: 0 };
  activePowers.eagle = { active: false, endTime: 0 };
  activePowers.quetzal = { active: false, endTime: 0 };
  powerIndicatorText.setText("");
  this.physics.world.timeScale = 1;
  
  // Limpiar obstáculos y plumas
  obstacles.clear(true, true);
  feathers.clear(true, true);
  
  // Resetear jugador
  player.clearTint();
  player.setPosition(100, 300);
  player.setVelocity(0, 0);
  
  // Resetear texto de score
  scoreText.setFontSize("24px");
  scoreText.setAlign("left");
  scoreText.setPosition(16, 16);
  scoreText.setOrigin(0);
  updateScoreDisplay();
  
  // Pausar el timer de obstáculos hasta que se presione espacio
  if (obstacleTimer) {
    obstacleTimer.paused = true;
  }
  
  // Reanudar física
  this.physics.resume();
  
  // Mostrar panel de instrucciones nuevamente
  const instructionsPanel = this.add.graphics();
  instructionsPanel.fillStyle(0x000000, 0.8);
  instructionsPanel.fillRoundedRect(250, 190, 300, 240, 12);
  instructionsPanel.lineStyle(3, 0xdaa520, 1);
  instructionsPanel.strokeRoundedRect(250, 190, 300, 240, 12);

  this.add.text(400, 215, "🎮 CONTROLES", {
    fontSize: "28px",
    fill: "#daa520",
    fontStyle: "bold"
  }).setOrigin(0.5);

  instructionsText = this.add.text(400, 305, 
    "🪶 MANTÉN presionada\n" +
    "   la BARRA ESPACIADORA\n" +
    "   para volar\n\n" +
    "🪶 SUELTA para descender\n" +
    "🛑 ESC para pausar\n\n" +
    "⚡ Cuidado con Mictlantecuhtli\n" +
    "✨ Evita la lluvia Xiuhnel\n\n" +
    "Presiona ESPACIO para comenzar", 
    {
      fontSize: "16px",
      fill: "#ffffff",
      align: "center",
      lineSpacing: 8
    }
  ).setOrigin(0.5);

  this.instructionsPanel = instructionsPanel;
  
  // Destruir mini guía si existe
  if (miniGuideText) {
    miniGuideText.destroy();
    miniGuideText = null;
  }
}

