import { Droplet, FileText, MapPin, Pencil, Send, Upload } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { IconButton } from '@/components/ui/IconButton'
import { Eyebrow, Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import { TabPanels } from '@/components/ui/Tabs'
import { SituacaoBadge } from '@/components/domain/Imovel'
import { reais } from '@/lib/format'
import { CHAMADOS, prestador } from '@/lib/mock'
import type { Imovel } from '@/lib/types'

/** Detalhe do imóvel: contrato, histórico de manutenção (G-06), documentos (G-08) e repasse (G-11). */
export function ImovelDetalhe({ imovel: i }: { imovel: Imovel }) {
  const historico = CHAMADOS.filter((c) => c.imovelId === i.id)
  const c = i.contrato
  return (
    <Stack gap={4}>
      <Photo legenda={`Galeria de ${i.nome}`} height={220}>
        <span style={{ position: 'absolute', top: 12, right: 12 }}><IconButton icon={Pencil} label="Editar imóvel" href={`/app/imoveis/${i.id}/editar`} /></span>
      </Photo>
      <Row between start>
        <div style={{ display: 'grid', gap: 4 }}>
          <h2 style={{ fontSize: 22 }}>{i.nome}</h2>
          <Meta icon={MapPin}>{i.endereco} · Proprietário: {i.proprietario}</Meta>
        </div>
        <SituacaoBadge imovel={i} />
      </Row>
      <TabPanels label="Seções do imóvel" tabs={['Contrato', 'Histórico', 'Documentos', 'Repasse']}>
        {[
          c ? (
            <Stack gap={3} key="contrato">
              <Card>
                <Row gap={3}><Avatar iniciais={c.inquilino.iniciais} /><div><b>{c.inquilino.nome}</b><Meta icon={FileText}>Contrato de {c.inicio} a {c.fim} · {c.indice}</Meta></div></Row>
                <Row between>
                  <div><Eyebrow>Aluguel</Eyebrow><b style={{ fontSize: 18 }} className="tabular">{reais(c.valor)}</b></div>
                  <div><Eyebrow>Vence dia</Eyebrow><b style={{ fontSize: 18 }}>{String(c.diaVencimento).padStart(2, '0')}</b></div>
                  <div style={{ display: 'grid', gap: 4 }}><Eyebrow>Setembro</Eyebrow><SituacaoBadge imovel={i} /></div>
                </Row>
              </Card>
              {i.alerta && <Card tone="warning"><b style={{ fontSize: 14 }}>{i.alerta}</b></Card>}
              <Row wrap gap={2}>
                <Button icon={Send} href={`/app/imoveis/${i.id}/link`}>Enviar link ao inquilino</Button>
                <Button href={`/app/contratos/${i.id}`}>Ver contrato</Button>
                <Button href={`/app/vistorias?imovel=${i.id}`}>Vistorias</Button>
              </Row>
            </Stack>
          ) : (
            <Card key="contrato"><p>Imóvel vago. Cadastre um contrato para enviar o link ao inquilino.</p><Button variant="primary" href={`/app/contratos/novo?imovel=${i.id}`}>Novo contrato</Button></Card>
          ),
          <Stack gap={3} key="historico">
            {historico.length === 0 && <p style={{ color: 'var(--ink-muted)' }}>Nenhum serviço registrado ainda.</p>}
            {historico.map((h) => (
              <Card key={h.id} href={`/app/chamados/${h.id}`}>
                <Row gap={3}><Droplet size={18} color="var(--brand)" aria-hidden /><div style={{ flexGrow: 1 }}><b style={{ fontSize: 14 }}>{h.titulo}{h.valor ? ` · ${reais(h.valor)}` : ''}</b><p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{h.abertoEm}{h.prestadorSlug ? ` · ${prestador(h.prestadorSlug)?.nome}` : ''}{h.estado === 'pago' ? ' · garantia de 90 dias' : ''}</p></div><Badge tone={h.estado === 'pago' ? 'success' : 'info'}>{h.estado === 'pago' ? 'Pago' : 'Em andamento'}</Badge></Row>
              </Card>
            ))}
          </Stack>,
          <Stack gap={3} key="docs">
            {['Contrato assinado.pdf', 'RG do inquilino.pdf', 'Seguro fiança.pdf'].map((d) => (
              <Card key={d}><Row gap={3}><FileText size={18} aria-hidden /><b style={{ fontSize: 14, flexGrow: 1 }}>{d}</b><Badge>Criptografado</Badge></Row></Card>
            ))}
            <Button icon={Upload} href={i.contrato ? `/app/contratos/${i.id}` : `/app/contratos/novo?imovel=${i.id}`}>Enviar documento</Button>
          </Stack>,
          <Card key="repasse" href={`/app/financeiro/repasses/${i.proprietario.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, '-')}`}>
            <Eyebrow>Repasse de setembro · {i.proprietario}</Eyebrow>
            <ul style={{ display: 'grid', gap: 8, fontSize: 14 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Aluguel</span><b className="tabular">{reais(c?.valor ?? 0)}</b></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Taxa de administração (8%)</span><b className="tabular">− {reais((c?.valor ?? 0) * 0.08)}</b></li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Manutenções</span><b className="tabular">− {reais(historico.reduce((t, h) => t + (h.estado === 'pago' ? h.valor ?? 0 : 0), 0))}</b></li>
            </ul>
          </Card>,
        ]}
      </TabPanels>
    </Stack>
  )
}
