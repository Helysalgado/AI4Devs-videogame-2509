// ========== FASE 3: GAME SCENE ==========
// Escena principal del juego - Convertida a clase de Phaser

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    
    // Variables del juego
    this.player = null;
    this.cursors = null;
    this.obstacles = null;
    this.score = 0;
    this.scoreText = null;
    this.gameOver = false;
    this.gameStarted = false;
    this.background = null;
    this.obstacleTimer = null;
    this.gameSpeed = 150;
    this.spawnDelay = 2500;
    this.instructionsText = null;
    this.spaceKey = null;
    this.escKey = null;
    this.pauseOverlay = null;
    this.pauseMessage = null;
    this.miniGuideText = null;
    this.isPaused = false;
    this.lastMictlanSpawn = 0;
    this.lastMeteorSpawn = 0;
    
    // FASE 2: Plumas sagradas
    this.feathers = null;
    this.lastFeatherSpawn = 0;
    this.feathersCollectedCount = 0;
    this.activePowers = {
      jaguar: { active: false, endTime: 0 },
      eagle: { active: false, endTime: 0 },
      quetzal: { active: false, endTime: 0 }
    };
    this.powerIndicatorText = null;
    
    // Patrones de obstáculos
    this.obstaclePatterns = [
      { type: 'alto', y: 120 },
      { type: 'medio-alto', y: 200 },
      { type: 'medio', y: 300 },
      { type: 'medio-bajo', y: 400 },
      { type: 'bajo', y: 480 }
    ];
    
    // Configuración de plumas sagradas
    this.featherTypes = {
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
  }

  preload() {
    this.load.image("quetzalcoatl", "assets/quetzalcoatl.png");
    this.load.image("fondo", "assets/fondo.png");
    this.load.image("obstaculo", "assets/obstaculo.png");
    this.load.image("mictlantecuhtli", "assets/mictlantecuhtli.png");
    this.load.image("xiuhnel", "assets/xiuhnel.png");
    
    // FASE 2: Plumas sagradas
    this.load.image("pluma-jaguar", "assets/pluma-jaguar.png");
    this.load.image("pluma-aguila", "assets/pluma-aguila.png");
    this.load.image("pluma-quetzal", "assets/pluma-quetzal.png");
    
    // FASE 3: Audio (opcional, comentado si no existen archivos)
     this.load.audio('game-music', 'assets/audio/game-music.mp3');
    // this.load.audio('collect-feather', 'assets/audio/collect.mp3');
    // this.load.audio('power-up', 'assets/audio/powerup.mp3');
    // this.load.audio('hit', 'assets/audio/hit.mp3');
  }

  create() {
    // FASE 3: Iniciar música del juego
    try {
      this.gameMusic = this.sound.add('game-music', {
        loop: true,
        volume: 0.5
      });
      this.gameMusic.play();
    } catch (error) {
      console.warn('No se pudo cargar la música del juego:', error);
    }

    // Fondo en bucle
    this.background = this.add.tileSprite(400, 300, 800, 600, "fondo");

    // Jugador
    this.player = this.physics.add.sprite(100, 300, "quetzalcoatl").setScale(0.7);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(this.player.width * 0.7, this.player.height * 0.7);

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    // Obstáculos
    this.obstacles = this.physics.add.group();
    this.lastMictlanSpawn = 0;
    this.lastMeteorSpawn = 0;
    this.miniGuideText = null;
    
    // Sistema de spawn dinámico con dificultad progresiva
    this.obstacleTimer = this.time.addEvent({
      delay: this.spawnDelay,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true,
      paused: true
    });

    // Colisión
    this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);

    // FASE 2: Plumas sagradas
    this.feathers = this.physics.add.group();
    this.lastFeatherSpawn = 0;
    this.physics.add.overlap(this.player, this.feathers, this.collectFeather, null, this);

    // Puntuación
    this.scoreText = this.add.text(16, 16, "Puntos: 0 | Velocidad: 1x", {
      fontSize: "24px",
      fill: "#fff",
      fontStyle: "bold"
    });
    this.updateScoreDisplay();
    
    // Indicador de poderes activos
    this.powerIndicatorText = this.add.text(16, 50, "", {
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

    this.add.text(400, 215, "🎮 CONTROLES", {
      fontSize: "28px",
      fill: "#daa520",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.instructionsText = this.add.text(400, 305, 
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
    
    // Fade in inicial
    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  update() {
    // Permitir reiniciar el juego después de game over
    if (this.gameOver) {
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.scene.start('GameOverScene', {
          score: this.score,
          feathersCollected: this.feathersCollectedCount
        });
      }
      return;
    }

    // Iniciar el juego al presionar espacio por primera vez
    if (!this.gameStarted && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.gameStarted = true;
      this.obstacleTimer.paused = false;
      
      this.instructionsPanel.destroy();
      this.instructionsText.destroy();
      
      this.miniGuideText = this.add.text(400, 570, "MANTÉN ESPACIO para volar | SUELTA para caer | ESC para pausar", {
        fontSize: "14px",
        fill: "#daa520",
        fontStyle: "bold"
      }).setOrigin(0.5);
    }

    if (this.gameStarted && Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.togglePause();
    }

    if (!this.gameStarted || this.isPaused) return;

    // Velocidad del fondo aumenta gradualmente
    const scrollSpeed = 2 + (this.score * 0.05);
    this.background.tilePositionX += scrollSpeed;

    // Vuelo continuo mientras se mantiene presionada la barra
    if (this.spaceKey.isDown) {
      this.player.setVelocityY(-200);
    }

    // Actualizar obstáculos y aumentar dificultad
    this.obstacles.children.iterate((obstacle) => {
      if (obstacle && obstacle.x < -obstacle.width) {
        let points = obstacle.getData("scoreValue") || 1;
        
        if (this.activePowers.quetzal.active) {
          points *= 2;
        }
        
        obstacle.destroy();
        this.score += points;
        
        this.increaseDifficulty();
        this.updateScoreDisplay();
      }
    });
    
    // FASE 2: Actualizar plumas fuera de pantalla
    this.feathers.children.iterate((feather) => {
      if (feather && feather.x < -feather.width) {
        feather.destroy();
      }
    });
    
    // FASE 2: Spawn de plumas
    const now = this.time.now;
    if (this.score >= 2 && now - this.lastFeatherSpawn > 8000) {
      if (Phaser.Math.FloatBetween(0, 1) < 0.5) {
        this.spawnFeather();
        this.lastFeatherSpawn = now;
      }
    }
    
    // FASE 2: Actualizar poderes activos
    this.updateActivePowers(now);
  }

  // ========== MÉTODOS DE OBSTÁCULOS ==========

  spawnObstacle() {
    if (this.gameOver) return;

    const now = this.time.now;
    const canSpawnMictlan = this.score >= 3 && now - this.lastMictlanSpawn > 6000;
    const canSpawnMeteor = this.score >= 1 && now - this.lastMeteorSpawn > 4000;

    if (canSpawnMictlan && Phaser.Math.FloatBetween(0, 1) < 0.35) {
      this.spawnMictlantecuhtli();
      this.lastMictlanSpawn = now;
      return;
    }

    if (canSpawnMeteor && Phaser.Math.FloatBetween(0, 1) < 0.4) {
      this.spawnMeteorShower();
      this.lastMeteorSpawn = now;
      return;
    }

    this.spawnRegularObstacle();
  }

  spawnRegularObstacle() {
    const pattern = this.selectObstaclePattern();
    const obstacle = this.obstacles.create(850, pattern.y, "obstaculo").setScale(0.5);
    obstacle.setVelocityX(-this.gameSpeed);
    obstacle.setImmovable(true);
    obstacle.body.allowGravity = false;
    obstacle.body.setSize(obstacle.width * 0.8, obstacle.height * 0.8);
    obstacle.setData("scoreValue", 1);
  }

  spawnMictlantecuhtli() {
    const apparitionY = Phaser.Math.Between(220, 420);
    const entity = this.obstacles.create(880, apparitionY, "mictlantecuhtli").setScale(0.7);
    entity.setVelocityX(-Math.max(this.gameSpeed * 0.8, 160));
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
      onComplete: () => entity.setAlpha(0.95)
    });
  }

  spawnMeteorShower() {
    const meteorCount = Phaser.Math.Between(3, 4);
    const baseSpeed = Math.min(this.gameSpeed + 90, 340);

    for (let i = 0; i < meteorCount; i++) {
      const startX = 820 + i * 80;
      const startY = -80 - i * 70 + Phaser.Math.Between(-20, 20);
      const meteor = this.obstacles.create(startX, startY, "xiuhnel").setScale(0.6);
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

  selectObstaclePattern() {
    if (this.score < 10) {
      const easyPatterns = [this.obstaclePatterns[0], this.obstaclePatterns[2], this.obstaclePatterns[4]];
      return Phaser.Math.RND.pick(easyPatterns);
    }
    
    if (this.score < 20) {
      const mediumPatterns = this.obstaclePatterns.slice(0, 4);
      return Phaser.Math.RND.pick(mediumPatterns);
    }
    
    return Phaser.Math.RND.pick(this.obstaclePatterns);
  }

  increaseDifficulty() {
    if (this.score % 5 === 0 && this.score > 0 && !this.activePowers.eagle.active) {
      this.gameSpeed += 15;
      
      if (this.spawnDelay > 1200) {
        this.spawnDelay -= 150;
        this.obstacleTimer.delay = this.spawnDelay;
      }
    }
  }

  // ========== FASE 2: PLUMAS SAGRADAS ==========

  spawnFeather() {
    const featherType = Phaser.Math.RND.pick(['jaguar', 'eagle', 'quetzal']);
    const config = this.featherTypes[featherType];
    const y = Phaser.Math.Between(150, 450);
    
    const spriteKeys = {
      'jaguar': 'pluma-jaguar',
      'eagle': 'pluma-aguila',
      'quetzal': 'pluma-quetzal'
    };
    
    let feather;
    
    try {
      feather = this.add.sprite(850, y, spriteKeys[featherType]);
      feather.setScale(0.5);
    } catch (error) {
      feather = this.add.circle(850, y, 15, config.color);
    }
    
    this.physics.add.existing(feather);
    this.feathers.add(feather);
    
    feather.body.setVelocityX(-120);
    feather.body.allowGravity = false;
    feather.setData('featherType', featherType);
    
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
    
    this.tweens.add({
      targets: feather,
      angle: { from: -10, to: 10 },
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  collectFeather(player, feather) {
    const featherType = feather.getData('featherType');
    const config = this.featherTypes[featherType];
    
    this.feathersCollectedCount++;
    this.activatePower(featherType, config);
    feather.destroy();
    this.showCulturalMessage(config);
  }

  activatePower(type, config) {
    const now = this.time.now;
    this.activePowers[type].active = true;
    this.activePowers[type].endTime = now + config.duration;
    
    switch(type) {
      case 'jaguar':
        this.player.setTint(0x444444);
        break;
      case 'eagle':
        this.gameSpeed = Math.max(this.gameSpeed * 0.6, 100);
        this.physics.world.timeScale = 0.7;
        this.player.setTint(0xFFD700);
        break;
      case 'quetzal':
        this.player.setTint(0x00FF00);
        break;
    }
    
    this.updatePowerIndicator();
  }

  updateActivePowers(now) {
    let powersChanged = false;
    
    for (let type in this.activePowers) {
      if (this.activePowers[type].active && now >= this.activePowers[type].endTime) {
        this.deactivatePower(type);
        powersChanged = true;
      }
    }
    
    if (powersChanged) {
      this.updatePowerIndicator();
    }
  }

  deactivatePower(type) {
    this.activePowers[type].active = false;
    
    switch(type) {
      case 'jaguar':
      case 'quetzal':
        if (!this.activePowers.eagle.active) {
          this.player.clearTint();
        }
        break;
      case 'eagle':
        this.physics.world.timeScale = 1;
        if (!this.activePowers.jaguar.active && !this.activePowers.quetzal.active) {
          this.player.clearTint();
        }
        break;
    }
  }

  updatePowerIndicator() {
    let text = "";
    
    if (this.activePowers.jaguar.active) text += "🐆 Invulnerabilidad ";
    if (this.activePowers.eagle.active) text += "🦅 Tiempo lento ";
    if (this.activePowers.quetzal.active) text += "🕊️ x2 Puntos ";
    
    this.powerIndicatorText.setText(text);
  }

  showCulturalMessage(config) {
    const message = this.add.text(400, 250, config.message, {
      fontSize: "20px",
      fill: "#FFD700",
      fontStyle: "bold",
      align: "center",
      stroke: "#000",
      strokeThickness: 4
    }).setOrigin(0.5);
    
    const nahuatlText = this.add.text(400, 290, config.nahuatl, {
      fontSize: "14px",
      fill: "#FFF",
      fontStyle: "italic",
      align: "center",
      stroke: "#000",
      strokeThickness: 3
    }).setOrigin(0.5);
    
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

  // ========== UTILIDADES ==========

  updateScoreDisplay() {
    if (!this.scoreText) return;
    const speedMultiplier = (1 + (this.score * 0.1)).toFixed(1);
    let text = `Puntos: ${this.score} | Velocidad: ${speedMultiplier}x`;
    if (this.isPaused) text += " | PAUSA";
    this.scoreText.setText(text);
  }

  togglePause() {
    if (this.gameOver || !this.gameStarted) return;

    if (!this.isPaused) {
      this.isPaused = true;
      this.physics.world.pause();
      if (this.obstacleTimer) this.obstacleTimer.paused = true;

      this.pauseOverlay = this.add.graphics();
      this.pauseOverlay.fillStyle(0x000000, 0.6);
      this.pauseOverlay.fillRect(0, 0, 800, 600);

      this.pauseMessage = this.add.text(400, 300, "Juego en pausa\nPresiona ESC para continuar", {
        fontSize: "28px",
        fill: "#ffffff",
        align: "center",
        fontStyle: "bold",
        lineSpacing: 10
      }).setOrigin(0.5);
    } else {
      this.isPaused = false;
      this.physics.world.resume();
      if (this.obstacleTimer) this.obstacleTimer.paused = false;

      if (this.pauseOverlay) {
        this.pauseOverlay.destroy();
        this.pauseOverlay = null;
      }

      if (this.pauseMessage) {
        this.pauseMessage.destroy();
        this.pauseMessage = null;
      }
    }

    this.updateScoreDisplay();
  }

  hitObstacle() {
    if (this.activePowers.jaguar.active) return;
    
    // FASE 3: Detener música del juego
    if (this.gameMusic) {
      this.gameMusic.stop();
    }
    
    this.physics.pause();
    if (this.obstacleTimer) this.obstacleTimer.paused = true;

    if (this.pauseOverlay) {
      this.pauseOverlay.destroy();
      this.pauseOverlay = null;
    }

    if (this.pauseMessage) {
      this.pauseMessage.destroy();
      this.pauseMessage = null;
    }

    this.isPaused = false;
    this.player.setTint(0xff0000);
    this.gameOver = true;
    
    this.scoreText.setText(`¡Fin del vuelo! Puntos: ${this.score}\n\nPresiona ESPACIO para ver resultados`);
    this.scoreText.setFontSize("20px");
    this.scoreText.setAlign("center");
    this.scoreText.setPosition(400, 300);
    this.scoreText.setOrigin(0.5);
  }
}

