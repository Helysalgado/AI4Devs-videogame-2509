# 🎨 Prompts para Generar Plumas con IA

## Herramientas Recomendadas
1. **DALL-E 3** (ChatGPT Plus) - Mejores resultados
2. **Leonardo.ai** - Gratuito, muy bueno
3. **Bing Image Creator** - Gratuito
4. **Midjourney** - Mejor calidad pero de pago

---

## 🐆 PLUMA DEL JAGUAR NOCTURNO

### Prompt Estilo Realista:
```
A mystical black feather floating in mid-air, obsidian black color with subtle 
dark gray highlights, indigenous Mesoamerican style, sacred jaguar warrior 
symbolism, sharp elegant shape, subtle texture details, dramatic lighting, 
game asset sprite, transparent background, PNG format, top-down view, 
high detail, 4K
```

### Prompt Estilo Códice Mexica (Recomendado):
```
A stylized black feather in ancient Mexican codex art style, bold flat colors, 
geometric patterns inspired by Aztec glyphs, obsidian black with gold accents, 
jaguar warrior symbolism, clean outlined shapes, indigenous Mesoamerican design, 
transparent background, game sprite, vector-like appearance, cultural iconography
```

### Prompt Estilo Pixel Art:
```
Pixel art black feather sprite, 64x64 pixels, retro 16-bit game style, 
obsidian black color, jaguar theme, clean pixels, transparent background, 
game collectible item, sharp edges
```

---

## 🦅 PLUMA DEL ÁGUILA SOLAR

### Prompt Estilo Realista:
```
A radiant golden feather glowing with solar energy, bright gold color 
(#FFD700) with orange highlights, indigenous Mesoamerican style, sacred 
eagle warrior symbolism, majestic flowing shape, sun ray effects, divine 
light, game asset sprite, transparent background, PNG format, top-down view, 
high detail, 4K
```

### Prompt Estilo Códice Mexica (Recomendado):
```
A stylized golden feather in ancient Mexican codex art style, bold flat colors, 
geometric sun patterns inspired by Aztec glyphs, brilliant gold with orange 
accents, eagle warrior symbolism, clean outlined shapes, radiating sun rays, 
indigenous Mesoamerican design, transparent background, game sprite, 
vector-like appearance, sacred iconography
```

### Prompt Estilo Pixel Art:
```
Pixel art golden feather sprite, 64x64 pixels, retro 16-bit game style, 
bright gold color with shine effect, eagle theme, clean pixels, transparent 
background, game power-up item, glowing effect
```

---

## 🕊️ PLUMA DEL QUETZAL CELESTIAL

### Prompt Estilo Realista:
```
A magnificent iridescent green feather with emerald and turquoise shimmer, 
quetzal bird feather, flowing elegant shape, metallic sheen, indigenous 
Mesoamerican style, sacred symbolism, vibrant green (#00FF00) with blue 
highlights, game asset sprite, transparent background, PNG format, 
top-down view, high detail, 4K
```

### Prompt Estilo Códice Mexica (Recomendado):
```
A stylized green feather in ancient Mexican codex art style, bold flat colors, 
geometric patterns inspired by Aztec glyphs, vibrant emerald green with 
turquoise accents, quetzal bird symbolism, clean outlined shapes, flowing 
elegant design, indigenous Mesoamerican iconography, transparent background, 
game sprite, vector-like appearance, sacred beauty
```

### Prompt Estilo Pixel Art:
```
Pixel art green feather sprite, 64x64 pixels, retro 16-bit game style, 
bright emerald green with blue shimmer, quetzal theme, clean pixels, 
transparent background, game treasure item, magical glow
```

---

## 📐 Especificaciones Técnicas

### Para DALL-E / Bing:
- Añade al final: `--ar 1:1 --v 5` para formato cuadrado
- Pide: "square format, centered, isolated object"

### Para Leonardo.ai:
- **Preset**: Leonardo Diffusion XL
- **Image Dimensions**: 512x512
- **Prompt Magic**: Activado
- **Alchemy**: Activado

### Para Midjourney:
- Añade: `--ar 1:1 --style raw --quality 2`
- Modelo: Midjourney V6

---

## 🛠️ Post-Procesamiento

### Después de generar:
1. **Remover fondo** (si no es transparente):
   - remove.bg (web, gratuito)
   - Photopea (web, gratuito)
   
2. **Redimensionar** a 128x128:
   ```bash
   sips -Z 128 pluma-jaguar.png
   sips -Z 128 pluma-aguila.png
   sips -Z 128 pluma-quetzal.png
   ```

3. **Optimizar tamaño**:
   - TinyPNG.com (web, gratuito)
   - Meta: <50KB por imagen

---

## 🎨 Paleta de Colores Exacta

```css
/* Jaguar - Negro Obsidiana */
--jaguar-main: #1a1a1a;
--jaguar-accent: #4a4a4a;

/* Águila - Dorado Solar */
--eagle-main: #FFD700;
--eagle-accent: #FFA500;

/* Quetzal - Verde Esmeralda */
--quetzal-main: #00FF00;
--quetzal-accent: #00CED1;
```

---

## 💡 Consejos

1. **Genera varias versiones** y elige la mejor
2. **Mantén el estilo consistente** entre las tres plumas
3. **Prioriza la legibilidad** a 64x64 píxeles
4. **Usa fondos transparentes** siempre
5. **Prueba en el juego** antes de finalizar

---

## 🚀 Instalación Rápida

Una vez generadas las imágenes:

```bash
cd assets/
# Coloca tus imágenes aquí con estos nombres:
# - pluma-jaguar.png
# - pluma-aguila.png
# - pluma-quetzal.png
```

El juego las detectará automáticamente. Si no existen, usará círculos de colores como respaldo.

---

## Ejemplo de Workflow Completo

1. Ve a ChatGPT Plus o Leonardo.ai
2. Copia el prompt del estilo "Códice Mexica"
3. Genera la imagen
4. Descarga en alta calidad
5. Usa remove.bg para eliminar fondo
6. Redimensiona a 128x128 con sips o GIMP
7. Guarda como PNG en /assets/
8. Repite para las 3 plumas
9. ¡Prueba en el juego!

**Tiempo estimado**: 15-30 minutos para las 3 plumas

