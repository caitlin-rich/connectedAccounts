'use client'

import { ConnectedAccountDTO } from '@modernfinops/shared'

import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'
// Presentational Components
import { List } from '@ui/common/DataDisplay'
import Typography from '@ui/common/DataDisplay/Typography'
import BankAccountListCard, {
  StyledCard,
  StyledCardContent,
} from '@ui/common/DataDisplay/BankAccountListCard'
import { Box } from '@mui/system'
import { Alert, CircularProgress, Divider } from '@ui/common'
// Queries
import { ListItem } from '@ui/common/DataDisplay/List'
import { getFinancialAccounts } from './queries'

export default function BankConnectedAccounts() {
  const [connectedAccounts, setConnectedAccounts] =
    useState<ConnectedAccountDTO[]>()
  const [error, setError] = useState<Error>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    async function runQuery() {
      setIsLoading(true)
      try {
        const results = await getFinancialAccounts()
        setConnectedAccounts(results)
      } catch (err) {
        if (isAxiosError(err)) {
          setError(err.response?.data as Error)
        } else {
          setError(new Error('Unknown Error upon Get Project Accounts query'))
        }
      }
      setIsLoading(false)
    }
    void runQuery()
  }, [])

  if (isLoading) return <CircularProgress />

  return (
    <>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 'medium' }}>
          %title%
        </Typography>
      </Box>

      <Divider sx={{ width: '60%' }} />

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          %accountingSystemTitle%
        </Typography>
        <Typography variant="subtitle1">%accountingSystemSubtitle%</Typography>
        <StyledCard sx={{ my: 2 }}>
          <StyledCardContent>
            QuickBooks TM - Connected Accounting System Placeholder
          </StyledCardContent>
        </StyledCard>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
          %accountsTitle%
        </Typography>
        <Typography variant="subtitle1">%accountsSubtitle%</Typography>
        {error && <Alert severity="error">{error.message}</Alert>}
        {connectedAccounts && (
          <List
            items={connectedAccounts as unknown as ListItem[]}
            visibleFields={['accountId', 'name', 'mask', 'type', 'subtype']}
            defaultComponent={BankAccountListCard}
            flex
          />
        )}
      </Box>
    </>
  )
}