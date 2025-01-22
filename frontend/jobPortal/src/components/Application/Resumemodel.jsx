import React from 'react'

function Resumemodel({imageUrl,onClose}) {
  return (
    <>
      <div className="resume-modal mt-4 ">
        <div className="modal-content bg-transparent">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <img src={imageUrl} alt="resume" />
        </div>
      </div>
    </>
  );
}

export default Resumemodel