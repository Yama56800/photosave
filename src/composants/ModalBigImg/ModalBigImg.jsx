export default function ImageModal({ imageUrl, onClose }) {
  // Ce composant retournera null et ne s'affichera pas si imageUrl n'est pas défini.
  if (!imageUrl) return null;

  return (
    <div className="modal-big-img" onClick={onClose}>
      <div
        className="modal-big-img-content"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="Agrandissement" style={{ maxWidth: "100%" }} />
      </div>
    </div>
  );
}
