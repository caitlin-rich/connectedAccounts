import { Injectable, Scope } from '@nestjs/common'
import { AccountBase, AccountsGetRequest } from 'plaid'
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
} from 'plaid'

@Injectable({ scope: Scope.DEFAULT })
export class PlaidService {
  private plaidApi: PlaidApi
  constructor() {
    // Env Variables
    const plaidClientId = process.env.PLAID_CLIENT_ID
    const plaidSecret = process.env.PLAID_SECRET
    const plaidEnvironment = process.env.PLAID_ENV || 'sandbox'

    if (!plaidClientId || !plaidSecret) {
      throw new Error('Missing Plaid client Id and/or secret')
    }

    const configuration = new Configuration({
      basePath: PlaidEnvironments[plaidEnvironment],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': plaidClientId,
          'PLAID-SECRET': plaidSecret,
        },
      },
    })
    this.plaidApi = new PlaidApi(configuration)
  }

  async getConnectedAccounts(accessToken: string): Promise<AccountBase[]> {
    const request: AccountsGetRequest = {
      access_token: accessToken,
    }

    const response = await this.plaidApi.accountsGet(request)
    return response.data.accounts
  }
}