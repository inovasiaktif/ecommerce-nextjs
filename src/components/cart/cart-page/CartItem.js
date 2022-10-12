import { useState } from 'react';
import { v4 } from "uuid";
import { getUpdatedItems } from "../../../functions";
import { Cross, Loading } from "../../icons";

const CartItem = ({
	item,
	products,
	updateCartProcessing,
	handleRemoveProductClick,
	updateCart,
}) => {

	const [productCount, setProductCount] = useState(item.qty);

	/*
	 * When user changes the qty from product input update the cart in localStorage
	 * Also update the cart in global context
	 *
	 * @param {Object} event event
	 *
	 * @return {void}
	 */
	const handleQtyChange = (event, cartKey) => {

		if (process.browser) {

			event.stopPropagation();

			// If the previous update cart mutation request is still processing, then return.
			if (updateCartProcessing) {
				return;
			}

			// If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
			const newQty = (event.target.value) ? parseInt(event.target.value) : 1;

			// Set the new qty in state.
			setProductCount(newQty);

			if (products.length) {

				const updatedItems = getUpdatedItems(products, newQty, cartKey);

				updateCart({
					variables: {
						input: {
							clientMutationId: v4(),
							items: updatedItems
						}
					},
				});
			}

		}
	};

	return (
		<>
			<div className="grid grid-cols-3 gap-4" key={item.productId}>
				<div className="row-span-4">
					<img width="64" src={item.image.sourceUrl} srcSet={item.image.srcSet} alt={item.image.title} />
				</div>
				<div className="col-span-2">{item.name}</div>
				<div className="row-span-2 col-span-2">{('string' !== typeof item.price) ? item.price.toFixed(2) : item.price}</div>
				<div className="row-span-2 col-span-2"><input
					type="number"
					min="1"
					data-cart-key={item.cartKey}
					className={`woo-next-cart-qty-input form-control ${updateCartProcessing ? 'opacity-25 cursor-not-allowed' : ''} `}
					value={productCount}
					onChange={(event) => handleQtyChange(event, item.cartKey)}
				/></div>
			</div>
		</>
	)
};

export default CartItem;
