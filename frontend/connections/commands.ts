import { backendAxios } from '@utils/axios'
import {
  ConnectQuickbooksInputDTO,
  ConnectQuickbooksResultDTO,
} from '@modernfinops/shared'

export async function connectQuickbooks(
  input: ConnectQuickbooksInputDTO,
): Promise<ConnectQuickbooksResultDTO> {
  const response = await backendAxios.post<ConnectQuickbooksResultDTO>(
    `/client-company/${input.clientCompanyId}/quickbooks/connection`,
  )
  return response.data
}