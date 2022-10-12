import Link from "next/link";

const CartBottomMenu = ({ cart }) => {
    return (
        <>
            <div>
                <section id="bottom-navigation" className="cart-bottom-menu md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                    <div id="tabs" className="flex justify-between">
                        <button className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                            <span className="tab tab-account block">Total: <span className="color-primary">{('string' !== typeof cart.totalProductsPrice) ? cart.totalProductsPrice.toFixed(2) : cart.totalProductsPrice}</span></span>
                        </button>
                        <Link href="/checkout">
                            <button className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1" style={{
                                "backgroundColor": "#00a4f7",
                                "color": "white"
                            }}>
                                <span className="tab tab-account block">Checkout</span>
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CartBottomMenu;