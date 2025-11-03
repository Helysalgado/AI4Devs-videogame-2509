// ========== FASE 3: MENU SCENE ==========
// Pantalla de inicio con introducción mitológica

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    // Cargar assets para el menú
    this.load.image("fondo", "assets/fondo.png");
    this.load.image("quetzalcoatl", "assets/quetzalcoatl.png");
    
    // FASE 3: Música de fondo (si está disponible)
    this.load.audio('menu-music', 'assets/audio/menu-music.mp3');
  }

  create() {
    // FASE 3: Preparar música del menú (se reproducirá con la primera interacción)
    try {
      this.menuMusic = this.sound.add('menu-music', {
        loop: true,
        volume: 0.4
      });
    } catch (error) {
      console.warn('No se pudo cargar la música del menú:', error);
    }

    // Flag para saber si ya se intentó reproducir la música
    this.musicStarted = false;

    // Fondo
    this.add.tileSprite(400, 300, 800, 600, "fondo").setAlpha(0.7);
    
    // Overlay oscuro
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.6);
    overlay.fillRect(0, 0, 800, 600);

    // Título principal con efecto brillante
    const title = this.add.text(400, 100, "QUETZALCÓATL", {
      fontSize: "72px",
      fill: "#FFD700",
      fontFamily: "serif",
      fontStyle: "bold",
      stroke: "#8B4513",
      strokeThickness: 8
    }).setOrigin(0.5);

    const subtitle = this.add.text(400, 160, "RUNNER", {
      fontSize: "48px",
      fill: "#00CED1",
      fontFamily: "serif",
      fontStyle: "bold",
      stroke: "#1a1a1a",
      strokeThickness: 6
    }).setOrigin(0.5);

    // Animación de título
    this.tweens.add({
      targets: title,
      scale: { from: 1, to: 1.05 },
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Sprite de Quetzalcóatl animado
    const quetzal = this.add.sprite(400, 250, "quetzalcoatl").setScale(1.2);
    this.tweens.add({
      targets: quetzal,
      y: { from: 250, to: 270 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Introducción mitológica
    const intro = this.add.text(400, 360, 
      '"In Quetzalcōātl tonacayouh"\n' +
      '(Quetzalcóatl, nuestro sustento)\n\n' +
      'La Serpiente Emplumada vuela a través\n' +
      'de los cielos del Anáhuac, buscando\n' +
      'el equilibrio entre la tierra y el viento.\n\n' +
      'Recolecta las plumas sagradas de los\n' +
      'tres guardianes: Jaguar, Águila y Quetzal.',
      {
        fontSize: "16px",
        fill: "#FFFFFF",
        align: "center",
        lineSpacing: 8,
        fontFamily: "serif"
      }
    ).setOrigin(0.5);

    // Botón de inicio
    const startButton = this.add.text(400, 520, "PRESIONA ESPACIO PARA COMENZAR", {
      fontSize: "24px",
      fill: "#FFD700",
      fontFamily: "serif",
      fontStyle: "bold",
      stroke: "#000",
      strokeThickness: 4
    }).setOrigin(0.5);

    // Animación del botón
    this.tweens.add({
      targets: startButton,
      alpha: { from: 1, to: 0.3 },
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Créditos pequeños
    this.add.text(400, 580, "Por Heladia Salgado Osorio • AI4Devs 2024", {
      fontSize: "12px",
      fill: "#888",
      align: "center"
    }).setOrigin(0.5);

    // Iniciar música con cualquier tecla (para evitar bloqueo del navegador)
    this.input.keyboard.once('keydown', () => {
      this.startMenuMusic();
    });

    // Input para comenzar
    this.input.keyboard.once('keydown-SPACE', () => {
      this.startTransition();
    });

    // También permitir clic (inicia música y comienza el juego)
    this.input.on('pointerdown', () => {
      this.startMenuMusic();
      this.startTransition();
    });

    // Fade in inicial
    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  startMenuMusic() {
    // Intentar reproducir la música solo una vez
    if (!this.musicStarted && this.menuMusic) {
      this.musicStarted = true;
      this.menuMusic.play().catch(error => {
        console.warn('No se pudo reproducir la música del menú:', error);
      });
    }
  }

  startTransition() {
    // Detener música del menú
    if (this.menuMusic) {
      this.menuMusic.stop();
    }
    
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.time.delayedCall(500, () => {
      this.scene.start('GameScene');
    });
  }
}

