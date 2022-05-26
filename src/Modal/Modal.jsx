import './modal.css';

export default function Modal({ visible, close, title, text }) {
  return (
    <>
      {visible && (
        <div className="overlay">
          <div className="modal" id="modal">
            <span className="close" onClick={close}>
              x
            </span>
            <h2>{title}</h2>
            <div className="content">
              {text}
            </div>
            <div className="actions">
              <button className="toggle-button" onClick={close}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
