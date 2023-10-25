import {
    GetConnectedAccountsDTO,
    ConnectedAccountDTO,
  } from '@modernfinops/shared'
  import { AccountBase } from 'plaid'
  
  export class GetConnectedAccountsMapper {
    public static toDTO(accountBase: AccountBase[]): GetConnectedAccountsDTO {
      const accounts = accountBase.map(
        (account): ConnectedAccountDTO => ({
          accountId: account.account_id,
          balances: {
            available: account.balances.available,
            current: account.balances.current,
            isoCurrencyCode: account.balances.iso_currency_code,
          },
          mask: account.mask,
          name: account.name,
          officialName: account.official_name,
          persistentAccountId: account.persistent_account_id,
          subtype: account.subtype,
          type: account.type,
        }),
      )
  
      return { accounts }
    }
  }