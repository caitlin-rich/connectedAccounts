import { ExchangePublicTokenDTO } from '@modernfinops/shared'
import { Controller, Get, Post, Body } from '@nestjs/common'

// Services
import { PlaidService } from '@support/plaid/plaid.service'
import { ExchangePublicTokenService } from './useCases/exchangePublicToken.service'
import { GetConnectedAccountsService } from './useCases/getConnectedAccounts/getConnectedAccounts.service'

@Controller('bank-feed')
export class BankFeedController {
  constructor(
    private plaidService: PlaidService,
    private exchangePublicTokenService: ExchangePublicTokenService,
    private getConnectedAccountsService: GetConnectedAccountsService,
  ) {}

  @Get('/create-link-token')
  async createLinkToken() {
    //TODO: replace with actual received user Id
    const userId = 'this-user-id'
    return await this.plaidService.createLinkToken(userId)
  }

  @Post('/token-exchange')
  async tokenExchange(@Body() input: ExchangePublicTokenDTO) {
    // TODO: Remove userId once auth0 is fixed
    const { publicToken, userId } = input
    await this.exchangePublicTokenService.exchangePublicToken(
      publicToken,
      userId,
    )
  }

  @Get('/connected-accounts')
  async getConnectedAccounts(userId: string) {
    return await this.getConnectedAccountsService.getConnectedAccounts(userId)
  }
}