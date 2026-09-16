"""Comprobaciones de la exportación inicial. Uso: python3 test_importar.py XML"""
import sys
import xml.etree.ElementTree as ET
from importar import convertir

archivo = sys.argv[1]
datos = convertir(archivo)
root = ET.parse(archivo).getroot()
gr = {g['id']: g for g in datos['grupos']}
assert len(gr) == 70
assert '41' not in gr and '42' not in gr  # Guardias fuera del selector.
for gid, g in gr.items():
    original = root.find(f'./HORARIOS/HORARIOS_GRUPOS/HORARIO_GRUP[@hor_num_int_gr="{gid}"]')
    claves = {tuple(a.get(k) for k in ('tramo', 'asignatura', 'profesor', 'aula')) for a in original}
    assert len(g['actividades']) == len(claves), gid
    assert all(a['materia'] and a['profesor'] and a['aula'] for a in g['actividades']), gid
    assert all(1 <= a['dia'] <= 5 and a['inicio'] < a['fin'] for a in g['actividades']), gid
for gid, variante in [('11', 'No bilingüe'), ('74', 'Bilingüe'), ('67', 'Diversificación')]:
    g = gr[gid]
    assert (g['curso'], g['grupo'], g['variante']) == ('4.º ESO', 'C', variante)
    assert len({(a['dia'], a['inicio']) for a in g['actividades']}) == 30
assert any('Ámbito' in a['materia'] for a in gr['67']['actividades'])
assert not any('Ámbito' in a['materia'] for a in gr['11']['actividades'] + gr['74']['actividades'])
ef = lambda gid: {(a['dia'], a['inicio'], a['profesor'], a['aula']) for a in gr[gid]['actividades'] if a['materia'] == 'Ed. Física 4º ESO'}
assert ef('11') != ef('74')
# Dos docentes de una misma materia en una misma franja deben conservarse.
ase = [a for a in gr['11']['actividades'] if a['dia'] == 1 and a['inicio'] == '10:00' and a['materia'].startswith('Aprendizaje Social')]
assert len(ase) == 2 and ase[0]['profesor'] != ase[1]['profesor']
assert len([a for a in gr['11']['actividades'] if a['dia'] == 4 and a['inicio'] == '12:30']) == 8
print('OK: 70 horarios íntegros; 4.º C separado en tres modalidades; desdobles conservados.')
