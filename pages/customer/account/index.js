import Link from "next/link";
import Layout from "../../../src/components/Layout";
import { withApolloClient } from "../../../src/middleware/with-auth";
import CURRENT_CUSTOMER_QUERY from "../../../src/queries/current-customer";
import { useRouter } from "next/router";

const MyAccountPage = (props) => {
	const { customer } = props || {};

	const router = useRouter();

	const handleLogout = async (e) => {
		e.preventDefault();
		
		const response = await fetch('/api/buyer/logout', {
		  method: 'GET'
		});
		
		router.push('/');
	};

    return (
        <Layout title="Akun Saya" menuTitle="Akun Saya">
			<div className="content">
            	<div className="pl-3 pt-3"><b>{customer?.displayName}</b></div>
				<Link href="/invest/dashboard" className="horizontal-categories">
					<div className="section-grid flex pt-5">
						<div className="title" style={
							{
								"fontSize":"14px"
							}
						}>Investasi Saya</div>
					</div>
				</Link>
				<div className="pl-3 pb-5">
					<button className="btn bg-primary" onClick={handleLogout}>Logout</button>
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

export default MyAccountPage;

export const getServerSideProps = withApolloClient(async (context) => {
	if (!context.isLoggedIn) {
		return {
			redirect: {
			  destination: '/buyer/login',
			  permanent: false,
			},
		};
	}

	const { data, error } = await context.apolloClient.query({
		query: CURRENT_CUSTOMER_QUERY,
	});

	return {
		props: { 
			customer: data?.customer ? data.customer : [],
			error: error ? error : []
		},
	};
});