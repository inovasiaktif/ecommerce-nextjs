import Layout from "../src/components/Layout";
import Product from "../src/components/Product";
import client from '../src/components/ApolloClient';
import ParentCategoriesBlock from "../src/components/category/category-block/ParentCategoriesBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../src/queries/product-and-categories";
import HeroCarousel from "../src/components/home/hero-carousel";
import { Carousel } from 'react-responsive-carousel';
import React, { useState } from 'react';
import useLayoutEffect from '../src/components/UseIsomorphicLayoutEffect'
import Link from "next/link";

export default function Home(props) {
	const { products, productCategories, heroCarousel } = props || {};
	const [width] = useWindowSize();

	const percentage = Math.floor((width / 600) * 100)
	let carouselHeightPercent = 100;
	if (percentage < 100) {
		carouselHeightPercent = percentage;
	}

	const carouselHeight = ((carouselHeightPercent / 100 * 320) - 40) + 'px';

	return (
		<Layout homepage={true}>
			{/*Hero Carousel*/}
			<Carousel infiniteLoop={true} interval={5000} autoPlay={true} showStatus={false} showThumbs={false} showArrows={false}>
				<div>
					<img src="https://cf.shopee.co.id/file/c05cf88e7b4167813b894867a4d5a610" style={{ "height": carouselHeight }} />
				</div>
				<div>
					<img src="https://cf.shopee.co.id/file/6cd2599e1baef75ade47ade0eb47c9db" style={{ "height": carouselHeight }} />
				</div>
			</Carousel>
			{/* <HeroCarousel heroCarousel={heroCarousel} /> */}
			{/* Categories */}
			<ParentCategoriesBlock productCategories={productCategories} />
			{/*Products*/}
			<div className="products container mx-auto my-2 xl:px-0">
				<div className="section-grid flex">
					<div className="title">PRODUK</div>
					<Link href="/product">
						<a className="action-link">Lihat Lainnya <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" role="img" className="icon"><path stroke="none" d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg></a>
					</Link>
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

function useWindowSize() {
	const [size, setSize] = useState([0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth]);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, [setSize]);

	return size;
}

export async function getStaticProps() {

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

};
