import type { Metadata } from 'next'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Faq } from '@/components/site/Blocks'
import { Section, SectionHead } from '@/components/site/Section'

export const metadata: Metadata = { title: 'Ajuda' }

export default function Ajuda() {
  return (
    <Section label="Ajuda">
      <SectionHead as="h1" eyebrow="Ajuda" title="Como podemos ajudar?" />
      <Faq itens={[
        ['Esqueci minha senha', 'Na tela de entrar, toque em “Esqueci minha senha”. Enviamos um link para o seu e-mail que vale por 1 hora.'],
        ['Como funciona o pagamento protegido?', 'Você paga pelo app e o valor fica guardado. Ele só vai para o prestador quando você confirma o serviço, ou alguns dias depois se não houver contestação.'],
        ['O serviço não ficou bom. E agora?', 'Abra o pedido e toque em Contestar. Envie fotos e explique o que houve. O pagamento fica retido até a decisão.'],
        ['Como o inquilino abre um chamado?', 'Pelo link do contrato que o corretor envia por e-mail. Não precisa de conta nem de senha.'],
        ['Como ganho o selo de prestador verificado?', 'Em Perfil, Verificação, envie o documento com foto, a selfie e o comprovante de endereço. A análise leva até 2 dias úteis.'],
        ['Como cancelo a assinatura?', 'Em Perfil, Assinatura, toque em Cancelar assinatura. Ela vale até o fim do mês pago.'],
        ['Como excluo minha conta?', 'Em Perfil, Privacidade e dados, toque em Excluir minha conta.'],
      ]} />
      <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
        <h2 style={{ fontSize: 22 }}>Ainda precisa de ajuda?</h2>
        <p style={{ color: 'var(--ink-muted)' }}>Escreva para a equipe Domu. Respondemos em até 1 dia útil.</p>
        <Button icon={Mail} href="mailto:ajuda@domu.app">ajuda@domu.app</Button>
      </div>
    </Section>
  )
}
