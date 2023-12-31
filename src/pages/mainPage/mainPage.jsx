import Advertisement from 'components/advertisement/advertisement';
// import Cards from 'components/cards/cards';
import Hero from 'components/hero/hero';
import LastPrev from 'pages/lastPrev/lastPrev';
import CatalogePage from 'pages/mainCataloge/catalogPage';
import TopSellPages from 'pages/topSellPages/topSellPages';
import VideoContent from 'pages/videoContent/videoContent';

const MainPages = () => {
  return (
    <>
      <Hero />
      {/* <Cards /> */}
      <CatalogePage />
      <Advertisement />
      <TopSellPages />
      <Advertisement />
      <LastPrev />
      <VideoContent />
    </>
  );
};

export default MainPages;
