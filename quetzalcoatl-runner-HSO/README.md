# 🐍 Quetzalcóatl Runner

<div align="center">

![Estado](https://img.shields.io/badge/Estado-Completado-success)
![Fase](https://img.shields.io/badge/Fase-3%2F3-blue)
![Framework](https://img.shields.io/badge/Framework-Phaser%203-orange)
![Licencia](https://img.shields.io/badge/Licencia-Educativo-green)

**Un videojuego educativo y cultural inspirado en la mitología mexicana**

[🎮 Características](#-características) • [🚀 Cómo Jugar](#-cómo-jugar) • [🛠️ Instalación](#️-instalación) • [📚 Documentación](#-documentación)

</div>

---

## 🌞 Descripción

**Quetzalcóatl Runner** es un videojuego tipo "endless runner" desarrollado con **Phaser 3**, que combina entretenimiento con educación cultural mexicana. El jugador controla a **Quetzalcóatl**, la legendaria Serpiente Emplumada, en su vuelo sagrado a través de los cielos del Anáhuac, esquivando obstáculos y recolectando plumas sagradas que otorgan poderes especiales.

### 🎯 Objetivos

- **Entretenimiento:** Mecánicas de juego dinámicas con dificultad progresiva
- **Educación Cultural:** Mitología mexica, frases en náhuatl y simbolismo prehispánico
- **Conservación:** Mensajes sobre la fauna mexicana en peligro de extinción
- **Aprendizaje Técnico:** Desarrollo con tecnologías web modernas y Phaser 3

---

## ✨ Características

### 🎮 Mecánicas de Juego

- **Control Intuitivo:** Mantén ESPACIO para volar, suelta para caer
- **Dificultad Progresiva:** La velocidad y complejidad aumentan con tu puntuación
- **Múltiples Obstáculos:**
  - 🪨 Rocas voladoras (obstáculo básico)
  - 💀 Mictlantecuhtli - Señor del Inframundo (aparición espectral)
  - ☄️ Xiuhnel - Lluvia de meteoros (trayectoria diagonal)
- **Sistema de Pausa:** Presiona ESC para pausar/reanudar
- **Reinicio Rápido:** Juega de nuevo sin recargar la página

### 🪶 Plumas Sagradas y Poderes

Recolecta las plumas de los tres guardianes para obtener poderes temporales:

| Pluma | Guardián | Poder | Duración | Efecto Visual |
|-------|----------|-------|----------|---------------|
| 🟡 **Jaguar** | Océelotl | Invulnerabilidad | 3s | Tinte gris |
| 🔴 **Águila** | Cuāuhtli | Ralentización 70% | 5s | Tinte dorado |
| 🟢 **Quetzal** | Quetzaltōtōtl | Puntos ×2 | 5s | Tinte verde |

Cada pluma recolectada muestra un mensaje cultural con frases en náhuatl auténticas.

### 🎭 Sistema de Escenas

1. **Menú Principal (MenuScene)**
   - Introducción mitológica
   - Cita en náhuatl: *"In Quetzalcōātl tonacayouh"*
   - Animaciones suaves y transiciones

2. **Juego Principal (GameScene)**
   - Física arcade con gravedad
   - Spawn dinámico de obstáculos
   - Indicadores de poderes activos
   - Panel de instrucciones

3. **Game Over (GameOverScene)**
   - Estadísticas finales
   - Mensajes rotativos de conservación (Jaguar, Águila Real, Quetzal)
   - Proverbios náhuatl aleatorios
   - Créditos completos

### 🎵 Audio Inmersivo

- **Música del Menú:** Ambiente contemplativo
- **Música del Juego:** Ritmo dinámico para la acción
- Sistema inteligente de reproducción (respeta políticas de autoplay del navegador)

### 🎨 Estilo Visual

- **Inspiración:** Códices mexicas (Borgia y Borbónico)
- **Paleta:** Dorado, turquesa, verde jade y rojo carmesí
- **Assets optimizados:** Reducción del 90%+ en tamaño
- **Animaciones fluidas:** Tweens de Phaser para movimientos suaves

---

## 🚀 Cómo Jugar

### 🎮 Controles

| Tecla | Acción |
|-------|--------|
| **ESPACIO** (mantener) | Volar hacia arriba |
| **ESPACIO** (soltar) | Caer por gravedad |
| **ESC** | Pausar/Reanudar |
| **M** | Volver al menú (en Game Over) |

### 📖 Instrucciones

1. **Inicio:** Presiona ESPACIO o haz clic en la pantalla de inicio
2. **Vuela:** Mantén presionada la barra espaciadora para ascender
3. **Esquiva:** Suelta la tecla para descender y evitar obstáculos
4. **Recolecta:** Atrapa las plumas sagradas para activar poderes
5. **Sobrevive:** Cada obstáculo esquivado suma puntos
6. **Supérate:** ¡Intenta alcanzar la mayor puntuación posible!

### 🏆 Sistema de Puntuación

- Obstáculo regular: **1 punto**
- Mictlantecuhtli: **3 puntos**
- Meteoro: **1 punto**
- **Con poder Quetzal activo: Puntos ×2**

---

## 🛠️ Instalación

### Requisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (para desarrollo)

### Opción 1: Ejecución Directa

```bash
# Clona el repositorio
git clone [URL_DEL_REPOSITORIO]
cd quetzalcoatl-runner-HSO

# Abre index.html en tu navegador
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Opción 2: Servidor Local (Recomendado)

```bash
# Python 3
python3 -m http.server 8000

# Luego abre en el navegador
# http://localhost:8000
```

### Opción 3: Live Server (VS Code)

1. Instala la extensión "Live Server" en VS Code
2. Clic derecho en `index.html`
3. Selecciona "Open with Live Server"

---

## 📁 Estructura del Proyecto

```
quetzalcoatl-runner-HSO/
├── index.html              # Punto de entrada
├── style.css               # Estilos globales
├── main.js                 # Configuración de Phaser
├── MenuScene.js            # Escena del menú
├── GameScene.js            # Escena principal del juego
├── GameOverScene.js        # Escena de fin de juego
├── game.js                 # Versión legacy (fase 1-2)
│
├── assets/                 # Recursos del juego
│   ├── quetzalcoatl.png    # Sprite del jugador (89×128, 24KB)
│   ├── fondo.png           # Fondo parallax (800×600, 956KB)
│   ├── obstaculo.png       # Obstáculo básico (85×128, 20KB)
│   ├── mictlantecuhtli.png # Señor del inframundo (170×256, 88KB)
│   ├── xiuhnel.png         # Meteoro (133×200, 40KB)
│   ├── pluma-jaguar.png    # Pluma amarilla (200×200, 27KB)
│   ├── pluma-aguila.png    # Pluma roja (200×200, 39KB)
│   ├── pluma-quetzal.png   # Pluma verde (200×200, 19KB)
│   │
│   ├── audio/
│   │   ├── menu-music.mp3  # Música del menú
│   │   └── game-music.mp3  # Música del juego
│   │
│   ├── backup/             # Respaldos de assets originales
│   ├── PLUMAS_README.md    # Guía de creación de plumas
│   ├── PROMPTS_IA.md       # Prompts para generar assets
│   └── AUDIO_GUIDE.md      # Guía de audio
│
├── docs/
│   └── Quetzalcoatl_Runner_Description.md  # Diseño original
│
├── AUDIO_IMPLEMENTATION.md  # Documentación de audio
├── prompts.md               # Historial completo de desarrollo
└── README.md                # Este archivo
```

---

## 🎓 Tecnologías

### Core
- **HTML5** - Estructura
- **CSS3** - Estilos
- **JavaScript ES6+** - Lógica del juego

### Framework
- **Phaser 3.60.0** - Motor de juego
- **Phaser.Physics.Arcade** - Sistema de física

### Herramientas de Desarrollo
- **Cursor AI** + Claude Sonnet 4.5 - Asistente IA
- **ChatGPT-5** - Diseño conceptual
- **sips** (macOS) - Optimización de imágenes
- **Git** - Control de versiones

---

## 📚 Documentación

### Archivos de Documentación

- **[prompts.md](prompts.md)** - Historial completo de desarrollo (939 líneas)
- **[docs/Quetzalcoatl_Runner_Description.md](docs/Quetzalcoatl_Runner_Description.md)** - Diseño original del juego
- **[AUDIO_IMPLEMENTATION.md](AUDIO_IMPLEMENTATION.md)** - Guía de integración de audio
- **[assets/PLUMAS_README.md](assets/PLUMAS_README.md)** - Especificaciones de sprites de plumas
- **[assets/PROMPTS_IA.md](assets/PROMPTS_IA.md)** - Prompts para generar assets con IA
- **[assets/AUDIO_GUIDE.md](assets/AUDIO_GUIDE.md)** - Guía completa de audio

### 🔬 Detalles Técnicos

#### Sistema de Dificultad Progresiva
```javascript
// La velocidad aumenta cada 5 puntos
gameSpeed = 150 + (Math.floor(score / 5) * 15);

// El spawn delay disminuye (min 1200ms)
spawnDelay = Math.max(1200, 2500 - (score * 50));

// Los patrones de obstáculos se hacen más complejos
if (score < 10) patterns = 3;      // Fácil
else if (score < 20) patterns = 4; // Medio
else patterns = 5;                 // Difícil
```

#### Patrones de Obstáculos
- **Alto:** 120px (requiere vuelo alto)
- **Medio-Alto:** 200px
- **Medio:** 300px (altura central)
- **Medio-Bajo:** 400px
- **Bajo:** 480px (requiere caída rápida)

---

## 🌍 Contenido Cultural

### Frases en Náhuatl

El juego incluye frases auténticas en náhuatl:

- **"In ōcēlōtl, in cuāuhtli"** - *El jaguar, el águila*
- **"Cuix oc nelli nemohua in tlalticpac?"** - *¿Acaso se vive de verdad en la tierra?*
- **"Xōchitl, cuīcatl"** - *Flor y canto*
- **"Tiquitztoqueh in tlalticpac"** - *Somos soñadores en esta tierra*
- **"In ixtli, in yollotl"** - *El rostro, el corazón*

### Conservación

Mensajes educativos sobre fauna mexicana en peligro:

- 🐆 **Jaguar Mexicano:** ~4,000 ejemplares
- 🦅 **Águila Real:** <150 parejas reproductoras
- 🕊️ **Quetzal Mesoamericano:** Hábitat amenazado por deforestación

---

## 📊 Métricas del Proyecto

### Código
- **~1,500 líneas** de código JavaScript
- **4 escenas** de Phaser (Menu, Game, GameOver)
- **35+ funciones** y métodos
- **10 sesiones** de desarrollo

### Assets
- **8 imágenes** optimizadas (~1.2MB total)
- **2 archivos** de audio
- **Reducción de peso:** 90%+ vs. assets originales

### Desarrollo
- **15 prompts** principales ejecutados
- **5 bugs** identificados y corregidos
- **3 fases** completadas al 100%
- **~12-15 horas** de desarrollo

---

## 🏆 Características Destacadas

### Técnicas
✅ Arquitectura modular con clases de Phaser  
✅ Manejo de browser autoplay policies  
✅ Sistema de transiciones fluidas  
✅ Gestión correcta de event listeners  
✅ Optimización agresiva de assets  
✅ Fallbacks automáticos  

### Culturales
✅ Mitología mexica auténtica  
✅ Frases en náhuatl con traducciones  
✅ Simbolismo de fauna mexicana  
✅ Mensajes de conservación  
✅ Referencias a códices históricos  

### Gameplay
✅ Dificultad progresiva balanceada  
✅ Controles intuitivos tipo Flappy Bird  
✅ Sistema de poderes estratégico  
✅ Feedback visual y auditivo claro  
✅ Flujo completo: Menú → Juego → Game Over  

---

## 🚀 Roadmap (Posibles Mejoras Futuras)

### Audio Adicional
- [ ] Efectos de sonido para recolección de plumas
- [ ] Sonidos de activación de poderes
- [ ] Efectos de colisión
- [ ] Música con instrumentos prehispánicos auténticos

### Gameplay Extendido
- [ ] Sistema de niveles o stages
- [ ] Boss fights (Tezcatlipoca, Tláloc)
- [ ] Tabla de puntuaciones (leaderboard)
- [ ] Sistema de logros/achievements

### Contenido Educativo
- [ ] Tooltips informativos sobre mitología
- [ ] Modo "Historia" con narración
- [ ] Glosario de términos náhuatl
- [ ] Enlaces a recursos educativos

### Técnico
- [ ] Adaptación responsive para móviles
- [ ] Touch controls
- [ ] Guardado de progreso (localStorage)
- [ ] Sprite sheets animados

---

## 👥 Créditos

### Desarrollo
**Autora:** Heladia Salgado Osorio  
**Institución:** LIDR Academy - AI4Devs  
**Año:** 2024-2025

### Asistencia IA
**Diseño Conceptual:** ChatGPT-5 (OpenAI)  
**Implementación:** Claude Sonnet 4.5 (Anthropic) via Cursor AI

### Inspiración Cultural
- Mitología Mexica y Tolteca
- Códice Borgia y Códice Borbónico
- Fauna Mexicana: Quetzal, Águila Real, Jaguar

### Tecnologías
- **Framework:** Phaser 3.60.0
- **Plataforma:** Cursor AI Editor
- **Optimización:** sips (macOS)

---

## 📄 Licencia

**Uso Educativo / No Comercial**

Este proyecto fue desarrollado con fines educativos para el programa AI4Devs de LIDR Academy. Libre uso para aprendizaje y fines educativos, con atribución apropiada.

---

## 🤝 Contribuciones

Este es un proyecto educativo completado. Si deseas crear tu propia versión o extensión:

1. Fork el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 💬 Contacto

**Heladia Salgado Osorio**  
📧 Email: heladia@ccg.unam.mx  
🎓 Programa: AI4Devs - LIDR Academy

---

## 🙏 Créditos y agradecimientos

- **LIDR Academy** por el programa AI4Devs
- **Anthropic** por Claude Sonnet 4.5
- **OpenAI** por ChatGPT-5
- **Phaser Community** por el excelente framework
- **Culturas Mesoamericanas** por su legado cultural


### Música

 1. Música del Menu del juego. War drums. Amaksi.  https://pixabay.com/es/music/search/tambores/. 3,820 pistas de música tambores libres de regalías.
 2. Música del juego. Himno a Quetzalcoatl. Cinematic Delirium. YouTube. https://www.youtube.com/watch?v=1AnFE_z7MUM


### Imágenes

1. Quetzalcóatl. Wikipedia. https://es.wikipedia.org/wiki/Quetzalc%C3%B3atl


## Créditos visuales:
Los sprites y elementos visuales (Quetzalcóatl, Xiuhnel, Mictlantecuhtli, plumas sagradas) fueron generados con inteligencia artificial (ChatGPT – OpenAI Image Generation Tool).
Autora y titular de derechos: Heladia Salgado Osorio.

---

<div align="center">

**🐍 Quetzalcóatl Runner 🪶**

*"In Quetzalcōātl tonacayouh"*  
*(Quetzalcóatl, nuestro sustento)*

**Versión 3.0 Final** • **Todas las Fases Completadas** ✅

---

⭐ Si te gustó este proyecto, ¡dale una estrella!

</div>

