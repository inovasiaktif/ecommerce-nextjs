import { Fragment } from 'react';
import CheckoutCartItem from "./CheckoutCartItem";

const YourOrder = ( { cart } ) => {

	return (
		<Fragment>
			{cart ? (
				<Fragment>
					<table className="checkout-cart table table-hover w-full content">
						<tbody>
							{cart.products.length && (
								cart.products.map(item => (
									<CheckoutCartItem key={item.productId} item={item} />
								))
							)}
							<tr style={
								{
									"borderTop": "1px solid rgba(0, 0, 0, 0.09)"
								}
							}>
								<td colSpan="2" className="woo-next-checkout-total font-normal" style={
									{
										"paddingLeft":"10px",
										"paddingRight":"10px"
									}
								}>Total pesanan ({cart.products.length} produk):</td>
								<td className="woo-next-checkout-total color-primary">{ cart.totalProductsPrice }</td>
							</tr>
						</tbody>
					</table>
				</Fragment>
			) : ''}
		</Fragment>
	)
};

export default YourOrder;
