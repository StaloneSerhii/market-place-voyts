import Advertisement from 'components/advertisement/advertisement';
import Cards from 'components/cards/cards';
import Hero from 'components/hero/hero';
import HeroCategory from 'components/heroCategory/heroCategory';
import LastPrev from 'pages/lastPrev/lastPrev';
import CatalogePage from 'pages/mainCataloge/catalogPage';
import TopSellPages from 'pages/topSellPages/topSellPages';
import VideoContent from 'pages/videoContent/videoContent';

const MainPages = () => {
  return (
    <>
      <Hero />
      <HeroCategory />
      <Cards />
      <CatalogePage />
      <Advertisement />
      <TopSellPages />
      <LastPrev />
      <VideoContent />
    </>
  );
};

export default MainPages;
