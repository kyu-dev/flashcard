import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import ROUTES from '../app/routes';
import { selectTopics } from '../features/topics/topicsSlice';
import { addQuiz } from '../features/quizzes/QuizzesSlice';
import { addCard } from '../features/cards/CardsSlice';
// import selectors

export default function NewQuizForm() {
  const [name, setName] = useState('');
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState('');
  const navigate = useNavigate();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const cardIds = [];
    const quizId = uuidv4();

    // Create cards and collect their IDs
    cards.forEach((card) => {
      const cardId = uuidv4();
      dispatch(
        addCard({
          id: cardId,
          front: card.front,
          back: card.back,
        })
      );
      cardIds.push(cardId);
    });

    dispatch(addQuiz({ id: quizId, name, topicId, cardIds }));
    navigate(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: '', back: '' }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section className='p-6 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6 text-center'>Create a new quiz</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          id='quiz-name'
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder='Quiz Title'
          className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
        />
        <select
          id='quiz-topic'
          onChange={(e) => setTopicId(e.currentTarget.value)}
          className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
        >
          <option value=''>Select a topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className='space-y-2'>
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, 'front', e.currentTarget.value)
              }
              placeholder='Front'
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, 'back', e.currentTarget.value)
              }
              placeholder='Back'
              className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500'
            />
            <button
              onClick={(e) => removeCard(e, index)}
              className='text-red-500 hover:text-red-700 text-sm'
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className='flex justify-between'>
          <button
            onClick={addCardInputs}
            className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600'
          >
            Add a Card
          </button>
          <button
            type='submit'
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
          >
            Create Quiz
          </button>
        </div>
      </form>
    </section>
  );
}
