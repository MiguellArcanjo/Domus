"""Gera brand/tokens/tokens.json a partir de brand/tokens/tokens.css.

Uso: python3 brand/scripts/gerar-tokens-json.py
"""

import json
import re
from pathlib import Path

PASTA = Path(__file__).resolve().parents[1] / "tokens"


def ler(bloco):
    return {k: v.strip() for k, v in re.findall(r"--([\w-]+):\s*([^;]+);", bloco)}


css = (PASTA / "tokens.css").read_text()
claro = ler(css.split("@media")[0])
escuro = {**claro, **ler(css.split(':root[data-theme="dark"]')[1])}

saida = {
    "$descricao": "Domu — tokens de design. Gerado a partir de tokens.css por scripts/gerar-tokens-json.py.",
    "light": claro,
    "dark": escuro,
    # Estados do chamado (PRD) e o tom de status que cada um usa.
    "chamado": {
        "aberto": {"rotulo": "Aberto", "tom": "info"},
        "triado": {"rotulo": "Triado", "tom": "info"},
        "prestador_atribuido": {"rotulo": "Prestador atribuído", "tom": "neutral"},
        "agendado": {"rotulo": "Agendado", "tom": "neutral"},
        "concluido": {"rotulo": "Concluído", "tom": "success"},
        "pago": {"rotulo": "Pago", "tom": "success"},
        "avaliado": {"rotulo": "Avaliado", "tom": "success"},
        "cancelado": {"rotulo": "Cancelado", "tom": "neutral"},
        "em_disputa": {"rotulo": "Em disputa", "tom": "danger"},
    },
    "urgencia": {
        "urgente": {"rotulo": "Urgente", "tom": "danger"},
        "normal": {"rotulo": "Normal", "tom": "neutral"},
        "novo": {"rotulo": "Novo", "tom": "accent"},
    },
}

(PASTA / "tokens.json").write_text(json.dumps(saida, ensure_ascii=False, indent=2) + "\n")
