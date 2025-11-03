// ========== FASE 3: GAME OVER SCENE ==========
// Pantalla final con estadísticas, créditos y mensaje de conservación

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.feathersCollected = data.feathersCollected || 0;
  }

  create() {
    // Fondo con overlay
    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.9);

    // Mensaje principal
    this.add.text(400, 80, "¡FIN DEL VUELO!", {
      fontSize: "64px",
      fill: "#FFD700",
      fontFamily: "serif",
      fontStyle: "bold",
      stroke: "#8B4513",
      strokeThickness: 6
    }).setOrigin(0.5);

    // Estadísticas
    const statsBox = this.add.graphics();
    statsBox.fillStyle(0x1a1a1a, 0.8);
    statsBox.fillRoundedRect(250, 140, 300, 120, 10);
    statsBox.lineStyle(3, 0xFFD700);
    statsBox.strokeRoundedRect(250, 140, 300, 120, 10);

    this.add.text(400, 170, "ESTADÍSTICAS", {
      fontSize: "24px",
      fill: "#FFD700",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(400, 200, `Puntos: ${this.finalScore}`, {
      fontSize: "20px",
      fill: "#FFF"
    }).setOrigin(0.5);

    this.add.text(400, 230, `Plumas recolectadas: ${this.feathersCollected}`, {
      fontSize: "20px",
      fill: "#FFF"
    }).setOrigin(0.5);

    // Mensaje de conservación
    const conservationMessages = [
      {
        title: "🐆 El Jaguar Mexicano",
        text: "En peligro de extinción. Solo quedan\naproximadamente 4,000 jaguares en México.\n¡Ayuda a proteger su hábitat!"
      },
      {
        title: "🦅 El Águila Real",
        text: "Ave nacional de México, en riesgo por\npérdida de hábitat. Menos de 150 parejas\nreproductoras en vida silvestre."
      },
      {
        title: "🕊️ El Quetzal Mesoamericano",
        text: "Ave sagrada de los mayas y aztecas.\nHábitat amenazado por deforestación.\n¡Protejamos los bosques de niebla!"
      }
    ];

    const randomMessage = Phaser.Math.RND.pick(conservationMessages);

    const conservationBox = this.add.graphics();
    conservationBox.fillStyle(0x0a5f0a, 0.8);
    conservationBox.fillRoundedRect(150, 280, 500, 140, 10);
    conservationBox.lineStyle(3, 0x00FF00);
    conservationBox.strokeRoundedRect(150, 280, 500, 140, 10);

    this.add.text(400, 305, randomMessage.title, {
      fontSize: "22px",
      fill: "#00FF00",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(400, 360, randomMessage.text, {
      fontSize: "16px",
      fill: "#FFF",
      align: "center",
      lineSpacing: 6
    }).setOrigin(0.5);

    // Proverbio náhuatl
    const nahuatlProverbs = [
      {
        nahuatl: '"Tiquitztoqueh in tlalticpac"',
        spanish: '"Somos soñadores en esta tierra"'
      },
      {
        nahuatl: '"In ixtli, in yollotl"',
        spanish: '"El rostro, el corazón" (La personalidad)'
      },
      {
        nahuatl: '"Tlazocamati"',
        spanish: '"Gracias" (Te amo, te aprecio)'
      },
      {
        nahuatl: '"Nican mopohua"',
        spanish: '"Aquí se cuenta, aquí se relata"'
      },
      {
        nahuatl: '"Ometeotl"',
        spanish: '"La dualidad divina" (Equilibrio universal)'
      }
    ];

    const randomProverb = Phaser.Math.RND.pick(nahuatlProverbs);

    this.add.text(400, 445, randomProverb.nahuatl, {
      fontSize: "20px",
      fill: "#FFD700",
      fontStyle: "italic",
      fontFamily: "serif"
    }).setOrigin(0.5);

    this.add.text(400, 475, randomProverb.spanish, {
      fontSize: "16px",
      fill: "#CCC"
    }).setOrigin(0.5);

    // Créditos
    this.add.text(400, 515, "CRÉDITOS", {
      fontSize: "18px",
      fill: "#FFD700",
      fontStyle: "bold"
    }).setOrigin(0.5);

    this.add.text(400, 545, 
      "Diseño y Desarrollo: Heladia Salgado Osorio\n" +
      "Asistente IA: Claude Sonnet 4.5 • Framework: Phaser 3\n" +
      "Inspiración: Mitología Mexica y Fauna Mexicana",
      {
        fontSize: "12px",
        fill: "#888",
        align: "center",
        lineSpacing: 4
      }
    ).setOrigin(0.5);

    // Botones
    const restartButton = this.add.text(300, 580, "REINICIAR (ESPACIO)", {
      fontSize: "16px",
      fill: "#FFD700",
      fontStyle: "bold"
    }).setOrigin(0.5);

    const menuButton = this.add.text(500, 580, "MENÚ (M)", {
      fontSize: "16px",
      fill: "#00CED1",
      fontStyle: "bold"
    }).setOrigin(0.5);

    // Animación de botones
    this.tweens.add({
      targets: [restartButton, menuButton],
      alpha: { from: 1, to: 0.5 },
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Input - usar 'once' para evitar acumulación de listeners
    this.input.keyboard.once('keydown-SPACE', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.time.delayedCall(500, () => {
        this.scene.start('GameScene');
      });
    });

    this.input.keyboard.once('keydown-M', () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.time.delayedCall(500, () => {
        this.scene.start('MenuScene');
      });
    });

    // Fade in
    this.cameras.main.fadeIn(1000, 0, 0, 0);
  }

  shutdown() {
    // Limpiar cualquier listener residual al salir de la escena
    this.input.keyboard.removeAllListeners();
  }
}

