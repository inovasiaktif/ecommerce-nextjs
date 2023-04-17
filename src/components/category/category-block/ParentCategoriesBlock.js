import ProductCategoryBlock from "./ParentCategoryBlock";
import React from "react";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Link from "next/link";

const ParentCategoriesBlock = (props) => {

	const { productCategories, style, categoryView } = props || {};

	const otherImage = {sourceUrl:"/images/category/others.png"};

	return (
		<>
			<div className="horizontal-categories" style={style}>
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
						{!categoryView && <Card
							itemId="353"
							title="Lainnya"
							image={otherImage}
							slug="category"
						/>}
					</ScrollMenu> : ''
				}
			</div>
		</>
	)
};

function Card({ onClick, selected, title, itemId, image, slug }) 
{
	return (
		<>
			<Link href={`/${slug}`}>
				<img className="aVI9cK s1KOz9" style={{ "objectFit": "contain" }} src={image ? image.sourceUrl : "https://cms.inovasiaktif.com/wp-content/uploads/2022/10/5bc9fd14235a391a392f353e436cf6a2_tn.png"} />
				<div className="category-name">{title}</div>
			</Link>
		</>
	);
}

export default ParentCategoriesBlock;