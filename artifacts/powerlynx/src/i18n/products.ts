import type { Product } from "@/data/products";
import type { LanguageCode } from "@/data/languages";

type ProductCopy = Partial<Pick<Product, "name" | "category" | "line">>;
type ProductTechnicalCopy = Pick<Product, "summary" | "bullets">;

const names: Partial<Record<LanguageCode, Record<string, string>>> = {
  ES: {
    "white-insulated-line-set": "Juego de líneas aislado blanco con tuercas abocardadas",
    "black-rubber-insulated-line-set": "Juego de líneas con aislamiento de caucho negro",
    "thermal-imaging-camera": "Cámara termográfica",
    "brazing-torch": "Soplete de soldadura fuerte",
    "utility-torch": "Soplete multiuso",
    "manifold-gauge": "Manómetro múltiple (2 / 4 válvulas)",
    "refrigerant-hose-set": "Juego de mangueras para refrigerante",
    "flaring-tool": "Abocardador",
    "tube-expander": "Expansor de tubos",
    "tube-straightener": "Enderezador de tubos",
    "tube-cutter": "Cortatubos",
    reamer: "Escariador interno y externo",
    "deburring-tool": "Desbarbador de tubos",
    "ratcheting-wrench": "Llave de carraca",
    "folding-knife": "Cuchillo plegable",
    "dual-blade-folding-knife": "Cuchillo plegable de doble hoja",
    "led-penlight": "Linterna LED tipo lápiz",
    "led-headlight": "Linterna frontal LED",
    "condenser-fan-motor-single-speed": "Motor de ventilador de condensador (una velocidad)",
    "condenser-fan-motor-multi-hp": "Motor de ventilador de condensador (multi-HP)",
  },
  PT: {
    "white-insulated-line-set": "Conjunto de linhas isolado branco com porcas flangeadas",
    "black-rubber-insulated-line-set": "Conjunto de linhas com isolamento de borracha preta",
    "thermal-imaging-camera": "Câmera termográfica",
    "brazing-torch": "Maçarico de brasagem",
    "utility-torch": "Maçarico utilitário",
    "manifold-gauge": "Manifold (2 / 4 válvulas)",
    "refrigerant-hose-set": "Conjunto de mangueiras para refrigerante",
    "flaring-tool": "Flangeador",
    "tube-expander": "Expansor de tubos",
    "tube-straightener": "Endireitador de tubos",
    "tube-cutter": "Cortador de tubos",
    reamer: "Alargador interno e externo",
    "deburring-tool": "Ferramenta de rebarbação",
    "ratcheting-wrench": "Chave catraca",
    "folding-knife": "Faca dobrável",
    "dual-blade-folding-knife": "Faca dobrável de duas lâminas",
    "led-penlight": "Lanterna LED",
    "led-headlight": "Lanterna frontal LED",
    "condenser-fan-motor-single-speed": "Motor de ventilador do condensador (uma velocidade)",
    "condenser-fan-motor-multi-hp": "Motor de ventilador do condensador (multi-HP)",
  },
  FR: {
    "white-insulated-line-set": "Kit de lignes isolées blanc avec écrous évasés",
    "black-rubber-insulated-line-set": "Kit de lignes isolées en caoutchouc noir",
    "thermal-imaging-camera": "Caméra thermique",
    "brazing-torch": "Chalumeau de brasage",
    "utility-torch": "Chalumeau utilitaire",
    "manifold-gauge": "Manifold (2 / 4 vannes)",
    "refrigerant-hose-set": "Kit de flexibles frigorifiques",
    "flaring-tool": "Dudgeonnière",
    "tube-expander": "Expandeur de tubes",
    "tube-straightener": "Redresseur de tubes",
    "tube-cutter": "Coupe-tube",
    reamer: "Alésoir intérieur et extérieur",
    "deburring-tool": "Ébavureur de tubes",
    "ratcheting-wrench": "Clé à cliquet",
    "folding-knife": "Couteau pliant",
    "dual-blade-folding-knife": "Couteau pliant à double lame",
    "led-penlight": "Lampe stylo LED",
    "led-headlight": "Lampe frontale LED",
    "condenser-fan-motor-single-speed": "Moteur de ventilateur de condenseur (une vitesse)",
    "condenser-fan-motor-multi-hp": "Moteur de ventilateur de condenseur (multi-HP)",
  },
  DE: {
    "white-insulated-line-set": "Weiße isolierte Leitung mit Bördelmuttern",
    "black-rubber-insulated-line-set": "Schwarz gummierte isolierte Leitung",
    "thermal-imaging-camera": "Wärmebildkamera",
    "brazing-torch": "Hartlötbrenner",
    "utility-torch": "Universalbrenner",
    "manifold-gauge": "Manometer (2 / 4 Ventile)",
    "refrigerant-hose-set": "Kältemittelschlauch-Set",
    "flaring-tool": "Bördelwerkzeug",
    "tube-expander": "Rohr-Aufweiter",
    "tube-straightener": "Rohr-Richtwerkzeug",
    "tube-cutter": "Rohrschneider",
    reamer: "Innen- und Außenentgrater",
    "deburring-tool": "Rohr-Entgrater",
    "ratcheting-wrench": "Ratschenringschlüssel",
    "folding-knife": "Klappmesser",
    "dual-blade-folding-knife": "Klappmesser mit zwei Klingen",
    "led-penlight": "LED-Stiftlampe",
    "led-headlight": "LED-Stirnlampe",
    "condenser-fan-motor-single-speed": "Kondensatorlüftermotor (einstufig)",
    "condenser-fan-motor-multi-hp": "Kondensatorlüftermotor (Multi-HP)",
  },
  JA: {
    "white-insulated-line-set": "フレアナット付き白色断熱ラインセット",
    "black-rubber-insulated-line-set": "フレアナット付き黒色ゴム断熱ラインセット",
    "thermal-imaging-camera": "サーマルイメージングカメラ",
    "brazing-torch": "ろう付けトーチ",
    "utility-torch": "ユーティリティトーチ",
    "manifold-gauge": "マニホールドゲージ（2 / 4 バルブ）",
    "refrigerant-hose-set": "冷媒ホースセット",
    "flaring-tool": "フレアリングツール",
    "tube-expander": "チューブエキスパンダー",
    "tube-straightener": "チューブストレートナー",
    "tube-cutter": "チューブカッター",
    reamer: "内外面リーマー",
    "deburring-tool": "チューブ面取りツール",
    "ratcheting-wrench": "ラチェットレンチ",
    "folding-knife": "折りたたみナイフ",
    "dual-blade-folding-knife": "2枚刃折りたたみナイフ",
    "led-penlight": "LED ペンライト",
    "led-headlight": "LED ヘッドライト",
    "condenser-fan-motor-single-speed": "コンデンサーファンモーター（単速）",
    "condenser-fan-motor-multi-hp": "コンデンサーファンモーター（マルチ HP）",
  },
  KO: {
    "white-insulated-line-set": "플레어 너트 포함 화이트 절연 라인 세트",
    "black-rubber-insulated-line-set": "플레어 너트 포함 블랙 고무 절연 라인 세트",
    "thermal-imaging-camera": "열화상 카메라",
    "brazing-torch": "브레이징 토치",
    "utility-torch": "다용도 토치",
    "manifold-gauge": "매니폴드 게이지(2 / 4 밸브)",
    "refrigerant-hose-set": "냉매 호스 세트",
    "flaring-tool": "플레어링 공구",
    "tube-expander": "튜브 확관기",
    "tube-straightener": "튜브 교정기",
    "tube-cutter": "튜브 커터",
    reamer: "내·외경 리머",
    "deburring-tool": "튜브 디버링 공구",
    "ratcheting-wrench": "래칫 렌치",
    "folding-knife": "접이식 나이프",
    "dual-blade-folding-knife": "더블 블레이드 접이식 나이프",
    "led-penlight": "LED 펜라이트",
    "led-headlight": "LED 헤드라이트",
    "condenser-fan-motor-single-speed": "콘덴서 팬 모터(단일 속도)",
    "condenser-fan-motor-multi-hp": "콘덴서 팬 모터(다중 HP)",
  },
  ZH: {
    "white-insulated-line-set": "白色保温管组（含扩口螺母）",
    "black-rubber-insulated-line-set": "黑色橡胶保温管组（含扩口螺母）",
    "thermal-imaging-camera": "热成像相机",
    "brazing-torch": "焊炬",
    "utility-torch": "多用途焊炬",
    "manifold-gauge": "歧管压力表（2 / 4 阀）",
    "refrigerant-hose-set": "制冷剂软管组",
    "flaring-tool": "扩口工具",
    "tube-expander": "扩管器",
    "tube-straightener": "管路校直器",
    "tube-cutter": "割管器",
    reamer: "内外两用铰刀",
    "deburring-tool": "管路去毛刺工具",
    "ratcheting-wrench": "棘轮扳手",
    "folding-knife": "折叠刀",
    "dual-blade-folding-knife": "双刃折叠刀",
    "led-penlight": "LED 笔灯",
    "led-headlight": "LED 头灯",
    "condenser-fan-motor-single-speed": "冷凝风扇电机（单速）",
    "condenser-fan-motor-multi-hp": "冷凝风扇电机（多马力）",
  },
  "ZH-TW": {
    "white-insulated-line-set": "白色保溫管組（含擴口螺母）",
    "black-rubber-insulated-line-set": "黑色橡膠保溫管組（含擴口螺母）",
    "thermal-imaging-camera": "熱成像相機",
    "brazing-torch": "焊炬",
    "utility-torch": "多用途焊炬",
    "manifold-gauge": "歧管壓力表（2 / 4 閥）",
    "refrigerant-hose-set": "冷媒軟管組",
    "flaring-tool": "擴口工具",
    "tube-expander": "擴管器",
    "tube-straightener": "管路校直器",
    "tube-cutter": "割管器",
    reamer: "內外兩用鉸刀",
    "deburring-tool": "管路去毛刺工具",
    "ratcheting-wrench": "棘輪扳手",
    "folding-knife": "折疊刀",
    "dual-blade-folding-knife": "雙刃折疊刀",
    "led-penlight": "LED 筆燈",
    "led-headlight": "LED 頭燈",
    "condenser-fan-motor-single-speed": "冷凝風扇馬達（單速）",
    "condenser-fan-motor-multi-hp": "冷凝風扇馬達（多馬力）",
  },
};

