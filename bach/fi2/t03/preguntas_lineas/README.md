# Preguntas Lineas de Campo

App estatica que muestra una imagen aleatoria y lanza preguntas tipo test.

## Datos
Edita `data.json`. Cada item:

- `id`: etiqueta corta para mostrar sobre la imagen.
- `image`: nombre del archivo dentro de `img/`.
- `charges`: numero de cargas (1-4).
- `signs`: signos en orden ("+" o "-") por carga.
- `equalMagnitude`: `true` si todas tienen el mismo valor absoluto, `false` si no.
- `larger`: indice (1-based) de la carga de mayor valor absoluto si `equalMagnitude` es `false`. Puede ser un numero o una lista si hay empate.

Ejemplo:

```
{
  "id": "Imagen 3",
  "image": "mi_imagen.png",
  "charges": 2,
  "signs": ["+", "-"],
  "equalMagnitude": false,
  "larger": 1
}
```
