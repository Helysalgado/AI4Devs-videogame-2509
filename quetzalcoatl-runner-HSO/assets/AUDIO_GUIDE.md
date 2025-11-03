# 🎵 Guía de Audio - Quetzalcóatl Runner

## 📁 Estructura de Carpetas

```
assets/
└── audio/
    ├── menu-music.mp3       (Música de menú)
    ├── game-music.mp3       (Música durante el juego)
    ├── collect.mp3          (Recolectar pluma)
    ├── powerup.mp3          (Activar poder)
    └── hit.mp3              (Colisión/Game Over)
```

---

## 🎼 Música Recomendada

### Instrumentos Prehispánicos:
- **Ocarina** (aerófono de barro)
- **Teponaztli** (tambor de madera)
- **Huehuetl** (tambor vertical)
- **Ayotl** (caparazón de tortuga)
- **Tlapitzalli** (flauta)
- **Ayacachtli** (sonajas)

### Características Musicales:
- **Tonalidad**: Pentatónica (común en música mesoamericana)
- **Tempo**: Moderado para el menú (60-80 BPM), más rápido en juego (100-120 BPM)
- **Duración**: 1-3 minutos (loop continuo)
- **Formato**: MP3, OGG o WAV
- **Tamaño**: < 2MB por archivo

---

## 🔊 Efectos de Sonido

### 1. **collect.mp3** - Recolectar Pluma
- **Duración**: 0.5-1 segundo
- **Tono**: Agudo, cristalino
- **Sensación**: Recompensa, logro
- **Instrumentos sugeridos**: Cascabeles, campanitas, sonajas

### 2. **powerup.mp3** - Activar Poder
- **Duración**: 1-2 segundos
- **Tono**: Ascendente, místico
- **Sensación**: Poder, transformación
- **Instrumentos sugeridos**: Flauta ascendente, resonancia profunda

### 3. **hit.mp3** - Colisión
- **Duración**: 0.5-1 segundo
- **Tono**: Grave, contundente
- **Sensación**: Impacto, finalización
- **Instrumentos sugeridos**: Teponaztli, tambor bajo

---

## 🎨 Recursos para Obtener Audio

### Música Libre de Derechos:
1. **Freesound.org** (búsqueda: "prehispanic", "aztec", "indigenous")
2. **YouTube Audio Library** (filtrar por "World Music")
3. **Incompetech.com** (Kevin MacLeod - Música libre)
4. **Purple Planet Music** (World Music section)

### Efectos de Sonido:
1. **Freesound.org**
2. **Zapsplat.com**
3. **Sonniss GDC Game Audio Bundles** (gratis anualmente)

### Generadores de Audio con IA:
1. **Suno AI** (música)
2. **Mubert AI** (música)
3. **ElevenLabs** (efectos)

---

## 💻 Implementación en el Código

### 1. Descomenta las líneas en `GameScene.js`:

```javascript
// En preload():
this.load.audio('game-music', 'assets/audio/game-music.mp3');
this.load.audio('collect-feather', 'assets/audio/collect.mp3');
this.load.audio('power-up', 'assets/audio/powerup.mp3');
this.load.audio('hit', 'assets/audio/hit.mp3');

// En create():
this.gameMusic = this.sound.add('game-music', {
  loop: true,
  volume: 0.5
});
this.gameMusic.play();
```

### 2. Agregar efectos en eventos:

```javascript
// Al recolectar pluma (en collectFeather):
this.sound.play('collect-feather', { volume: 0.6 });

// Al activar poder (en activatePower):
this.sound.play('power-up', { volume: 0.7 });

// Al chocar (en hitObstacle):
this.sound.play('hit', { volume: 0.8 });
if (this.gameMusic) this.gameMusic.stop();
```

### 3. Agregar música en `MenuScene.js`:

