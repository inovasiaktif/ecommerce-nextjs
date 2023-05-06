import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import Product from "../src/components/Product";
import { PRODUCT_BY_CATEGORY_SLUG, PRODUCT_CATEGORIES_SLUGS } from "../src/queries/product-by-category";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";

function categoryTitle(name) {
    return name + " | Inovasi Aktif";
}

export default function CategorySingle(props) {

    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const { categoryName, products, child_categories } = props;

    return (
        <Layout title={categoryTitle(categoryName)} menuTitle={categoryName}>
            <div className="content p-2 mb-1 grid grid-cols-2 gap-2">
            <div className="border border-color-grey p-2 text-center">
            <div style={
                    {
                        "marginRight": "7px",
                        "marginBottom": "5px"
                    }
                }>
                    <svg width="17px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"/></svg></div><span style={{"fontSize":"12px"}}>Gratis Ongkir</span></div>
            <div className="border border-color-grey p-2 text-center">
                <div style={
                    {
                        "marginRight": "7px",
                        "marginBottom": "5px"
                    }
                }><svg width="17px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg></div><span style={{"fontSize":"12px"}}>Min. Pembelian 100 pcs</span></div>
            </div>
            {undefined !== child_categories && child_categories?.length ? (
                <>
                    <div className="products container mx-auto xl:px-0 mb-1">
                        <div className="product-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                            {child_categories.map(childCategory => <ChildCategory key={childCategory?.id} childCategory={childCategory} />)}
                        </div>
                    </div>
                </>
            ) : ''}
            {undefined !== products && products?.length ? (
                <>
                        <div className="products container mx-auto xl:px-0">
                        <div className="product-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                        {products.map(product => <Product key={product?.id} product={product} />)}
                        </div>
            </div>
            </>
                    ) : <>
                        <div className="content p-6 text-center" style={
                            {
                                "color":"grey"
                            }
                        }>Belum ada produk atau jasa.</div>
                    </>}
        </Layout>
    )
};

const ChildCategory = ({childCategory}) => {
    return <>
        <Link href={"/"+childCategory.slug}>
        <div className="border border-color-grey p-2 text-center color-primary">{childCategory.name} <span style={{
                "color":"grey",
                "fontSize":"12px"
            }}>({childCategory.count+" produk"})</span></div>
        </Link>
    </>
}

export async function getStaticProps(context) {

    const { params: { slug } } = context

    const { data } = await client.query(({
        query: PRODUCT_BY_CATEGORY_SLUG,
        variables: { slug }
    }));

    return {
        props: {
            categoryName: data?.productCategory?.name ?? '',
            products: data?.productCategory?.products?.nodes ?? [],
            child_categories: data?.productCategory?.children?.nodes ?? []
        },
        revalidate: 1
    }

}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: PRODUCT_CATEGORIES_SLUGS
    })

    const pathsData = []

    data?.productCategories?.nodes && data?.productCategories?.nodes.map((productCategory) => {
        if (!isEmpty(productCategory?.slug)) {
            pathsData.push({ params: { slug: productCategory?.slug } })
        }
    })

    return {
        paths: pathsData,
        fallback: true
    }
}
