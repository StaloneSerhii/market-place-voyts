const VideoContent = () => {
  return (
    <div className="video_container">
      <div className="con1">
        <iframe
          width="600"
          height="300"
          src="https://www.youtube.com/embed/VONyCLrp0eg"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className="con2">
        <iframe
          width="600"
          height="300"
          src="https://www.youtube.com/embed/pzKNPsmGbh8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
export default VideoContent;
