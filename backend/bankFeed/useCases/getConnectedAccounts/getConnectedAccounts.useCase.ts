
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs'
import { GetConnectedAccounts } from './getConnectedAccounts.query'
import { GetConnectedAccountsDTO } from '@modernfinops/shared'
import { PlaidAccessTokenRepo } from '@support/plaid/plaidAccessToken.repo'
import { PlaidService } from '../../../../support/plaid/plaid.service'
import { GetConnectedAccountsMapper } from '../../mappers/getConnectedAccounts.mapper'
import { AccountBase } from 'plaid'

@QueryHandler(GetConnectedAccounts)
export class GetConnectedAccountsUseCase
  implements IQueryHandler<GetConnectedAccounts>
{
  constructor(
    private plaidAccessTokenRepo: PlaidAccessTokenRepo,
    private plaidService: PlaidService,
  ) {}

  async execute(query: GetConnectedAccounts): Promise<GetConnectedAccountsDTO> {
    const accessToken = await this.plaidAccessTokenRepo.getAccessToken(
      query.input.userId,
    )

    const accounts: AccountBase[] =
      await this.plaidService.getConnectedAccounts(accessToken)

    return GetConnectedAccountsMapper.toDTO(accounts)
  }
}
