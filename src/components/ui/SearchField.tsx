import Link from 'next/link'
import { Search, SlidersHorizontal } from 'lucide-react'
import s from './SearchField.module.css'

interface Props {
  placeholder: string
  /** leva para a tela de busca em vez de digitar aqui */
  href?: string
  name?: string
  defaultValue?: string
  /** botão de filtro trena ao lado (referência Property Finder) */
  onFilter?: () => void
  filterHref?: string
}

export function SearchField({ placeholder, href, name = 'q', defaultValue, onFilter, filterHref }: Props) {
  const field = href ? (
    <Link href={href} className={s.field}>
      <Search size={18} aria-hidden />
      <span>{placeholder}</span>
    </Link>
  ) : (
    <label className={s.field}>
      <Search size={18} aria-hidden />
      <span className="sr-only">{placeholder}</span>
      <input type="search" name={name} placeholder={placeholder} defaultValue={defaultValue} />
    </label>
  )
  const filter = filterHref ? (
    <Link href={filterHref} className={s.filter} aria-label="Filtros"><SlidersHorizontal size={20} aria-hidden /></Link>
  ) : onFilter ? (
    <button type="button" className={s.filter} aria-label="Filtros" onClick={onFilter}><SlidersHorizontal size={20} aria-hidden /></button>
  ) : null
  return <div className={s.wrap}>{field}{filter}</div>
}
