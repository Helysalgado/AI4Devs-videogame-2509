# 📝 Historial de Desarrollo - Quetzalcóatl Runner

## 🎮 Información del Proyecto

**Proyecto:** Quetzalcóatl Runner  
**Autora:** Heladia Salgado Osorio  
**Asistente IA:** Claude Sonnet 4.5 (Cursor AI)  
**Framework:** Phaser 3  
**Tecnologías:** HTML5, CSS3, JavaScript  
**Fecha de inicio:** Noviembre 2024  
**Estado actual:** FASE 2 completada  

---

## 📖 Descripción del Proyecto

Videojuego educativo y cultural inspirado en la mitología mexicana. El jugador controla a **Quetzalcóatl**, la Serpiente Emplumada, en su vuelo sagrado a través de los cielos del Anáhuac, esquivando obstáculos y recolectando plumas sagradas que otorgan poderes especiales.

**Objetivos:**
- Combinar entretenimiento con educación cultural
- Representar la cosmovisión mesoamericana
- Promover el conocimiento de la fauna mexicana (Jaguar, Águila, Quetzal)

---

## 🛠️ Cronología de Desarrollo

### **Sesión 1: Configuración Inicial y Optimización de Assets**

#### Prompt 1: Inicio del proyecto
```
Tengo @index.html y quiero correrlo para ver su funcionamiento
```

**Respuesta:**
- Explicación de cómo ejecutar el juego (opciones: abrir directamente, servidor local con Python, Live Server)
- Comando recomendado: `python3 -m http.server 8000`

#### Prompt 2: Optimización de imágenes
```
El tamaño de imagen recomendadas para un juego
```

**Acción:**
- Análisis de imágenes existentes (demasiado grandes: 3.2-3.3MB)
- Optimización con `sips`:
  - `quetzalcoatl.png`: 400×575 → 89×128 (168KB → 24KB)
  - `obstaculo.png`: 1024×1536 → 85×128 (3.3MB → 20KB)
  - `fondo.png`: 1536×1024 → 800×600 (3.2MB → 956KB)
- **Resultado:** Reducción del 85% en tamaño total (de 6.6MB a 1MB)

---

### **Sesión 2: FASE 1 - Mejoras de Jugabilidad**

#### Prompt 3: Problemas de duración y distribución
```
El juego dura muy poco ... y me gustaría que los obstáculos estén mejor distribuidos. Que me recomiendas?
```

**Análisis de problemas:**
1. Obstáculos en posiciones completamente aleatorias (100-500px)
2. Frecuencia muy alta (cada 1.5 segundos)
3. Gravedad muy fuerte (800)
4. Impulso de salto brusco

**Solución implementada: Opción C - Sistema Avanzado**
- Dificultad progresiva basada en puntuación
- Patrones de obstáculos predefinidos (5 alturas: 120, 200, 300, 400, 480)
- Sistema de selección inteligente:
  - Score 0-10: 3 alturas
  - Score 10-20: 4 alturas
  - Score 20+: 5 alturas
- Velocidad progresiva (+15px/s cada 5 puntos)
- Frecuencia dinámica (de 2500ms a 1200ms mínimo)
- Gravedad reducida (800 → 600)
- Hitboxes más justas (70-80% del sprite)

#### Prompt 4: Mejora de controles
```
1. Quiero que el juego no se detenga, hasta que el usuario suelte la barra.
2. Puedes poner un tablero indicando las teclas que se usan, para que el usuario sepa.
```

**Implementación:**
1. **Vuelo continuo:**
   - Sistema de vuelo tipo Flappy Bird
   - MANTENER ESPACIO = vuelo ascendente continuo
   - SOLTAR ESPACIO = caída por gravedad

2. **Panel de instrucciones:**
   - Modal centrado con fondo semitransparente y borde dorado
   - Instrucciones claras con emojis
   - Desaparece al iniciar el juego
   - Mini-guía persistente en la parte inferior

#### Prompt 5: Sistema de pausa
```
Podrías agregar que el juego se detiene cuando le das la tecla Esc o choca con un obstáculo?
```

**Funcionalidades añadidas:**
- Tecla ESC para pausar/reanudar
- Overlay semitransparente durante pausa
- Mensaje "Juego en pausa / Presiona ESC para continuar"
- Indicador "| PAUSA" en el HUD
- Física del mundo se pausa/reanuda correctamente
- Timer de obstáculos se detiene

