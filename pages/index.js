import Layout from "../src/components/Layout";
import Product from "../src/components/Product";
import client from '../src/components/ApolloClient';
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import { Carousel } from 'react-responsive-carousel';
import React, { useState } from 'react';
import { getWindowSize } from "../src/functions";

export default function Home(props) {
	const { products, productCategories, heroCarousel } = props || {};
	const [width] = getWindowSize();

	const percentage = Math.floor((width / 600) * 100)
	let carouselHeightPercent = 100;
	if (percentage < 100) {
		carouselHeightPercent = percentage;
	}

	const carouselHeight = ((carouselHeightPercent / 100 * 320) - 40) + 'px';

	return (
		<Layout isHomepage={true}>
			{/*Hero Carousel*/}
			<Carousel infiniteLoop={true} interval={5000} autoPlay={true} showStatus={false} showThumbs={false} showArrows={false}>
				<div>
					<img src="/images/banner1.png" style={{ "height": carouselHeight }} />
				</div>
				<div>
					<img src="/images/banner2.png" style={{ "height": carouselHeight }} />
				</div>
			</Carousel>
			{/* <HeroCarousel heroCarousel={heroCarousel} /> */}
			{/* Categories */}
			<ParentCategoriesBlock productCategories={productCategories} />
			{/*Products*/}
			<div className="products container mx-auto xl:px-0">
				<div className="section-grid flex">
					<div className="title">Produk Terbaru</div>
					{/* <Link href="/product">
						<a className="action-link">Lihat Lainnya <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" role="img" className="icon"><path stroke="none" d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg></a>
					</Link> */}
				</div>
				<div className="product-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
					{products.length ? (
						products.map(product => <Product key={product.id} product={product} />)
					) : ''}
				</div>
			</div>
		</Layout>
	)
};

export async function getStaticProps({ locale }) {

	const { data } = await client.query({
		query: PRODUCTS_AND_CATEGORIES_QUERY,
	});

	return {
		props: {
			productCategories: data?.productCategories?.nodes ? data.productCategories.nodes : [],
			products: data?.products?.nodes ? data.products.nodes : [],
			heroCarousel: data?.heroCarousel?.nodes[0]?.children?.nodes ? data.heroCarousel.nodes[0].children.nodes : []
		},
		revalidate: 1
	}
}