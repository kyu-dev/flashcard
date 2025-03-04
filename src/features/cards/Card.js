import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCardById } from './CardsSlice';

export default function Card({ id }) {
  const card = useSelector((state) => selectCardById(state, id));
  const [flipped, setFlipped] = useState(false);

  return (
    <li className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'>
      <button
        className='w-full h-32 p-4 text-left'
        onClick={(e) => setFlipped(!flipped)}
      >
        <div
          className={`transition-transform duration-300 ${
            flipped ? 'rotate-y-180' : ''
          }`}
        >
          {flipped ? (
            <p className='text-gray-700'>{card.back}</p>
          ) : (
            <p className='text-gray-700'>{card.front}</p>
          )}
        </div>
      </button>
    </li>
  );
}
