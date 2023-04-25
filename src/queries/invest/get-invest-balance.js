import { gql } from "@apollo/client";

export const INVEST_BALANCE_QUERY = gql` query InvestBalance {
	investBalance {
    invest_balance
    profit_balance
  }
  investHistory {
    nodes {
      id
      cash_in
      cash_out
      description
      created_at
    }
  }
}
`;