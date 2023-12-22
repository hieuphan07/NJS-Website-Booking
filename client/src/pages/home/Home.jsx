import NavBar from "../components/navbar/NavBar";
import Header from "../components/header/Header";
import Features from "../components/features/UI/Features";
import Register from "../components/features/register/Register";
import Footer from "../components/footer/Footer";

import city from "../../data/city.json";
import type from "../../data/type.json";
import hotel_list from "../../data/hotel_list.json";

const Home = () => {
  // Go to Home page Handler
  const homeHandler = () => window.location.replace("/");
  // Go to Search page Handler
  const searchHandler = () => window.location.replace("../search");

  return (
    <div>
      <NavBar onHome={homeHandler} />
      <Header onSearch={searchHandler} />
      <Features cities={city} types={type} hotelLists={hotel_list} />
      <Register />
      <Footer />
    </div>
  );
};

export default Home;
