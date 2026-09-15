import "./App.css";
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import CategoryStrip from "./components/CategoryStrip";
import HeroSection from "./components/HeroSection";
import ProductCarousel from "./components/ProductCarousel";
import LabTestedSection from "./components/LabTestedSection";
import CollectionCarousel from "./components/CollectionCarousel";
import LatestTrending from "./components/LatestTrending";
import PurposeSection from "./components/PurposeSection";
import ExploreEnergyStones from "./components/ExploreEnergyStones";
import LifestyleGallery from "./components/LifestyleGallery";
import SaveCombos from "./components/SaveCombos";
import SiddhDeliverySection from "./components/SiddhDeliverySection";
import RudrakshaBeads from "./components/RudrakshaBeads";

import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <AnnouncementBar />
      <Navbar />
      <CategoryStrip />
      <HeroSection />
      <ProductCarousel />
      <LabTestedSection />
      <CollectionCarousel />
      <LatestTrending />
      <PurposeSection />
     <ExploreEnergyStones />
     <LifestyleGallery />
     <SaveCombos />
      <SiddhDeliverySection />
      <RudrakshaBeads />

    </CartProvider>
  );
}

export default App;