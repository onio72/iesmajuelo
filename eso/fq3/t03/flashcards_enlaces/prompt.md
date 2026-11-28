# Prompt de reconstrucción — Flashcards sobre enlaces

Crea desde cero una aplicación educativa en español para Física y Química de 3.º de ESO. Prompt reconstruido a partir de la versión actual, no original.

## Modelo y comportamiento

Tarjetas de estudio sobre átomos, configuración, valencia, enlace iónico, covalente, metálico, estructuras y propiedades. Cada tarjeta pregunta/respuesta; giro al pulsar, anterior/siguiente, teclado izquierda/derecha, contador y barajar sin perder tarjetas. Renderiza fórmulas con KaTeX si procede. Usa el banco incluido, sin puntuación ni respuestas reveladas por defecto.

## Requisitos

Entrega HTML, CSS y JavaScript completos y funcionales, diseño adaptable, controles accesibles, unidades y etiquetas claras y botón Info integrado en flujo normal con instrucciones. Conserva los criterios de evaluación y comprueba los casos indicados.

## Banco original de la versión vigente

```js
const flashcardsData = [
  { q: "¿Cuál es la causa principal por la que los átomos tienden a unirse en lugar de permanecer aislados?", a: "Adquirir la configuración electrónica de un gas noble para ser estables." },
  { q: "¿Cuántos electrones suelen buscar los átomos en su capa de valencia para alcanzar la máxima estabilidad?", a: "Ocho electrones." },
  { q: "¿Qué elemento es la excepción a la regla de los ocho electrones en la capa de valencia?", a: "El helio ($He$)." },
  { q: "Se denomina capa de ___________ a la capa más externa de electrones de un átomo.", a: "Valencia" },
  { q: "¿Qué tipo de enlace se forma cuando se transfieren electrones entre un metal y un no metal?", a: "Enlace iónico." },
  { q: "¿Qué sucede con la carga de un átomo de sodio ($Na$) cuando cede un electrón?", a: "Se convierte en un ion con carga positiva ($Na^{+}$)." },
  { q: "¿Qué sucede con la carga de un átomo de cloro ($Cl$) cuando acepta un electrón?", a: "Se convierte en un ion con carga negativa ($Cl^{-}$)." },
  { q: "¿Cómo se denomina al ion con carga negativa formado tras ganar electrones?", a: "Anión." },
  { q: "¿Cómo se denomina al ion con carga positiva formado tras perder electrones?", a: "Catión." },
  { q: "El enlace iónico se mantiene unido gracias a la atracción entre cargas de _____.", a: "Distinto signo" },
  { q: "¿Qué tendencia tienen los átomos de elementos metálicos?", a: "Tendencia a ceder electrones." },
  { q: "¿Qué tendencia tienen los átomos de elementos no metálicos?", a: "Tendencia a captar electrones." },
  { q: "El enlace iónico se forma por la _____ de electrones desde el átomo metálico al no metálico.", a: "Transferencia" },
  { q: "¿En qué direcciones del espacio tiene lugar la atracción electrostática en un compuesto iónico?", a: "En todas las direcciones." },
  { q: "¿Qué nombre recibe la estructura muy ordenada que forman los compuestos iónicos?", a: "Red cristalina" },
  { q: "¿Qué tipo de enlace tiene el trióxido de azufre ($SO_{3}$)?", a: "Enlace covalente." },
  { q: "¿Qué tipo de enlace tiene el ácido sulfúrico ($H_{2}SO_{4}$)?", a: "Enlace covalente." },
  { q: "¿Por qué los átomos de nitrógeno se combinan con tres de hidrógeno?", a: "Para adquirir la configuración de gas noble compartiendo electrones." },
  { q: "Los electrones compartidos en un enlace covalente se sitúan _____ los dos átomos.", a: "entre" },
  { q: "¿Qué propiedad indica que un enlace químico es fuerte?", a: "Temperaturas de fusión y ebullición altas." },
  { q: "En el enlace metálico, los electrones son _____ por todos los cationes.", a: "compartidos" },
  { q: "¿Cómo se comportan los iones en una red iónica?", a: "Cada ion positivo atrae al máximo número de iones negativos. Estos a su vez se rodean de otros iones positivos. Así se forma el cristal." },
  { q: "El enlace iónico ocurre entre átomos de elementos ________________.", a: "Metálicos y no metálicos." },
  { q: "El enlace iónico ocurre entre átomos con electronegatividad muy _____.", a: "distinta" },
  { q: "¿Qué partícula subatómica se transfiere o comparte para formar un enlace iónico?", a: "El electrón." },
  { q: "En los diagramas de Lewis, ¿qué electrones se representan específicamente?", a: "Los electrones de la capa de valencia." },
  { q: "¿Qué ocurre con la red metálica cuando se deslizan las capas de iones?", a: "No se rompe, lo que permite la ductilidad y maleabilidad." },
  { q: "¿En qué tipo de compuestos se encuentran moléculas como unidades básicas?", a: "Compuestos covalentes." },
  { q: "¿Cómo es la disposición de los iones en una red metálica?", a: "Muy ordenada y compacta." },
  { q: "El sodio es un ejemplo de átomo con tendencia a _____ electrones.", a: "ceder" },
  { q: "El cloro es un ejemplo de átomo con tendencia a _____ electrones.", a: "coger o captar" },
  { q: "Las sustancias se construyen porque los átomos tienden a _____ unos a otros.", a: "unirse" },
  { q: "¿Qué tipo de enlace se produce cuando dos no metales comparten electrones?", a: "Enlace covalente." },
  { q: "En un enlace covalente, ¿qué ocurre con los electrones?", a: "Se comparten entre los átomos." },
  { q: "¿Cómo se llama la representación con puntos de los electrones de valencia?", a: "Diagrama de Lewis." },
  { q: "En el enlace covalente, los átomos buscan completar su capa de valencia con _____ electrones.", a: "ocho" },
  { q: "¿Qué tipo de enlace aparece en moléculas como $H_{2}$, $O_{2}$ o $N_{2}$?", a: "Enlace covalente." },
  { q: "Cuando dos átomos comparten un par de electrones, se forma un enlace covalente _____.", a: "simple" },
  { q: "Cuando se comparten dos pares de electrones, se forma un enlace covalente _____.", a: "doble" },
  { q: "Cuando se comparten tres pares de electrones, se forma un enlace covalente _____.", a: "triple" },
  { q: "¿Qué tipo de enlace aparece en el agua ($H_{2}O$)?", a: "Enlace covalente." },
  { q: "¿Qué tipo de enlace aparece en el dióxido de carbono ($CO_{2}$)?", a: "Enlace covalente." },
  { q: "Los compuestos covalentes suelen tener puntos de fusión y ebullición _____ que los iónicos.", a: "más bajos" },
  { q: "¿Qué propiedad caracteriza a los compuestos iónicos en estado sólido?", a: "Son malos conductores de la electricidad." },
  { q: "¿Qué propiedad caracteriza a los compuestos iónicos fundidos o disueltos?", a: "Conducen la electricidad." },
  { q: "¿Por qué los compuestos iónicos conducen electricidad cuando están fundidos o disueltos?", a: "Porque los iones pueden moverse libremente." },
  { q: "Los compuestos iónicos suelen ser sólidos _____ a temperatura ambiente.", a: "cristalinos" },
  { q: "Los compuestos iónicos suelen ser _____ en agua.", a: "solubles" },
  { q: "¿Qué propiedad mecánica suele tener un cristal iónico?", a: "Es frágil (quebradizo)." },
  { q: "¿Qué ocurre si en una red iónica se desplaza una capa de iones?", a: "Se enfrentan iones del mismo signo y el cristal se rompe." },
  { q: "¿Qué tipo de enlace explica la conductividad y la maleabilidad de los metales?", a: "Enlace metálico." },
  { q: "En un metal, los electrones de valencia forman un _____ de electrones.", a: "mar" },
  { q: "En un metal, los cationes están inmersos en un mar de electrones _____.", a: "deslocalizados" },
  { q: "¿Qué propiedad de los metales se debe al mar de electrones?", a: "La conductividad eléctrica y térmica." },
  { q: "¿Qué propiedad permite que los metales se puedan estirar formando hilos?", a: "Ductilidad." },
  { q: "¿Qué propiedad permite que los metales se puedan deformar formando láminas?", a: "Maleabilidad." },
  { q: "¿Qué ocurre con los electrones en el enlace metálico?", a: "Se mueven libremente por toda la estructura." },
  { q: "¿Qué tipo de enlace aparece en la sal común ($NaCl$)?", a: "Enlace iónico." },
  { q: "¿Qué tipo de enlace aparece en el hierro ($Fe$)?", a: "Enlace metálico." },
  { q: "¿Qué diferencia fundamental hay entre enlace iónico y covalente?", a: "En el iónico se transfieren electrones; en el covalente se comparten." },
  { q: "¿Qué diferencia fundamental hay entre enlace metálico y covalente?", a: "En el metálico hay electrones deslocalizados; en el covalente se comparten entre átomos concretos." },
  { q: "¿Qué diferencia fundamental hay entre enlace metálico e iónico?", a: "En el metálico hay un mar de electrones; en el iónico hay iones ordenados que se atraen." },
  { q: "En un enlace iónico, el metal forma un _____ y el no metal forma un _____.", a: "catión; anión" },
  { q: "¿Qué regla explica la tendencia a alcanzar configuraciones estables similares a los gases nobles?", a: "Regla del octeto." },
  { q: "Los gases nobles son especialmente estables porque tienen la capa de valencia _____.", a: "completa" },
  { q: "¿Qué sucede con la energía del sistema cuando se forma un enlace químico estable?", a: "Disminuye." },
  { q: "Los átomos se enlazan porque así alcanzan un estado de menor _____.", a: "energía" },
  { q: "En general, al formarse un enlace se libera _____.", a: "energía" },
  { q: "¿Qué indica una gran diferencia de electronegatividad entre dos átomos?", a: "Que es probable que formen un enlace iónico." },
  { q: "¿Qué indica una diferencia pequeña de electronegatividad entre dos átomos?", a: "Que es probable que formen un enlace covalente." },
  { q: "¿Qué tipo de enlace suele formarse entre átomos metálicos?", a: "Enlace metálico." },
  { q: "¿Qué tipo de enlace suele formarse entre átomos no metálicos?", a: "Enlace covalente." },
  { q: "En una molécula covalente, la unidad básica es la _____.", a: "molécula" },
  { q: "En un cristal iónico, la unidad básica no es una molécula sino una _____.", a: "red cristalina" }
];
```
