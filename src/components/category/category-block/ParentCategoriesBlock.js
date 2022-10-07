import ProductCategoryBlock from "./ParentCategoryBlock";
import React from "react";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

function getItems() {
	// Array(20)
	// 	.fill(0)
	// 	.map((_, ind) => ({ id: `element-${ind}` }));
	return [
		{
			"id": 'elemt-0',
			"name": ""
		}
	]
}

const ParentCategoriesBlock = (props) => {

	const { productCategories } = props || {};

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
				{productCategories.length ?
					<ScrollMenu>
						{productCategories.map((productCategory, index) => (
							<Card
								itemId={productCategory.id} // NOTE: itemId is required for track items
								title={productCategory.name}
								key={index}
							/>
						))}
					</ScrollMenu> : ''
				}
			</div>
		</>
	)

};

function Card({ onClick, selected, title, itemId }) {
	const visibility = React.useContext(VisibilityContext);

	return (
		<>
			<img width="invalid-value" height="invalid-value" alt="Gratis Ongkir dan Voucher" className="aVI9cK s1KOz9" style={{ "objectFit": "contain" }} src="https://cf.shopee.co.id/file/4497ac7ff3ee9711a8d512d0f8297b49_xxhdpi" />
			<div className="category-name">{title}</div>
		</>
	);
}

export default ParentCategoriesBlock;
