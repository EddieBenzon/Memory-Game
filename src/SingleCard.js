import React from "react";

const SingleCard = ({ card, handleChoice, flipped, muted }) => {
  const handleClick = () => {
    if (!muted) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/Images/CardBG.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
