import { IQuery } from '@nestjs/cqrs'

export class GetConnectedAccounts implements IQuery {
  constructor(public input: { userId: string }) {}
}