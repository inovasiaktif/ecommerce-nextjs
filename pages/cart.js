
import Layout from "../src/components/Layout";
import CartItemsContainer from "../src/components/cart/cart-page/CartItemsContainer";

const Cart = () => {
	return (
		<Layout title="Keranjang Saya" menuTitle="Keranjang Saya" pageType="cart">
			<div className="sub-page">
				<CartItemsContainer />
			</div>
		</Layout>
	)
};

export default Cart;
