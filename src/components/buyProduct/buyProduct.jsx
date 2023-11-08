import { useState, useEffect } from 'react';
import { TiMessages } from 'react-icons/ti';
import { Rating } from '@mui/material';
import { ModalComments } from 'components/modalBuy/ModalComent';
import { CommentAnswer } from 'components/modalBuy/modalAnswerComments';
import { ImgBlockProduct } from './buyProductImgBlock';
import { BiDownArrow } from 'react-icons/bi';
import { MainInfoProduct } from './mainInfoProduct';
import { getAuthStatus } from 'redux/authPer/auth-selector';
import { useSelector } from 'react-redux';
import { InfoBlockProduct } from './infoBlockProduct';
import { getIdProduct } from 'redux/service';
import { useParams } from 'react-router-dom';

const BuyProduct = () => {
  const { id } = useParams();
  const [openState, setOpen] = useState(false);
  const [commentsPage, setCommentsPage] = useState();
  const [product, setProduct] = useState();
  const selectAuth = useSelector(getAuthStatus);
  const [hiddenStates, setHiddenStates] = useState([]);
  // Запит по продукту на бд по ід і аналогів
  useEffect(() => {
    getIdProduct(id).then(pr => {
      setCommentsPage(pr.resultComments);
      setProduct(pr.result);
    });
  }, [id]);

  useEffect(() => {
    if (commentsPage && commentsPage.length > 0) {
      const initialHiddenStates = Array(commentsPage.length).fill(true);
      setHiddenStates(initialHiddenStates);
    }
  }, [commentsPage]);

  // Функція для зміни стану видимості CommentAnswer на основі індексу
  const toggleHidden = index => {
    const newHiddenStates = [...hiddenStates];
    newHiddenStates[index] = !newHiddenStates[index];
    setHiddenStates(newHiddenStates);
  };

  return (
    <div
      style={{
        maxWidth: '1280px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 15px',
        gap: '48px',
      }}
    >
      <ModalComments openState={openState} setOpen={setOpen} />
      <div>
        <h3 style={{ fontSize: '25px', fontWeight: '500', margin: '24px 0' }}>
          {product && product.name}
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul style={{ display: 'flex', gap: '40px' }}>
            <li>
              <a href="#all" style={{ fontSize: '16px' }}>
                Усе про товар
              </a>
            </li>
            <li>
              <a style={{ fontSize: '16px' }} href="#details">
                Характеристика
              </a>
            </li>
            <li>
              <a style={{ fontSize: '16px' }} href="#dostavka">
                Спосіб доставки
              </a>
            </li>
            <li>
              {product && product.video ? (
                <a style={{ fontSize: '16px' }} href="#video">
                  Відео
                </a>
              ) : (
                <p
                  style={{
                    fontSize: '16px',
                    color: 'gray',
                    cursor: 'default',
                  }}
                  href="#video"
                >
                  Відео
                </p>
              )}
            </li>
            <li>
              <a style={{ fontSize: '16px' }} href="#rev">
                Відгуки
              </a>
            </li>
          </ul>
          <button
            onClick={() => setOpen(true)}
            style={{
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
            className="btnComment"
            title="Залишати коментарі можуть тілкьи зареєстровані користувачі"
            disabled={!selectAuth && true}
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7H17V9H20V16H18C17.7348 16 17.4804 16.1054 17.2929 16.2929C17.1054 16.4804 17 16.7348 17 17V18L14.6 16.2C14.4269 16.0702 14.2164 16 14 16H10V15.5L8.2 16.852C8.36095 17.1938 8.61545 17.4831 8.93401 17.6863C9.25257 17.8894 9.62217 17.9982 10 18H13.667L17.4 20.8C17.5731 20.9298 17.7836 21 18 21C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20V18H20C20.5304 18 21.0391 17.7893 21.4142 17.4142C21.7893 17.0391 22 16.5304 22 16V9C22 8.46957 21.7893 7.96086 21.4142 7.58579C21.0391 7.21071 20.5304 7 20 7Z"
                  fill="#68798d"
                />
                <path
                  d="M6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16V14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H10.333L6.6 16.8C6.4269 16.9298 6.21637 17 6 17ZM4 5V12H6C6.26522 12 6.51957 12.1054 6.70711 12.2929C6.89464 12.4804 7 12.7348 7 13V14L9.4 12.2C9.5731 12.0702 9.78363 12 10 12H14V5H4Z"
                  fill="#596472"
                />
              </svg>
            </span>
            Залишити відгук
          </button>
        </div>
        <div className="content__productPage" id="all">
          <ImgBlockProduct product={product} />
          <MainInfoProduct
            product={product}
            setCommentsPage={setCommentsPage}
            comments={commentsPage}
          />
        </div>
      </div>
      <InfoBlockProduct product={product} />
      {product && product.video && (
        <div style={{ margin: '64px 0' }}>
          <p style={{ fontSize: '24px', fontWeight: '500' }}>Відео</p>
          <div
            className="video_container"
            style={{ marginTop: '40px', background: 'none' }}
          >
            <div className="con3">
              <iframe
                width="846"
                height="489"
                src={product.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      <div
        id="rev"
        style={{
          width: '100%',
          padding: '24px',
          borderRadius: '8px',
          margin: '48px 0',
        }}
      >
        <p style={{ fontSize: '24px', fontWeight: '500px' }}>
          Відгуки покупців
        </p>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            margin: '24px 0',
          }}
        >
          {commentsPage && commentsPage.length > 0 ? (
            commentsPage.map((comments, index) => (
              <li
                key={comments._id}
                name={`userIdCom${comments._id}`}
                style={{
                  background: '#fff',
                  padding: '16px',
                  borderRadius: '8px',
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '8px',
                    }}
                  >
                    <span>{comments.user.name}</span>
                    <span> {comments.user.fename}</span>
                  </p>
                  <span style={{ color: '#939292', fontSize: '12px' }}>
                    {comments.updatedAt.slice(0, 10)}
                  </span>
                </div>
                <Rating
                  precision={0.5}
                  name="simple-controlled"
                  value={comments.RatingValue}
                  readOnly
                />
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: '400px',
                    margin: '16px 0',
                  }}
                >
                  {comments.commentsUser[0]}
                </p>
                <div>
                  {comments.commentsUser.map(answer =>
                    answer.fename ? (
                      <div
                        style={{
                          padding: '15px',
                          margin: '15px',
                          background: '#e6e6e6',
                        }}
                      >
                        <p
                          style={{
                            fontWeight: '500',
                            marginBottom: '15px',
                            display: 'flex',
                          }}
                        >
                          <span style={{ marginRight: '5px' }}>
                            {answer.name}{' '}
                          </span>
                          <span> {answer.fename}</span>
                          <span
                            style={{ fontSize: '12px', marginLeft: 'auto' }}
                          >
                            {comments.updatedAt.slice(0, 10)}
                          </span>
                        </p>
                        <p>{answer.text}</p>
                      </div>
                    ) : (
                      ''
                    )
                  )}
                </div>
                <button
                  className="btnComment"
                  onClick={() => toggleHidden(index)}
                >
                  <TiMessages /> Відповісти <BiDownArrow />
                </button>
                <CommentAnswer
                  idComment={comments._id}
                  hidden={hiddenStates[index]}
                  setHidden={_ => {
                    toggleHidden(index);
                  }}
                />
              </li>
            ))
          ) : (
            <li>
              <p>Відгуків немає будь першим</p>
            </li>
          )}
        </ul>
        {commentsPage && commentsPage.length > 5 && (
          <button
            className="formLogin__btn--pr btnHoverReverse"
            style={{
              border: '1px solid #009C2C',
              marginRight: 'auto',
              marginLeft: 'auto',
            }}
          >
            <span style={{ color: '#000' }}></span>
            Більше
          </button>
        )}
      </div>
    </div>
  );
};

export default BuyProduct;
