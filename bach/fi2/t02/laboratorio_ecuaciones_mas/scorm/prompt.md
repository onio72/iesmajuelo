# Prompt de reconstrucción — Laboratorio de ecuaciones del MAS

Crea desde cero una aplicación educativa en español para Física de 2.º de Bachillerato. Este prompt reconstruye la versión vigente, no es el original.

## Modelo, interfaz y comportamiento

Cuatro retos: desde posición, desde velocidad, observación con fase notable y observación con fase general. Sortea T=1–6 s paso 0,5; A=0,8–2,8 m paso 0,1; fases en múltiplos de π/12, notables −π/2,0,π/2. Muelle vertical con escala 0,5 m, reloj y pasos ±0,1 s; controles A 0,5–3 m, T 1–6, f y ω vinculados, fase −π…π paso π/12. Valida ajuste y nueve coeficientes/argumentos con tolerancia y fase módulo 2π; admite expresiones con π y coma decimal mediante parser aritmético seguro. Cada reto se califica una vez; tres correctos 5/10, cuatro 10/10. Informe imprimible y reinicio de nota. Separa app.js y CSS. Versión SCORM 1.2: conserva nota, estado, datos de suspensión y reanudación, LMSInitialize/SetValue/Commit/Finish; empaqueta los CSS, app.js y documentos locales con imsmanifest.xml.

## Requisitos técnicos

Entrega código completo, listo para publicar en GitHub Pages, sin servidor. Interfaz adaptable, controles accesibles, unidades y etiquetas legibles; coloca Info en flujo normal junto al título y muestra las instrucciones en un modal. Conserva el modelo físico y comprueba los casos descritos.
