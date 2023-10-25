import { AxiosError } from 'axios'
import {
  GetFinancialAccountsDTO,
  GetQuickbooksConnectionDTO,
  FinancialAccountMapper,
  FinancialInstitutionConnectionWithFinancialAccounts,
  FinancialInstitutionConnectionMapper,
} from '@modernfinops/shared'
import { backendAxios } from '@utils/axios'


export async function getFinancialAccounts(
  clientCompanyId: string,
): Promise<FinancialInstitutionConnectionWithFinancialAccounts[]> {
  const response = await backendAxios.get<GetFinancialAccountsDTO>(
    `/bank-feed/${clientCompanyId}/financial-accounts`,
  )

  const results = response.data.results.map(
    ({ financialInstitutionConnection, financialAccounts }) => ({
      financialInstitutionConnection:
        FinancialInstitutionConnectionMapper.toDomain(
          financialInstitutionConnection,
        ),
      financialAccounts: financialAccounts.map(FinancialAccountMapper.fromDTO),
    }),
  )
  return results
}

export async function getQuickbooksConnection(
  clientCompanyId: string,
): Promise<GetQuickbooksConnectionDTO> {
  const response = await backendAxios.get<GetQuickbooksConnectionDTO>(
    `/client-company/${clientCompanyId}/quickbooks/connection`,
  )

  return response.data
}
