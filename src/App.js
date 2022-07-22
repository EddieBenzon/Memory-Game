import { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import VictoryScreen from "./VictoryScreen";
import { useCallback } from "react";
import { cardCollection } from "./CardCollection";

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [muted, setMuted] = useState(false);
  const [victory, setVictory] = useState(false);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetChoice = useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setMuted(false);
  }, [turns]);

  const shuffleDeck = () => {
    const shuffledCards = [...cardCollection, ...cardCollection]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setVictory(false);
  };

  useEffect(() => {
    shuffleDeck();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setMuted(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((items) => {
          return items.map((card) => {
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
    } else return;
  }, [choiceOne, choiceTwo, resetChoice]);

  useEffect(() => {
    const allMatched = cards.filter((item) => {
      return item.matched === true;
    });
    if (allMatched.length === 18) {
      setVictory(true);
    } else return;
  }, [cards]);

  return (
    <>
      <VictoryScreen victory={victory} shuffleDeck={shuffleDeck} />
      <div className="main-page">
        <h1>Welcome to the Pokemon Memory Game</h1>
        <p>
          Simply click on cards to flip them over and try to match all pairs!
        </p>
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
    </>
  );
}

export default App;
