import { Module } from '@nestjs/common'
import { BankFeedController } from './bankFeed.controller'
import { CqrsModule } from '@nestjs/cqrs'

// Providers
import { PlaidService } from '@support/plaid/plaid.service'
import { PrismaService } from '@support/database/prisma.service'
import useCases from './useCases/index.ts'
import { PlaidAccessTokenRepo } from '@support/plaid/plaidAccessToken.repo'

@Module({
  imports: [CqrsModule],
  controllers: [BankFeedController],
  providers: [...useCases, PlaidService, PlaidAccessTokenRepo, PrismaService],
})
export class BankFeedModule {}