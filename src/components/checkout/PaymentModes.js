import Error from "./Error";

const PaymentModes = ( { input, handleOnChange } ) => {

	const { errors, paymentMethod } = input || {}

	return (
		<div className="mt-1 content p-3">
			<Error errors={ errors } fieldName={ 'paymentMethod' }/>
			<table className="w-full">
                <tbody>
                    <tr>
                        <td style={
                            {
                                "width":"50%",
                                "textAlign":"left"
                            }
                        }>Metode Pembayaran</td>
                        <td style={
                            {
                                "width":"50%",
                                "textAlign":"right"
                            }
                        }>
                            <div style={
                                {
                                    "color":"grey",
                                    "fontSize":"14px"
                                }
                            }>Cash On Delivery<span><svg xmlnsXlink="http://www.w3.org/1999/xlink" ariaHidden="true" focusable="false" dataPrefix="far" dataIcon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-right fa-4x" width="18" height="18"><path fill="#C3C6D1" d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"></path></svg></span></div>
                        </td>
                    </tr>
                </tbody>
            </table>
			{/* <div style={
				{
					"fontSize":"16px"
				}
			}><b>Metode Pembayaran</b></div>
			<div className="form-check woo-next-payment-input-container mt-2">
				<label className="form-check-label">
					<input onChange={ handleOnChange } value="cod" className="form-check-input mr-3" name="paymentMethod" type="radio" checked={'cod' === paymentMethod}/>
					<span className="woo-next-payment-content">COD (Cash on Delivery)</span>
				</label>
			</div>
			<div className="woo-next-checkout-payment-instructions mt-2" style={
				{
					"color":"grey",
					"fontSize":"12px"
				}
			}>
				Pesan sekarang, bayar cash ditempat.
			</div> */}
		</div>
	);
};

export default PaymentModes;
