# 🎮 Quetzalcóatl Runner

## 🌞 Descripción general
**Quetzalcóatl Runner** es un videojuego educativo y cultural inspirado en la mitología mexicana.  
El jugador controla a **Quetzalcóatl**, la **Serpiente Emplumada**, en su vuelo sagrado a través de los cielos del Anáhuac.  
Durante su travesía deberá **esquivar obstáculos** y **recolectar plumas sagradas** que representan los poderes de los guardianes del equilibrio: el **Jaguar**, el **Águila** y el **Quetzal**.

El juego combina historia, simbolismo mesoamericano y aprendizaje técnico, desarrollado con **HTML, CSS y JavaScript**, con posibilidad de ampliarse mediante **Phaser 3**.

---

## 🧩 Objetivos del juego
- Controlar a Quetzalcóatl mientras vuela a través del cielo.  
- Evitar obstáculos que representan el caos o el desequilibrio.  
- Recolectar plumas sagradas que otorgan poderes temporales.  
- Acumular puntos y alcanzar el vuelo más largo posible.  
- Aprender sobre la cosmovisión mesoamericana, la biodiversidad y la fauna mexicana.

---

## 🐍 Personaje principal: Quetzalcóatl
- **Representa:** Sabiduría, viento, conocimiento y equilibrio.  
- **Movimiento:** Deslizamiento horizontal con salto o flote controlado por el jugador.  
- **Sprite:** Imagen PNG o sprite sheet con animación sencilla.  
- **Habilidad base:** Vuelo estable con gravedad controlada.  

> “Quetzalcóatl une la tierra y el cielo, la serpiente y el viento, la materia y el espíritu.”

---

## 🪶 Plumas sagradas y poderes
Cada pluma simboliza el vínculo entre Quetzalcóatl y los tres guardianes del mundo:

| Animal | Pluma | Poder / Efecto | Duración |
|---------|--------|----------------|-----------|
| 🐆 **Jaguar Nocturno** | Negra | Invulnerabilidad temporal (modo sombra) | 3 s |
| 🦅 **Águila Solar** | Dorada | Vuelo alto y ralentización del tiempo | 5 s |
| 🕊️ **Quetzal Celestial** | Verde | Duplica la puntuación obtenida | 5 s |

Cada vez que se recolecta una pluma, aparece un mensaje cultural o una frase náhuatl alusiva al animal y su simbolismo.

---

## 🌄 Escenario y ambientación
- **Ubicación:** Cielos del Valle de México, montañas de Teotihuacán y selvas de Chiapas, hábitat del quetzal resplendente.  
- **Fondos:** Pirámides, montañas, soles y glifos mesoamericanos.  
- **Estilo visual:** Inspirado en códices mexicas (Borgia y Borbónico) y arte tolteca.  
- **Colores:** Dorado, turquesa, verde jade y rojo carmesí.  
- **Música:** Instrumentos prehispánicos: ocarinas, teponaztli, flautas y caracoles.  

---

## ⚙️ Mecánicas del juego
- Movimiento automático del fondo (efecto de desplazamiento).  
- Control de salto o vuelo con la tecla **Espacio**.  
- Obstáculos: rocas, glifos y rayos solares.  
- Recolección de plumas y activación de poderes especiales.  
- **Velocidad progresiva**: el juego se vuelve más desafiante con el tiempo.  
- **Pausa (P)** y **Reinicio (R)** disponibles.  
- Puntuación progresiva según el tiempo y los objetos recolectados.  
- Pantalla de **“Fin del vuelo”** con frase cultural o proverbio náhuatl.

---

## 🧱 Estructura de archivos del proyecto
```
/quetzalcoatl-runner/
├── index.html
├── style.css
├── game.js
├── main-menu.html          # Pantalla inicial (opcional, Fase 3)
├── game-over.html          # Pantalla final (opcional)
├── assets/
│   ├── quetzalcoatl.png
│   ├── pluma-aguila.png
│   ├── pluma-jaguar.png
│   ├── pluma-quetzal.png
│   ├── fondo-teotihuacan.png
│   ├── roca.png
│   ├── viento.mp3
│   ├── musica-prehispanica.mp3
│   └── README.md
```

---

## 🧠 Fases del desarrollo

### **FASE 1 – Prototipo base**
- Quetzalcóatl como personaje principal.  
- Movimiento, colisiones y puntuación.  
- Fondo y obstáculos básicos.

### **FASE 2 – Plumas sagradas**
- Recolección de plumas con efectos de poder.  
- Mensajes culturales y efectos sonoros.  

### **FASE 3 – Expansión narrativa**
- Pantalla de inicio con introducción mitológica.  
- Música ambiental y proverbios náhuatl.  
- Créditos y mensajes de conservación de fauna mexicana.

---

## 🌎 Valor educativo y cultural
El juego busca fomentar el conocimiento de la **mitología prehispánica mexicana**, la **biodiversidad** y el **orgullo cultural**, integrando elementos reales de la fauna y filosofía mesoamericana.  

> “Quetzalcóatl Runner transmite la herencia simbólica del México antiguo, conectando tecnología, arte y naturaleza para inspirar respeto por la diversidad cultural y ecológica del país.”

---

## 👩🏽‍💻 Créditos y herramientas
**Autora:** Heladia Salgado Osorio  
**Asistencia técnica:** IA (ChatGPT - GPT‑5)  
**Inspiración cultural:** Mitología mexica y tolteca; fauna mexicana (Quetzal, Águila real, Jaguar).  
**Referencias visuales:** Códice Borgia, Códice Borbónico, arte prehispánico.  
**Lenguajes:** HTML, CSS, JavaScript  
**Framework opcional:** Phaser 3  
**Licencia:** Uso educativo / no comercial  

---

## 🏁 Estado actual del proyecto
✅ Diseño conceptual completo  
🕹️ En desarrollo: Fase 1 (versión base jugable)  
🚀 Próximas etapas: Integración de plumas y narrativa cultural  

---

© 2025 Heladia Salgado Osorio — *Proyecto educativo inspirado en la cosmovisión mesoamericana y la programación creativa.*
