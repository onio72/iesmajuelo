#!/usr/bin/env python3
"""Comprobaciones estáticas preliminares de un paquete SCORM 1.2.

Uso: python3 herramientas/comprobar_scorm.py ruta/paquete.zip
No sustituye a pruebas funcionales en navegador ni a la validación en Moodle.
"""
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import PurePosixPath


def check(path):
    errors = []
    warnings = []
    with zipfile.ZipFile(path) as archive:
        names = set(archive.namelist())
        if "imsmanifest.xml" not in names:
            raise ValueError("Falta imsmanifest.xml en la raíz")
        xml = ET.fromstring(archive.read("imsmanifest.xml"))
        schema = xml.find(".//{*}schemaversion")
        if schema is None or (schema.text or "").strip() != "1.2":
            errors.append("No consta SCORM 1.2 en el manifiesto")
        resources = xml.findall(".//{*}resource")
        if not resources:
            errors.append("No hay recursos definidos")
        for resource in resources:
            href = resource.get("href", "")
            if not href or href not in names:
                errors.append(f"Archivo de lanzamiento no encontrado: {href or '(vacío)'}")
            for entry in resource.findall("{*}file"):
                asset = entry.get("href", "")
                if asset not in names:
                    errors.append(f"Recurso del manifiesto ausente: {asset}")
        for filename in names:
            if filename.startswith("/") or ".." in PurePosixPath(filename).parts:
                errors.append(f"Ruta insegura dentro del ZIP: {filename}")
        htmls = [n for n in names if n.lower().endswith(".html")]
        if not htmls:
            errors.append("No hay archivos HTML")
        for name in htmls:
            source = archive.read(name).decode("utf-8", errors="replace")
            for src in re.findall(r'<script\b[^>]*\bsrc=["\']([^"\']+)', source, flags=re.I):
                if src.startswith(("http:", "https:", "//")):
                    warnings.append(f"{name}: script remoto {src} (revisar funcionamiento sin red)")
                elif src.split("?")[0] not in names:
                    warnings.append(f"{name}: comprobar referencia a script {src}")
            if "cmi.core.score.raw" in source and (
                "Math.round(score*10)" in source or "Math.round(score * 10)" in source
            ):
                warnings.append(f"{name}: posible conversión de puntuación ×10")
            if "cmi.core.score.max" in source and "score.max','100'" in source:
                warnings.append(f"{name}: score.max podría ser 100; revisar escala Moodle")
    return errors, warnings


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__.strip())
        sys.exit(2)
    try:
        errors, warnings = check(sys.argv[1])
    except (OSError, ValueError, ET.ParseError, zipfile.BadZipFile) as exc:
        print(f"ERROR: {exc}")
        sys.exit(1)
    for message in warnings:
        print("AVISO:", message)
    for message in errors:
        print("ERROR:", message)
    print(f"Resultado: {len(errors)} errores y {len(warnings)} avisos.")
    sys.exit(1 if errors else 0)
