#!/usr/bin/env python3
"""Convierte una exportación HORW en datos para la web, sin dependencias."""
import argparse
import json
from pathlib import Path
import re
import xml.etree.ElementTree as ET

BASE = Path(__file__).resolve().parent
CICLOS = {'SAD': 'Administración', 'MAD': 'Gestión administrativa',
          'SCO': 'Mediación comunicativa', 'SDA': 'Informática',
          'SVI': 'Agencias de viajes', 'SEIN': 'Educación infantil', 'FPB': 'Grado básico'}


def clasificar(g):
    nombre, nivel, ab = g['nombre'], g['nivel'], g['abreviatura']
    if nivel == 'GUA':
        return None
    if re.fullmatch(r'[1-4]ºE', nivel):
        m = re.fullmatch(r'([1-4])([A-Z])(Bi|Div)?', ab)
        if not m:
            raise ValueError(f'Grupo ESO sin clasificar: {g}')
        curso, letra, variante = m.groups()
        return ('ESO', f'{curso}.º ESO', letra,
                {'Bi': 'Bilingüe', 'Div': 'Diversificación', None: 'No bilingüe'}[variante])
    if nivel in ('1BA', '2BA'):
        return ('Bachillerato', f'{nivel[0]}.º Bachillerato', nombre, 'General')
    if nivel == 'BTO':
        return ('Educación de adultos', 'Bachillerato de adultos', nombre, 'General')
    if nivel in ('1ES', '2ES'):
        return ('Educación de adultos', 'ESPA', nombre, 'General')
    if nivel in CICLOS:
        # El nombre completo distingue curso, turno y modalidad; la abreviatura
        # diferencia registros que tienen exactamente el mismo nombre en HORW.
        return ('Formación profesional', CICLOS[nivel], f'{nombre} · {ab}', 'General')
    return ('Otras enseñanzas', nivel or 'Otros', nombre, 'General')


def convertir(archivo):
    root = ET.parse(archivo).getroot()
    def catalogo(ruta, clave):
        return {e.get(clave): dict(e.attrib) for e in root.findall(ruta)}
    asignaturas = catalogo('./DATOS/ASIGNATURAS/ASIGNATURA', 'num_int_as')
    profesores = catalogo('./DATOS/PROFESORES/PROFESOR', 'num_int_pr')
    aulas = catalogo('./DATOS/AULAS/AULA', 'num_int_au')
    tramos = catalogo('./DATOS/TRAMOS_HORARIOS/TRAMO', 'num_tr')
    horarios = {e.get('hor_num_int_gr'): e for e in root.findall('./HORARIOS/HORARIOS_GRUPOS/HORARIO_GRUP')}
    grupos = []
    for g in root.findall('./DATOS/GRUPOS/GRUPO'):
        clasificacion = clasificar(g.attrib)
        if clasificacion is None:
            continue
        etapa, curso, grupo, variante = clasificacion
        gid = g.get('num_int_gr')
        actividades, vistas = [], set()
        for a in horarios[gid]:
            # num_un puede compartirse entre varias opciones de un desdoble.
            # Nunca se utiliza por sí solo para eliminar duplicados.
            clave = tuple(a.get(k) for k in ('tramo', 'asignatura', 'profesor', 'aula'))
            if clave in vistas:
                continue
            vistas.add(clave)
            tid, sid, pid, aid = clave
            t = tramos[tid]
            actividades.append(dict(dia=int(t['numero_dia']),
                inicio=t['hora_inicio'].strip().zfill(5), fin=t['hora_final'].strip().zfill(5),
                materia=asignaturas[sid]['nombre'].strip(), materiaId=sid,
                profesor=profesores[pid]['nombre'].strip(), aula=aulas[aid]['nombre'].strip()))
        grupos.append(dict(id=gid, etapa=etapa, curso=curso, grupo=grupo, variante=variante,
                           nombreOriginal=g.get('nombre'), abreviatura=g.get('abreviatura'),
                           actividades=actividades))
    return dict(centro=root.get('nombre_centro').replace('\xa0', ' · '),
                fecha=root.get('fecha'), grupos=grupos)


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('xml', type=Path)
    p.add_argument('--salida', type=Path, default=BASE / 'datos.js')
    args = p.parse_args()
    datos = convertir(args.xml)
    args.salida.write_text('window.HORARIOS = ' + json.dumps(datos, ensure_ascii=False, separators=(',', ':')) + ';\n', encoding='utf-8')
    print(f'{len(datos["grupos"])} horarios exportados a {args.salida}')

if __name__ == '__main__':
    main()