const technicalProductCopy: Partial<Record<LanguageCode, Record<string, ProductTechnicalCopy>>> = {
  ES: {
    "white-insulated-line-set": {
      summary:
        "Juego de líneas de cobre con cubierta aislante de tres capas de película de polietileno gofrada, materiales resistentes a la intemperie y algodón aislante grueso. Resistente a la corrosión, el agua, los impactos y el fuego, con construcción ignífuga y fonoabsorbente.",
      bullets: [
        "Rango de operación de -40°F a 248°F (-40°C a 120°C)",
        "Resistente a los rayos UV; cumple ASTM E84 y UL94",
        "Cobre con una pureza del 99,9 %, conforme con las normas C12200",
        "Recocido blando y fácil de doblar",
      ],
    },
    "black-rubber-insulated-line-set": {
      summary:
        "El mismo rendimiento resistente a la corrosión, el fuego y los impactos que el juego de líneas blanco, recubierto con un aislamiento de caucho negro resistente para trabajos que requieren un acabado oscuro.",
      bullets: [
        "Rango de operación de -40°F a 248°F (-40°C a 120°C)",
        "Resistente a los rayos UV; cumple ASTM E84 y UL94",
        "Cobre con una pureza del 99,9 %, conforme con las normas C12200",
        "Recocido blando y fácil de doblar",
      ],
    },
    "thermal-imaging-camera": {
      summary:
        "Cámara termográfica portátil para detectar puntos calientes/fríos, fugas de refrigerante y fallas eléctricas en obra.",
      bullets: [
        "Resolución infrarroja de 120x90 (ATC100) o 256x192 (ATC200)",
        "Rango de temperatura de -4°F a 1022°F",
        "Carcasa con clasificación IP54",
        'Pantalla integrada de 2,8"',
      ],
    },
    "brazing-torch": {
      summary:
        "Soplete de soldadura fuerte compatible con MAP-Pro/propano, con encendido y apagado automáticos para realizar uniones de forma rápida y segura.",
      bullets: [
        "Funciona con MAP-Pro o propano",
        "Encendido y apagado automáticos de la llama",
        "Punta de acero inoxidable",
      ],
    },
    "utility-torch": {
      summary: "Soplete compacto exclusivo para propano, diseñado para trabajos de soldadura de precisión.",
      bullets: ["Solo propano", "Formato compacto para espacios reducidos"],
    },
    "manifold-gauge": {
      summary:
        'Juego de manómetro múltiple de precisión para medir y cargar sistemas con los refrigerantes habituales, con una esfera grande de 3-1/8" fácil de leer en obra.',
      bullets: [
        "Compatible con R410A, R32, R454B y R22",
        'Esfera de 3-1/8"',
        "Rango de -30 inHg a 800 psi",
      ],
    },
    "refrigerant-hose-set": {
      summary:
        'Juego de mangueras para refrigerante de 5ft, 1/4"-1/4", clasificado para trabajos exigentes de carga y recuperación, disponible con o sin válvula de bola.',
      bullets: [
        "Presión de trabajo de 800 psi y presión de rotura de 4000 psi",
        "ARH5SV incorpora una válvula de bola integrada",
      ],
    },
    "flaring-tool": {
      summary:
        'Abocardador para tubos de 1/4" a 3/4", con cono excéntrico de 45 grados para obtener abocardados limpios y uniformes.',
      bullets: ['Capacidad de 1/4" a 3/4"', "Cono excéntrico de 45 grados", "Placas niqueladas"],
    },
    "tube-expander": {
      summary:
        'Expansor de tubos plegable para tubos de 1/4" a 7/8", diseñado para realizar abocardados por expansión rápidamente en obra.',
      bullets: ['Capacidad de 1/4" a 7/8"', "Diseño plegable para transportar fácilmente en obra"],
    },
    "tube-straightener": {
      summary: 'Enderezador de tubos sencillo y resistente, disponible en tamaños de 1/4" y 3/8".',
      bullets: ['AHS2: 1/4"', 'AHS3: 3/8"'],
    },
    "tube-cutter": {
      summary:
        "Gama de cortatubos dimensionados para todo tipo de trabajos, desde líneas de refrigerante en espacios reducidos hasta tubos de cobre de mayor diámetro.",
      bullets: [
        'AHC6C: de 1/8" a 3/4"',
        'AHC11C: de 3/16" a 1-1/8"',
        'AHC12: de 1/8" a 1-1/4"',
      ],
    },
    reamer: {
      summary: 'Escariador interno y externo de doble función para tubos de 1/8" a 1-1/2".',
      bullets: ['Capacidad de 1/8" a 1-1/2"', "Escariado interno y externo en una sola herramienta"],
    },
    "deburring-tool": {
      summary:
        "Desbarbador de tubos suministrado con dos cuchillas de repuesto, listo para trabajos prolongados.",
      bullets: ["Incluye 2 cuchillas de repuesto"],
    },
    "ratcheting-wrench": {
      summary: "Llave de carraca bidireccional para trabajar en válvulas, suministrada con adaptadores de llave hexagonal.",
      bullets: [
        "Cambia entre giro horario y antihorario",
        "Incluye adaptadores de llave hexagonal",
      ],
    },
    "folding-knife": {
      summary: "Cuchillo plegable para obra con destornillador Phillips/de punta plana integrado.",
      bullets: ["Destornillador combinado Phillips y de punta plana"],
    },
    "dual-blade-folding-knife": {
      summary: "Cuchillo plegable de doble hoja para cortar una gama más amplia de materiales en obra.",
      bullets: ["Configuración de dos hojas"],
    },
    "led-penlight": {
      summary: "Linterna LED tipo lápiz compacta de 300 lúmenes para inspeccionar espacios estrechos y oscuros.",
      bullets: ["300 lúmenes", "Clasificación IP44", "Distancia de alcance de 330ft"],
    },
    "led-headlight": {
      summary: "Linterna frontal LED manos libres de 350 lúmenes, diseñada para trabajos prolongados.",
      bullets: ["350 lúmenes", "Clasificación IPX3", "Hasta 6 horas de uso continuo"],
    },
    "condenser-fan-motor-single-speed": {
      summary:
        "Motor de ventilador de condensador de una velocidad, resistente y apto para la intemperie, diseñado para restablecer el flujo de aire correcto a través de las serpentines del condensador y evitar el sobrecalentamiento del sistema.",
      bullets: [
        "Bastidor NEMA 48, aislamiento de clase B",
        "Reconocido por UL",
        "Rotación reversible, totalmente cerrado",
        "Protección contra sobrecarga térmica",
      ],
    },
    "condenser-fan-motor-multi-hp": {
      summary:
        "Motor de ventilador de condensador de varias potencias que cubre un rango de servicio más amplio y permite a los técnicos llevar menos SKU en el vehículo.",
      bullets: ["1/6 - 1/3 HP", "Bastidor NEMA 48, aislamiento de clase B", "Reconocido por UL"],
    },
  },
  PT: {
    "white-insulated-line-set": {
      summary:
        "Conjunto de linhas de cobre com cobertura isolante de três camadas, formada por filme de polietileno gofrado, materiais resistentes às intempéries e algodão isolante espesso. Resistente à corrosão, água, impactos e fogo, com construção retardante de chamas e absorvente de som.",
      bullets: [
        "Faixa de operação de -40°F a 248°F (-40°C a 120°C)",
        "Resistente a UV; atende ASTM E84 e UL94",
        "Cobre com pureza de 99,9%, em conformidade com as normas C12200",
        "Recozido macio e fácil de dobrar",
      ],
    },
    "black-rubber-insulated-line-set": {
      summary:
        "O mesmo desempenho resistente à corrosão, ao fogo e a impactos do conjunto de linhas branco, envolvido por um isolamento robusto de borracha preta para trabalhos que exigem um acabamento escuro.",
      bullets: [
        "Faixa de operação de -40°F a 248°F (-40°C a 120°C)",
        "Resistente a UV; atende ASTM E84 e UL94",
        "Cobre com pureza de 99,9%, em conformidade com as normas C12200",
        "Recozido macio e fácil de dobrar",
      ],
    },
    "thermal-imaging-camera": {
      summary:
        "Câmera termográfica portátil para localizar pontos quentes/frios, vazamentos de refrigerante e falhas elétricas no local de trabalho.",
      bullets: [
        "Resolução infravermelha de 120x90 (ATC100) ou 256x192 (ATC200)",
        "Faixa de temperatura de -4°F a 1022°F",
        "Carcaça com classificação IP54",
        'Tela integrada de 2,8"',
      ],
    },
    "brazing-torch": {
      summary:
        "Maçarico de brasagem compatível com MAP-Pro/propano, com ignição e desligamento automáticos para executar uniões com rapidez e segurança.",
      bullets: [
        "Funciona com MAP-Pro ou propano",
        "Ignição e desligamento automático da chama",
        "Ponta de aço inoxidável",
      ],
    },
    "utility-torch": {
      summary: "Maçarico compacto exclusivo para propano, desenvolvido para trabalhos de soldagem de precisão.",
      bullets: ["Somente propano", "Formato compacto para espaços estreitos"],
    },
    "manifold-gauge": {
      summary:
        'Conjunto de manifold de precisão para medir e carregar sistemas com os refrigerantes mais comuns, com mostrador grande de 3-1/8" fácil de ler no local de trabalho.',
      bullets: [
        "Compatível com R410A, R32, R454B e R22",
        'Mostrador de 3-1/8"',
        "Faixa de -30 inHg a 800 psi",
      ],
    },
    "refrigerant-hose-set": {
      summary:
        'Conjunto de mangueiras para refrigerante de 5ft, 1/4"-1/4", classificado para trabalhos exigentes de carga e recuperação, disponível com ou sem válvula de esfera.',
      bullets: [
        "Pressão de trabalho de 800 psi e pressão de ruptura de 4000 psi",
        "ARH5SV adiciona uma válvula de esfera integrada",
      ],
    },
    "flaring-tool": {
      summary:
        'Flangeador para tubos de 1/4" a 3/4", com cone excêntrico de 45 graus para flanges limpas e consistentes.',
      bullets: ['Capacidade de 1/4" a 3/4"', "Cone excêntrico de 45 graus", "Revestido de níquel"],
    },
    "tube-expander": {
      summary:
        'Expansor de tubos dobrável para tubos de 1/4" a 7/8", desenvolvido para expansão rápida no local de trabalho.',
      bullets: ['Capacidade de 1/4" a 7/8"', "Design dobrável para transporte no trabalho"],
    },
    "tube-straightener": {
      summary: 'Endireitador de tubos simples e durável, disponível nos tamanhos de 1/4" e 3/8".',
      bullets: ['AHS2: 1/4"', 'AHS3: 3/8"'],
    },
    "tube-cutter": {
      summary:
        "Linha de cortadores de tubos dimensionados para tudo, desde linhas de refrigerante em espaços estreitos até tubos de cobre maiores.",
      bullets: [
        'AHC6C: 1/8" a 3/4"',
        'AHC11C: 3/16" a 1-1/8"',
        'AHC12: 1/8" a 1-1/4"',
      ],
    },
    reamer: {
      summary: 'Alargador interno e externo de dupla função para tubos de 1/8" a 1-1/2".',
      bullets: ['Capacidade de 1/8" a 1-1/2"', "Alargamento interno e externo em uma só ferramenta"],
    },
    "deburring-tool": {
      summary:
        "Ferramenta de rebarbação de tubos fornecida com duas lâminas sobressalentes, pronta para trabalhos prolongados.",
      bullets: ["Inclui 2 lâminas sobressalentes"],
    },
    "ratcheting-wrench": {
      summary: "Chave catraca bidirecional para trabalhos em válvulas, fornecida com adaptadores de chave sextavada.",
      bullets: [
        "Alterna entre rotação horária e anti-horária",
        "Inclui adaptadores de chave sextavada",
      ],
    },
    "folding-knife": {
      summary: "Faca dobrável para o local de trabalho com chave Phillips/de fenda integrada.",
      bullets: ["Chave combinada Phillips e de fenda"],
    },
    "dual-blade-folding-knife": {
      summary: "Faca dobrável de duas lâminas para cortar uma variedade maior de materiais no local de trabalho.",
      bullets: ["Configuração de duas lâminas"],
    },
    "led-penlight": {
      summary: "Lanterna LED compacta de 300 lúmens para inspecionar espaços estreitos e escuros.",
      bullets: ["300 lúmens", "Classificação IP44", "Distância de alcance de 330ft"],
    },
    "led-headlight": {
      summary: "Lanterna frontal LED de 350 lúmens, sem uso das mãos, desenvolvida para trabalhos longos.",
      bullets: ["350 lúmens", "Classificação IPX3", "Até 6 horas de uso contínuo"],
    },
    "condenser-fan-motor-single-speed": {
      summary:
        "Motor de ventilador do condensador de uma velocidade, robusto e resistente às intempéries, desenvolvido para restaurar o fluxo de ar adequado pelas serpentinas do condensador e evitar o superaquecimento do sistema.",
      bullets: [
        "Estrutura NEMA 48, isolamento classe B",
        "Reconhecido pela UL",
        "Rotação reversível, totalmente fechado",
        "Proteção contra sobrecarga térmica",
      ],
    },
    "condenser-fan-motor-multi-hp": {
      summary:
        "Motor de ventilador do condensador com múltiplas potências, cobrindo uma faixa de serviço mais ampla para que os técnicos mantenham menos SKUs no veículo.",
      bullets: ["1/6 - 1/3 HP", "Estrutura NEMA 48, isolamento classe B", "Reconhecido pela UL"],
    },
  },
  FR: {
    "white-insulated-line-set": {
      summary:
        "Kit de lignes en cuivre avec enveloppe isolante à trois couches composée d'un film de polyéthylène gaufré, de matériaux résistants aux intempéries et d'un épais coton isolant. Résistant à la corrosion, à l'eau, aux chocs et au feu, avec une construction ignifuge et insonorisante.",
      bullets: [
        "Plage de fonctionnement de -40°F à 248°F (-40°C à 120°C)",
        "Résistant aux UV ; respecte les normes ASTM E84 et UL94",
        "Cuivre pur à 99,9 %, conforme aux normes C12200",
        "Recuit doux et facile à cintrer",
      ],
    },
    "black-rubber-insulated-line-set": {
      summary:
        "Les mêmes performances de résistance à la corrosion, au feu et aux chocs que le kit de lignes blanc, avec une isolation robuste en caoutchouc noir pour les travaux exigeant une finition sombre.",
      bullets: [
        "Plage de fonctionnement de -40°F à 248°F (-40°C à 120°C)",
        "Résistant aux UV ; respecte les normes ASTM E84 et UL94",
        "Cuivre pur à 99,9 %, conforme aux normes C12200",
        "Recuit doux et facile à cintrer",
      ],
    },
    "thermal-imaging-camera": {
      summary:
        "Caméra thermique portative pour repérer les points chauds/froids, les fuites de réfrigérant et les défauts électriques sur le chantier.",
      bullets: [
        "Résolution infrarouge de 120x90 (ATC100) ou 256x192 (ATC200)",
        "Plage de température de -4°F à 1022°F",
        "Boîtier classé IP54",
        'Écran intégré de 2,8"',
      ],
    },
    "brazing-torch": {
      summary:
        "Chalumeau de brasage compatible MAP-Pro/propane, avec allumage et arrêt automatiques pour réaliser rapidement et en toute sécurité les assemblages.",
      bullets: [
        "Fonctionne au MAP-Pro ou au propane",
        "Allumage et arrêt automatiques de la flamme",
        "Embout en acier inoxydable",
      ],
    },
    "utility-torch": {
      summary: "Chalumeau compact fonctionnant uniquement au propane, conçu pour les travaux de soudage de précision.",
      bullets: ["Propane uniquement", "Format compact pour les espaces étroits"],
    },
    "manifold-gauge": {
      summary:
        'Jeu de manifold de précision pour mesurer et charger les systèmes avec les réfrigérants courants, doté d\'un grand cadran de 3-1/8" facile à lire sur le chantier.',
      bullets: [
        "Compatible avec R410A, R32, R454B et R22",
        'Cadran de 3-1/8"',
        "Plage de -30 inHg à 800 psi",
      ],
    },
    "refrigerant-hose-set": {
      summary:
        'Kit de flexibles frigorifiques de 5ft, 1/4"-1/4", conçu pour les travaux exigeants de charge et de récupération, disponible avec ou sans vanne à bille.',
      bullets: [
        "Pression de service de 800 psi, pression d'éclatement de 4000 psi",
        "L'ARH5SV ajoute une vanne à bille intégrée",
      ],
    },
    "flaring-tool": {
      summary:
        'Dudgeonnière pour tubes de 1/4" à 3/4", avec cône excentrique à 45 degrés pour des évasements propres et réguliers.',
      bullets: ['Capacité de 1/4" à 3/4"', "Cône excentrique à 45 degrés", "Nickelée"],
    },
    "tube-expander": {
      summary:
        'Expandeur de tubes pliable pour tubes de 1/4" à 7/8", conçu pour un évasement par expansion rapide sur le chantier.',
      bullets: ['Capacité de 1/4" à 7/8"', "Conception pliable facile à transporter"],
    },
    "tube-straightener": {
      summary: 'Redresseur de tubes simple et durable, disponible en tailles 1/4" et 3/8".',
      bullets: ['AHS2 : 1/4"', 'AHS3 : 3/8"'],
    },
    "tube-cutter": {
      summary:
        "Gamme de coupe-tubes adaptée à tous les travaux, des lignes de réfrigérant dans les espaces étroits aux tubes de cuivre de plus grand diamètre.",
      bullets: [
        'AHC6C : 1/8" à 3/4"',
        'AHC11C : 3/16" à 1-1/8"',
        'AHC12 : 1/8" à 1-1/4"',
      ],
    },
    reamer: {
      summary: 'Alésoir intérieur et extérieur à double fonction pour tubes de 1/8" à 1-1/2".',
      bullets: ['Capacité de 1/8" à 1-1/2"', "Alésage intérieur et extérieur avec un seul outil"],
    },
    "deburring-tool": {
      summary:
        "Ébavureur de tubes fourni avec deux lames de rechange, prêt pour les travaux prolongés.",
      bullets: ["Comprend 2 lames de rechange"],
    },
    "ratcheting-wrench": {
      summary: "Clé à cliquet bidirectionnelle pour les travaux sur les vannes, fournie avec des adaptateurs hexagonaux.",
      bullets: [
        "Passe de la rotation horaire à la rotation antihoraire",
        "Comprend des adaptateurs de clé hexagonale",
      ],
    },
    "folding-knife": {
      summary: "Couteau pliant de chantier avec tournevis cruciforme/plat intégré.",
      bullets: ["Tournevis combiné cruciforme et plat"],
    },
    "dual-blade-folding-knife": {
      summary: "Couteau pliant à double lame pour couper une plus grande variété de matériaux sur le chantier.",
      bullets: ["Configuration à deux lames"],
    },
    "led-penlight": {
      summary: "Lampe stylo LED compacte de 300 lumens pour inspecter les espaces étroits et sombres.",
      bullets: ["300 lumens", "Classement IP44", "Distance de portée de 330ft"],
    },
    "led-headlight": {
      summary: "Lampe frontale LED mains libres de 350 lumens, conçue pour les longues interventions.",
      bullets: ["350 lumens", "Classement IPX3", "Jusqu'à 6 heures d'utilisation continue"],
    },
    "condenser-fan-motor-single-speed": {
      summary:
        "Moteur de ventilateur de condenseur monovitesse robuste et résistant aux intempéries, conçu pour rétablir le débit d'air dans les batteries du condenseur et éviter la surchauffe du système.",
      bullets: [
        "Châssis NEMA 48, isolation classe B",
        "Reconnu UL",
        "Rotation réversible, totalement fermé",
        "Protection contre les surcharges thermiques",
      ],
    },
    "condenser-fan-motor-multi-hp": {
      summary:
        "Moteur de ventilateur de condenseur multi-puissance couvrant une plage de service plus large afin que les techniciens puissent stocker moins de SKU dans le véhicule.",
      bullets: ["1/6 - 1/3 HP", "Châssis NEMA 48, isolation classe B", "Reconnu UL"],
    },
  },
  DE: {
    "white-insulated-line-set": {
      summary:
        "Kupferleitungssatz mit einer dreilagigen Isolierhülle aus geprägter Polyethylenfolie, witterungsbeständigen Materialien und dicker Isolierbaumwolle. Korrosions-, wasser-, stoß- und feuerbeständig, mit flammhemmender und schallabsorbierender Konstruktion.",
      bullets: [
        "Betriebsbereich -40°F bis 248°F (-40°C bis 120°C)",
        "UV-beständig, erfüllt ASTM E84 und UL94",
        "99,9 % reines Kupfer, konform mit den C12200-Normen",
        "Weichgeglüht und leicht zu biegen",
      ],
    },
    "black-rubber-insulated-line-set": {
      summary:
        "Die gleiche korrosions-, feuer- und stoßbeständige Leistung wie der weiße Leitungssatz, umhüllt mit einer robusten schwarzen Gummiisolierung für Arbeiten mit dunkler Oberfläche.",
      bullets: [
        "Betriebsbereich -40°F bis 248°F (-40°C bis 120°C)",
        "UV-beständig, erfüllt ASTM E84 und UL94",
        "99,9 % reines Kupfer, konform mit den C12200-Normen",
        "Weichgeglüht und leicht zu biegen",
      ],
    },
    "thermal-imaging-camera": {
      summary:
        "Handgehaltene Wärmebildkamera zum Erkennen von Warm-/Kaltstellen, Kältemittellecks und elektrischen Fehlern auf der Baustelle.",
      bullets: [
        "Infrarotauflösung 120x90 (ATC100) oder 256x192 (ATC200)",
        "Temperaturbereich -4°F bis 1022°F",
        "Gehäuse mit Schutzart IP54",
        'Integriertes 2,8"-Display',
      ],
    },
    "brazing-torch": {
      summary:
        "MAP-Pro-/Propan-kompatibler Hartlötbrenner mit automatischer Zündung und Flammenabschaltung für schnelle und sichere Verbindungsarbeiten.",
      bullets: [
        "Betrieb mit MAP-Pro oder Propan",
        "Automatische Zündung und Flammenabschaltung",
        "Edelstahlspitze",
      ],
    },
    "utility-torch": {
      summary: "Kompakter, ausschließlich mit Propan betriebener Brenner für präzise Lötarbeiten.",
      bullets: ["Nur Propan", "Kompakte Bauform für enge Bereiche"],
    },
    "manifold-gauge": {
      summary:
        'Präzisions-Manometer-Set zum Messen und Befüllen von Anlagen mit gängigen Kältemitteln, mit einer großen, im Einsatz gut ablesbaren 3-1/8"-Skala.',
      bullets: [
        "Kompatibel mit R410A, R32, R454B und R22",
        '3-1/8"-Skala',
        "Bereich -30 inHg bis 800 psi",
      ],
    },
    "refrigerant-hose-set": {
      summary:
        '5ft-Kältemittelschlauch-Set, 1/4"-1/4", für anspruchsvolle Befüll- und Rückgewinnungsarbeiten, mit oder ohne Kugelventil erhältlich.',
      bullets: [
        "Arbeitsdruck 800 psi, Berstdruck 4000 psi",
        "ARH5SV verfügt über ein integriertes Kugelventil",
      ],
    },
    "flaring-tool": {
      summary:
        'Bördelwerkzeug für Rohre von 1/4" bis 3/4" mit 45-Grad-Exzenterkonus für saubere, gleichmäßige Bördelungen.',
      bullets: ['Kapazität 1/4" bis 3/4"', "45-Grad-Exzenterkonus", "Vernickelt"],
    },
    "tube-expander": {
      summary:
        'Klappbarer Rohr-Aufweiter für Rohre von 1/4" bis 7/8" für schnelles Aufweiten auf der Baustelle.',
      bullets: ['Kapazität 1/4" bis 7/8"', "Klappbare Konstruktion für einfachen Transport auf der Baustelle"],
    },
    "tube-straightener": {
      summary: 'Einfaches, robustes Rohr-Richtwerkzeug in den Größen 1/4" und 3/8".',
      bullets: ['AHS2: 1/4"', 'AHS3: 3/8"'],
    },
    "tube-cutter": {
      summary:
        "Eine Auswahl an Rohrschneidern für alle Anwendungen – von engen Kältemittelleitungen bis zu größeren Kupferrohren.",
      bullets: [
        'AHC6C: 1/8" bis 3/4"',
        'AHC11C: 3/16" bis 1-1/8"',
        'AHC12: 1/8" bis 1-1/4"',
      ],
    },
    reamer: {
      summary: 'Doppelfunktionaler Innen- und Außenentgrater für Rohre von 1/8" bis 1-1/2".',
      bullets: ['Kapazität 1/8" bis 1-1/2"', "Innen- und Außenentgraten mit einem Werkzeug"],
    },
    "deburring-tool": {
      summary:
        "Rohr-Entgrater mit zwei Ersatzklingen, bereit für längere Einsätze.",
      bullets: ["Enthält 2 Ersatzklingen"],
    },
    "ratcheting-wrench": {
      summary: "Bidirektionaler Ratschenschlüssel für Ventilarbeiten, mit Sechskantschlüssel-Adaptern.",
      bullets: [
        "Umschaltbar zwischen Rechts- und Linkslauf",
        "Enthält Sechskantschlüssel-Adapter",
      ],
    },
    "folding-knife": {
      summary: "Klappmesser für die Baustelle mit integriertem Phillips-/Schlitzschraubendreher.",
      bullets: ["Kombinierter Phillips- und Schlitzschraubendreher"],
    },
    "dual-blade-folding-knife": {
      summary: "Klappmesser mit zwei Klingen zum Schneiden einer größeren Auswahl an Baustellenmaterialien.",
      bullets: ["Zweiklingen-Konfiguration"],
    },
    "led-penlight": {
      summary: "Kompakte 300-Lumen-LED-Stiftlampe zur Inspektion enger, dunkler Bereiche.",
      bullets: ["300 Lumen", "Schutzart IP44", "Reichweite 330ft"],
    },
    "led-headlight": {
      summary: "Freihändige 350-Lumen-LED-Stirnlampe für lange Einsätze.",
      bullets: ["350 Lumen", "Schutzart IPX3", "Bis zu 6 Stunden Dauerbetrieb"],
    },
    "condenser-fan-motor-single-speed": {
      summary:
        "Robuster, witterungsbeständiger einstufiger Kondensatorlüftermotor, entwickelt zur Wiederherstellung des korrekten Luftstroms über die Kondensatorspulen und zur Vermeidung einer Überhitzung der Anlage.",
      bullets: [
        "NEMA-Rahmen 48, Isolierung der Klasse B",
        "UL-anerkannt",
        "Umkehrbare Drehrichtung, vollständig geschlossen",
        "Thermischer Überlastschutz",
      ],
    },
    "condenser-fan-motor-multi-hp": {
      summary:
        "Kondensatorlüftermotor mit mehreren Leistungsstufen für einen größeren Einsatzbereich, damit Techniker weniger SKUs im Fahrzeug bevorraten müssen.",
      bullets: ["1/6 - 1/3 HP", "NEMA-Rahmen 48, Isolierung der Klasse B", "UL-anerkannt"],
    },
  },
  JA: {
    "white-insulated-line-set": {
      summary:
        "エンボス加工ポリエチレンフィルム、耐候性素材、厚手の断熱綿による3層断熱カバーを備えた銅製ラインセット。防炎・吸音構造で、腐食、水、衝撃、火に強い設計です。",
      bullets: [
        "使用温度範囲 -40°F～248°F (-40°C～120°C)",
        "UV 耐性、ASTM E84 および UL94 に適合",
        "純度99.9%の銅、C12200 規格に準拠",
        "軟質焼鈍で曲げやすい",
      ],
    },
    "black-rubber-insulated-line-set": {
      summary:
        "白色ラインセットと同等の耐腐食・耐火・耐衝撃性能を備え、暗色仕上げが必要な現場向けに丈夫な黒色ゴム断熱材で覆っています。",
      bullets: [
        "使用温度範囲 -40°F～248°F (-40°C～120°C)",
        "UV 耐性、ASTM E84 および UL94 に適合",
        "純度99.9%の銅、C12200 規格に準拠",
        "軟質焼鈍で曲げやすい",
      ],
    },
    "thermal-imaging-camera": {
      summary:
        "現場で高温・低温箇所、冷媒漏れ、電気系統の異常を確認できるハンディ型サーマルイメージングカメラです。",
      bullets: [
        "赤外線解像度 120x90 (ATC100) または 256x192 (ATC200)",
        "温度範囲 -4°F to 1022°F",
        "IP54 規格ハウジング",
        '2.8" 内蔵ディスプレイ',
      ],
    },
    "brazing-torch": {
      summary:
        "MAP-Pro/プロパン対応のろう付けトーチ。自動点火・消火機能により、接合作業を迅速かつ安全に行えます。",
      bullets: [
        "MAP-Pro またはプロパンで使用可能",
        "自動点火・消火",
        "ステンレスチップ",
      ],
    },
    "utility-torch": {
      summary: "精密なはんだ付け作業向けの、プロパン専用コンパクトトーチです。",
      bullets: ["プロパン専用", "狭い場所に適したコンパクト設計"],
    },
    "manifold-gauge": {
      summary:
        '一般的な冷媒の測定・充填に対応する精密マニホールドゲージセット。現場で読み取りやすい大型 3-1/8" ダイヤルを備えています。',
      bullets: [
        "R410A、R32、R454B、R22 に対応",
        '3-1/8" ダイヤル',
        "範囲 -30 inHg to 800 psi",
      ],
    },
    "refrigerant-hose-set": {
      summary:
        '充填・回収作業に対応する定格5ft、1/4"-1/4"冷媒ホースセット。ボールバルブ付きとバルブなしから選べます。',
      bullets: [
        "使用圧力 800 psi、破裂圧力 4000 psi",
        "ARH5SV は一体型ボールバルブを追加装備",
      ],
    },
    "flaring-tool": {
      summary:
        '1/4" to 3/4" のチューブに対応するフレアリングツール。45度の偏心コーンで、きれいで安定したフレア加工ができます。',
      bullets: ['1/4" to 3/4" 対応', "45度偏心コーン", "ニッケルめっき"],
    },
    "tube-expander": {
      summary:
        '1/4" to 7/8" のチューブに対応する折りたたみ式チューブエキスパンダー。現場で素早くスウェージングできます。',
      bullets: ['1/4" to 7/8" 対応', "現場で携帯しやすい折りたたみ設計"],
    },
    "tube-straightener": {
      summary: '1/4" と 3/8" に対応する、シンプルで耐久性のあるチューブストレートナーです。',
      bullets: ['AHS2: 1/4"', 'AHS3: 3/8"'],
    },
    "tube-cutter": {
      summary:
        "狭い冷媒配管から大径の銅管まで、さまざまな用途に対応するチューブカッターシリーズです。",
      bullets: [
        'AHC6C: 1/8" to 3/4"',
        'AHC11C: 3/16" to 1-1/8"',
        'AHC12: 1/8" to 1-1/4"',
      ],
    },
    reamer: {
      summary: '1/8" to 1-1/2" のチューブに対応する内外面兼用リーマーです。',
      bullets: ['1/8" to 1-1/2" 対応', "1本で内面・外面のリーマー加工に対応"],
    },
    "deburring-tool": {
      summary: "予備ブレード2枚が付属し、長時間の作業にもすぐ使えるチューブ面取りツールです。",
      bullets: ["予備ブレード2枚付属"],
    },
    "ratcheting-wrench": {
      summary: "バルブ作業向けの正逆回転対応ラチェットレンチ。六角キーアダプターが付属します。",
      bullets: [
        "時計回りと反時計回りを切り替え可能",
        "六角キーアダプター付属",
      ],
    },
    "folding-knife": {
      summary: "プラス／マイナスドライバーを内蔵した現場向け折りたたみナイフです。",
      bullets: ["プラス・マイナス一体型ドライバー"],
    },
    "dual-blade-folding-knife": {
      summary: "現場でより幅広い素材を切断できる2枚刃折りたたみナイフです。",
      bullets: ["2枚刃構成"],
    },
    "led-penlight": {
      summary: "狭く暗い場所の点検に適した、300ルーメンのコンパクトなLEDペンライトです。",
      bullets: ["300ルーメン", "IP44 規格", "照射距離 330ft"],
    },
    "led-headlight": {
      summary: "長時間の作業向けに設計された、ハンズフリー350ルーメンLEDヘッドライトです。",
      bullets: ["350ルーメン", "IPX3 規格", "最大6時間の連続使用"],
    },
    "condenser-fan-motor-single-speed": {
      summary:
        "コンデンサーコイルの適正な風量を回復し、システムの過熱を防ぐために設計された、耐候性の単速コンデンサーファンモーターです。",
      bullets: [
        "NEMA フレーム48、クラスB絶縁",
        "UL 認定",
        "回転方向切替可能、全閉型",
        "過熱保護",
      ],
    },
    "condenser-fan-motor-multi-hp": {
      summary:
        "より広いサービス範囲に対応し、技術者が車載するSKU数を減らせるマルチ馬力コンデンサーファンモーターです。",
      bullets: ["1/6 - 1/3 HP", "NEMA フレーム48、クラスB絶縁", "UL 認定"],
    },
  },
  KO: {
    "white-insulated-line-set": {
      summary:
        "엠보싱 폴리에틸렌 필름, 내후성 소재, 두꺼운 단열 솜으로 구성된 3중 단열 커버의 구리 라인 세트입니다. 난연·흡음 구조로 부식, 물, 충격, 화재에 강합니다.",
      bullets: [
        "작동 범위 -40°F~248°F (-40°C~120°C)",
        "자외선에 강하며 ASTM E84 및 UL94 충족",
        "순도 99.9% 구리, C12200 표준 준수",
        "연질 소둔 처리로 쉽게 구부러짐",
      ],
    },
    "black-rubber-insulated-line-set": {
      summary:
        "화이트 라인 세트와 동일한 내식·내화·내충격 성능에 견고한 블랙 고무 단열재를 적용해 어두운 마감이 필요한 작업에 적합합니다.",
      bullets: [
        "작동 범위 -40°F~248°F (-40°C~120°C)",
        "자외선에 강하며 ASTM E84 및 UL94 충족",
        "순도 99.9% 구리, C12200 표준 준수",
        "연질 소둔 처리로 쉽게 구부러짐",
      ],
    },
    "thermal-imaging-camera": {
      summary:
        "현장에서 고온·저온 지점, 냉매 누출, 전기 결함을 찾는 휴대용 열화상 카메라입니다.",
      bullets: [
        "120x90 (ATC100) 또는 256x192 (ATC200) 적외선 해상도",
        "온도 범위 -4°F to 1022°F",
        "IP54 등급 하우징",
        '2.8" 내장 디스플레이',
      ],
    },
    "brazing-torch": {
      summary:
        "빠르고 안전한 접합 작업을 위한 자동 점화 및 화염 차단 기능의 MAP-Pro/프로판 호환 브레이징 토치입니다.",
      bullets: [
        "MAP-Pro 또는 프로판 사용",
        "자동 점화 및 화염 차단",
        "스테인리스 팁",
      ],
    },
    "utility-torch": {
      summary: "정밀 납땜 작업을 위해 설계된 프로판 전용 컴팩트 토치입니다.",
      bullets: ["프로판 전용", "좁은 공간에 적합한 컴팩트한 형태"],
    },
    "manifold-gauge": {
      summary:
        '일반적인 냉매 시스템의 측정과 충전을 위한 정밀 매니폴드 게이지 세트로, 현장에서 읽기 쉬운 대형 3-1/8" 다이얼을 적용했습니다.',
      bullets: [
        "R410A, R32, R454B 및 R22 호환",
        '3-1/8" 다이얼',
        "범위 -30 inHg to 800 psi",
      ],
    },
    "refrigerant-hose-set": {
      summary:
        '충전 및 회수 작업에 적합한 정격 5ft, 1/4"-1/4" 냉매 호스 세트로, 볼 밸브 포함 또는 미포함으로 제공됩니다.',
      bullets: [
        "작동 압력 800 psi, 파열 압력 4000 psi",
        "ARH5SV에는 통합 볼 밸브가 추가됨",
      ],
    },
    "flaring-tool": {
      summary:
        '1/4" to 3/4" 튜브용 플레어링 공구로, 45도 편심 콘을 사용해 깔끔하고 균일한 플레어를 만듭니다.',
      bullets: ['1/4" to 3/4" 용량', "45도 편심 콘", "니켈 도금"],
    },
    "tube-expander": {
      summary:
        '1/4" to 7/8" 튜브용 접이식 튜브 확관기로, 현장에서 빠르게 스웨이징할 수 있습니다.',
      bullets: ['1/4" to 7/8" 용량', "현장 휴대가 쉬운 접이식 설계"],
    },
    "tube-straightener": {
      summary: '1/4"와 3/8" 크기로 제공되는 간단하고 내구성 높은 튜브 교정기입니다.',
      bullets: ['AHS2: 1/4"', 'AHS3: 3/8"'],
    },
    "tube-cutter": {
      summary:
        "좁은 냉매 라인부터 대형 구리 파이프까지 다양한 작업에 맞춘 튜브 커터 제품군입니다.",
      bullets: [
        'AHC6C: 1/8" to 3/4"',
        'AHC11C: 3/16" to 1-1/8"',
        'AHC12: 1/8" to 1-1/4"',
      ],
    },
    reamer: {
      summary: '1/8" to 1-1/2" 튜브에 사용하는 내·외경 겸용 리머입니다.',
      bullets: ['1/8" to 1-1/2" 용량', "하나의 공구로 내경 및 외경 리밍"],
    },
    "deburring-tool": {
      summary: "교체용 블레이드 2개가 포함되어 장시간 작업에 바로 사용할 수 있는 튜브 디버링 공구입니다.",
      bullets: ["교체용 블레이드 2개 포함"],
    },
    "ratcheting-wrench": {
      summary: "밸브 작업용 양방향 래칫 렌치로, 육각 키 어댑터가 함께 제공됩니다.",
      bullets: [
        "시계 방향과 반시계 방향 전환",
        "육각 키 어댑터 포함",
      ],
    },
    "folding-knife": {
      summary: "십자/일자 드라이버가 내장된 현장용 접이식 나이프입니다.",
      bullets: ["십자 및 일자 결합 드라이버"],
    },
    "dual-blade-folding-knife": {
      summary: "현장에서 더 다양한 자재를 절단할 수 있는 더블 블레이드 접이식 나이프입니다.",
      bullets: ["2중 블레이드 구성"],
    },
    "led-penlight": {
      summary: "좁고 어두운 공간을 점검하기 위한 컴팩트한 300루멘 LED 펜라이트입니다.",
      bullets: ["300루멘", "IP44 등급", "330ft 조사 거리"],
    },
    "led-headlight": {
      summary: "장시간 작업을 위해 설계된 핸즈프리 350루멘 LED 헤드라이트입니다.",
      bullets: ["350루멘", "IPX3 등급", "최대 6시간 연속 사용"],
    },
    "condenser-fan-motor-single-speed": {
      summary:
        "콘덴서 코일의 적정 공기 흐름을 회복하고 시스템 과열을 방지하도록 설계된 견고한 내후성 단일 속도 콘덴서 팬 모터입니다.",
      bullets: [
        "NEMA 프레임 48, B종 절연",
        "UL 인증",
        "회전 방향 전환 가능, 전폐형",
        "열 과부하 보호",
      ],
    },
    "condenser-fan-motor-multi-hp": {
      summary:
        "더 넓은 서비스 범위를 지원해 기술자가 차량에 보관해야 할 SKU 수를 줄여 주는 다중 HP 콘덴서 팬 모터입니다.",
      bullets: ["1/6 - 1/3 HP", "NEMA 프레임 48, B종 절연", "UL 인증"],
    },
  },
  ZH: {
    "white-insulated-line-set": {
      summary:
        "铜制管组采用三层保温护套，由压纹聚乙烯膜、耐候材料和厚实保温棉组成。具备耐腐蚀、防水、抗冲击和阻燃性能，并采用吸音结构。",
      bullets: [
        "工作范围 -40°F 至 248°F (-40°C 至 120°C)",
        "抗紫外线，符合 ASTM E84 和 UL94",
        "99.9% 纯铜，符合 C12200 标准",
        "软退火处理，易于弯曲",
      ],
    },
    "black-rubber-insulated-line-set": {
      summary:
        "具备与白色管组相同的耐腐蚀、耐火和抗冲击性能，外覆坚固的黑色橡胶保温层，适用于需要深色外观的工程。",
      bullets: [
        "工作范围 -40°F 至 248°F (-40°C 至 120°C)",
        "抗紫外线，符合 ASTM E84 和 UL94",
        "99.9% 纯铜，符合 C12200 标准",
        "软退火处理，易于弯曲",
      ],
    },
    "thermal-imaging-camera": {
      summary: "手持式热成像相机，用于在现场发现冷热斑点、制冷剂泄漏和电气故障。",
      bullets: [
        "红外分辨率：120x90 (ATC100) 或 256x192 (ATC200)",
        "温度范围 -4°F 至 1022°F",
        "IP54 等级外壳",
        '2.8" 内置显示屏',
      ],
    },
    "brazing-torch": {
      summary: "兼容 MAP-Pro/丙烷的焊炬，配备自动点火和火焰关闭功能，可快速、安全地完成接头作业。",
      bullets: [
        "适用于 MAP-Pro 或丙烷",
        "自动点火与火焰关闭",
        "不锈钢喷嘴",
      ],
    },
    "utility-torch": {
      summary: "专为精密钎焊作业设计的紧凑型丙烷专用焊炬。",
      bullets: ["仅适用于丙烷", "适合狭窄空间的紧凑外形"],
    },
    "manifold-gauge": {
      summary:
        '用于测量和充注常用制冷剂系统的精密歧管压力表组，配备便于现场读取的大型 3-1/8" 表盘。',
      bullets: [
        "兼容 R410A、R32、R454B 和 R22",
        '3-1/8" 表盘',
        "范围 -30 inHg 至 800 psi",
      ],
    },
    "refrigerant-hose-set": {
      summary:
        '额定 5ft、1/4"-1/4" 的制冷剂软管组，适用于要求严苛的充注和回收作业，可选配或不配球阀。',
      bullets: [
        "工作压力 800 psi，爆破压力 4000 psi",
        "ARH5SV 增配一体式球阀",
      ],
    },
    "flaring-tool": {
      summary:
        '适用于 1/4" 至 3/4" 管路的扩口工具，配备 45 度偏心锥，可形成洁净、均匀的扩口。',
      bullets: ['容量 1/4" 至 3/4"', "45 度偏心锥", "镀镍"],
    },
    "tube-expander": {
      summary:
        '适用于 1/4" 至 7/8" 管路的折叠式扩管器，便于在现场快速进行胀管。',
      bullets: ['容量 1/4" 至 7/8"', "便于现场携带的折叠设计"],
    },
    "tube-straightener": {
      summary: '简单耐用的管路校直器，提供 1/4" 和 3/8" 两种尺寸。',
      bullets: ['AHS2：1/4"', 'AHS3：3/8"'],
    },
    "tube-cutter": {
      summary: "管路切割器系列，适用于从狭窄制冷剂管路到较大铜管的各种作业。",
      bullets: [
        'AHC6C：1/8" 至 3/4"',
        'AHC11C：3/16" 至 1-1/8"',
        'AHC12：1/8" 至 1-1/4"',
      ],
    },
    reamer: {
      summary: '适用于 1/8" 至 1-1/2" 管路的内外两用铰刀。',
      bullets: ['容量 1/8" 至 1-1/2"', "一件工具完成内外表面铰削"],
    },
    "deburring-tool": {
      summary: "管路去毛刺工具，随附两片备用刀片，可满足长时间作业需求。",
      bullets: ["含 2 片备用刀片"],
    },
    "ratcheting-wrench": {
      summary: "用于阀门作业的双向棘轮扳手，随附六角扳手转接头。",
      bullets: [
        "可在顺时针和逆时针方向之间切换",
        "含六角扳手转接头",
      ],
    },
    "folding-knife": {
      summary: "适用于现场作业的折叠刀，内置十字/一字螺丝刀。",
      bullets: ["十字和一字组合螺丝刀"],
    },
    "dual-blade-folding-knife": {
      summary: "双刃折叠刀，可切割更广泛的现场作业材料。",
      bullets: ["双刀片配置"],
    },
    "led-penlight": {
      summary: "紧凑型 300 流明 LED 笔灯，适用于检查狭窄、昏暗的空间。",
      bullets: ["300 流明", "IP44 等级", "330ft 照射距离"],
    },
    "led-headlight": {
      summary: "专为长时间作业设计的免手持 350 流明 LED 头灯。",
      bullets: ["350 流明", "IPX3 等级", "最长连续使用 6 小时"],
    },
    "condenser-fan-motor-single-speed": {
      summary:
        "坚固耐候的单速冷凝风扇电机，旨在恢复冷凝盘管的正常气流并防止系统过热。",
      bullets: [
        "NEMA 机座 48，B 级绝缘",
        "UL 认可",
        "可逆转，完全封闭式",
        "热过载保护",
      ],
    },
    "condenser-fan-motor-multi-hp": {
      summary:
        "覆盖更广维修范围的多马力冷凝风扇电机，帮助技术人员减少车辆上需要备货的 SKU 数量。",
      bullets: ["1/6 - 1/3 HP", "NEMA 机座 48，B 级绝缘", "UL 认可"],
    },
  },
  "ZH-TW": {
    "white-insulated-line-set": {
      summary:
        "銅製管組採用三層保溫護套，由壓紋聚乙烯膜、耐候材料和厚實保溫棉組成。具備耐腐蝕、防水、抗衝擊和阻燃性能，並採用吸音結構。",
      bullets: [
        "工作範圍 -40°F 至 248°F (-40°C 至 120°C)",
        "抗紫外線，符合 ASTM E84 和 UL94",
        "99.9% 純銅，符合 C12200 標準",
        "軟退火處理，易於彎曲",
      ],
    },
    "black-rubber-insulated-line-set": {
      summary:
        "具備與白色管組相同的耐腐蝕、耐火和抗衝擊性能，外覆堅固的黑色橡膠保溫層，適用於需要深色外觀的工程。",
      bullets: [
        "工作範圍 -40°F 至 248°F (-40°C 至 120°C)",
        "抗紫外線，符合 ASTM E84 和 UL94",
        "99.9% 純銅，符合 C12200 標準",
        "軟退火處理，易於彎曲",
      ],
    },
    "thermal-imaging-camera": {
      summary: "手持式熱成像相機，用於在現場發現冷熱斑點、冷媒洩漏和電氣故障。",
      bullets: [
        "紅外線解析度：120x90 (ATC100) 或 256x192 (ATC200)",
        "溫度範圍 -4°F 至 1022°F",
        "IP54 等級外殼",
        '2.8" 內建顯示器',
      ],
    },
    "brazing-torch": {
      summary: "相容 MAP-Pro/丙烷的焊炬，配備自動點火和熄火功能，可快速、安全地完成接合作業。",
      bullets: [
        "適用於 MAP-Pro 或丙烷",
        "自動點火與熄火",
        "不鏽鋼噴嘴",
      ],
    },
    "utility-torch": {
      summary: "專為精密銲接作業設計的緊湊型丙烷專用焊炬。",
      bullets: ["僅適用於丙烷", "適合狹窄空間的緊湊外型"],
    },
    "manifold-gauge": {
      summary:
        '用於測量和充填常用冷媒系統的精密歧管壓力表組，配備便於現場讀取的大型 3-1/8" 表面。',
      bullets: [
        "相容 R410A、R32、R454B 和 R22",
        '3-1/8" 表面',
        "範圍 -30 inHg 至 800 psi",
      ],
    },
    "refrigerant-hose-set": {
      summary:
        '額定 5ft、1/4"-1/4" 的冷媒軟管組，適用於要求嚴苛的充填和回收作業，可選配或不配球閥。',
      bullets: [
        "工作壓力 800 psi，爆破壓力 4000 psi",
        "ARH5SV 增配一體式球閥",
      ],
    },
    "flaring-tool": {
      summary:
        '適用於 1/4" 至 3/4" 管路的擴口工具，配備 45 度偏心錐，可形成潔淨、均勻的擴口。',
      bullets: ['容量 1/4" 至 3/4"', "45 度偏心錐", "鍍鎳"],
    },
    "tube-expander": {
      summary:
        '適用於 1/4" 至 7/8" 管路的折疊式擴管器，便於在現場快速進行脹管。',
      bullets: ['容量 1/4" 至 7/8"', "便於現場攜帶的折疊設計"],
    },
    "tube-straightener": {
      summary: '簡單耐用的管路校直器，提供 1/4" 和 3/8" 兩種尺寸。',
      bullets: ['AHS2：1/4"', 'AHS3：3/8"'],
    },
    "tube-cutter": {
      summary: "管路切割器系列，適用於從狹窄冷媒管路到較大銅管的各種作業。",
      bullets: [
        'AHC6C：1/8" 至 3/4"',
        'AHC11C：3/16" 至 1-1/8"',
        'AHC12：1/8" 至 1-1/4"',
      ],
    },
    reamer: {
      summary: '適用於 1/8" 至 1-1/2" 管路的內外兩用鉸刀。',
      bullets: ['容量 1/8" 至 1-1/2"', "一件工具完成內外表面鉸削"],
    },
    "deburring-tool": {
      summary: "管路去毛刺工具，隨附兩片備用刀片，可滿足長時間作業需求。",
      bullets: ["含 2 片備用刀片"],
    },
    "ratcheting-wrench": {
      summary: "用於閥門作業的雙向棘輪扳手，隨附六角扳手轉接頭。",
      bullets: [
        "可在順時針和逆時針方向之間切換",
        "含六角扳手轉接頭",
      ],
    },
    "folding-knife": {
      summary: "適用於現場作業的折疊刀，內建十字／一字螺絲起子。",
      bullets: ["十字和一字組合螺絲起子"],
    },
    "dual-blade-folding-knife": {
      summary: "雙刃折疊刀，可切割更廣泛的現場作業材料。",
      bullets: ["雙刀片配置"],
    },
    "led-penlight": {
      summary: "緊湊型 300 流明 LED 筆燈，適用於檢查狹窄、昏暗的空間。",
      bullets: ["300 流明", "IP44 等級", "330ft 照射距離"],
    },
    "led-headlight": {
      summary: "專為長時間作業設計的免手持 350 流明 LED 頭燈。",
      bullets: ["350 流明", "IPX3 等級", "最長連續使用 6 小時"],
    },
    "condenser-fan-motor-single-speed": {
      summary:
        "堅固耐候的單速冷凝風扇馬達，旨在恢復冷凝盤管的正常氣流並防止系統過熱。",
      bullets: [
        "NEMA 機座 48，B 級絕緣",
        "UL 認可",
        "可逆轉，全封閉式",
        "熱過載保護",
      ],
    },
    "condenser-fan-motor-multi-hp": {
      summary:
        "涵蓋更廣維修範圍的多馬力冷凝風扇馬達，幫助技術人員減少車輛上需要備貨的 SKU 數量。",
      bullets: ["1/6 - 1/3 HP", "NEMA 機座 48，B 級絕緣", "UL 認可"],
    },
  },
};

