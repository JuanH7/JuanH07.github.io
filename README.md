# Libro pop-up interactivo — Landing page

Landing page de presentación para un libro pop-up con seis personajes
originales, uno de ellos (el perro) actuando como guía interactivo de
toda la experiencia.

Esta es la **versión 1**: toda la arquitectura, navegación, interacción
y sistema de datos están terminados y funcionando. Los contenidos
(nombres, descripciones, historia, imágenes) son **provisionales** y
están marcados como "(pendiente)" en todo el sitio, listos para ser
reemplazados por los recursos reales.

## Cómo ejecutarlo

No se usan módulos ES (`import`/`export`), precisamente para que el
proyecto pueda abrirse **haciendo doble clic en `index.html`**, sin
necesidad de montar un servidor local mientras seguimos iterando sobre
el contenido. Los scripts se cargan como archivos normales, en orden,
y comparten datos a través de `window.PopUpBookData`.

Si más adelante quieres servirlo con un servidor local (recomendable
para producción, para que `fetch` de imágenes y fuentes funcione sin
restricciones del navegador), cualquier servidor estático sirve, por ejemplo:

```bash
npx serve .
# o
python3 -m http.server 8080
```

## Estructura de carpetas

```
libro-pop-up/
├── index.html              → estructura semántica de toda la página
├── css/
│   ├── variables.css        → paleta, tipografía, espaciados, radios (edítalo primero)
│   ├── base.css              → reset + tipografía base + botones
│   ├── layout.css            → estructura de secciones, grid, portada 3D
│   ├── components.css        → tarjetas, modal, perro guía, comparador, galería
│   ├── animations.css        → transiciones, estados del perro, reduced-motion
│   ├── responsive.css        → ajustes tablet / móvil
│   └── styles.css            → importa todo lo anterior en orden (es el único <link>)
├── js/
│   ├── data.js                → ⭐ fuente central de TODO el contenido editable
│   ├── dog-guide.js            → sistema de diálogos y estados del perro
│   ├── navigation.js           → menú móvil, scroll y enlace activo
│   ├── characters.js           → grid de personajes + modal de detalle
│   └── main.js                 → apertura del libro, revelado al scroll,
│                                   historia, galería, progreso, comparador
├── assets/
│   ├── images/{characters,sketches,digital,scenes,gallery}/  → ilustraciones reales
│   ├── dog/                    → dog-idle.png, dog-talking.png, dog-pointing.png,
│   │                              dog-celebrating.png (cuando existan)
│   ├── icons/
│   └── fonts/
└── README.md
```

> Nota sobre la estructura de CSS/JS: la pediste dividida por responsabilidad
> (reset, variables, base, layout, components, animations, responsive /
> data, navigation, dog-guide, characters, galleries, pop-up-effects, main).
> En esta v1 mantuve esa separación para CSS tal cual, y en JS consolidé
> `galleries.js` y `pop-up-effects.js` dentro de `main.js` porque, en la
> versión actual, la galería y los efectos pop-up son pocas líneas cada
> uno; si crecen, sepáralos sin problema — todos leen de `data.js` y no
> dependen entre sí más que por el orden de carga en `index.html`.

## Cómo añadir o modificar un personaje

Todo está en `js/data.js`, dentro de `PopUpBookData.characters`. Cada
personaje es un objeto:

```js
{ id: 7, slug: "nuevo-personaje", name: "Nombre real", role: "Rol en la historia",
  color: "#RRGGBB", description: "...", personality: "...",
  traits: ["Rasgo 1", "Rasgo 2"], image: "assets/images/characters/nombre.png",
  isGuide: false, creationProcess: null }
```

- El **orden del array** es el orden en que aparecen en pantalla.
- `isGuide: true` marca al personaje anfitrión (actualmente el perro).
- `creationProcess: null` hace que se generen automáticamente las 6 etapas
  definidas en `PopUpBookData.processStages`; si quieres etapas distintas
  para un personaje puntual, asígnale directamente un array con la misma
  forma (`{ stage, description, image }`) en vez de `null`.
- No hace falta tocar `index.html` ni `characters.js`: el grid y el modal
  se generan solos a partir de este array.

## Cómo modificar los diálogos del perro

