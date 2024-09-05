import supabase from "../config/SupabaseClient";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeaderDash from "../components/HeaderDash";
import Hero from "../components/Hero";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateLoginState = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // console.log(user);
        setIsLoggedIn(true);
      }
    };

    updateLoginState();
  }, []);

  return (
    <>
      {isLoggedIn ? <HeaderDash /> : <Header />}
      <Hero></Hero>
    </>
  );
};

export default Home;
