import Layout from '../../src/components/Layout';
import { useRouter } from 'next/router';
import client from '../../src/components/ApolloClient';
import AddToCartButton from '../../src/components/cart/AddToCartButton';
import { PRODUCT_BY_SLUG_QUERY, PRODUCT_SLUGS } from '../../src/queries/product-by-slug';
import { isEmpty } from 'lodash';
import GalleryCarousel from "../../src/components/single-product/gallery-carousel";
import Price from "../../src/components/single-product/price";
import Link from 'next/link';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import { useEffect, useRef, useState } from 'react';
//
// import "./styles.css";

export default function Product(props) {
    const { product } = props;

    // console.log(product)

    const router = useRouter()

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <Layout title={"Jual " + product && product.name + " | IA Digital Printing"} pageType="product" product={product}>
            {product ? (
                <div className="content single-product container mb-6 xl:px-0 pb-3">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="product-images">
                            {/* {!isEmpty(product?.galleryImages?.nodes) ? (
                                <GalleryCarousel gallery={product?.galleryImages?.nodes} />
                            ) : !isEmpty(product.image) ? (
                                <img
                                    src={product?.image?.sourceUrl}
                                    alt="Product Image"
                                    width="100%"
                                    height="auto"
                                    srcSet={product?.image?.srcSet}
                                />
                            ) : null} */}
                            <ProductGalleryPopup product={product} />
                        </div>
                        <div className="product-info px-4">
                            {product?.allPaSeller?.nodes && product?.allPaSeller?.nodes.map((seller, index) => (
                                <Link key={index} href={"/seller/"+seller.slug} className="brand-name color-primary">{seller.name}</Link>
                            ))}
                            <h4 className="product-view-title">{product.name}</h4>
                            {/* <div

                                dangerouslySetInnerHTML={{
                                    __html: product.description,
                                }}
                                className="product-description mb-5"
                            /> */}
                            <Price salesPrice={product?.price} regularPrice={product?.regularPrice} />
                        </div>
                    </div>

                </div>
            ) : (
                ''
            )}
        </Layout>
    );
};

function ProductGalleryPopup({ product }) 
{
    const rawImages = [{mediaItemUrl: product?.image?.sourceUrl}].concat(product?.galleryImages?.nodes)
    const images = rawImages.map((image) => ({
        src: image.mediaItemUrl
    }));

    const router = useRouter();
    const modalRef = useRef(null);
    const [isMax, setIsMax] = useState(false);

    // useEffect(() => {
    //     router.beforePopState(({ as }) => {
    //         if (as !== router.asPath) {
    //             modalRef.current.minimize();

    //             console.log('OK')
                
    //             return false;
    //         }

    //         return true;
    //     });
    
    //     return () => {
    //         router.beforePopState(() => true);
    //     };
    // }, [router]);

    // console.log(isMax)

    // if (isMax) {
    // useEffect(() => {
        
    //         // history.pushState(null, '', router.asPath);
    //         window.addEventListener('popstate', function (event) {
    //             if (!isMax) {
    //             // console.log('ini'+isMax)
    //             modalRef.current.minimize();

    //             history.pushState(null, '', router.asPath);
    //         } else {
    //             router.back();
    //         }
    //         });
       
    // }, []);
// }

    return (
        <Carousel 
        shouldMaximizeOnClick={true} 
        shouldMinimizeOnClick={true} 
        shouldMinimizeOnSwipeDown={false} 
        playIcon=""
        hasIndexBoard={false}
        maxIcon={false}
        minIcon={false}
        thumbnailWidth="50"
        thumbnailHeight="50"
        hasThumbnailsAtMax={false}
        ref={modalRef}
        onTap={() => {
            if (isMax) {
                setIsMax(false);
            } else {
                setIsMax(true);
            }
        }}
        // hasThumbnails={product?.galleryImages?.nodes.length ? true : false}
        images={images} />
    );
}

export async function getStaticProps(context) {
    const { params: { slug } } = context

    const { data } = await client.query({
        query: PRODUCT_BY_SLUG_QUERY,
        variables: { slug }
    })

    return {
        props: {
            product: data?.product || {},
        },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: PRODUCT_SLUGS
    })

    const pathsData = []

    data?.products?.nodes && data?.products?.nodes.map((product) => {
        if (!isEmpty(product?.slug)) {
            pathsData.push({ params: { slug: product?.slug } })
        }
    })

    return {
        paths: pathsData,
        fallback: true
    }
}
