import type { Metadata } from 'next'
import s from '../legal.module.css'

export const metadata: Metadata = { title: 'Termos de uso' }

/** Estrutura dos Termos de uso. O texto final precisa ser escrito pelo jurídico. */
export default function Termos() {
  return (
    <article className={s.legal}>
      <p className={s.aviso}>Rascunho de estrutura. O texto final dos Termos de uso precisa ser redigido e revisado pelo jurídico antes do lançamento.</p>
      <h1>Termos de uso</h1>
      <p>Última atualização: [data]</p>
      <h2>1. O que é o Domu</h2>
      <p>O Domu oferece gestão de aluguel para corretores e proprietários e um marketplace que conecta clientes a prestadores de manutenção residencial.</p>
      <h2>2. Contas e perfis</h2>
      <p>Uma conta pode ter os perfis corretor ou proprietário, prestador e cliente. O inquilino acessa pelo link do contrato, sem conta.</p>
      <h2>3. Contratação e pagamento protegido</h2>
      <ul>
        <li>O cliente paga pelo Domu e o valor fica retido até a confirmação do serviço ou até [X] dias sem contestação.</li>
        <li>O prestador paga uma taxa de [8% a 10%] apenas sobre o serviço fechado pelo app.</li>
        <li>Combinar e pagar fora do app tira a garantia, a avaliação e o selo.</li>
      </ul>
      <h2>4. Assinatura do corretor</h2>
      <p>Grátis até 2 imóveis. Planos pagos conforme a página de preços. Cancelamento a qualquer momento, com efeito no fim do período pago.</p>
      <h2>5. Vitrine e conteúdo</h2>
      <p>Posts mostram só o bairro. É proibido publicar telefone, links, dados pessoais ou trabalhos de terceiros. Conteúdo denunciado pode ser removido.</p>
      <h2>6. Contestações</h2>
      <p>O cliente pode contestar um serviço com fotos. O pagamento fica retido até a decisão da equipe Domu.</p>
      <h2>7. Responsabilidades e limites</h2>
      <p>[A redigir pelo jurídico.]</p>
      <h2>8. Foro e contato</h2>
      <p>[A redigir pelo jurídico.] Contato: [e-mail de suporte].</p>
    </article>
  )
}