---

### **Sesión 3: Nuevos Obstáculos Especiales**

#### Prompt 6: Obstáculos mitológicos
```
Me gustaría agregar 2 obstáculos más:
1. mictlantecuhtli.png - Señor del inframundo
2. xiuhnel.png - Lluvia de estrellas (Xiuhnel)
```

**Implementación:**

1. **Mictlantecuhtli (Señor del Inframundo):**
   - Aparición espectral con efecto de fade-in/fade-out
   - Movimiento más lento que obstáculos normales
   - Aparece desde score ≥ 3
   - Cooldown: 6 segundos
   - Valor: 3 puntos
   - Efecto visual: Alpha parpadeante (0.2 → 1 → 0.95)

2. **Xiuhnel (Lluvia de Meteoros):**
   - Lluvia diagonal de 3-4 meteoros
   - Trayectoria inclinada (-35°)
   - Rotación animada (100°/s)
   - Aparece desde score ≥ 1
   - Cooldown: 4 segundos
   - Spawn en posiciones escalonadas

**Optimización de imágenes:**
- `mictlantecuhtli.png`: 1024×1536 → 170×256 (3.2MB → 88KB)
- `xiuhnel.png`: 1024×1536 → 133×200 (2.5MB → 40KB)

#### Prompt 7: Problemas de visualización
```
No puedo ver los nuevos obstáculos.
```

**Ajustes realizados:**
- Reducción de requisitos de score (8→3 para Mictlan, 4→1 para Xiuhnel)
- Aumento de probabilidad de aparición (25%→35% y 40%)
- Reducción de cooldowns (9s→6s y 6s→4s)
- Ajuste de escalas para mejor visibilidad

---

### **Sesión 4: Sistema de Reinicio**

#### Prompt 8: El juego se congela
```
El juego se detiene, mira la imagen. Quiero que no se detenga.
```

**Problema identificado:**
- Al chocar, el juego quedaba congelado sin opción de reinicio

**Solución implementada:**
- Función `restartGame()` completa
- Al morir: mostrar "Presiona ESPACIO para reiniciar"
- Reseteo de todas las variables (score, velocidad, dificultad, timers)
- Limpieza de todos los obstáculos
- Quetzalcóatl vuelve a posición inicial
- Panel de instrucciones reaparece
- Flujo: Jugar → Morir → [ESPACIO] → Reiniciar

---

## 🪶 FASE 2: Plumas Sagradas

### **Sesión 5: Implementación Completa del Sistema de Poderes**

#### Prompt 9: Pasar a la siguiente fase
```
Pasemos a la fase 2
```

**Sistema de Plumas Sagradas implementado:**

#### 1. **Configuración de Plumas**
```javascript
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
    nahuatl: '"Cuix oc nelli nemohua in tlalticpac?"'
  },
  quetzal: {
    name: 'Quetzal Celestial',
    color: 0x00FF00,
    power: 'Doble puntuación',
    duration: 5000,
    message: '🕊️ Quetzaltōtōtl - El quetzal multiplica tu sabiduría',
    nahuatl: '"Xōchitl, cuīcatl" (Flor y canto)'
  }
}
```

#### 2. **Mecánicas de Spawn**
- Aparecen desde score ≥ 2
- Cada 8 segundos
- Probabilidad: 50%
- Selección aleatoria entre los 3 tipos
- Posición Y aleatoria (150-450px)
- Velocidad: -120px/s

#### 3. **Efectos Visuales**
- Parpadeo y escalado (alpha: 1 → 0.7, scale: ×1.2)
- Flotación vertical (±20px)
- Rotación suave (-10° → +10°)
- Animaciones con `Phaser.Tweens`

#### 4. **Poderes Implementados**

| Poder | Efecto | Duración | Visual |
|-------|--------|----------|--------|
| 🐆 **Jaguar** | Invulnerabilidad total | 3s | Tinte gris |
| 🦅 **Águila** | Ralentización 70% | 5s | Tinte dorado |
| 🕊️ **Quetzal** | Puntos ×2 | 5s | Tinte verde |

