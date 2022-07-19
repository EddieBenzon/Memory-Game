import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";

const cardCollection = [
  { src: "/Images/bulba1.png", matched: false, muted: false },
  { src: "/Images/char1.png", matched: false, muted: false },
  { src: "/Images/koff1.png", matched: false, muted: false },
  { src: "/Images/omanyte1.png", matched: false, muted: false },
  { src: "/Images/pika1.png", matched: false, muted: false },
  // { src: "/Images/pidgey1.png", matched: false, muted: false },
  // { src: "/Images/ratt1.png", matched: false, muted: false },
  // { src: "/Images/sand1.png", matched: false, muted: false },
  { src: "/Images/squ1.png", matched: false, muted: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [muted, setMuted] = useState(false);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const shuffleDeck = () => {
    const shuffledCards = [...cardCollection, ...cardCollection]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    shuffleDeck();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setMuted(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((x) => {
          return x.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetChoice();
      } else {
        setTimeout(() => {
          resetChoice();
        }, 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetChoice = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setMuted(false);
  };
  return (
    <div className="main-page">
      <h1>Welcome to the Pokemon Memory Game</h1>
      <p>Simply click on cards to flip them over and try to match all pairs!</p>
      <button onClick={shuffleDeck}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={
                card === choiceOne ||
                card === choiceTwo ||
                card.matched === true
              }
              muted={muted}
            />
          );
        })}
      </div>
      <p>{`Turns: ${turns}`}</p>
    </div>
  );
}

export default App;
