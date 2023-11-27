import Link from 'next/link';
import { ArrowBackOutline, CartOutline, PersonOutline } from 'react-ionicons';
import { useRouter } from 'next/router'
import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { getWindowSize } from '../functions';

const ProductMenu = () => {
    const router = useRouter()

    const [cart] = useContext(AppContext);
    const productsCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : '';

    const [width] = getWindowSize();
    const maxWidth = 600;

    let badgesLeft = 512;
    if (width < maxWidth) {
        badgesLeft = (width - 88);
    }

    return (
        <>
            <div className="product-menu flex">
                <div className="menu-item w-full">
                    <a onClick={() => router.back()} className="bg-icon icon">
                        <ArrowBackOutline color={'white'} height="22px" width="22px" />
                    </a>
                </div>
                {/* <div className="menu-item cart-icon-container">
                    <Link href="/cart" className="bg-icon icon">
                        {productsCount ? <span style={{ "left": badgesLeft }} className="cart-badges">{productsCount}</span> : ''}
                        <CartOutline color={'white'} height="22px" width="22px" />
                    </Link>
                </div>
                <div className="menu-item user-icon-container">
                    <Link href="/customer/account" className="bg-icon icon">
                        <PersonOutline color={'white'} height="22px" width="22px" />
                    </Link>
                </div> */}
            </div>
        </>
    )
};

export default ProductMenu;