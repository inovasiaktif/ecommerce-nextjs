import React from 'react';
import Link from 'next/link';
import { ChatbubblesOutline, CartOutline } from 'react-ionicons';
import { useState, useContext } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { v4 } from 'uuid';
import cx from 'classnames';
import { AppContext } from './context/AppContext';
import { getFormattedCart } from '../functions';
import GET_CART from '../queries/get-cart';
import ADD_TO_CART from "../mutations/add-to-cart";

const ProductBottomMenu = ({ product }) => {
    const productQryInput = {
        clientMutationId: v4(), // Generate a unique id.
        productId: product.productId,
    };

    const [cart, setCart] = useContext(AppContext);
    const [showViewCart, setShowViewCart] = useState(false);
    const [requestError, setRequestError] = useState(null);

    // Get Cart Data.
    const { data, refetch } = useQuery(GET_CART, {
        notifyOnNetworkStatusChange: true,
        onCompleted: () => {

            // Update cart in the localStorage.
            const updatedCart = getFormattedCart(data);
            localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));

            // Update cart data in React Context.
            setCart(updatedCart);
        }
    });

    // Add to Cart Mutation.
    const [addToCart, {
        data: addToCartRes,
        loading: addToCartLoading,
        error: addToCartError
    }] = useMutation(ADD_TO_CART, {
        variables: {
            input: productQryInput,
        },
        onCompleted: () => {
            // On Success:
            // 1. Make the GET_CART query to update the cart with new values in React context.
            refetch();

            // 2. Show View Cart Button
            setShowViewCart(true)
        },
        onError: (error) => {
            if (error) {
                setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
            }
        }
    });

    const handleAddToCartClick = async () => {
        setRequestError(null);
        await addToCart();
    };

    return (
        <>
            <div>
                <section id="bottom-navigation" className="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
                    <div id="tabs" className="flex justify-between">
                        <Link href="/" className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1">
                                <ChatbubblesOutline color={'intherit'} height="25px" width="25px" />
                                <span className="title tab tab-account block text-xs">Chat Sekarang</span>
                        </Link>
                        <button onClick={handleAddToCartClick} className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 bg-primary">
                            <CartOutline color={'intherit'} height="25px" width="25px" />
                            <span className="title tab tab-account block text-xs">Masukkan Keranjang</span>
                        </button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ProductBottomMenu;