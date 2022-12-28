import Layout from "../../src/components/Layout";
import client from '../../src/components/ApolloClient';
import ParentCategoriesBlock from "../../src/components/category/category-block/ParentCategoriesBlock";
import PRODUCTS_AND_CATEGORIES_QUERY from "../../src/queries/product-and-categories";
import React, { useState } from 'react';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function CategoryList(props) {
    const { productCategories } = props || {};

    const { t } = useTranslation("");

    return (
        <Layout title="Semua Kategori" menuTitle="Kategori" t={t}>
            <ParentCategoriesBlock productCategories={productCategories} t={t} />
        </Layout>
    )
};

export async function getStaticProps({ locale }) {

    const { data } = await client.query({
        query: PRODUCTS_AND_CATEGORIES_QUERY,
    });

    return {
        props: {
            ...(await serverSideTranslations(locale, [
				'common',
				'footer',
			])),
            productCategories: data?.productCategories?.nodes ? data.productCategories.nodes : []
        },
        revalidate: 1
    }

};
