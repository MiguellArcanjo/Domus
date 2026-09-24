"""Gera os SVGs finais do logo Domu (conceito Arco).

O logotipo "domu" é a fonte Geist (OFL) no peso 750, com espaçamento -0,05em,
convertida em curvas. Assim o SVG não depende de a fonte estar instalada.

Uso:
    npm pack geist@1.3.1 && tar xzf geist-1.3.1.tgz
    pip install fonttools
    python3 brand/scripts/gerar-logo.py package/dist/fonts/geist-sans/Geist-Variable.ttf
"""

import sys
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

RAIZ = Path(__file__).resolve().parents[1]

JADE = "#0E5C4A"
TRENA = "#FFC21A"
TINTA = "#10201B"
CAL = "#F4F6F2"
BRANCO = "#FFFFFF"
# Tema escuro do app: o arco clareia (brand no escuro) e o nome vira ink claro.
JADE_CLARO = "#4FD1AC"
TINTA_CLARA = "#E6EEEA"

# Símbolo no grid de 64: o "u" de domu virado, que vira arco e porta.
# A área visível vai de x 13 a 51 e de y 12 a 56 (o traço tem pontas redondas).
ARCO = "M17 52V31a15 15 0 0 1 30 0v21"
TRACO = 8
PONTO = (32, 44, 5)
SIMB_X, SIMB_Y, SIMB_L, SIMB_A = 13, 12, 38, 44


def simbolo(arco, ponto):
    cx, cy, r = PONTO
    return (
        f'<path d="{ARCO}" fill="none" stroke="{arco}" stroke-width="{TRACO}" '
        f'stroke-linecap="round" stroke-linejoin="round"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{ponto}"/>'
    )


def logotipo(fonte):
    """Devolve (path, xmin, xmax) de "domu" em unidades da fonte, base em y=0."""
    f = instantiateVariableFont(TTFont(fonte), {"wght": 750})
    upm = f["head"].unitsPerEm
    glifos, cmap, hmtx = f.getGlyphSet(), f.getBestCmap(), f["hmtx"]
    caneta, limites = SVGPathPen(glifos), BoundsPen(glifos)
    x = 0
    for letra in "domu":
        nome = cmap[ord(letra)]
        t = (1, 0, 0, -1, x, 0)
        glifos[nome].draw(TransformPen(caneta, t))
        glifos[nome].draw(TransformPen(limites, t))
        x += hmtx[nome][0] - 0.05 * upm
    xmin, _, xmax, _ = limites.bounds
    return caneta.getCommands(), xmin, xmax


def svg(vb, corpo, titulo):
    x, y, l, a = (round(v, 2) for v in vb)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x} {y} {l} {a}" '
        f'role="img" aria-label="{titulo}">\n<title>{titulo}</title>\n{corpo}\n</svg>\n'
    )


def main(fonte):
    texto, txmin, txmax = logotipo(fonte)
    logo_dir, icone_dir = RAIZ / "logo", RAIZ / "icone"

    # Símbolo sozinho, recortado na área visível.
    vb_simb = (SIMB_X, SIMB_Y, SIMB_L, SIMB_A)
    for nome, arco, ponto in [
        ("domu-simbolo", JADE, TRENA),
        ("domu-simbolo-negativo", CAL, TRENA),
        ("domu-simbolo-1cor-preto", TINTA, TINTA),
        ("domu-simbolo-1cor-branco", BRANCO, BRANCO),
    ]:
        (logo_dir / f"{nome}.svg").write_text(svg(vb_simb, simbolo(arco, ponto), "Domu"))

    # Assinatura horizontal. O arco fica um pouco mais alto que o "d" (710)
    # e apoia na linha de base junto com o "o".
    altura = 820
    s = altura / SIMB_A
    base = 12  # overshoot do "o"
    tx, ty = -SIMB_X * s, base - (SIMB_Y + SIMB_A) * s
    largura_simb = SIMB_L * s
    vao = 0.26 * altura
    dx = largura_simb + vao - txmin
    topo = base - altura
    vb_h = (0, topo, dx + txmax, altura)

    def horizontal(arco, ponto, letras):
        return (
            f'<g transform="translate({tx:.2f} {ty:.2f}) scale({s:.4f})">{simbolo(arco, ponto)}</g>\n'
            f'<path transform="translate({dx:.2f} 0)" fill="{letras}" d="{texto}"/>'
        )

    # Assinatura vertical: símbolo maior, centrado sobre o nome.
    sv = 1.5 * s
    larg_txt = txmax - txmin
    alt_simb_v = SIMB_A * sv
    gap_v = 0.3 * altura
    larg_v = max(larg_txt, SIMB_L * sv)
    txv = (larg_v - SIMB_L * sv) / 2 - SIMB_X * sv
    tyv = -SIMB_Y * sv
    base_v = alt_simb_v + gap_v + 710
    dxv = (larg_v - larg_txt) / 2 - txmin
    vb_v = (0, 0, larg_v, base_v + base)

    def vertical(arco, ponto, letras):
        return (
            f'<g transform="translate({txv:.2f} {tyv:.2f}) scale({sv:.4f})">{simbolo(arco, ponto)}</g>\n'
            f'<path transform="translate({dxv:.2f} {base_v:.2f})" fill="{letras}" d="{texto}"/>'
        )

    for sufixo, arco, ponto, letras in [
        ("", JADE, TRENA, TINTA),
        ("-negativo", CAL, TRENA, BRANCO),
        ("-escuro", JADE_CLARO, TRENA, TINTA_CLARA),
        ("-1cor-preto", TINTA, TINTA, TINTA),
        ("-1cor-branco", BRANCO, BRANCO, BRANCO),
    ]:
        (logo_dir / f"domu-logo{sufixo}.svg").write_text(
            svg(vb_h, horizontal(arco, ponto, letras), "Domu")
        )
        (logo_dir / f"domu-logo-vertical{sufixo}.svg").write_text(
            svg(vb_v, vertical(arco, ponto, letras), "Domu")
        )

    # Ícone do app: quadrado cheio em jade (a loja aplica a máscara) e versão
    # arredondada para web e favicon. O símbolo ocupa ~56% da altura.
    def icone(raio):
        fundo = f'<rect width="64" height="64" rx="{raio}" fill="{JADE}"/>'
        k = 36 / SIMB_A
        cx, cy = 32 - (SIMB_X + SIMB_L / 2) * k, 32 - (SIMB_Y + SIMB_A / 2) * k
        return fundo + f'\n<g transform="translate({cx:.3f} {cy:.3f}) scale({k:.4f})">{simbolo(CAL, TRENA)}</g>'

    (icone_dir / "domu-app-icon.svg").write_text(svg((0, 0, 64, 64), icone(0), "Domu"))
    (icone_dir / "domu-app-icon-arredondado.svg").write_text(svg((0, 0, 64, 64), icone(14), "Domu"))
    (icone_dir / "favicon.svg").write_text(svg((0, 0, 64, 64), icone(14), "Domu"))


if __name__ == "__main__":
    main(sys.argv[1])
