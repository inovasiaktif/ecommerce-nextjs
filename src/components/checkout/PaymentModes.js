import Error from "./Error";

const PaymentModes = ( { input, handleOnChange } ) => {

	const { errors, paymentMethod } = input || {}

	return (
		<div className="mt-1 content p-3">
			<Error errors={ errors } fieldName={ 'paymentMethod' }/>
			<div style={
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
			</div>
		</div>
	);
};

export default PaymentModes;
