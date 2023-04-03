import Link from 'next/link';
import { useContext, useState } from 'react';
import { AppContext } from "../../context/AppContext";
import { getFormattedCart, getUpdatedItems } from '../../../functions';
import CartItem from "./CartItem";
import { v4 } from 'uuid';
import { useMutation, useQuery } from '@apollo/client';
import UPDATE_CART from "../../../mutations/update-cart";
import GET_CART from "../../../queries/get-cart";
import CLEAR_CART_MUTATION from "../../../mutations/clear-cart";
import { isEmpty } from 'lodash'
import CartBottomMenu from '../../CartBottomMenu';

const CartItemsContainer = () => {
	// @TODO wil use it in future variations of the project.
	const [cart, setCart] = useContext(AppContext);
	const [requestError, setRequestError] = useState(null);

	// Get Cart Data.
	const { loading, error, data, refetch } = useQuery(GET_CART, {
		notifyOnNetworkStatusChange: true,
		onCompleted: () => {

			// Update cart in the localStorage.
			const updatedCart = getFormattedCart(data);
			localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

			// Update cart data in React Context.
			setCart(updatedCart);
		}
	});

	// Update Cart Mutation.
	const [updateCart, { data: updateCartResponse, loading: updateCartProcessing, error: updateCartError }] = useMutation(UPDATE_CART, {
		onCompleted: () => {
			refetch();
		},
		onError: (error) => {
			if (error) {
				const errorMessage = error?.graphQLErrors?.[0]?.message ? error.graphQLErrors[0].message : '';
				setRequestError(errorMessage);
			}
		}
	});

	// Update Cart Mutation.
	const [clearCart, { data: clearCartRes, loading: clearCartProcessing, error: clearCartError }] = useMutation(CLEAR_CART_MUTATION, {
		onCompleted: () => {
			refetch();
		},
		onError: (error) => {
			if (error) {
				const errorMessage = !isEmpty(error?.graphQLErrors?.[0]) ? error.graphQLErrors[0]?.message : '';
				setRequestError(errorMessage);
			}
		}
	});

	/*
	 * Handle remove product click.
	 *
	 * @param {Object} event event
	 * @param {Integer} Product Id.
	 *
	 * @return {void}
	 */
	const handleRemoveProductClick = (event, cartKey, products) => {

		event.stopPropagation();
		if (products.length) {

			// By passing the newQty to 0 in updateCart Mutation, it will remove the item.
			const newQty = 0;
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
	};

	// Clear the entire cart.
	const handleClearCart = (event) => {

		event.stopPropagation();

		if (clearCartProcessing) {
			return;
		}

		clearCart({
			variables: {
				input: {
					clientMutationId: v4(),
					all: true
				}
			},
		});
	}

	return (
		<div className="content product-cart-container container p-5">
			{cart ? (
				<div className="woo-next-cart-wrapper container">
					<div>
						{cart.products.length && (
							<>
								{cart.products.map(item => (
									<CartItem
										key={item.productId}
										item={item}
										updateCartProcessing={updateCartProcessing}
										products={cart.products}
										handleRemoveProductClick={handleRemoveProductClick}
										updateCart={updateCart}
									/>
								))}
							</>
						)}

						{/*Cart Total*/}
						<CartBottomMenu cart={cart} />
					</div>

					{/* Display Errors if any */}
					{requestError ? <div className="row woo-next-cart-total-container mt-5"> {requestError} </div> : ''}
				</div>
			) : (
				<div className="container text-center">
					<img src="/images/empty_cart.webp" style={
						{
							"width":"250px",
							"margin": "0 auto"
						}
					}/>
					<h5 className="text-center mb-0 pt-3">Wah, keranjang belanja kamu masih kosong</h5>
					<div style={
						{
							"fontSize":"12px"
						}
					}>Yuk, telusuri produk menarik dan jasa yang berguna dari kami!</div>
					<div className="pt-4">
						<Link href="/">
							<button className="px-4 py-2 bg-primary btn">Belanja Sekarang</button>
						</Link>
					</div>
				</div>
			)}
		</div>

	);
};

export default CartItemsContainer;