const categoryTranslations: Partial<Record<LanguageCode, Record<string, string>>> = {
  ES: { "Line Sets": "Juegos de líneas", "Thermal Imaging Camera": "Cámara termográfica", "Brazing / Utility Torch": "Soplete de soldadura / multiuso", "Manifold Gauge": "Manómetro múltiple", "Refrigerant Hose Set": "Juego de mangueras para refrigerante", "Flaring Tool / Tube Expander / Tube Straightener": "Abocardador / expansor / enderezador", "Tube Cutter / Reamer / Deburring Tool": "Cortatubos / escariador / desbarbador", "Ratcheting Wrench": "Llave de carraca", "Folding Knife / LED Penlight / LED Headlight": "Cuchillo plegable / linterna LED", "Condenser Fan Motor": "Motor de ventilador de condensador" },
  PT: { "Line Sets": "Conjuntos de linhas", "Thermal Imaging Camera": "Câmera termográfica", "Brazing / Utility Torch": "Maçarico de brasagem / utilitário", "Manifold Gauge": "Manifold", "Refrigerant Hose Set": "Mangueiras para refrigerante", "Flaring Tool / Tube Expander / Tube Straightener": "Flangeador / expansor / endireitador", "Tube Cutter / Reamer / Deburring Tool": "Cortador / alargador / rebarbador", "Ratcheting Wrench": "Chave catraca", "Folding Knife / LED Penlight / LED Headlight": "Faca dobrável / lanterna LED", "Condenser Fan Motor": "Motor do ventilador do condensador" },
  FR: { "Line Sets": "Kits de lignes", "Thermal Imaging Camera": "Caméra thermique", "Brazing / Utility Torch": "Chalumeau de brasage / utilitaire", "Manifold Gauge": "Manifold", "Refrigerant Hose Set": "Flexibles frigorifiques", "Flaring Tool / Tube Expander / Tube Straightener": "Dudgeonnière / expandeur / redresseur", "Tube Cutter / Reamer / Deburring Tool": "Coupe-tube / alésoir / ébavureur", "Ratcheting Wrench": "Clé à cliquet", "Folding Knife / LED Penlight / LED Headlight": "Couteau pliant / lampes LED", "Condenser Fan Motor": "Moteur de ventilateur de condenseur" },
  DE: { "Line Sets": "Leitungssätze", "Thermal Imaging Camera": "Wärmebildkamera", "Brazing / Utility Torch": "Hartlöt- / Universalbrenner", "Manifold Gauge": "Manometer", "Refrigerant Hose Set": "Kältemittelschlauch-Set", "Flaring Tool / Tube Expander / Tube Straightener": "Bördelwerkzeug / Aufweiter / Richtwerkzeug", "Tube Cutter / Reamer / Deburring Tool": "Rohrschneider / Entgrater", "Ratcheting Wrench": "Ratschenschlüssel", "Folding Knife / LED Penlight / LED Headlight": "Klappmesser / LED-Lampen", "Condenser Fan Motor": "Kondensatorlüftermotor" },
  JA: { "Line Sets": "ラインセット", "Thermal Imaging Camera": "サーマルイメージングカメラ", "Brazing / Utility Torch": "ろう付け / ユーティリティトーチ", "Manifold Gauge": "マニホールドゲージ", "Refrigerant Hose Set": "冷媒ホースセット", "Flaring Tool / Tube Expander / Tube Straightener": "フレア / 拡管 / 矯正ツール", "Tube Cutter / Reamer / Deburring Tool": "カッター / リーマー / 面取りツール", "Ratcheting Wrench": "ラチェットレンチ", "Folding Knife / LED Penlight / LED Headlight": "折りたたみナイフ / LED ライト", "Condenser Fan Motor": "コンデンサーファンモーター" },
  KO: { "Line Sets": "라인 세트", "Thermal Imaging Camera": "열화상 카메라", "Brazing / Utility Torch": "브레이징 / 다용도 토치", "Manifold Gauge": "매니폴드 게이지", "Refrigerant Hose Set": "냉매 호스 세트", "Flaring Tool / Tube Expander / Tube Straightener": "플레어링 / 확관 / 교정 공구", "Tube Cutter / Reamer / Deburring Tool": "튜브 커터 / 리머 / 디버링 공구", "Ratcheting Wrench": "래칫 렌치", "Folding Knife / LED Penlight / LED Headlight": "접이식 나이프 / LED 라이트", "Condenser Fan Motor": "콘덴서 팬 모터" },
  ZH: { "Line Sets": "管组", "Thermal Imaging Camera": "热成像相机", "Brazing / Utility Torch": "焊炬 / 多用途焊炬", "Manifold Gauge": "歧管压力表", "Refrigerant Hose Set": "制冷剂软管组", "Flaring Tool / Tube Expander / Tube Straightener": "扩口 / 扩管 / 校直工具", "Tube Cutter / Reamer / Deburring Tool": "割管 / 铰刀 / 去毛刺工具", "Ratcheting Wrench": "棘轮扳手", "Folding Knife / LED Penlight / LED Headlight": "折叠刀 / LED 灯", "Condenser Fan Motor": "冷凝风扇电机" },
};
categoryTranslations["ZH-TW"] = { ...categoryTranslations.ZH, "Line Sets": "管組", "Thermal Imaging Camera": "熱成像相機", "Condenser Fan Motor": "冷凝風扇馬達" };

