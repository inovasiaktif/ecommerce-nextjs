import Layout from "../src/components/Layout";
import SearchForm from "../src/components/SearchForm";

const Search = () => (
    <Layout title="Cari Produk atau Jasa" menuTitle="Pencarian">
        <div className="container mx-auto-32 px-4 xl:px-0">
            <SearchForm />
        </div>
    </Layout>
);

export default Search;