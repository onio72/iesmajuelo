#!/usr/bin/env python3
"""Inventario y comprobación de sintaxis; no prueba interacciones ni Moodle."""
import json
import subprocess
import tempfile
from html.parser import HTMLParser
from pathlib import Path


class Scripts(HTMLParser):
    def __init__(self):
        super().__init__()
        self.active = False
        self.current = []
        self.inline = []

    def handle_starttag(self, tag, attrs):
        if tag == 'script':
            attrs = dict(attrs)
            self.active = 'src' not in attrs and attrs.get('type', '') in ('', 'text/javascript', 'module')
            self.current = []

    def handle_data(self, data):
        if self.active:
            self.current.append(data)

    def handle_endtag(self, tag):
        if tag == 'script' and self.active:
            self.inline.append(''.join(self.current))
            self.active = False


def main():
    root = Path(__file__).resolve().parents[1]
    base = root / 'bach/fi2'
    files = sorted(p for p in base.rglob('*') if p.suffix in ('.html', '.js') and 'assets' not in p.parts)
    checked = 0
    errors = []
    inventory = []
    with tempfile.TemporaryDirectory() as tmp:
        target = Path(tmp) / 'check.mjs'
        for path in files:
            source = path.read_text(encoding='utf-8')
            if path.suffix == '.html':
                parser = Scripts()
                parser.feed(source)
                scripts = parser.inline
            else:
                scripts = [source]
            for i, script in enumerate(scripts):
                if not script.strip():
                    continue
                target.write_text(script, encoding='utf-8')
                result = subprocess.run(['node', '--check', str(target)], capture_output=True, text=True)
                checked += 1
                if result.returncode:
                    errors.append({'file': str(path.relative_to(root)), 'script': i, 'detail': result.stderr})
            if any(token in source for token in ('LMSInitialize', 'calculadora', 'calculator')):
                inventory.append({'file': str(path.relative_to(root)),
                                  'scorm': 'LMSInitialize' in source,
                                  'calculator': 'calculadora' in source or 'calculator' in source,
                                  'local_storage': 'localStorage' in source,
                                  'dynamic_function': 'Function(' in source,
                                  'remote_script': '<script' in source and any(x in source for x in ('src="https://', "src='https://"))})
    print(json.dumps({'files': len(files), 'scripts_checked': checked, 'syntax_errors': errors, 'inventory': inventory}, ensure_ascii=False, indent=2))
    return bool(errors)


if __name__ == '__main__':
    raise SystemExit(main())
