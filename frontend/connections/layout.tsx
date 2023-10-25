'use client'

import { TypographyContextProvider } from '@ui/common/DataDisplay/Typography'
import strings from './strings'

function BankConnectedAccountsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TypographyContextProvider<typeof strings> strings={strings}>
      {children}
    </TypographyContextProvider>
  )
}

export default BankConnectedAccountsLayout