import Layout from "../src/components/Layout";
import RegisterForm from "../src/components/register/RegisterForm";

const Register = () => (
    <Layout title="Register" menuTitle="Register">
        <div className="container mx-auto my-32 px-4 xl:px-0">
            <RegisterForm />
        </div>
    </Layout>
);

export default Register;