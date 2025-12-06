import HeroComponent from "@/components/HeroComponent";
import MainArticles from "@/components/MainArticles";
import Navbar from "@/components/Navbar";
import { PopularProducts } from "@/components/PopularProducts";
import TrendingCterogies from "@/components/TrendingCaterogies";

const Page = () => {
  return (
    <div>
      <Navbar />
      <div className="px-10">
        <HeroComponent />
        <TrendingCterogies />
        <MainArticles />
        <PopularProducts />
      </div>
    </div>
  );
};

export default Page;
