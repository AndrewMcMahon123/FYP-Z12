import React, { useState } from "react";

function ImageModal({ imageSrc }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <img
        src={imageSrc}
        className="img-thumbnail"
        width="45%"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <div className="modal">
          <img src={imageSrc} />
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </>
  );
}

export default ImageModal;