/** Vistoria de entrada e saída por cômodo (G-12). */
export interface Vistoria {
  id: string
  imovelId: string
  tipo: 'entrada' | 'saida'
  data: string
  responsavel: string
  comodos: Array<{ nome: string; estado: 'bom' | 'regular' | 'ruim'; obs: string; fotos: number }>
}

export const VISTORIAS: Vistoria[] = [
  { id: 'v-ap32-entrada', imovelId: 'ap-32-acacias', tipo: 'entrada', data: '01/03/2024', responsavel: 'Marcos Silva', comodos: [
    { nome: 'Sala', estado: 'bom', obs: 'Paredes pintadas, piso sem riscos', fotos: 4 },
    { nome: 'Cozinha', estado: 'bom', obs: 'Pia e armários em bom estado', fotos: 3 },
    { nome: 'Quarto', estado: 'bom', obs: 'Janela com trinco funcionando', fotos: 3 },
    { nome: 'Banheiro', estado: 'regular', obs: 'Rejunte do box escurecido', fotos: 2 },
  ] },
  { id: 'v-ap32-saida', imovelId: 'ap-32-acacias', tipo: 'saida', data: '—', responsavel: 'Marcos Silva', comodos: [
    { nome: 'Sala', estado: 'regular', obs: 'Marcas de quadro na parede', fotos: 4 },
    { nome: 'Cozinha', estado: 'bom', obs: 'Sem alterações', fotos: 3 },
    { nome: 'Quarto', estado: 'bom', obs: 'Sem alterações', fotos: 3 },
    { nome: 'Banheiro', estado: 'ruim', obs: 'Box com vidro trincado', fotos: 3 },
  ] },
]

export function vistoria(id: string) {
  return VISTORIAS.find((v) => v.id === id)
}

export const COMODOS_PADRAO = ['Sala', 'Cozinha', 'Quarto', 'Banheiro', 'Área de serviço']