const technicalPhrases: Partial<Record<LanguageCode, Array<[string, string]>>> = {
  ES: [
    ["Operating range", "Rango de operación"], ["UV resistant", "Resistente a los rayos UV"], ["meets", "cumple"], ["pure copper", "cobre puro"], ["compliant with", "conforme con"], ["Soft annealed and easy to bend", "Recocido y fácil de doblar"], ["Temperature range", "Rango de temperatura"], ["IP54 rated housing", "Carcasa con clasificación IP54"], ["Automatic ignition and flame shutoff", "Encendido y apagado automático de la llama"], ["Stainless steel tip", "Punta de acero inoxidable"], ["Compatible with", "Compatible con"], ["Range", "Rango"], ["Includes", "Incluye"], ["Model", "Modelo"], ["Standard", "Estándar"], ["With ball valve", "Con válvula de bola"], ["No ball valve", "Sin válvula de bola"], ["capacity", "capacidad"], ["Folding design for jobsite portability", "Diseño plegable para transportar en obra"], ["Two blade configuration", "Configuración de dos hojas"], ["rated", "clasificada"], ["continuous use", "uso continuo"], ["UL recognized", "Reconocido por UL"], ["Thermal overload protection", "Protección contra sobrecarga térmica"],
  ],
  PT: [
    ["Operating range", "Faixa de operação"], ["UV resistant", "Resistente a UV"], ["meets", "atende"], ["pure copper", "cobre puro"], ["compliant with", "em conformidade com"], ["Soft annealed and easy to bend", "Recozido e fácil de dobrar"], ["Temperature range", "Faixa de temperatura"], ["IP54 rated housing", "Carcaça com classificação IP54"], ["Automatic ignition and flame shutoff", "Ignição e desligamento automático da chama"], ["Stainless steel tip", "Ponta de aço inoxidável"], ["Compatible with", "Compatível com"], ["Range", "Faixa"], ["Includes", "Inclui"], ["Model", "Modelo"], ["Standard", "Padrão"], ["With ball valve", "Com válvula de esfera"], ["No ball valve", "Sem válvula de esfera"], ["capacity", "capacidade"], ["Folding design for jobsite portability", "Design dobrável para transporte no trabalho"], ["Two blade configuration", "Configuração de duas lâminas"], ["rated", "classificada"], ["continuous use", "uso contínuo"], ["UL recognized", "Reconhecido pela UL"], ["Thermal overload protection", "Proteção contra sobrecarga térmica"],
  ],
  FR: [
    ["Operating range", "Plage de fonctionnement"], ["UV resistant", "Résistant aux UV"], ["meets", "respecte"], ["pure copper", "cuivre pur"], ["compliant with", "conforme à"], ["Soft annealed and easy to bend", "Recuit et facile à cintrer"], ["Temperature range", "Plage de température"], ["IP54 rated housing", "Boîtier classé IP54"], ["Automatic ignition and flame shutoff", "Allumage et arrêt automatiques de la flamme"], ["Stainless steel tip", "Embout en acier inoxydable"], ["Compatible with", "Compatible avec"], ["Range", "Plage"], ["Includes", "Comprend"], ["Model", "Modèle"], ["Standard", "Standard"], ["With ball valve", "Avec vanne à bille"], ["No ball valve", "Sans vanne à bille"], ["capacity", "capacité"], ["Folding design for jobsite portability", "Conception pliable facile à transporter"], ["Two blade configuration", "Configuration à deux lames"], ["rated", "classé"], ["continuous use", "utilisation continue"], ["UL recognized", "Reconnu UL"], ["Thermal overload protection", "Protection contre les surcharges thermiques"],
  ],
  DE: [
    ["Operating range", "Betriebsbereich"], ["UV resistant", "UV-beständig"], ["meets", "erfüllt"], ["pure copper", "reines Kupfer"], ["compliant with", "konform mit"], ["Soft annealed and easy to bend", "Weichgeglüht und leicht zu biegen"], ["Temperature range", "Temperaturbereich"], ["IP54 rated housing", "Gehäuse mit Schutzart IP54"], ["Automatic ignition and flame shutoff", "Automatische Zündung und Flammenabschaltung"], ["Stainless steel tip", "Edelstahlspitze"], ["Compatible with", "Kompatibel mit"], ["Range", "Bereich"], ["Includes", "Enthält"], ["Model", "Modell"], ["Standard", "Standard"], ["With ball valve", "Mit Kugelventil"], ["No ball valve", "Ohne Kugelventil"], ["capacity", "Kapazität"], ["Folding design for jobsite portability", "Faltbares Design für den Transport auf der Baustelle"], ["Two blade configuration", "Zweiklingen-Konfiguration"], ["rated", "klassifiziert"], ["continuous use", "Dauerbetrieb"], ["UL recognized", "UL-anerkannt"], ["Thermal overload protection", "Thermischer Überlastschutz"],
  ],
  JA: [
    ["Operating range", "使用温度範囲"], ["UV resistant", "UV 耐性"], ["meets", "適合"], ["pure copper", "純銅"], ["compliant with", "準拠"], ["Soft annealed and easy to bend", "軟質焼鈍で曲げやすい"], ["Temperature range", "温度範囲"], ["IP54 rated housing", "IP54 規格ハウジング"], ["Automatic ignition and flame shutoff", "自動点火・消火"], ["Stainless steel tip", "ステンレスチップ"], ["Compatible with", "対応"], ["Range", "範囲"], ["Includes", "付属"], ["Model", "モデル"], ["Standard", "標準"], ["With ball valve", "ボールバルブ付き"], ["No ball valve", "ボールバルブなし"], ["capacity", "容量"], ["Folding design for jobsite portability", "現場で持ち運びやすい折りたたみ設計"], ["Two blade configuration", "2枚刃構成"], ["rated", "規格"], ["continuous use", "連続使用"], ["UL recognized", "UL 認定"], ["Thermal overload protection", "過熱保護"],
  ],
  KO: [
    ["Operating range", "작동 범위"], ["UV resistant", "자외선 차단"], ["meets", "충족"], ["pure copper", "순수 구리"], ["compliant with", "준수"], ["Soft annealed and easy to bend", "연질 소둔 처리로 쉽게 구부러짐"], ["Temperature range", "온도 범위"], ["IP54 rated housing", "IP54 등급 하우징"], ["Automatic ignition and flame shutoff", "자동 점화 및 화염 차단"], ["Stainless steel tip", "스테인리스 팁"], ["Compatible with", "호환"], ["Range", "범위"], ["Includes", "포함"], ["Model", "모델"], ["Standard", "표준"], ["With ball valve", "볼 밸브 포함"], ["No ball valve", "볼 밸브 없음"], ["capacity", "용량"], ["Folding design for jobsite portability", "현장 휴대가 쉬운 접이식 설계"], ["Two blade configuration", "2중 블레이드 구성"], ["rated", "등급"], ["continuous use", "연속 사용"], ["UL recognized", "UL 인증"], ["Thermal overload protection", "열 과부하 보호"],
  ],
  ZH: [
    ["Operating range", "工作范围"], ["UV resistant", "抗紫外线"], ["meets", "符合"], ["pure copper", "纯铜"], ["compliant with", "符合标准"], ["Soft annealed and easy to bend", "软退火处理，易于弯曲"], ["Temperature range", "温度范围"], ["IP54 rated housing", "IP54 等级外壳"], ["Automatic ignition and flame shutoff", "自动点火与火焰关闭"], ["Stainless steel tip", "不锈钢喷嘴"], ["Compatible with", "兼容"], ["Range", "范围"], ["Includes", "包含"], ["Model", "型号"], ["Standard", "标准"], ["With ball valve", "带球阀"], ["No ball valve", "不带球阀"], ["capacity", "容量"], ["Folding design for jobsite portability", "便于现场携带的折叠设计"], ["Two blade configuration", "双刀片配置"], ["rated", "等级"], ["continuous use", "连续使用"], ["UL recognized", "UL 认可"], ["Thermal overload protection", "热过载保护"],
  ],
};
technicalPhrases["ZH-TW"] = [
  ["Operating range", "工作範圍"], ["UV resistant", "抗紫外線"], ["meets", "符合"], ["pure copper", "純銅"], ["compliant with", "符合標準"], ["Soft annealed and easy to bend", "軟退火處理，易於彎曲"], ["Temperature range", "溫度範圍"], ["IP54 rated housing", "IP54 等級外殼"], ["Automatic ignition and flame shutoff", "自動點火與熄火"], ["Stainless steel tip", "不鏽鋼噴嘴"], ["Compatible with", "相容"], ["Range", "範圍"], ["Includes", "包含"], ["Model", "型號"], ["Standard", "標準"], ["With ball valve", "帶球閥"], ["No ball valve", "不帶球閥"], ["capacity", "容量"], ["Folding design for jobsite portability", "便於現場攜帶的折疊設計"], ["Two blade configuration", "雙刀片配置"], ["rated", "等級"], ["continuous use", "連續使用"], ["UL recognized", "UL 認可"], ["Thermal overload protection", "熱過載保護"],
];

