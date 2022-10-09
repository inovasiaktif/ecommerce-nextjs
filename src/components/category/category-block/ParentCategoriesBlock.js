import ProductCategoryBlock from "./ParentCategoryBlock";
import React from "react";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Link from "next/link";

const ParentCategoriesBlock = (props) => {

	const { productCategories } = props || {};

	// console.log(productCategories)

	// const productCategories = [
	// 	{
	// 		"id": "1",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "2",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "3",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "4",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "5",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "6",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "7",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "8",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "9",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "10",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "11",
	// 		"name": "Test"
	// 	},
	// 	{
	// 		"id": "12",
	// 		"name": "Test"
	// 	}
	// ];

	// console.log(productCategories)

	return (
		<>
			<div className="horizontal-categories">
				<div className="section-grid flex">
					<div className="title">KATEGORI</div>
					<Link href="/category">
						<a className="action-link">Lihat Lainnya <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" role="img" className="icon"><path stroke="none" d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg></a>
					</Link>
				</div>
				{productCategories.length ?
					<ScrollMenu>
						{productCategories.map((productCategory, index) => (
							<Card
								itemId={productCategory.id} // NOTE: itemId is required for track items
								title={productCategory.name}
								image={productCategory.image}
								slug={productCategory.slug}
								key={index}
							/>
						))}
					</ScrollMenu> : ''
				}
			</div>
		</>
	)

};

function Card({ onClick, selected, title, itemId, image, slug }) {
	const visibility = React.useContext(VisibilityContext);

	return (
		<>
			<Link href={`/category/${slug}`}>
				<a>
					<img alt="Gratis Ongkir dan Voucher" className="aVI9cK s1KOz9" style={{ "objectFit": "contain" }} src={image ? image.sourceUrl : "https://cms.inovasiaktif.com/wp-content/uploads/2022/10/5bc9fd14235a391a392f353e436cf6a2_tn.png"} />
					<div className="category-name">{title}</div>
				</a>
			</Link>
		</>
	);
}

export default ParentCategoriesBlock;