En `js/data.js`, objeto `PopUpBookData.dogDialogues`. Cada clave es un
disparador (`welcome`, `characters`, `characterOpen`, `process`, `story`,
`gallery`, `closing`) y su valor es un **array de frases posibles**: si
pones varias, el perro elige una al azar cada vez, para que no se sienta
repetitivo. Los disparadores están conectados así:

- `welcome` → al cargar la página (una sola vez).
- `intro` → al pulsar "Abrir el libro".
- `characters` / `process` / `story` / `gallery` / `closing` → al entrar
  en esa sección por primera vez (usa `IntersectionObserver`, no se repite
  por scroll pequeño).
- `characterOpen` → al abrir el modal de un personaje.
- Clic directo en el perro → repite el último mensaje mostrado.

Para añadir un nuevo disparador, agrega la clave en `dogDialogues` y
llama a `window.DogGuide.say("tu-clave")` desde donde corresponda.

## Cómo incorporar imágenes reales

1. Coloca el archivo en la subcarpeta correspondiente de `assets/`.
2. En `data.js`, cambia el campo `image: null` por la ruta, por ejemplo
   `image: "assets/images/characters/character-01.webp"`.
3. El código ya revisa si `image` existe: si lo hace, muestra la
   ilustración (`<img loading="lazy">`); si no, muestra el contenedor
   provisional con el texto "(pendiente)". No es necesario cambiar nada
   más.
4. Para el perro, si tienes ilustraciones por estado (`idle`, `talking`,
   `pointing`, `celebrating`, `despedida`), guárdalas en `assets/dog/` y
   amplía `dog-guide.js` (`setState`) para cambiar la imagen del avatar
   según `data-state`, en lugar de solo animarlo con CSS.

## Cómo añadir una nueva sección

1. Agrega el `<section id="tu-seccion">` en `index.html`, siguiendo el
   patrón `section-inner > section-head + contenido`.
2. Si el contenido es dinámico (como personajes, historia o galería),
   añade los datos en `data.js` y un pequeño `render...()` en `main.js`.
3. Agrega el enlace correspondiente en `.nav-links` — el estado activo
   y el scroll suave funcionan automáticamente.
4. Si quieres que el perro comente al entrar en la sección, añade una
   entrada al `map` dentro de `wireSectionDialogues()` en `main.js`.

## Cómo preparar futuras subpáginas

Hoy todo vive como anclas (`#personajes`, `#historia`...) dentro de una
sola página, tal como se pidió para esta v1. Para evolucionar hacia
páginas independientes más adelante:

- Cada personaje ya tiene un `slug` único (`personaje-01`, `perro-guia`...)
  pensado para convertirse en una URL real, por ejemplo
  `personajes/perro-guia.html` o `/personajes/perro-guia`.
- El modal de personaje (`characters.js`, función `openModal`) podría
  pasar a ser el contenido de esa página individual: la lógica de
  render ya está separada del "cómo se abre" (modal vs. navegación real).
- `data.js` no depende de estar en una sola página: puede importarse
  (como script normal) desde cualquier HTML nuevo.
- Las secciones candidatas a subpágina según el proyecto: ficha por
  personaje, historia completa, proceso de creación, digitalización,
  galería, libro físico, equipo y créditos.

## Qué falta por construir en próximas iteraciones

Para que esta primera versión fuera real, completa y ejecutable en una
sola entrega, se simplificó lo siguiente (todo sigue la arquitectura de
datos central, así que ampliarlo no requiere rehacer nada):

- El comparador boceto/final de la sección "Creación" es un único
  ejemplo de referencia; se puede generar uno por personaje dentro del
  modal reutilizando el mismo componente `.compare-slider`.
- Las imágenes de los estados del perro (`idle`, `talking`, `pointing`,
  `celebrating`, despedida) están resueltas por ahora con animación CSS
  sobre un único avatar; en cuanto existan las ilustraciones reales por
  estado, `dog-guide.js` es el único archivo que hay que tocar.
- La galería usa contenedores provisionales elegantes en vez de un
  visor modal ampliado; el patrón del modal de personajes puede
  reutilizarse para construirlo cuando haya imágenes reales que ampliar.

Ningún contenido narrativo (historia, diálogos del perro más allá de los
ejemplos entregados, nombres o personalidades) fue inventado: todo lo
que no se nos dio está marcado explícitamente como "(pendiente)".
