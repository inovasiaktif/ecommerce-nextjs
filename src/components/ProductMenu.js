import Link from 'next/link';
import { ArrowBackOutline, CartOutline, PersonOutline } from 'react-ionicons';
import { useRouter } from 'next/router'
import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';

const ProductMenu = () => {
    const router = useRouter()

    const [cart] = useContext(AppContext);
    const productsCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : '';

    return (
        <>
            <div className="product-menu flex">
                <div className="menu-item w-full">
                    <a onClick={() => router.back()} className="bg-icon icon">
                        <ArrowBackOutline color={'white'} height="22px" width="22px" />
                    </a>
                </div>
                <div className="menu-item cart-icon-container">
                    <Link href="/cart">
                        <a className="bg-icon icon">
                            {productsCount ? <span className="cart-badges">{productsCount}</span> : ''}
                            <CartOutline color={'white'} height="22px" width="22px" />
                        </a>
                    </Link>
                </div>
                <div className="menu-item user-icon-container">
                    <Link href="/my-account">
                        <a className="bg-icon icon">
                            <PersonOutline color={'white'} height="22px" width="22px" />
                        </a>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default ProductMenu;