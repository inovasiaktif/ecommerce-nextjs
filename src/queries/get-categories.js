import { gql } from "@apollo/client";

/**
 * GraphQL parent categories query.
 */
const GET_PARENT_CATEGORIES_QUERY = gql`query {

	productCategories(where: {parent:0}) {
		nodes {
			id
			name
			slug
			image {
				sourceUrl
				altText
			}
		}
	}
	
}`;

export default GET_PARENT_CATEGORIES_QUERY;
