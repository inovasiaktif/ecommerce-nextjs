import ProductCategoryBlock from "./ParentCategoryBlock";
import React from "react";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Link from "next/link";

const ParentCategoriesBlock = (props) => {

	const { productCategories, t } = props || {};

	return (
		<>
			{productCategories.length ? 
				productCategories.map((productCategory, index) => 
					productCategory.slug != "others" && (
						<div className="horizontal-categories p-1" key={index}>
							<div className="section-grid flex">
								<div className="title">{productCategory.name.toUpperCase()}</div>
								<Link href={`/category/${productCategory.slug}`} className="action-link">Lihat Selengkapnya <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" role="img" className="icon"><path stroke="none" d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path></svg>
								</Link>
							</div>
							{productCategory.children && productCategory.children.nodes.length ?
								<>
									{productCategory.children.nodes.map((childCategory, index) => (
										<Card
											itemId={childCategory.id} // NOTE: itemId is required for track items
											title={childCategory.name}
											image={childCategory.image}
											slug={childCategory.slug}
											description={childCategory.description}
											key={index}
										/>
									))}
								</> : ''
							}
						</div>
					)
				)
			: ''}
		</>
	)

};

function Card({ onClick, selected, title, itemId, image, slug, description }) {
	const visibility = React.useContext(VisibilityContext);

	return (
		<>
			<Link href={`/category/${slug}`} style={
				{
					"border": "1px solid #dddddd",
					"padding": "10px",
					"display": "block",
					"margin": "10px"
				}
			}>
				{/* <img style={{ "objectFit": "contain","width":"100%" }} src={image ? image.sourceUrl : ""} /> */}
				<div className="pt-0">{title}</div>
				<div className="pt-1" style={{
					"fontSize":"12px",
					"color":"grey"
				}}>{description}</div>
			</Link>
		</>
	);
}

export default ParentCategoriesBlock;
