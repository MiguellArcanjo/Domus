import type * as React from 'react';
export type Categoria = 'hidraulica' | 'eletrica' | 'pintura' | 'limpeza' | 'reparos';
export type EstadoChamado = 'aberto' | 'triado' | 'prestador_atribuido' | 'agendado' | 'concluido' | 'pago' | 'avaliado' | 'cancelado' | 'em_disputa';
export type Tom = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
export type NomeIcone = 'droplet' | 'zap' | 'paint-roller' | 'sparkles' | 'wrench' | 'star' | 'badge-check' | 'map-pin' | 'clock' | 'camera' | 'triangle-alert' | 'check';
export interface LogoProps { height?: number; variant?: 'principal' | 'negativo' | '1cor'; simbolo?: boolean; className?: string }
export declare function Logo(props: LogoProps): React.ReactElement;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'md' | 'sm'; icon?: NomeIcone; block?: boolean }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface BadgeProps { tone?: Tom; icon?: NomeIcone; children?: React.ReactNode; className?: string }
export declare function Badge(props: BadgeProps): React.ReactElement;
export interface StatusBadgeProps { status: EstadoChamado }
export declare function StatusBadge(props: StatusBadgeProps): React.ReactElement;
export interface SeloProps { kind?: 'servico' | 'prestador'; compact?: boolean }
export declare function Selo(props: SeloProps): React.ReactElement;
export interface CategoriaChipProps { categoria: Categoria; selected?: boolean; onClick?: () => void }
export declare function CategoriaChip(props: CategoriaChipProps): React.ReactElement;
export interface KpiCardProps { label: string; valor: number; pagos: number; total: number }
export declare function KpiCard(props: KpiCardProps): React.ReactElement;
export interface ChamadoCardProps { titulo: string; imovel: string; categoria: Categoria; quando: string; status: EstadoChamado; urgente?: boolean; novo?: boolean; fotos?: number }
export declare function ChamadoCard(props: ChamadoCardProps): React.ReactElement;
export interface StatusStepsProps { status: EstadoChamado; passos?: EstadoChamado[]; detalhes?: Partial<Record<EstadoChamado, string>> }
export declare function StatusSteps(props: StatusStepsProps): React.ReactElement;
export interface ItemPreco { nome: string; preco: number; aPartirDe?: boolean }
export interface PrestadorCardProps { nome: string; oficio: string; nota: number; servicos: number; itens: ItemPreco[]; raioKm: number; disponibilidade: 'hoje' | 'amanha' | string; foto?: string; iniciais?: string; verificado?: boolean; destaque?: boolean; onContratar?: () => void }
export declare function PrestadorCard(props: PrestadorCardProps): React.ReactElement;
export interface IconeProps { nome: NomeIcone; size?: number; className?: string }
export declare function Icone(props: IconeProps): React.ReactElement;
declare global { interface Window { Domu: { Logo: typeof Logo; Button: typeof Button; Badge: typeof Badge; StatusBadge: typeof StatusBadge; Selo: typeof Selo; CategoriaChip: typeof CategoriaChip; KpiCard: typeof KpiCard; ChamadoCard: typeof ChamadoCard; StatusSteps: typeof StatusSteps; PrestadorCard: typeof PrestadorCard; Icone: typeof Icone } } }
