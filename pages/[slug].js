import Layout from "../src/components/Layout";
import client from "../src/components/ApolloClient";
import Product from "../src/components/Product";
import { PRODUCT_BY_CATEGORY_SLUG, PRODUCT_CATEGORIES_SLUGS } from "../src/queries/product-by-category";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

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

    const { categoryName, products } = props;

    return (
        <Layout title={categoryTitle(categoryName)} menuTitle={categoryName}>
            {undefined !== products && products?.length ? (
                        <div className="products container mx-auto xl:px-0">
                        <div className="product-grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                        {products.map(product => <Product key={product?.id} product={product} />)}
                        </div>
            </div>
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

export async function getStaticProps(context) {

    const { params: { slug } } = context

    const { data } = await client.query(({
        query: PRODUCT_BY_CATEGORY_SLUG,
        variables: { slug }
    }));

    return {
        props: {
            categoryName: data?.productCategory?.name ?? '',
            products: data?.productCategory?.products?.nodes ?? []
        },
        revalidate: 1
    }

}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: PRODUCT_CATEGORIES_SLUGS
    })

    const pathsData = []

    console.log(data?.nodes)

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