function translateTechnicalText(value: string, language: LanguageCode) {
  if (language === "EN") return value;
  return (technicalPhrases[language] ?? []).reduce(
    (translated, [source, target]) => translated.replaceAll(source, target),
    value,
  );
}

export function localizeProduct(product: Product, language: LanguageCode): Product {
  const copy: ProductCopy = {
    name: names[language]?.[product.slug],
    category: categoryTranslations[language]?.[product.category],
    line: language === "EN" ? product.line : product.line === "HVAC Tool" ? "HVAC Tool" : "HVAC Supply",
  };
  const technicalCopy = technicalProductCopy[language]?.[product.slug];

  return {
    ...product,
    summary: technicalCopy?.summary ?? translateTechnicalText(product.summary, language),
    bullets:
      technicalCopy?.bullets ??
      product.bullets.map((bullet) => translateTechnicalText(bullet, language)),
    specs: product.specs.map((spec) => ({
      label: translateTechnicalText(spec.label, language),
      value: translateTechnicalText(spec.value, language),
    })),
    ...Object.fromEntries(Object.entries(copy).filter(([, value]) => value)),
  };
}

export function localizeProducts(products: Product[], language: LanguageCode) {
  return products.map((product) => localizeProduct(product, language));
}

export function localizedLineLabel(line: string, language: LanguageCode) {
  if (language === "EN") return line;
  const labels: Record<string, Record<LanguageCode, string>> = {
    "HVAC Tool": { EN: "HVAC Tool", ES: "Herramientas HVAC", ZH: "HVAC 工具", "ZH-TW": "HVAC 工具", PT: "Ferramenta HVAC", FR: "Outil HVAC", DE: "HVAC-Werkzeug", JA: "HVAC ツール", KO: "HVAC 공구" },
    "HVAC Supply": { EN: "HVAC Supply", ES: "Suministros HVAC", ZH: "HVAC 供应", "ZH-TW": "HVAC 供應", PT: "Suprimentos HVAC", FR: "Fourniture HVAC", DE: "HVAC-Versorgung", JA: "HVAC サプライ", KO: "HVAC 공급" },
  };
  return labels[line]?.[language] ?? line;
}

export function localizedCategoryLabel(category: string, language: LanguageCode) {
  return categoryTranslations[language]?.[category] ?? category;
}