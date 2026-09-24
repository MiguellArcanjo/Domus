'use client'

import { Button } from '@/components/ui/Button'

export function RecarregarButton() {
  return <Button variant="primary" onClick={() => window.location.reload()}>Tentar de novo</Button>
}
