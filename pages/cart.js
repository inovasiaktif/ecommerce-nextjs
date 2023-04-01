
import Layout from "../src/components/Layout";
import CartItemsContainer from "../src/components/cart/cart-page/CartItemsContainer";

const Cart = () => {
	return (
		<Layout title="Keranjang Belanja" menuTitle="Keranjang Belanja" pageType="cart" noIndex={true}>
			<div className="sub-page">
				<CartItemsContainer />
			</div>
		</Layout>
	)
};

export default Cart;