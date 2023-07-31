import CatalogePage from 'pages/mainCataloge/catalogPage';
// import Cards from './cards/cards';
// import NavigateCategory from './categoryMainTop/navCategory';
import Header from './header/header';
// import Hero from './hero/hero';
// import HeroCategory from './heroCategory/heroCategory';
import Advertisement from './advertisement/advertisement';
import TopSellPages from 'pages/topSellPages/topSellPages';
import LastPrev from 'pages/lastPrev/lastPrev';
import VideoContent from 'pages/videoContent/videoContent';
import Footer from './footer/footer';

function App() {
  return (
    <div>
      <Header />
      {/* <NavigateCategory />
      <Hero />
      <HeroCategory />
      <Cards /> */}
      <CatalogePage />
      <Advertisement />
      <TopSellPages />
      <LastPrev />
      <VideoContent />
      <Footer />
    </div>
  );
}

export default App;
