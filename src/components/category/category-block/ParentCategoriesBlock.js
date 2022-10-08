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
				{productCategories.length ?
					<ScrollMenu>
						{productCategories.map((productCategory, index) => (
							<Card
								itemId={productCategory.id} // NOTE: itemId is required for track items
								title={productCategory.name}
								image={productCategory.image}
								key={index}
							/>
						))}
					</ScrollMenu> : ''
				}
			</div>
		</>
	)

};

function Card({ onClick, selected, title, itemId, image }) {
	const visibility = React.useContext(VisibilityContext);

	return (
		<>
			<img width="invalid-value" height="invalid-value" alt="Gratis Ongkir dan Voucher" className="aVI9cK s1KOz9" style={{ "objectFit": "contain" }} src={image ? image.sourceUrl : "https://cms.inovasiaktif.com/wp-content/uploads/2022/10/5bc9fd14235a391a392f353e436cf6a2_tn.png"} />
			<div className="category-name">{title}</div>
		</>
	);
}

export default ParentCategoriesBlock;
