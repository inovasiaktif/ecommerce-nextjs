import Error from "./Error";

const CheckoutPoints = ( { input, handleOnChange } ) => {

	const { errors, voucher } = input || {}

	return (
        <>
            <div className="content p-3 border-top">
                <Error errors={ errors } fieldName={ 'voucher' }/>
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td style={
                                {
                                    "width":"70px",
                                    "textAlign":"left"
                                }
                            }>Tukarkan points</td>
                            <td style={
                                {
                                    "width":"30px",
                                    "textAlign":"right"
                                }
                            }>
                                <div style={
                                    {
                                        "color":"grey",
                                        "fontSize":"14px"
                                    }
                                }>0 points</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
	);
};

export default CheckoutPoints;
