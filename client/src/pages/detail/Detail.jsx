import detail from "../../data/detail.json";

import NavBar from "../components/navbar/NavBar";
import Register from "../components/features/register/Register";
import Footer from "../components/footer/Footer";
import DetailPage from "../components/features/detailPage/DetailPage";

const Detail = () => {
  // Go to Home page Handler
  const homeHandler = () => window.location.replace("/");

  return (
    <div>
      <NavBar onHome={homeHandler} />
      <DetailPage detailResults={detail} />
      <Register />
      <Footer />
    </div>
  );
};

export default Detail;
