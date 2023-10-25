
import { MonetaryDTO } from "@modernfinops/shared";

export interface ConnectedAccountDTO {
  accountId: string;
  balances: {
    available: MonetaryDTO | null;
    current: MonetaryDTO | null;
    isoCurrencyCode: string | null;
  };
  mask: string | null;
  name: string;
  officialName: string | null;
  persistentAccountId?: string;
  subtype: string | null;
  type: string;
}

export interface GetConnectedAccountsDTO {
  accounts: ConnectedAccountDTO[];
}