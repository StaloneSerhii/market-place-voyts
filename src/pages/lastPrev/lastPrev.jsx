const {
  default: CatalogeCard,
} = require('components/catalogeCard/CatalogeCard');

const LastPrev = () => {
  return (
    <div className="lastPrev">
      <h3 className="lastPrev__title">Остані переглянуті</h3>
      <div className="lastPrev__gap">
        <CatalogeCard />
      </div>
    </div>
  );
};

export default LastPrev;
