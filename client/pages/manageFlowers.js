import Navbar from "../components/Navbar";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Body from "../components/Body";
import Footer from "../components/Footer";

const xoni = () => {
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

export default xoni;

export const getServerSideProps = withPageAuthRequired();
