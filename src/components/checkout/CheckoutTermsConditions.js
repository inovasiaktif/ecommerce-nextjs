import Link from "next/link";
import Error from "./Error";

const CheckoutTermsConditions = ( { input, handleOnChange } ) => {

	const { errors, voucher } = input || {}

	return (
        <>
            <div className="content p-3 mt-1">
                <Error errors={ errors } fieldName={ 'voucher' }/>
                <div>Dengan melanjutkan, Saya setuju dengan <Link className="color-primary" href="/term-conditions" target="_blank" rel="noopener noreferrer">Syarat &amp; Ketentuan</Link> yang berlaku.</div>
            </div>
        </>
	);
};

export default CheckoutTermsConditions;