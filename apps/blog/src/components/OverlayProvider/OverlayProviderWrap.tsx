'use client'

import { OverlayProvider } from 'overlay-kit'

export const OverlayProviderWrap = ({ children }: { children: React.ReactNode }) => {
  return <OverlayProvider>{children}</OverlayProvider>
}
