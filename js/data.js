/* =========================================================
   DATA.JS — Fuente central de contenido
   -----------------------------------------------------------
   Edita SOLO este archivo para cambiar textos, personajes,
   diálogos del perro, escenas de la historia o elementos de
   la galería. El resto del código lee de aquí, así que nunca
   tendrás que tocar el HTML a mano.

  Los datos narrativos y de personajes se editan aquí.
   ========================================================= */

window.PopUpBookData = {

  project: {
    title: "¡Que llueva!",
    subtitle: "Una aventura de imaginación, amistad y lluvia en Guatapé",
    description:
      "Durante una tarde de tormenta, Sebastián, sus amigos Valentina y Ángel, y Buffy convierten el aburrimiento en una aventura por el cielo de Guatapé. Con la ayuda de doña Mercedes y un misterioso viajero, descubrirán que la imaginación crece cuando se comparte.",
  },

  intro: {
    title: "Una tarde de lluvia en Guatapé",
    text:
      "En un pueblo de fachadas coloridas, Sebastián pasa sus vacaciones con su abuela Mercedes. Cuando un aguacero y un apagón frustran los planes de él, Valentina y Ángel, los objetos de la sala se convierten en el comienzo de un viaje fantástico. La historia celebra la valentía, la generosidad y las ideas que nacen al compartir.",
  },

  /* El orden del array es el orden de aparición en la cuadrícula. */
  characters: [
    { id: 1, slug: "personaje-01", name: "El viejito", role: "Viajero que aparece durante la tormenta", color: "#B85A3C",
      description: "Llega empapado a la casa de doña Mercedes después de quedarse sin camino por la lluvia. Habla poco, pero anima a los niños a recuperar la imaginación y les recuerda que pueden crear una aventura con lo que tienen a mano.",
      personality: "Reservado, sereno y alentador. Es un visitante que aparece en esta aventura, no un guía permanente del grupo.",
      traits: ["Misterioso", "Tranquilo", "Inspirador"], image: "assets/img/Viejo_p1.png", isGuide: false,
      guideFact: "Llegó empapado, sin camino y buscando refugio. ¿Qué les propondrá a los niños?",
      storyRole: "Llega buscando refugio de la tormenta. Después de compartir una arepa y aguapanela, anima a los niños a imaginar el mirador y los acompaña en el vuelo." },
    { id: 2, slug: "personaje-02", name: "Valentina", role: "Amiga de Sebastián y la más valiente del grupo", color: "#E6473D",
      description: "Valentina no se deja vencer por la lluvia ni por los truenos. Es la más brava de los tres amigos: se sube al aro, se atreve a cantar y ayuda a abrirle paso al grupo.",
      personality: "De carácter fuerte, decidida y valiente como ella sola. Habla con giros paisas y toma la iniciativa cuando hace falta.",
      traits: ["Brava", "Valiente", "Decidida"], image: "assets/img/valentina_p1.png", isGuide: false,
      guideFact: "Fue quien propuso traer el mirador a la sala. Y cuando apareció la nube, se atrevió a cantar.",
      storyRole: "Propone traer el mirador a la sala, se monta en el aro y canta para calmar a la nube. Su voz también ayuda a despejar el cielo para reparar la telaraña." },
    { id: 3, slug: "personaje-03", name: "Sebastián", role: "Nieto de doña Mercedes y amigo de Ángel y Valentina", color: "#176FA5",
      description: "Pasa las vacaciones en Guatapé con su abuela Mercedes. Tiene las rodillas raspadas de tanto correr y una imaginación que vuelve a encenderse cuando comparte ideas con sus amigos.",
      personality: "Alegre y creativo. A veces se enreda con las palabras o con sus propios pies, pero encuentra soluciones ingeniosas.",
      traits: ["Imaginativo", "Torpe", "Ingenioso"], image: "assets/img/sebastian_p1.png", isGuide: false,
      guideFact: "Se enreda con las palabras y con sus pies, pero encontró el hilo que faltaba y lo amarró con una rima.",
      storyRole: "Dibuja el mirador en una cartulina, imagina una araña valiente tejiendo estrellas y encuentra una rima para amarrar el hilo que falta." },
    { id: 4, slug: "personaje-04", name: "Doña Mercedes", role: "Abuela de Sebastián y dueña de Buffy", color: "#43833F",
      description: "Recibe a Sebastián, Ángel y Valentina en su casa cuando arrecia la lluvia. Su experiencia convierte el salón en un espacio para inventar y su hospitalidad ofrece refugio al viajero.",
      personality: "Sabia, generosa y tranquila ante las dificultades. Sabe acompañar sin quitarles a los niños la oportunidad de resolver las cosas juntos.",
      traits: ["Hospitalaria", "Sabia", "Protectora"], image: "assets/img/doñamercedes_p1.png", isGuide: false,
      guideFact: "A la lluvia no se le pelea, se le baila. En su casa siempre hay fuego para quien llega con frío.",
      storyRole: "Les presta el salón y los materiales, guía el vuelo desde la ventana, reza por los niños y al final planta semillas con ellos." },
    { id: 5, slug: "personaje-05", name: "Ángel", role: "Amigo de Sebastián y Valentina", color: "#315E8A",
      description: "Es flaquito, de risa fácil y de corazón enorme. Aunque la tormenta también lo asusta, es el primero en ofrecerle la mano al viajero y siempre está atento a sus amigos.",
      personality: "Generoso, juguetón y afectuoso. Su buen corazón aparece en los momentos en que alguien necesita compañía.",
      traits: ["Generoso", "Alegre", "Leal"], image: "assets/img/angel_p1.png", isGuide: false,
      guideFact: "Fue el primero en invitar al viajero a entrar y después compartió su arepa con la arañita.",
      storyRole: "Invita al viejito a entrar, tranquiliza a la nube con palabras amables y comparte su arepa con la arañita para que pueda tejer." },
    { id: 6, slug: "perro-guia", name: "Buffy", role: "Perro de doña Mercedes", color: "#9E5534",
      description: "Vive con Sebastián y doña Mercedes. Tiene manchas cafés, las orejas gachas y una cola que no para de moverse. Es un perro atento: su olfato descubre el nudo escondido de la telaraña.",
      personality: "Leal, juguetón y muy buen compañero. Sigue siendo un perro: se comunica con ladridos, gestos y su olfato.",
      traits: ["Leal", "Juguetón", "Buen olfato"], image: "assets/img/buffy_p1.png", isGuide: true,
      guideFact: "Su olfato encontró el último nudo escondido de la telaraña.",
      storyRole: "Acompaña a Sebastián, ladra cuando llega el viejito y encuentra con el hocico el último nudo escondido. En la página funciona como guía visual del recorrido." },
  ],

  /* Mensajes del recorrido, organizados por disparador. */
  dogDialogues: {
    welcome: ["Empieza a llover sobre Guatapé. Los amigos de Sebastián están en casa.", "La lluvia cambió los planes, pero ese salón guarda varias sorpresas."],
    intro: ["Un aguacero les cerró el camino al mirador. ¿Qué podrían inventar en casa?", "La tarde se puso gris y las calles se volvieron ríos de barro."],
    characters: ["Tres amigos, una abuela, un viajero inesperado y un perro de cola incansable.", "Cada quien va a aportar algo distinto cuando la aventura se complique."],
    characterOpen: ["Cada persona aporta algo distinto: una idea, una canción o una palabra amable."],
    valentina: ["Valentina no se vara: «¡Si no podemos ir al mirador, el mirador se viene para acá!»"],
    process: ["Un aro de carreta, una bocina y unas cartulinas: ¿en qué se convertirán?", "Con lo que hay sobre la mesa, los niños empiezan a inventar."],
    compare: ["Mira cómo empezó el dibujo y en qué terminó.", "Un boceto, unos cambios y el personaje listo."],
    story: ["Un trueno dejó el salón a oscuras. Alguien llamó a la puerta.", "El viajero llegó empapado y la aventura tomó otro rumbo."],
    gallery: ["Bocetos, personajes e ilustraciones terminadas. ¿Qué detalle encuentras?", "Mira de cerca: cada dibujo guarda pistas de la historia."],
    galleryItem: ["¿Qué detalle te llamó la atención en esta imagen?", "Mira de cerca: aquí hay algo que quizá no habías visto."],
    detail: ["Un detalle pequeño puede cambiar lo que imaginamos de la escena.", "¿Qué crees que está pasando justo aquí?"],
    dogPet: ["Se estira feliz y mueve la cola. ¡Le encantan las caricias!", "Cierra los ojos un momento y se acomoda para recibir más cariño."],
    dogPetAgain: ["Entre los creadores tiene un apodo secreto: Bonfiest. ¡Guau!"],
    dogAnnoyed: ["Se sacude, frunce el hocico y suelta un ladrido: ya tuvo suficientes caricias por ahora.", "¡Guau, guau! Se aparta un poquito. Mejor dale un descanso."],
    idleInicio: ["La lluvia está sonando duro afuera. ¿Qué habrá en el salón?"],
    idleIntroduccion: ["En las casas de Guatapé siempre hay historias que contar."],
    idlePersonajes: ["¿Quién crees que tendrá la próxima idea?"],
    idleCreacion: ["Ese aro parece una rueda de carreta. ¿Tú en qué lo convertirías?"],
    idleHistoria: ["La nube todavía tapa el camino. Algo tendrá que hacerla cambiar de opinión."],
    idleGaleria: ["Un boceto puede esconder detalles que no se ven en la ilustración final."],
    idleCierre: ["Las ideas, como las semillas, crecen mejor cuando se comparten."],
  },

  storyScenes: [
    { id: "escena-01", title: "Guatapé, un pueblo de colores", text: "Cerca de Guatapé, las fachadas parecen pintadas por un artista. El aire huele a tierra mojada, buñuelo recién frito y café tostado." , image: "assets/img/listo_1.png" },
    { id: "escena-02", title: "Vacaciones con la abuela", text: "Sebastián pasa las vacaciones con su abuela Mercedes. Corre por el pueblo con las rodillas raspadas y una sonrisa que contagia a todos." , image: "assets/img/listo_2.png" },
    { id: "escena-03", title: "Los amigos llegan a casa", text: "Cada tarde llegan Ángel, de risa fácil y corazón enorme, y Valentina, la más brava de los tres. Buffy, el perro de Mercedes, no deja quieta la cola." , image: "assets/img/listo_3.png" },
    { id: "escena-04", title: "La lluvia cambia los planes", text: "El aguacero convierte las calles de piedra en ríos de barro. Los tres amigos miran por la ventana: ya no pueden ir al mirador ni a la plaza." , image: "assets/img/listo_4.png" },
    { id: "escena-05", title: "El mirador se viene a la sala", text: "Mercedes les presta el salón y sus tesoros. Valentina propone recrear el mirador; Sebastián busca cartulinas y Ángel encuentra una bocina." , image: "assets/img/listo_5.png" },
    { id: "escena-06", title: "La tormenta apaga la luz", text: "Un trueno y un rayo dejan al pueblo a oscuras. Los niños se asustan y creen que también se les apagó la imaginación. Buffy corre a la puerta y ladra." , image: "assets/img/listo_6.png" },
    { id: "escena-07", title: "Una visita inesperada", text: "Afuera espera un viejito empapado que se quedó sin camino. Ángel lo invita a entrar y Mercedes le ofrece una ruana seca, aguapanela y arepa con queso." , image: "assets/img/listo_7.png" },
    { id: "escena-08", title: "El aro alza el vuelo", text: "Con unas cartulinas, una bocina y mucha imaginación, el aro se vuelve una moto reluciente. Los niños despegan con Buffy de copiloto mientras Mercedes les indica el camino." , image: "assets/img/listo_8.png" },
    { id: "escena-09", title: "Una nube con miedo", text: "Una nube negra les cierra el paso. Valentina canta bajito y Ángel le habla con ternura; la nube deja de gruñir y se aparta." , image: "assets/img/listo_9.png" },
    { id: "escena-10", title: "La telaraña de estrellas", text: "Una arañita vuelve a tejer. Ángel comparte su arepa, Sebastián encuentra el hilo que falta, Buffy olfatea el último nudo y Mercedes acompaña desde abajo con una oración." , image: "assets/img/listo_10.png" },
    { id: "escena-11", title: "Semillas para nuevas ideas", text: "La telaraña brilla, la lluvia para y vuelve la luz. Todos salen al patio a sembrar semillas: cada flor será una idea nueva. Esa noche, sobre Guatapé, brillan las estrellas." , image: "assets/img/listo_11.png" },
  ],

  galleryCategories: [
    { id: "personajes", label: "Personajes" },
    { id: "bocetos", label: "Bocetos" },
    { id: "finales", label: "Ilustraciones finales" },
  ],

  galleryItems: [
    { id: "g1", category: "personajes", caption: "El viejito", image: "assets/img/Viejo_p1.png" },
    { id: "g2", category: "personajes", caption: "Valentina", image: "assets/img/valentina_p1.png" },
    { id: "g3", category: "personajes", caption: "Sebastián", image: "assets/img/sebastian_p1.png" },
    { id: "g4", category: "personajes", caption: "Doña Mercedes", image: "assets/img/doñamercedes_p1.png" },
    { id: "g5", category: "personajes", caption: "Ángel", image: "assets/img/angel_p1.png" },
    { id: "g6", category: "personajes", caption: "Buffy, el perro de doña Mercedes", image: "assets/img/buffy_p1.png" },
    { id: "g7", category: "bocetos", caption: "Todos los bocetos", image: "assets/img/Todos_Bosetos.png" },
    { id: "g8", category: "bocetos", caption: "Boceto de El viejito", image: "assets/img/Boseto_viejo.jpeg" },
    { id: "g9", category: "bocetos", caption: "Boceto de Valentina", image: "assets/img/boseto_valen.jpeg" },
    { id: "g10", category: "bocetos", caption: "Boceto de Sebastián", image: "assets/img/boseto_sebas.jpeg" },
    { id: "g11", category: "bocetos", caption: "Boceto de doña Mercedes", image: "assets/img/boseto_mercedes.jpeg" },
    { id: "g12", category: "bocetos", caption: "Boceto de Ángel", image: "assets/img/boseto_angel.jpeg" },
    { id: "g13", category: "bocetos", caption: "Boceto de Buffy", image: "assets/img/Boseto_buffy.jpeg" },
    { id: "g14", category: "finales", caption: "Todos los personajes listos", image: "assets/img/Todos_listos.png" },
  ],

  bookPagePairs: Array.from({ length: 11 }, (_, index) => ({
    number: index + 1,
    sketch: `assets/img/parte_${index + 1}.png`,
    final: `assets/img/listo_${index + 1}.png`,
  })),

  // x/y son porcentajes del panel; agrega un hotspot por cada objeto que se deba descubrir.
  comicPages: [
    { number: 1, image: null, alt: "", text: "", hotspots: [{ x: 50, y: 50, label: "" }] },
    { number: 2, image: null, alt: "", text: "", hotspots: [{ x: 50, y: 50, label: "" }] },
    { number: 3, image: null, alt: "", text: "", hotspots: [{ x: 50, y: 50, label: "" }] },
    { number: 4, image: null, alt: "", text: "", hotspots: [{ x: 50, y: 50, label: "" }] },
    { number: 5, image: null, alt: "", text: "", hotspots: [{ x: 50, y: 50, label: "" }] },
  ],
};

