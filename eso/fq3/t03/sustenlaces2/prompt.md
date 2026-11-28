# Prompt de reconstrucción — Sustancias y tipos de enlaces II

Crea desde cero una aplicación educativa en español para Física y Química de 3.º de ESO. Prompt reconstruido a partir de la versión actual, no original.

## Modelo y comportamiento

Variante simplificada de cuestionario de sustancias: enlace iónico/covalente/metálico (sin separar covalente reticular; excluye SiO₂ y casos reticulares del banco simplificado). Preguntas de estructura, simple/compuesta, binario/ternario cuando corresponda, número de átomos en fórmula. Banco barajado, distractores numéricos, +0,2 solo primer intento correcto, reintentos hasta acertar, máximo 10 y recuperación de puntuación SCORM. No llamar molécula a unidad de fórmula iónica.

## Requisitos

Entrega HTML, CSS y JavaScript completos y funcionales, diseño adaptable, controles accesibles, unidades y etiquetas claras y botón Info integrado en flujo normal con instrucciones. Conserva los criterios de evaluación y comprueba los casos indicados.

## Banco original de la versión vigente

```js
const sustancias = [
            {formula: "O₂", nombre: "Oxígeno molecular", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Simple", compuesto: "", numAtomos: 2},
            {formula: "NaCl", nombre: "Cloruro de sodio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 2},
            {formula: "H₂O", nombre: "Agua", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 3},
            {formula: "Fe", nombre: "Hierro", tipoEnlace: "Metálico", forma: "Cristales", tipo: "Simple", compuesto: "", numAtomos: 1},
            // SiO₂ eliminado (Covalente cristal)
            {formula: "CO₂", nombre: "Dióxido de carbono", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 3},
            {formula: "CaCO₃", nombre: "Carbonato de calcio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 5},
            {formula: "HCl", nombre: "Ácido clorhídrico", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 2},
            {formula: "CH₄", nombre: "Metano", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 5},
            {formula: "KBr", nombre: "Bromuro de potasio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 2},
            {formula: "Fe₂O₃", nombre: "Óxido de hierro (III)", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 5},
            {formula: "H₂SO₄", nombre: "Ácido sulfúrico", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 7},
            {formula: "MgCl₂", nombre: "Cloruro de magnesio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 3},
            {formula: "NH₃", nombre: "Amoniaco", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 4},
            {formula: "C₆H₁₂O₆", nombre: "Glucosa", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 24},
            {formula: "KNO₃", nombre: "Nitrato de potasio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 5},
            {formula: "CuSO₄", nombre: "Sulfato de cobre (II)", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 6},
            {formula: "C₂H₅OH", nombre: "Etanol", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 9},
            {formula: "NaOH", nombre: "Hidróxido de sodio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 3},
            {formula: "Al₂O₃", nombre: "Óxido de aluminio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 5},
            {formula: "P₄", nombre: "Fósforo blanco", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Simple", compuesto: "", numAtomos: 4},
            {formula: "Cl₂", nombre: "Cloro molecular", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Simple", compuesto: "", numAtomos: 2},
            {formula: "Br₂", nombre: "Bromo molecular", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Simple", compuesto: "", numAtomos: 2},
            {formula: "I₂", nombre: "Yodo molecular", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Simple", compuesto: "", numAtomos: 2},
            {formula: "BaSO₄", nombre: "Sulfato de bario", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 6},
            {formula: "K₂SO₄", nombre: "Sulfato de potasio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 7},
            {formula: "NH₄Cl", nombre: "Cloruro de amonio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 5},
            {formula: "C₄H₁₀", nombre: "Butano", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 14},
            {formula: "C₃H₈", nombre: "Propano", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 11},
            {formula: "FeCl₃", nombre: "Cloruro de hierro (III)", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 4},
            {formula: "H₂", nombre: "Hidrógeno molecular", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Simple", compuesto: "", numAtomos: 2},
            {formula: "H₂O₂", nombre: "Peróxido de hidrógeno", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 4},
            {formula: "Ca(OH)₂", nombre: "Hidróxido de calcio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 5},
            // Diamante y Grafito eliminados (Covalente cristal)
            {formula: "Na₂CO₃", nombre: "Carbonato de sodio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 6},
            {formula: "AgNO₃", nombre: "Nitrato de plata", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 5},
            {formula: "PbS", nombre: "Sulfuro de plomo", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 2},
            {formula: "HNO₃", nombre: "Ácido nítrico", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 5},
            {formula: "Zn", nombre: "Zinc", tipoEnlace: "Metálico", forma: "Cristales", tipo: "Simple", compuesto: "", numAtomos: 1},
            {formula: "SO₂", nombre: "Dióxido de azufre", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 3},
            {formula: "CH₃COOH", nombre: "Ácido acético", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 8},
            {formula: "H₂S", nombre: "Sulfuro de hidrógeno", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Binario", numAtomos: 3},
            {formula: "O₃", nombre: "Ozono", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Simple", compuesto: "", numAtomos: 3},
            {formula: "CH₃NH₂", nombre: "Metilamina", tipoEnlace: "Covalente", forma: "Moléculas", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 6},
            {formula: "NaH", nombre: "Hidruro de sodio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 2},
            {formula: "CaH₂", nombre: "Hidruro de calcio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 3},
            {formula: "LiH", nombre: "Hidruro de litio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Binario", numAtomos: 2},
            {formula: "KOH", nombre: "Hidróxido de potasio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 3},
            {formula: "Mg(OH)₂", nombre: "Hidróxido de magnesio", tipoEnlace: "Iónico", forma: "Cristales", tipo: "Compuesta", compuesto: "Ternario", numAtomos: 5}
        ];
```