```javascript
// En preload():
this.load.audio('menu-music', 'assets/audio/menu-music.mp3');

// En create():
this.menuMusic = this.sound.add('menu-music', {
  loop: true,
  volume: 0.4
});
this.menuMusic.play();

// Al cambiar de escena:
if (this.menuMusic) this.menuMusic.stop();
```

---

## 🎛️ Control de Volumen (Opcional)

### Agregar botones de mute/unmute:

```javascript
// En create() de cualquier escena:
const muteButton = this.add.text(750, 20, "🔊", {
  fontSize: "24px"
}).setOrigin(0.5);

muteButton.setInteractive();
muteButton.on('pointerdown', () => {
  this.sound.mute = !this.sound.mute;
  muteButton.setText(this.sound.mute ? "🔇" : "🔊");
});
```

---

## 📝 Especificaciones Técnicas

### Formatos Soportados:
- **MP3**: Mejor compatibilidad
- **OGG**: Alternativa para algunos navegadores
- **WAV**: Mayor calidad pero más pesado

### Configuración Recomendada:
- **Sample Rate**: 44.1 kHz o 48 kHz
- **Bitrate**: 128-192 kbps para música, 64-96 kbps para efectos
- **Canales**: Stereo para música, Mono para efectos

### Optimización:
```bash
# Convertir a MP3 con FFmpeg:
ffmpeg -i input.wav -codec:a libmp3lame -b:a 128k output.mp3

# Normalizar volumen:
ffmpeg -i input.mp3 -filter:a "volume=0.5" output.mp3
```

---

## 🎵 Prompts para Generar Música con IA

### Para Suno AI o Mubert:

**Música de Menú:**
```
Create ambient world music inspired by pre-Columbian Mesoamerican instruments,
featuring ocarina, wooden drums (teponaztli), and flutes. Slow tempo, mystical 
atmosphere, pentatonic scale, sacred and ceremonial mood, 60-80 BPM, loop-ready
```

**Música de Juego:**
```
Create energetic world music inspired by indigenous Mexican instruments, 
featuring teponaztli drums, ocarinas, and rattles. Medium-fast tempo, 
adventurous and dynamic, pentatonic scale, 100-120 BPM, seamless loop
```

**Efecto de Recolección:**
```
Short magical chime sound, crystalline bells, ascending pitch, 
positive reward feedback, 0.5 seconds, bright and cheerful
```

**Efecto de Poder:**
```
Mystical power-up sound, ethereal transformation, ascending flute melody,
deep resonance, magical activation, 1-2 seconds
```

**Efecto de Colisión:**
```
Impact sound, wooden percussion hit, short drum thud, game over feedback,
0.5 seconds, definitive and clear
```

---

## ⚠️ Notas Importantes

1. **Derechos de Autor**: Asegúrate de usar música libre de derechos o con licencia adecuada
2. **Tamaño de Archivos**: Mantén el tamaño total de audio < 5MB para carga rápida
3. **Fallback**: El juego debe funcionar incluso si los archivos de audio no están disponibles
4. **Autoplay**: Algunos navegadores bloquean autoplay; el audio puede requerir interacción del usuario

---

## ✅ Checklist de Implementación

- [ ] Crear carpeta `assets/audio/`
- [ ] Obtener/generar archivos de música
- [ ] Obtener/generar efectos de sonido
- [ ] Optimizar tamaño de archivos
- [ ] Descoment

ar código de audio en las escenas
- [ ] Probar en diferentes navegadores
- [ ] Ajustar volúmenes relativos
- [ ] (Opcional) Agregar controles de volumen/mute

---

## 🎯 Estado Actual

**Audio implementado:** ❌ No (código preparado, archivos pendientes)  
**Código listo:** ✅ Sí (comentado en GameScene.js y MenuScene.js)  
**Archivos necesarios:** 5 (2 músicas + 3 efectos)

---

*El juego funciona perfectamente sin audio. Los archivos de sonido son opcionales pero mejoran significativamente la experiencia.*

