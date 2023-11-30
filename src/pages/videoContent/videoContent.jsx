import { Link } from 'react-router-dom';

const VideoContent = () => {
  return (
    <div className="video_container">
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <p className="cataloge__title" style={{ color: '#fff' }}>
          Відео
        </p>
        <div className="video_container--block">
          <div className="video">
            {/* <h4>asd</h4>
            <Link
              to={`/product/`}
              style={{ fontSize: '12px', marginBottom: '8px' }}
            >
              До продукту...
            </Link> */}
            <div
              style={{
                background: '#22ff43442244',
                width: '100%',
                height: '240px',
              }}
            >
              <iframe
                className="youtube"
                src={'https://www.youtube.com/embed/VONyCLrp0eg'}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="video">
            <div
              style={{
                background: '#22ff43442244',
                width: '100%',
                height: '240px',
              }}
            >
              <iframe
                className="youtube"
                src={
                  'https://www.youtube.com/embed/b44Jmfd5MSw?si=xqx65mJWWdsZlJSc'
                }
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <Link
          to="/video"
          className="formLogin__btn--pr btnHoverReverse"
          style={{
            width: '220px',
            border: '1px solid #fff',
            margin: '0 auto',
            color: '#fff',
          }}
        >
          Більше відео
        </Link>
      </div>
    </div>
  );
};
export default VideoContent;
