import Link from 'next/link';
import AddToCartButton from '../components/cart/AddToCartButton';
import Price from "./single-product/price";
import Image from "../image";
import { DEFAULT_PRODUCT_HOME_IMG_URL } from "../constants/urls";
import React from "react";
import { getProductSeller } from '../utils/product';

const Product = (props) => {
	const { product } = props;

	// console.log("ffff . "+seller ? seller.name : 'NO')

	return (
		// @TODO Need to handle Group products differently.
		undefined !== product && 'GroupProduct' !== product.__typename ? (
			<Link href={`/product/${product?.slug}`} className="product">
				<Image
					className="object-cover bg-gray-100"
					width="308"
					height="308"
					loading="lazy"
					sourceUrl={product?.image?.sourceUrl ?? ''}
					defaultImgUrl={DEFAULT_PRODUCT_HOME_IMG_URL}
					altText={product?.image?.altText ?? product?.slug}
				/>
				<div className="product-info">
					{product?.allPaSeller?.nodes && product?.allPaSeller?.nodes.map((seller, index) => (
						<Link key={index} href={"/seller/"+seller.slug} className="brand-name color-primary">{seller.name}</Link>
					))}
					<h3 className="product-title mb-2 font-medium text-gray-800">
						{product.name ? product.name : ''}
					</h3>
					<Price salesPrice={product?.price} regularPrice={product?.regularPrice} />
				</div>
			</Link>
		) : (
			''
		)
	);
};

export default Product;
