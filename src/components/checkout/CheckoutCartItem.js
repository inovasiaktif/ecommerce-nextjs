const CheckoutCartItem = ( { item } ) => {

	return (
		<tr className="woo-next-cart-item" key={item.productId}>
			<td className="woo-next-cart-element">
				<img className="pl-3" width="64" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={item.image.title}/>
			</td>
			<td className="woo-next-cart-element" style={
				{
					"verticalAlign": "top",
					"paddingLeft": "10px",
					"fontSize": "12px"
				}
			}>{ item.name }</td>
			<td className="woo-next-cart-element" style={
				{
					"color":"grey"
				}
			}><div style={
				{
					"fontSize":"12px",
					"textAlign": "right"
				}
			} className="mb-1 pr-3">x { item.qty }</div>
			<div style={
				{
					"textAlign": "right"
				}
			} className="pr-3">{ item.totalPrice }</div></td>
		</tr>
	)
};

export default CheckoutCartItem;