#### 5. **Sistema de Mensajes Culturales**
- Mensaje principal en español
- Frase en náhuatl
- Aparece al recolectar pluma
- Fade out después de 3 segundos
- Fuente dorada con borde negro

#### 6. **Indicador HUD**
- Muestra poderes activos en tiempo real
- Posición: Debajo del score
- Actualización automática
- Desaparece cuando expira el poder

#### 7. **Integración con Colisiones**
- Jaguar: `hitObstacle()` retorna temprano si está activo
- Águila: Afecta `gameSpeed` y `physics.world.timeScale`
- Quetzal: Multiplica puntos en `update()`

---

### **Sesión 6: Preparación de Sprites PNG**

#### Prompt 10: Crear assets visuales
```
hagamos imagenes png
```

**Documentación creada:**

1. **`assets/PLUMAS_README.md`:**
   - Especificaciones técnicas (128×128px, PNG transparente)
   - Descripción visual de cada pluma
   - Prompts para generadores de IA
   - Recursos y herramientas sugeridas

2. **`assets/PROMPTS_IA.md`:**
   - Prompts detallados para 3 estilos:
     - Realista
     - Códice Mexica (recomendado)
     - Pixel Art
   - Para múltiples plataformas (DALL-E, Leonardo.ai, Bing, Midjourney)
   - Instrucciones de post-procesamiento
   - Paleta de colores exacta

**Código actualizado:**
```javascript
// Preload con fallback automático
function preload() {
  this.load.image("pluma-jaguar", "assets/pluma-jaguar.png");
  this.load.image("pluma-aguila", "assets/pluma-aguila.png");
  this.load.image("pluma-quetzal", "assets/pluma-quetzal.png");
}

// Sistema inteligente: PNG si existe, círculo si no
try {
  feather = this.add.sprite(850, y, spriteKeys[featherType]);
} catch (error) {
  feather = this.add.circle(850, y, 15, config.color);
}
```

---

## 🌟 FASE 3: Expansión Narrativa

### **Sesión 7: Sistema de Múltiples Escenas y Narrativa Cultural**

#### Prompt 11: Implementar FASE 3
```
Pasemos a la fase 3
```

**Implementación completa del sistema de escenas:**

#### 1. **MenuScene.js - Pantalla de Inicio**
- Introducción mitológica completa
- Cita en náhuatl: "In Quetzalcōātl tonacayouh"
- Sprite animado de Quetzalcóatl
- Botón de inicio con animación parpadeante
- Transiciones suaves con fade in/out
- Créditos básicos en pie de página

**Elementos culturales:**
```
"La Serpiente Emplumada vuela a través
de los cielos del Anáhuac, buscando
el equilibrio entre la tierra y el viento.

Recolecta las plumas sagradas de los
tres guardianes: Jaguar, Águila y Quetzal."
```

#### 2. **GameScene.js - Escena Principal**
- Conversión completa del juego a clase de Phaser
- Toda la lógica de las Fases 1 y 2 integrada
- Sistema de reinicio que lleva a GameOverScene
- Contador de plumas recolectadas
- Preparación para audio (comentado)

**Estructura de clase:**
- Constructor con inicialización de variables
- preload() - Carga de assets
- create() - Configuración inicial
- update() - Loop del juego
- 20+ métodos auxiliares

#### 3. **GameOverScene.js - Pantalla Final**
- Estadísticas del juego (puntos, plumas recolectadas)
- **3 Mensajes de conservación** (rotativos):
  - 🐆 Jaguar Mexicano (4,000 ejemplares)
  - 🦅 Águila Real (<150 parejas reproductoras)
  - 🕊️ Quetzal (hábitat amenazado)

- **5 Proverbios náhuatl** (rotativos):
  - "Tiquitztoqueh in tlalticpac" - Somos soñadores
  - "In ixtli, in yollotl" - El rostro, el corazón
  - "Tlazocamati" - Gracias/Te amo
  - "Nican mopohua" - Aquí se cuenta
  - "Ometeotl" - La dualidad divina

- **Créditos completos**
- **Opciones**: Reiniciar o volver al menú

#### 4. **main.js - Configuración Principal**
```javascript
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
```

#### 5. **Flujo de Escenas**
```
MenuScene → [ESPACIO] → GameScene → [Game Over] → GameOverScene
    ↑                                                     ↓
    └──────────────────── [M] ←───────────────────────────┘
```

