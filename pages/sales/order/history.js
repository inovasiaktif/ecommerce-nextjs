import Link from "next/link";
import Layout from "../../../src/components/Layout";
import { withApolloClient } from "../../../src/middleware/with-auth";
import CURRENT_CUSTOMER_QUERY from "../../../src/queries/current-customer";

const OrderHistoryPage = (props) => {
	const { customer } = props || {};

    return (
        <Layout title="Akun Saya" menuTitle="Akun Saya">
			<div className="content">
            	<div className="p-3"><b>{customer.displayName}</b></div>
				<Link href="/sales/order/history" className="horizontal-categories p-1">
					<div className="section-grid flex">
						<div className="title" style={
							{
								"fontSize":"14px"
							}
						}>Pesanan Saya (0)</div>
					</div>
				</Link>
				<div className="pl-3 pb-5">
					<button className="btn bg-primary">Logout</button>
				</div>
			</div>
        </Layout>
    )
};

function ChildItemHorizontal(props) 
{
	const { title } = props;

	return <>
		<Link href={`/category/`} style={
			{
				"border": "1px solid #dddddd",
				"padding": "10px",
				"display": "inline-block",
				"margin": "5px"
			}
		}>
			<div className="pt-0"></div>
			<div className="pt-1" style={{
				"fontSize":"12px",
				"color":"grey"
			}}>{title}</div>
		</Link>
	</>
}

export default OrderHistoryPage;

export const getServerSideProps = withApolloClient(async (context) => {
	// try {
		const { data, loading, error } = await context.apolloClient.query({
			query: CURRENT_CUSTOMER_QUERY,
		});
	
		return {
			props: { 
				customer: data?.customer ? data.customer : [],
				error: error ? error : []
			},
		};
	// } catch (error) {
	// 	return {
	// 	  props: {
	// 		customer: [],
	// 		error: error
	// 	  },
	// 	};
	// }
});