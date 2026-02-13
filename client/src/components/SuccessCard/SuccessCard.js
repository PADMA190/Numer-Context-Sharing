import "./SuccessCard.scss";

const SuccessCard = ({ data, onReset }) => {
  return (
    <div className="success-card">
      <div className="success-icon">✓</div>

      <h2>Numer Sent Successfully</h2>

      <div className="success-details">
        <p>
          <span>Delivered To:</span>
          {data.deliveredTo.join(", ")}
        </p>

        {/* <p>
          <span>Mode:</span>
          {data.mode}
        </p> */}
      </div>

      <button onClick={onReset}>Send Another Numer</button>
    </div>
  );
};

export default SuccessCard;
