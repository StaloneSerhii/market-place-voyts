import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Modal from 'react-modal';
import yt from '../../image/youtube.webp';
function VideoModal({ props }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const videoId = props;

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };
  // Створюємо об'єкт стилів для модального вікна
  const customStyles = {
    content: {
      width: '640px',
      height: '420px',
      margin: 'auto',
    },
  };

  return (
    <>
      <img
        onClick={openModal}
        src={yt}
        alt="відкрити відео"
        width="100"
        height="58"
        style={{ border: '1px solid red' }}
      />
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="YouTube Video Modal"
        style={customStyles}
      >
        <button
          onClick={closeModal}
          style={{ marginLeft: '630px', color: 'red', marginBottom: '10px' }}
        >
          X
        </button>
        <YouTube videoId={videoId} opts={opts} />
      </Modal>
    </>
  );
}

export default VideoModal;
