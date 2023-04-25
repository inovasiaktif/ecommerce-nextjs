import { gql } from "@apollo/client";

export const INVEST_HISTORY_QUERY = gql` query InvestHistory {
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