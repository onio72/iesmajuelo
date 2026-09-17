// Nombres revisados para presentación. Los identificadores y datos originales se conservan.
'use strict';
window.MateriasHorario = (() => {
  const stripCourse = name => name
    .replace(/\s*[1-4]\s*\.?[ºª°]\s*(?:ESO|BACHILLERATO|BACH|BAC)\b/gi, '')
    .replace(/\s+[1-4]\s*\.?[ºª°]\s*$/g, '')
    .replace(/^(COMPUTACIÓN Y ROBÓTICA|ORATORIA Y DEBATE)\s+[1-4]$/i, '$1')
    .replace(/\s+/g, ' ').trim();
  const key = name => stripCourse(name).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');
  const reviewed = [
  [
    "Acceso a datos"
  ],
  [
    "Actividad física, salud y sociedad",
    "ACTIVIDAD FIS. SALUD Y SOCIEDAD"
  ],
  [
    "Anatomía aplicada"
  ],
  [
    "Antropología y sociología",
    "ANTROPOLOGÍA Y SOC."
  ],
  [
    "Atención educativa"
  ],
  [
    "Análisis de textos"
  ],
  [
    "Aprendizaje social y emocional",
    "Aprendizaje Social y Emocion."
  ],
  [
    "Artes escénicas y danza"
  ],
  [
    "Autonomía personal y salud infantil"
  ],
  [
    "Biología y geología",
    "BIOLOG+A Y GEOLOG"
  ],
  [
    "Biología"
  ],
  [
    "Bases de datos"
  ],
  [
    "Ciencias aplicadas"
  ],
  [
    "Ciencias aplicadas II"
  ],
  [
    "Computación y robótica"
  ],
  [
    "Comunicación y atención al cliente",
    "COMUNICACIÓN Y ATE. CLI."
  ],
  [
    "Comunicación y ciencias sociales I"
  ],
  [
    "Comunicación y sociedad II"
  ],
  [
    "Contabilidad y fiscalidad"
  ],
  [
    "Cultura emprendedora y empresarial",
    "CULTURA EMPRENDEDORA Y EMPRES"
  ],
  [
    "Comunicación empresarial y atención al cliente",
    "Comunicación empr. y at.al cliente"
  ],
  [
    "Contexto de la mediación comunicativa con personas sordociegas",
    "Contexto Med Com personas Sordocieg"
  ],
  [
    "Contexto de la mediación comunicativa con personas sordociegas (dual)",
    "Contexto Med Com perso Sordoc DUAL"
  ],
  [
    "Cultura científica"
  ],
  [
    "Desarrollo de interfaces"
  ],
  [
    "Desdoble de bases de datos",
    "DESDOBLE BASE DE DATOS"
  ],
  [
    "Desdoble de sistemas informáticos"
  ],
  [
    "Desdoble de primeros auxilios",
    "DESDOBLE PRIMEROS AUXILIOS"
  ],
  [
    "Desdoble de programación",
    "DESDOBLE PROGRAMACIÓN"
  ],
  [
    "Destinos turísticos"
  ],
  [
    "Dibujo técnico",
    "DIB. TÉCNICO"
  ],
  [
    "Dirección de entidades de intermediación turística",
    "DIRECCIÓN DE ENTIDADES DE INTER."
  ],
  [
    "Desarrollo cognitivo y motor",
    "Desarrollo Cognitivo y Motor."
  ],
  [
    "Desarrollo cognitivo y motor (dual)",
    "Desarrollo Cognitivo y Motor.DUAL"
  ],
  [
    "Desarrollo socioafectivo",
    "Desarrollo Socio Afectivo."
  ],
  [
    "Desarrollo socioafectivo (dual)",
    "Desarrollo Socio Afectivo.DUAL"
  ],
  [
    "Didáctica de la educación infantil",
    "Didáctica de la Ed.Inf."
  ],
  [
    "Didáctica de la educación infantil (dual)",
    "Didáctica de la Ed.Inf.DUAL"
  ],
  [
    "Digitalización"
  ],
  [
    "Digitalización aplicada a los sectores productivos (GM)",
    "Digitalización aplic a los sect GM"
  ],
  [
    "Digitalización aplicada a los sectores productivos (GS)",
    "Digitalización aplic a los sect GS"
  ],
  [
    "Economía"
  ],
  [
    "Economía de la empresa"
  ],
  [
    "Educación física",
    "Ed. Física"
  ],
  [
    "Educación en valores cívicos y éticos",
    "EDUCACIÓN EN VALORES CÍVICOS Y ÉTIC"
  ],
  [
    "Educación plástica, visual y audiovisual",
    "EDUCACIÓN PLÁSTICA VISULA Y AUD.",
    "Educación Plástica V. y A."
  ],
  [
    "Empresa en el aula"
  ],
  [
    "Empresa y diseño de modelos de negocio",
    "EMPRESA Y DISEÑO MODELOS NEGOCIO"
  ],
  [
    "Estructura del mercado turístico",
    "ESTRUCTURA MDO. TURISTICO"
  ],
  [
    "Economía y emprendimiento"
  ],
  [
    "El juego infantil y su metodología"
  ],
  [
    "Empresa y administración"
  ],
  [
    "Entornos de desarrollo",
    "Entornos de Desarrollo."
  ],
  [
    "Estadística"
  ],
  [
    "Expresión artística"
  ],
  [
    "Expresión y comunicación"
  ],
  [
    "Filosofía"
  ],
  [
    "Finanzas y economía"
  ],
  [
    "Física"
  ],
  [
    "Física y química"
  ],
  [
    "Francés (primer idioma)",
    "FRANCES (1er ID)",
    "FRANCÉS 1er IDIOMA"
  ],
  [
    "Francés"
  ],
  [
    "Filosofía y argumentación"
  ],
  [
    "Formación y orientación personal y profesional",
    "Formac. y Orient. Pers. y Prof."
  ],
  [
    "Formación investigadora"
  ],
  [
    "Francés (segundo idioma)",
    "Francés (2º id)",
    "Francés (2º idioma)"
  ],
  [
    "Geografía"
  ],
  [
    "Gestión de productos turísticos",
    "GESTIÓN DE PDTOS TURÍSTICOS"
  ],
  [
    "Gestión de recursos humanos"
  ],
  [
    "Gestión de la documentación jurídica y empresarial",
    "GESTIÓN DOCUMENTA. JURI. EMPRESARIA"
  ],
  [
    "Gestión financiera"
  ],
  [
    "Gestión logística y comercial"
  ],
  [
    "Griego"
  ],
  [
    "Griego II"
  ],
  [
    "Geografía e historia"
  ],
  [
    "Habilidades sociales"
  ],
  [
    "Historia del mundo contemporáneo",
    "HIST. M. CONT.",
    "HISTORIA MUNDO CONTEMPORÁNEO"
  ],
  [
    "Historia de España",
    "Hª DE ESP."
  ],
  [
    "Historia del arte",
    "Hª. ARTE"
  ],
  [
    "Historia de la filosofía",
    "Hª FILOSOFIA"
  ],
  [
    "Inglés",
    "INGLÉS -"
  ],
  [
    "Inglés (primer idioma)",
    "INGLES (1er ID)"
  ],
  [
    "Inglés A y F"
  ],
  [
    "Inglés ESPA (nivel I)",
    "INGLÉS ESPA NI"
  ],
  [
    "Inglés de formación profesional básica",
    "INGLÉS FORMACIÓN P BÁSICA"
  ],
  [
    "Inglés profesional"
  ],
  [
    "Inglés profesional de grado superior",
    "INGLÉS PROFESIONAL GRADO SUPERIOR"
  ],
  [
    "Intervención socioeducativa con personas sordociegas",
    "INTERVENC. SOCIOEDUCATIVA SORDCIEG"
  ],
  [
    "Intervención con personas con dificultades de comunicación",
    "INTERVENCIÓN P.D. COMUNICACIÓN"
  ],
  [
    "Inglés (4 h)",
    "Inglés 4h"
  ],
  [
    "Iniciación a la actividad económica y empresarial",
    "Iniciación a la Act Econ. y Empres."
  ],
  [
    "Instalación y mantenimiento de redes",
    "Instalación y mant. de redes"
  ],
  [
    "Intervención con familias y atención a menores en riesgo social",
    "Interv.con Fam.y Atenc.Men. en RS"
  ],
  [
    "Itinerario personal para la empleabilidad (dual)",
    "Itinerario Pers para Empleab DUAL",
    "Itinerario Personal Empleab. DUAL"
  ],
  [
    "Itinerario personal para la empleabilidad I",
    "Itinerario Personal Empleabilidad I"
  ],
  [
    "Itinerario personal para la empleabilidad II",
    "Itinerario Personal para emple. 2",
    "Itinerario Personal para la emple 2",
    "Itinerario personal para empl. II",
    "Itinerario personal para la empl 2"
  ],
  [
    "Itinerario personal para la empleabilidad",
    "Itinerario Personal para la Empleab",
    "Itinerario personal para la emplea"
  ],
  [
    "Latín"
  ],
  [
    "Latín I"
  ],
  [
    "Latín II"
  ],
  [
    "Lengua castellana y literatura",
    "LENGUA CASTELLANA Y LIT.",
    "LENGUA LIT. CAST.",
    "Lengua y Lit."
  ],
  [
    "Laboratorio STEAM"
  ],
  [
    "Lengua de signos"
  ],
  [
    "Lenguajes de marcas y sistemas de gestión de información",
    "Lenguajes de marca y s. Gest. Inf."
  ],
  [
    "Marketing turístico"
  ],
  [
    "Matemáticas aplicadas a las ciencias sociales",
    "MAT. AP. CI. SOC.",
    "MATEMÁTICAS APLICADAS A CCSS",
    "MATEMÁTICAS APLICADAS CS"
  ],
  [
    "Matemáticas"
  ],
  [
    "Montaje y mantenimiento de sistemas y componentes informáticos",
    "MONTAJE Y MANT. SIST.COMPON.INFORM"
  ],
  [
    "Matemáticas A"
  ],
  [
    "Matemáticas B"
  ],
  [
    "Metodología de la integración social (dual)",
    "Metodología integración social DUAL"
  ],
  [
    "Música"
  ],
  [
    "Módulo optativo"
  ],
  [
    "Ofimática y proceso de la información",
    "OFIMAT. Y PROCESO INFORMACIÓN"
  ],
  [
    "Operaciones auxiliares de gestión de tesorería",
    "OP AUX GESTIÓN DE TESORERÍA"
  ],
  [
    "Operaciones auxiliares de configuración y explotación",
    "OPE.AUX.CONFIGURACIÓN Y EXPLOTAC."
  ],
  [
    "Operaciones administrativas de recursos humanos",
    "OPERACIONES ADMITIVAS RRHH"
  ],
  [
    "Oratoria y debate"
  ],
  [
    "Ofimática y archivo de documentos"
  ],
  [
    "Operaciones administrativas de compraventa",
    "Operaciones adm. de compra-venta"
  ],
  [
    "PEPA"
  ],
  [
    "Proceso integral de la actividad comercial",
    "PROCESO INTEGRAL ACTI. COMER"
  ],
  [
    "Programación multimedia y dispositivos móviles",
    "PROGRAMA. MULT. DISP. MOVI."
  ],
  [
    "Programación de servicios y procesos",
    "PROGRAMACIÓN DE SERV. Y PROCE."
  ],
  [
    "Protocolo y relaciones públicas",
    "PROTOCOLO Y RELACIONES P."
  ],
  [
    "Proyecto transversal de educación en valores",
    "PROY. TRANS. EDUC VALORES"
  ],
  [
    "Proyecto intermodular"
  ],
  [
    "Psicología"
  ],
  [
    "Patrimonio cultural y artístico"
  ],
  [
    "Preparación del nivel B1",
    "Preparación Nivel B1"
  ],
  [
    "Primeros auxilios (dual)",
    "Primeros DUAL"
  ],
  [
    "Primeros auxilios"
  ],
  [
    "Programación (mañana)",
    "Programación Mañana"
  ],
  [
    "Química"
  ],
  [
    "Recursos turísticos"
  ],
  [
    "Religión",
    "RELIGI_N"
  ],
  [
    "REVA"
  ],
  [
    "Recursos humanos y responsabilidad social corporativa",
    "RRHH RESPONSABILI. S.C."
  ],
  [
    "Refuerzo de lengua",
    "Refuerz Lengua",
    "Refuerzo Lengua"
  ],
  [
    "Refuerzo de inglés",
    "Refuerzo Inglés"
  ],
  [
    "Refuerzo de matemáticas",
    "Refuerzo Matemáticas"
  ],
  [
    "Religión evangélica"
  ],
  [
    "Simulación empresarial"
  ],
  [
    "Sistemas de gestión empresarial",
    "SITEMAS DE GESTI. EMPRE."
  ],
  [
    "Sensibilización social y participación",
    "Sensibilización soc. y partic."
  ],
  [
    "Sensibilización social y participación (dual)",
    "Sensibilización soc. y partic. DUal"
  ],
  [
    "Sistemas aumentativos y alternativos",
    "Sistemas aumentati. y alternativos"
  ],
  [
    "Sistemas informáticos"
  ],
  [
    "Sostenibilidad aplicada al sistema productivo",
    "Sostenibilidad Aplic. al Sist.Prod."
  ],
  [
    "Tecnologías de la información y la comunicación",
    "TECN. INFORM Y COMUNICACIÓN",
    "TECNOLOGÍAS DE LA INFORMACIÓN Y COM"
  ],
  [
    "Tecnología e ingeniería"
  ],
  [
    "Tratamiento de la documentación contable",
    "TRATAMIENTO DOCU CONTABLE"
  ],
  [
    "Tutoría"
  ],
  [
    "Tutoría de orientación (diversificación)",
    "TUTORÍA ORIENTACIÓN DIVER"
  ],
  [
    "Tecnología y digitalización",
    "Tecnología Digitalización"
  ],
  [
    "Tecnología"
  ],
  [
    "Tratamiento de la información"
  ],
  [
    "Tutoría de orientación",
    "Tutoría Orientación"
  ],
  [
    "Técnica contable"
  ],
  [
    "Técnicas de intervención comunicativa",
    "Técnicas Intervención Comunicativas"
  ],
  [
    "Venta de servicios turísticos"
  ],
  [
    "Ámbito científico (nivel I)",
    "ÁMBITO CIENTÍFICO NI"
  ],
  [
    "Ámbito científico (nivel II)",
    "ÁMBITO CIENTÍFICO NII"
  ],
  [
    "Ámbito de comunicación: lengua (nivel I)",
    "ÁMBITO COMUNICACIÓN LENGUA NI"
  ],
  [
    "Ámbito de aplicación de la lengua de signos",
    "ÁMBITO DE APLIC. LENGUA DE SIGNOS"
  ],
  [
    "Ámbito de comunicación: lengua (nivel II)",
    "ÁMBITO DE COMUNICACIÓN LENGUA NII"
  ],
  [
    "Ámbito social (nivel I)",
    "ÁMBITO SOCIAL N I"
  ],
  [
    "Ámbito social (nivel II)",
    "ÁMBITO SOCIAL N II"
  ],
  [
    "Ámbito científico-matemático",
    "Ámbito Científico Matemático"
  ],
  [
    "Ámbito científico-tecnológico",
    "Ámbito Científico Tecnolóico"
  ],
  [
    "Ámbito lingüístico-social",
    "Ámbito Lingüistico Social"
  ],
  [
    "Área lingüística de carácter transversal",
    "Área Lingüística caráct.trasversal"
  ]
];
  const names = new Map();
  reviewed.forEach(([canonical, ...aliases]) => {
    [canonical, ...aliases].forEach(alias => names.set(key(alias), canonical));
  });
  return {
    name: original => names.get(key(original)) || stripCourse(original),
    reviewed: original => names.has(key(original))
  };
})();
