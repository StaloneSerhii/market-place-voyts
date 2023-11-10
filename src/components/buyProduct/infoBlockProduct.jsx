export const InfoBlockProduct = ({ product }) => {
  return (
    <div className="detailsStyle">
      <div
        id="details"
        style={{
          maxWidth: '628px',
        }}
      >
        <p
          style={{
            fontSize: '24px',
            fontWeight: '500',
            marginBottom: '24px',
          }}
        >
          Характеристика
        </p>
        <p>{product && product.info.use}</p>
      </div>
      <div
        id="dostavka"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '24px',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        <p
          style={{
            fontSize: '24px',
            fontWeight: '500',
          }}
        >
          Спосіб доставки
        </p>
        <div
          id="video"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
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
                  fill="#1F2A37"
                />
                <path
                  d="M6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16V14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H10.333L6.6 16.8C6.4269 16.9298 6.21637 17 6 17ZM4 5V12H6C6.26522 12 6.51957 12.1054 6.70711 12.2929C6.89464 12.4804 7 12.7348 7 13V14L9.4 12.2C9.5731 12.0702 9.78363 12 10 12H14V5H4Z"
                  fill="#1F2A37"
                />
              </svg>
            </span>
            Самовивіз Безкоштовно
          </p>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
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
                  fill="#1F2A37"
                />
                <path
                  d="M6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16V14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H10.333L6.6 16.8C6.4269 16.9298 6.21637 17 6 17ZM4 5V12H6C6.26522 12 6.51957 12.1054 6.70711 12.2929C6.89464 12.4804 7 12.7348 7 13V14L9.4 12.2C9.5731 12.0702 9.78363 12 10 12H14V5H4Z"
                  fill="#1F2A37"
                />
              </svg>
            </span>
            Доставка до поштоматів «Нової Пошти» від 89 ₴
          </p>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
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
                  fill="#1F2A37"
                />
                <path
                  d="M6 17C5.73478 17 5.48043 16.8946 5.29289 16.7071C5.10536 16.5196 5 16.2652 5 16V14H4C3.46957 14 2.96086 13.7893 2.58579 13.4142C2.21071 13.0391 2 12.5304 2 12V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H14C14.5304 3 15.0391 3.21071 15.4142 3.58579C15.7893 3.96086 16 4.46957 16 5V12C16 12.5304 15.7893 13.0391 15.4142 13.4142C15.0391 13.7893 14.5304 14 14 14H10.333L6.6 16.8C6.4269 16.9298 6.21637 17 6 17ZM4 5V12H6C6.26522 12 6.51957 12.1054 6.70711 12.2929C6.89464 12.4804 7 12.7348 7 13V14L9.4 12.2C9.5731 12.0702 9.78363 12 10 12H14V5H4Z"
                  fill="#1F2A37"
                />
              </svg>
            </span>
            Доставка у зручний вам пункт «Нової Пошти» від 99 ₴
          </p>
        </div>
        <p
          style={{
            fontSize: '24px',
            fontWeight: '500',
          }}
        >
          Оплата
        </p>
        <p>Готівкою, банківською карткою</p>
      </div>
    </div>
  );
};
