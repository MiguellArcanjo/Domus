import type { Metadata } from 'next'
import s from '../legal.module.css'

export const metadata: Metadata = { title: 'Política de Privacidade' }

/** Estrutura da Política de Privacidade (LGPD). O texto final precisa ser escrito pelo jurídico e pelo encarregado (DPO). */
export default function Privacidade() {
  return (
    <article className={s.legal}>
      <p className={s.aviso}>Rascunho de estrutura. O texto final precisa ser redigido pelo jurídico e aprovado pelo encarregado de dados (DPO).</p>
      <h1>Política de Privacidade</h1>
      <p>Última atualização: [data]</p>
      <h2>Dados que coletamos</h2>
      <ul>
        <li>Conta: nome, e-mail, senha (guardada com criptografia).</li>
        <li>Corretor: imóveis, contratos, dados dos inquilinos e proprietários.</li>
        <li>Prestador: documento, antecedentes (com autorização), localização aproximada, chave Pix.</li>
        <li>Fotos de chamados, serviços e vistorias, sem os metadados de localização.</li>
      </ul>
      <h2>Para que usamos</h2>
      <p>Para operar a gestão de aluguel, os chamados, a contratação, o pagamento protegido e os avisos por e-mail e push.</p>
      <h2>Com quem compartilhamos</h2>
      <p>Gateway de pagamento, serviço de e-mail, mapa e armazenamento de imagens. [Lista final a definir.]</p>
      <h2>Seus direitos</h2>
      <p>Acessar, corrigir, exportar e excluir seus dados em Perfil, Privacidade e dados. Contato do encarregado: [e-mail do DPO].</p>
      <h2>Segurança</h2>
      <p>Documentos criptografados, acesso por perfil e remoção de dados sensíveis das fotos publicadas.</p>
    </article>
  )
}