#### 6. **Sistema de Transiciones**
- Fade In al entrar a cada escena (1000ms)
- Fade Out al cambiar de escena (500ms)
- Animaciones suaves entre estados

#### 7. **Documentación de Audio**
- Archivo `AUDIO_GUIDE.md` creado
- Especificaciones detalladas de música
- Guía de efectos de sonido
- Prompts para generar audio con IA
- Instrucciones de implementación
- Recursos y herramientas sugeridas

**Archivos de audio necesarios:**
```
assets/audio/
├── menu-music.mp3    (Música de menú)
├── game-music.mp3    (Música de juego)
├── collect.mp3       (Recolectar pluma)
├── powerup.mp3       (Activar poder)
└── hit.mp3           (Colisión)
```

**Código preparado** (comentado en escenas):
```javascript
// this.load.audio('game-music', 'assets/audio/game-music.mp3');
// this.gameMusic = this.sound.add('game-music', { loop: true });
// this.sound.play('collect-feather', { volume: 0.6 });
```

---

## 📊 Estado Actual del Proyecto

### ✅ **FASE 1 - Completada**
- [x] Prototipo base funcional
- [x] Sistema de movimiento con vuelo continuo
- [x] Colisiones y puntuación
- [x] Fondo animado con scroll
- [x] Obstáculos básicos
- [x] Dificultad progresiva avanzada
- [x] Patrones de obstáculos inteligentes
- [x] Sistema de pausa (ESC)
- [x] Sistema de reinicio (ESPACIO)
- [x] Panel de instrucciones
- [x] Obstáculos especiales (Mictlantecuhtli, Xiuhnel)
- [x] Optimización de assets

### ✅ **FASE 2 - Completada**
- [x] Sistema de plumas sagradas
- [x] Tres tipos de poderes (Jaguar, Águila, Quetzal)
- [x] Mensajes culturales en español y náhuatl
- [x] Indicadores visuales en HUD
- [x] Efectos de poder (invulnerabilidad, ralentización, puntos ×2)
- [x] Animaciones de plumas
- [x] Sistema de spawn aleatorio
- [x] Integración con mecánicas existentes
- [x] Preparación para sprites PNG

### ✅ **FASE 3 - Completada**
- [x] Pantalla de inicio con introducción mitológica
- [x] Sistema de múltiples escenas (MenuScene, GameScene, GameOverScene)
- [x] Transiciones entre escenas con fade effects
- [x] Proverbios náhuatl adicionales (5 proverbios rotativos)
- [x] Pantalla de créditos integrada
- [x] Mensajes de conservación de fauna mexicana (3 mensajes rotativos)
- [x] Documentación completa de audio (pendiente agregar archivos)
- [ ] Música ambiental (archivos de audio pendientes)
- [ ] Efectos de sonido (archivos de audio pendientes)

---

## 🎨 Assets del Proyecto

### Imágenes Optimizadas:
```
assets/
├── fondo.png                (800×600, 956KB)
├── quetzalcoatl.png         (89×128, 24KB)
├── obstaculo.png            (85×128, 20KB)
├── mictlantecuhtli.png      (170×256, 88KB)
├── xiuhnel.png              (133×200, 40KB)
├── pluma-jaguar.png         (pendiente)
├── pluma-aguila.png         (pendiente)
└── pluma-quetzal.png        (pendiente)
```

### Documentación:
```
docs/
└── Quetzalcoatl_Runner_Description.md

assets/
├── PLUMAS_README.md
└── PROMPTS_IA.md
```

---

## 🎮 Mecánicas Principales

### Control:
- **ESPACIO** (mantener): Volar hacia arriba
- **ESPACIO** (soltar): Caer por gravedad
- **ESC**: Pausar/Reanudar
- **ESPACIO** (en game over): Reiniciar

### Sistema de Puntuación:
- Obstáculo regular: 1 punto
- Mictlantecuhtli: 3 puntos
- Meteoro: 1 punto
- Con poder Quetzal activo: Puntos ×2

### Dificultad Progresiva:
- Velocidad inicial: 150px/s
- Incremento: +15px/s cada 5 puntos
- Spawn delay: 2500ms → 1200ms mínimo
- Patrones de obstáculos se complejizan con el score

