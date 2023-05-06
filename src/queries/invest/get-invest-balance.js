import { gql } from "@apollo/client";

export const INVEST_BALANCE_QUERY = gql` query InvestBalance {
	investment {
    invest_balance
    profit_balance
    profit_estimation_date
  }
  investmentHistory {
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