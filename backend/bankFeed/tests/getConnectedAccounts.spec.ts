import { Test } from '@nestjs/testing'
import { CqrsModule } from '@nestjs/cqrs'
import { mock, mockFn } from 'jest-mock-extended'
import { PlaidService } from '@support/plaid/plaid.service'
import { GetConnectedAccountsService } from '../getConnectedAccounts/getConnectedAccounts.service'
import { GetConnectedAccountsUseCase } from '../getConnectedAccounts/getConnectedAccounts.useCase'
import { AccountBase, AccountType } from 'plaid'
import { PrismaService } from '@support/database/prisma.service'
import { PlaidAccessTokenRepo } from '@support/plaid/plaidAccessToken.repo'
import { GetConnectedAccountsMapper } from '../../mappers/getConnectedAccounts.mapper'

const mockAccountBaseArray: AccountBase[] = [
  {
    account_id: 'blgvvBlXw3cq5GMPwqB6s6q4dLKB9WcVqGDGo',
    balances: {
      available: 100,
      current: 110,
      iso_currency_code: 'USD',
      limit: null,
      unofficial_currency_code: null,
    },
    mask: '0000',
    name: 'Plaid Checking',
    official_name: 'Plaid Gold Standard 0% Interest Checking',
    persistent_account_id:
      '8cfb8beb89b774ee43b090625f0d61d0814322b43bff984eaf60386e',
    subtype: null,
    type: 'depository' as AccountType,
  },
]

const mockPlaidService = mock<PlaidService>({
  getConnectedAccounts:
    mockFn<PlaidService['getConnectedAccounts']>().mockResolvedValue(
      mockAccountBaseArray,
    ),
})

describe('Use Case Test: Get Connected Accounts', () => {
  it('Should get all connected accounts for a user', async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        GetConnectedAccountsService,
        GetConnectedAccountsUseCase,
        PlaidAccessTokenRepo,
        PrismaService,
        {
          provide: PlaidService,
          useValue: mockPlaidService,
        },
      ],
    }).compile()

    await module.init()

    const service = module.get<GetConnectedAccountsService>(
      GetConnectedAccountsService,
    )
    const useCase = module.get<GetConnectedAccountsUseCase>(
      GetConnectedAccountsUseCase,
    )

    const useCaseSpy = jest.spyOn(useCase, 'execute')

    const connectedAccounts = await service.getConnectedAccounts('test-user-id')

    const mappedAccounts =
      GetConnectedAccountsMapper.toDTO(mockAccountBaseArray)

    expect(useCaseSpy).toBeCalled()
    expect(connectedAccounts).toStrictEqual(mappedAccounts)
  })
})