import { Injectable } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { GetConnectedAccounts } from './getConnectedAccounts.query'
import { GetConnectedAccountsDTO } from '@modernfinops/shared'

@Injectable()
export class GetConnectedAccountsService {
  constructor(public readonly queryBus: QueryBus) {}

  async getConnectedAccounts(userId: string): Promise<GetConnectedAccountsDTO> {
    return this.queryBus.execute(new GetConnectedAccounts({ userId }))
  }
}