import React from "react";

const VictoryScreen = ({ victory, shuffleDeck }) => {
  return (
    <div className={victory ? "victory-main" : "victory-hidden"}>
      <div className="black-screen"></div>
      <section className="victory-modal">
        <h1>You win! Congrats!</h1>
        <p>Here's a picture of a mighty water dragon Pokemon, Gyarados.*</p>
        <img src="/Images/karp.jpg" alt="karp." />
        <p>*..in its junior form.</p>
        <button onClick={shuffleDeck}>New Game</button>
      </section>
    </div>
  );
};

export default VictoryScreen;
