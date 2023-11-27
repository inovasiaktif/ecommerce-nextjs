import Error from "./Error";

const CheckoutVouchers = ( { input, handleOnChange } ) => {

	const { errors, voucher } = input || {}

	return (
		<div className="mt-1 content p-3">
			<Error errors={ errors } fieldName={ 'voucher' }/>
            <table className="w-full">
                <tbody>
                    <tr>
                        <td style={
                            {
                                "width":"70px",
                                "textAlign":"left"
                            }
                        }>Voucher</td>
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
                            }>Pilih Voucher <span><svg xmlnsXlink="http://www.w3.org/1999/xlink" ariaHidden="true" focusable="false" dataPrefix="far" dataIcon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-angle-right fa-4x" width="18" height="18"><path fill="#C3C6D1" d="M273 239c9.4 9.4 9.4 24.6 0 33.9L113 433c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l143-143L79 113c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L273 239z"></path></svg></span></div>
                        </td>
                    </tr>
                </tbody>
            </table>
		</div>
	);
};

export default CheckoutVouchers;
