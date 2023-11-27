import Layout from "../../../src/components/Layout";
import { formatPrice } from "../../../src/functions";
import { withApolloClient } from "../../../src/middleware/with-auth";
import { INVEST_BALANCE_QUERY } from "../../../src/queries/invest/get-invest-balance";

const InvestDashboardPage = (props) => {
	const { investBalance, investHistory } = props || {};

    return (
        <Layout title="Investasi Saya" menuTitle="Investasi Saya">
			<div className="content p-3">
                <b>Saldo Investasi</b>
                <div className="pt-2">
            	    <div>Total Investasi: <b>{formatPrice(investBalance?.invest_balance)}</b></div>
                    <div>Total Keuntungan: <b>{formatPrice(investBalance?.profit_balance)}</b></div>
                </div>
			</div>
            <div className="content p-3 mt-2">
                <b>Daftar Investasi</b>
                <div className="pt-2">
            	    <div>Investasi Ternak Kambing</div>
                </div>
			</div>
            <div className="content p-3 mt-2">
                <b>Riwayat Transaksi</b>
                <div>
            	    {investHistory ? investHistory.map(history => 
                    <div className="mt-2 p-3 border" key={history.id}>
                        <div className="pb-1"><b>Investasi Ternak Kambing</b></div>
                        {history.cash_in ? <div style={{"color":"green"}}>+{formatPrice(history.cash_in)}</div> : (
                            history.cash_out ? <div style={{"color":"red"}}>-{formatPrice(history.cash_out)}</div> : '+'+formatPrice(0)
                        )}
                        <div className="pt-2" style={
                            {
                                "fontSize":"14px",
                                "color":"grey"
                            }
                        }>{history.description}</div>
                        <div className="pt-2" style={
                            {
                                "fontSize":"12px",
                                "color":"grey"
                            }
                        }>{history.created_at}</div>
                    </div>
                    ) : ''}
                </div>
			</div>
        </Layout>
    )
};

export default InvestDashboardPage;

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
		query: INVEST_BALANCE_QUERY,
	});

	return {
		props: {
            investHistory: data?.investHistory?.nodes ? data.investHistory.nodes : [],
			investBalance: data?.investBalance ? data.investBalance : [],
			error: error ? error : []
		},
	};
});