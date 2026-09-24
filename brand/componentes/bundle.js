/* @ds-bundle: {"format":4,"namespace":"Domu","components":[{"name":"Logo"},{"name":"Button"},{"name":"Badge"},{"name":"StatusBadge"},{"name":"Selo"},{"name":"CategoriaChip"},{"name":"KpiCard"},{"name":"ChamadoCard"},{"name":"StatusSteps"},{"name":"PrestadorCard"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    return Array.prototype.filter.call(arguments, Boolean).join(" ");
  }

  /* Ícones Lucide (ISC), traço 2 e pontas arredondadas. */
  var ICONES = {
    droplet: [["path", { d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" }]],
    zap: [["path", { d: "M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z" }]],
    "paint-roller": [["rect", { width: 16, height: 6, x: 2, y: 2, rx: 2 }], ["path", { d: "M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" }], ["rect", { width: 4, height: 6, x: 8, y: 16, rx: 1 }]],
    sparkles: [["path", { d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" }], ["path", { d: "M20 2v4" }], ["path", { d: "M22 4h-4" }], ["circle", { cx: 4, cy: 20, r: 2 }]],
    wrench: [["path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z" }]],
    star: [["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" }]],
    "badge-check": [["path", { d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" }], ["path", { d: "m16 9-5.5 5.5L8 12" }]],
    "map-pin": [["path", { d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" }], ["circle", { cx: 12, cy: 10, r: 3 }]],
    clock: [["circle", { cx: 12, cy: 12, r: 10 }], ["path", { d: "M12 6v6l4 2" }]],
    camera: [["path", { d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" }], ["circle", { cx: 12, cy: 13, r: 3 }]],
    "triangle-alert": [["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }], ["path", { d: "M12 9v4" }], ["path", { d: "M12 17h.01" }]],
    check: [["path", { d: "M20 6 9 17l-5-5" }]]
  };

  function Icone(props) {
    var nos = ICONES[props.nome] || [];
    var tam = props.size || 20;
    return h(
      "svg",
      {
        className: cx("dm-icon", props.className),
        width: tam, height: tam, viewBox: "0 0 24 24", fill: "none",
        stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round",
        "aria-hidden": "true"
      },
      nos.map(function (n, i) { return h(n[0], Object.assign({ key: i }, n[1])); })
    );
  }

  var CATEGORIAS = {
    hidraulica: { rotulo: "Hidráulica", icone: "droplet" },
    eletrica: { rotulo: "Elétrica", icone: "zap" },
    pintura: { rotulo: "Pintura", icone: "paint-roller" },
    limpeza: { rotulo: "Limpeza", icone: "sparkles" },
    reparos: { rotulo: "Reparos gerais", icone: "wrench" }
  };

  var ESTADOS = {
    aberto: { rotulo: "Aberto", tom: "info" },
    triado: { rotulo: "Triado", tom: "info" },
    prestador_atribuido: { rotulo: "Prestador atribuído", tom: "neutral" },
    agendado: { rotulo: "Agendado", tom: "neutral" },
    concluido: { rotulo: "Concluído", tom: "success" },
    pago: { rotulo: "Pago", tom: "success" },
    avaliado: { rotulo: "Avaliado", tom: "success" },
    cancelado: { rotulo: "Cancelado", tom: "neutral" },
    em_disputa: { rotulo: "Em disputa", tom: "danger" }
  };
  var FLUXO = ["aberto", "triado", "prestador_atribuido", "agendado", "concluido", "pago", "avaliado"];

  var brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  function reais(v) { return brl.format(v).replace(/ /g, " "); }

  /* Logo: símbolo Arco + nome "domu" em Geist 750 convertido em curvas. */
  var NOME_D = "M37.1998291015625 -268.50006103515625Q37.1998291015625 -353.2000732421875 64.1998291015625 -416.7500915527344Q91.1998291015625 -480.30010986328125 140.7998046875 -514.6501159667969Q190.3997802734375 -549.0001220703125 256.29974365234375 -549.0001220703125Q313.7998046875 -549.0001220703125 354.8497619628906 -525.6501159667969Q395.89971923828125 -502.30010986328125 417.89971923828125 -460.2000732421875V-710.0H578.9010620117188V0.0H423.7996826171875L420.7996826171875 -78.5999755859375Q398.09967041015625 -35.5999755859375 354.8497009277344 -11.79998779296875Q311.5997314453125 12.0 256.29974365234375 12.0Q189.69976806640625 12.0 140.09979248046875 -22.350006103515625Q90.49981689453125 -56.70001220703125 63.849822998046875 -119.9000244140625Q37.1998291015625 -183.10003662109375 37.1998291015625 -268.50006103515625ZM417.89971923828125 -268.50006103515625Q417.89971923828125 -321.09991455078125 405.4497985839844 -356.8497619628906Q392.9998779296875 -392.599609375 369.2500305175781 -410.1495056152344Q345.50018310546875 -427.69940185546875 311.10040283203125 -427.69940185546875Q261.4007568359375 -427.69940185546875 232.15097045898438 -384.99957275390625Q202.90118408203125 -342.29974365234375 202.90118408203125 -268.50006103515625Q202.90118408203125 -196.400390625 232.5009765625 -152.85055541992188Q262.10076904296875 -109.30072021484375 311.10040283203125 -109.30072021484375Q345.2001953125 -109.30072021484375 369.10003662109375 -127.0006103515625Q392.9998779296875 -144.70050048828125 405.4497985839844 -180.30035400390625Q417.89971923828125 -215.90020751953125 417.89971923828125 -268.50006103515625ZM629.1998291015625 -268.50006103515625Q629.1998291015625 -352.50006103515625 663.7499084472656 -416.0500793457031Q698.2999877929688 -479.60009765625 760.8738903608478 -514.3001098632812Q823.4477929287269 -549.0001220703125 906.5004272460938 -549.0001220703125Q988.7467597709907 -549.0001220703125 1051.5738193386203 -514.3001098632812Q1114.40087890625 -479.60009765625 1148.9509582519531 -416.0500793457031Q1183.5010375976562 -352.50006103515625 1183.5010375976562 -268.50006103515625Q1183.5010375976562 -184.50006103515625 1148.9509582519531 -120.95004272460938Q1114.40087890625 -57.4000244140625 1051.5738193386203 -22.70001220703125Q988.7467597709907 12.0 906.5004272460938 12.0Q823.4477929287269 12.0 760.8738903608478 -22.70001220703125Q698.2999877929688 -57.4000244140625 663.7499084472656 -120.95004272460938Q629.1998291015625 -184.50006103515625 629.1998291015625 -268.50006103515625ZM1017.7996826171875 -268.1500549316406Q1017.7996826171875 -343.69976806640625 988.8498840332031 -385.6995849609375Q959.9000854492188 -427.69940185546875 906.5004272460938 -427.69940185546875Q853.1007690429688 -427.69940185546875 824.0009765625 -385.6772408267568Q794.9011840820312 -343.6550797980449 794.9011840820312 -268.50006103515625Q794.9011840820312 -192.30035400390625 824.0009765625 -150.800537109375Q853.1007690429688 -109.30072021484375 906.5004272460938 -109.30072021484375Q959.9000854492188 -109.30072021484375 988.8498840332031 -150.95053100585938Q1017.7996826171875 -192.600341796875 1017.7996826171875 -268.1500549316406ZM1234.19970703125 -537.0001220703125H1379.1008911132812L1384.200927734375 -408.6002197265625L1370.8009033203125 -415.4002685546875Q1381.200927734375 -457.000244140625 1403.700927734375 -487.2502136230469Q1426.200927734375 -517.5001831054688 1458.1509094238281 -533.2501525878906Q1490.1008911132812 -549.0001220703125 1528.0008544921875 -549.0001220703125Q1593.5007934570312 -549.0001220703125 1635.2507629394531 -510.4501037597656Q1677.000732421875 -471.90008544921875 1688.7007446289062 -405.0001220703125L1669.9006958007812 -403.90008544921875Q1684.000732421875 -474.0001220703125 1726.3507385253906 -511.5001220703125Q1768.7007446289062 -549.0001220703125 1830.8006591796875 -549.0001220703125Q1885.400634765625 -549.0001220703125 1926.3006591796875 -525.8501281738281Q1967.20068359375 -502.70013427734375 1989.3007202148438 -456.6501159667969Q2011.4007568359375 -410.60009765625 2011.4007568359375 -345.2000732421875V0.0H1850.3994140625V-299.89959716796875Q1850.3994140625 -362.09942626953125 1832.1995849609375 -392.29931640625Q1813.999755859375 -422.49920654296875 1774.4000244140625 -422.49920654296875Q1748.6002197265625 -422.49920654296875 1730.900390625 -407.999267578125Q1713.2005615234375 -393.49932861328125 1703.8006591796875 -365.4494323730469Q1694.4007568359375 -337.3995361328125 1694.4007568359375 -298.09967041015625V0.0H1550.19970703125V-298.09967041015625Q1550.19970703125 -361.29949951171875 1532.9498596191406 -391.89935302734375Q1515.7000122070312 -422.49920654296875 1475.5003051757812 -422.49920654296875Q1449.7005004882812 -422.49920654296875 1431.8506774902344 -407.999267578125Q1414.0008544921875 -393.49932861328125 1404.6009521484375 -365.2994384765625Q1395.2010498046875 -337.09954833984375 1395.2010498046875 -298.09967041015625V0.0H1234.19970703125ZM2088.19970703125 -191.10003662109375V-537.0001220703125H2249.2010498046875V-228.80029296875Q2249.2010498046875 -169.30059814453125 2267.2508850097656 -141.9007568359375Q2285.3007202148438 -114.50091552734375 2323.400390625 -114.50091552734375Q2366.800048828125 -114.50091552734375 2390.1998291015625 -144.85073852539062Q2413.599609375 -175.2005615234375 2413.599609375 -236.400390625V-537.0001220703125H2574.6009521484375V0.0H2428.7998046875L2423.8997192382812 -158.30047607421875L2443.1998291015625 -154.800537109375Q2432.7999267578125 -71.6002197265625 2387.7999267578125 -29.80010986328125Q2342.7999267578125 12.0 2264.999755859375 12.0Q2181.4996948242188 12.0 2134.8497009277344 -41.149993896484375Q2088.19970703125 -94.29998779296875 2088.19970703125 -191.10003662109375Z";
  function Logo(props) {
    var variante = props.variant || "principal";
    var cores = {
      principal: ["var(--brand)", "var(--trena)", "var(--ink)"],
      negativo: ["var(--cal)", "var(--trena)", "#FFFFFF"],
      "1cor": ["currentColor", "currentColor", "currentColor"]
    }[variante];
    var arco = h("g", { transform: "translate(-242.27 -1031.64) scale(18.6364)" },
      h("path", { d: "M17 52V31a15 15 0 0 1 30 0v21", fill: "none", stroke: cores[0], strokeWidth: 8, strokeLinecap: "round", strokeLinejoin: "round" }),
      h("circle", { cx: 32, cy: 44, r: 5, fill: cores[1] }));
    if (props.simbolo) {
      return h("svg", { className: cx("dm-logo", props.className), viewBox: "13 12 38 44", height: props.height || 32, role: "img", "aria-label": "Domu" },
        h("path", { d: "M17 52V31a15 15 0 0 1 30 0v21", fill: "none", stroke: cores[0], strokeWidth: 8, strokeLinecap: "round", strokeLinejoin: "round" }),
        h("circle", { cx: 32, cy: 44, r: 5, fill: cores[1] }));
    }
    return h("svg", { className: cx("dm-logo", props.className), viewBox: "0 -808 3458.78 820", height: props.height || 28, role: "img", "aria-label": "Domu" },
      arco, h("path", { transform: "translate(884.18 0)", fill: cores[2], d: NOME_D }));
  }

  function Button(props) {
    var variant = props.variant || "secondary";
    var resto = Object.assign({}, props);
    delete resto.variant; delete resto.icon; delete resto.size; delete resto.block;
    return h("button", Object.assign({ type: "button" }, resto, {
      className: cx("dm-btn", "dm-btn-" + variant, props.size === "sm" && "dm-btn-sm", props.block && "dm-btn-block", props.className)
    }), props.icon ? h(Icone, { nome: props.icon, size: props.size === "sm" ? 16 : 18 }) : null, props.children);
  }

  function Badge(props) {
    var tom = props.tone || "neutral";
    return h("span", { className: cx("dm-badge", "dm-badge-" + tom, props.className) },
      props.icon ? h(Icone, { nome: props.icon, size: 14 }) : null, props.children);
  }

  function StatusBadge(props) {
    var e = ESTADOS[props.status] || ESTADOS.aberto;
    return h(Badge, { tone: e.tom }, e.rotulo);
  }

  function Selo(props) {
    var texto = props.kind === "prestador" ? "Prestador verificado" : "Serviço verificado";
    return h("span", { className: cx("dm-selo", props.compact && "dm-selo-compact"), title: texto },
      h(Icone, { nome: "badge-check", size: props.compact ? 16 : 14 }),
      props.compact ? h("span", { className: "dm-sr" }, texto) : texto);
  }

  function CategoriaChip(props) {
    var c = CATEGORIAS[props.categoria] || CATEGORIAS.reparos;
    return h("button", {
      type: "button", className: cx("dm-chip", props.selected && "dm-chip-on"),
      "aria-pressed": props.selected ? "true" : "false", onClick: props.onClick
    }, h(Icone, { nome: c.icone, size: 16 }), c.rotulo);
  }

  function KpiCard(props) {
    var pct = props.total ? Math.round((props.pagos / props.total) * 100) : 0;
    return h("div", { className: "dm-kpi" },
      h("span", { className: "dm-kpi-label" }, props.label),
      h("b", { className: "dm-kpi-valor" }, reais(props.valor)),
      h("div", { className: "dm-kpi-bar", role: "progressbar", "aria-valuenow": pct, "aria-valuemin": 0, "aria-valuemax": 100 },
        h("i", { style: { width: pct + "%" } })),
      h("span", { className: "dm-kpi-label" }, props.pagos + " de " + props.total + " aluguéis pagos"));
  }

  function ChamadoCard(props) {
    var c = CATEGORIAS[props.categoria] || CATEGORIAS.reparos;
    return h("article", { className: "dm-card dm-chamado" },
      h("div", { className: "dm-chamado-ic" }, h(Icone, { nome: c.icone, size: 20 })),
      h("div", { className: "dm-chamado-main" },
        h("div", { className: "dm-chamado-top" },
          h("h3", { className: "dm-chamado-titulo" }, props.titulo),
          props.novo ? h(Badge, { tone: "accent" }, "Novo") : null),
        h("p", { className: "dm-meta" }, props.imovel + " · " + c.rotulo + " · " + props.quando),
        h("div", { className: "dm-row" },
          props.urgente ? h(Badge, { tone: "danger", icon: "triangle-alert" }, "Urgente") : null,
          h(StatusBadge, { status: props.status }),
          props.fotos ? h("span", { className: "dm-meta dm-inline" }, h(Icone, { nome: "camera", size: 14 }), props.fotos + (props.fotos > 1 ? " fotos" : " foto")) : null)));
  }

  function StatusSteps(props) {
    var atual = FLUXO.indexOf(props.status);
    var passos = props.passos || FLUXO.slice(0, 5);
    return h("ol", { className: "dm-steps" }, passos.map(function (id, i) {
      var idx = FLUXO.indexOf(id);
      var estado = idx < atual ? "feito" : idx === atual ? "atual" : "depois";
      return h("li", { key: id, className: "dm-step dm-step-" + estado, "aria-current": estado === "atual" ? "step" : undefined },
        h("span", { className: "dm-step-dot" }, estado === "feito" ? h(Icone, { nome: "check", size: 12 }) : null),
        h("span", { className: "dm-step-txt" },
          h("b", null, ESTADOS[id].rotulo),
          props.detalhes && props.detalhes[id] ? h("span", { className: "dm-meta" }, props.detalhes[id]) : null));
    }));
  }

  function PrestadorCard(props) {
    var disp = { hoje: "Pode ir hoje", amanha: "Pode ir amanhã" }[props.disponibilidade] || props.disponibilidade;
    return h("article", { className: "dm-card dm-prest" },
      h("div", { className: "dm-prest-head" },
        props.foto ? h("img", { className: "dm-avatar", src: props.foto, alt: "" })
          : h("span", { className: "dm-avatar", "aria-hidden": "true" }, props.iniciais),
        h("div", { className: "dm-prest-id" },
          h("div", { className: "dm-row" },
            h("h3", { className: "dm-prest-nome" }, props.nome),
            props.verificado ? h(Selo, { kind: "prestador", compact: true }) : null),
          h("p", { className: "dm-meta" }, props.oficio),
          h("p", { className: "dm-meta dm-inline" },
            h(Icone, { nome: "star", size: 14, className: "dm-star" }),
            h("b", { className: "dm-ink" }, props.nota.toFixed(1).replace(".", ",")),
            " · " + props.servicos + " serviços pelo app")),
        props.destaque ? h(Badge, { tone: "accent" }, "Destaque") : null),
      h("ul", { className: "dm-precos" }, props.itens.map(function (it) {
        return h("li", { key: it.nome }, h("span", null, it.nome),
          h("b", null, (it.aPartirDe ? "a partir de " : "") + reais(it.preco)));
      })),
      h("div", { className: "dm-prest-foot" },
        h("span", { className: "dm-meta dm-inline" }, h(Icone, { nome: "map-pin", size: 14 }), "Atende até " + props.raioKm + " km"),
        h("span", { className: "dm-meta dm-inline dm-disp" }, h(Icone, { nome: "clock", size: 14 }), disp)),
      props.onContratar ? h(Button, { variant: "primary", block: true, onClick: props.onContratar }, "Pedir orçamento") : null);
  }

  window.Domu = window.Domu || {};
  Object.assign(window.Domu, {
    Logo: Logo, Button: Button, Badge: Badge, StatusBadge: StatusBadge, Selo: Selo,
    CategoriaChip: CategoriaChip, KpiCard: KpiCard, ChamadoCard: ChamadoCard,
    StatusSteps: StatusSteps, PrestadorCard: PrestadorCard, Icone: Icone,
    ESTADOS: ESTADOS, CATEGORIAS: CATEGORIAS
  });
})();
