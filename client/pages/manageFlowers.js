import Navbar from "../components/Navbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Body from "../components/Body";
import Footer from "../components/Footer";

const ManageFlowers = () => {
  return (
    <div className="bg-indigo-50		">
      <div className="bg-indigo-900">
        <Navbar />
      </div>
      <Body />
      <Footer />
    </div>
  );
};

export default ManageFlowers;

export const getServerSideProps = withPageAuthRequired();