### Poderes Especiales:
1. **🐆 Jaguar (3s):** Atraviesa obstáculos sin morir
2. **🦅 Águila (5s):** Tiempo ralentizado al 70%
3. **🕊️ Quetzal (5s):** Doble puntuación

---

## 💻 Tecnologías y Herramientas Utilizadas

### Framework y Librerías:
- **Phaser 3.60.0** (desde CDN)
- JavaScript ES6+
- HTML5 Canvas

### Herramientas de Desarrollo:
- **Python http.server** - Servidor local
- **sips** (macOS) - Optimización de imágenes
- **Cursor AI** + Claude Sonnet 4.5 - Asistente de desarrollo

### Assets y Diseño:
- PNG con transparencia
- Gráficos vectoriales (fallback)
- Paleta de colores mesoamericana

---

## 📈 Métricas del Proyecto

### Código:
- **Líneas totales:** ~742 líneas
- **Funciones principales:** 25+
- **Archivos JavaScript:** 1 (game.js)
- **Archivos HTML:** 1 (index.html)
- **Archivos CSS:** 1 (style.css)

### Assets:
- **Imágenes optimizadas:** 5
- **Tamaño total assets:** ~1.1MB
- **Reducción de peso:** 85%

### Tiempo de Desarrollo:
- **Sesiones:** 6
- **Fases completadas:** 2/3
- **Tiempo estimado:** ~8-10 horas

---

## 🌟 Características Destacadas

### Educación Cultural:
- Mitología mexica auténtica
- Frases en náhuatl
- Simbolismo de fauna mexicana (Jaguar, Águila, Quetzal)
- Nombres en náhuatl (Yāōtl Ocelocopilli, Cuāuhtli Tōnatiuh, etc.)

### Experiencia de Juego:
- Curva de dificultad balanceada
- Controles intuitivos
- Feedback visual claro
- Sistema de poderes estratégico
- Reinicio rápido sin recargar página

### Calidad Técnica:
- Código modular y organizado
- Fallbacks automáticos
- Optimización de rendimiento
- Responsive y adaptable

---

## 🎯 Próximos Objetivos (FASE 3)

### Pantalla de Inicio:
- Logo del juego
- Introducción mitológica
- Menú principal
- Botón "Comenzar"

### Audio:
- Música de fondo (instrumentos prehispánicos)
- Efectos de sonido:
  - Recolección de plumas
  - Activación de poderes
  - Colisión con obstáculos
  - Game over

### Contenido Narrativo:
- Proverbios náhuatl aleatorios
- Información sobre conservación
- Créditos completos
- Enlaces educativos

---

## 📚 Referencias Culturales

### Personajes Mitológicos:
- **Quetzalcóatl:** Serpiente Emplumada, dios del viento y la sabiduría
- **Mictlantecuhtli:** Señor del Mictlán (inframundo)

### Fauna Mexicana:
- **Océelotl (Jaguar):** Guerrero de la noche
- **Cuāuhtli (Águila):** Guerrero del sol
- **Quetzaltōtōtl (Quetzal):** Ave sagrada

### Frases Náhuatl:
- "In ōcēlōtl, in cuāuhtli" - El jaguar, el águila
- "Cuix oc nelli nemohua in tlalticpac?" - ¿Acaso se vive de verdad en la tierra?
- "Xōchitl, cuīcatl" - Flor y canto

---

## 🤝 Colaboración

**Autora del Proyecto:** Heladia Salgado Osorio  
**Asistente IA:** Claude Sonnet 4.5 (Anthropic)  
**Plataforma:** Cursor AI Editor  
**Institución:** LIDR Academy - AI4Devs  
**Año:** 2024

---

## 📄 Licencia

Uso educativo / no comercial

---

## 🎉 Conclusión

**Quetzalcóatl Runner** es un proyecto que combina exitosamente:
- Desarrollo de videojuegos con Phaser 3
- Educación cultural mexicana
- Programación asistida por IA
- Optimización de assets
- Diseño de experiencia de usuario

El juego está funcional en su núcleo (Fases 1 y 2) y listo para expandirse con contenido narrativo y audiovisual (Fase 3).

---

*Documento generado: Noviembre 2024*  
*Última actualización: FASE 2 completada*

