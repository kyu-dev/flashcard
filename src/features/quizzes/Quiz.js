import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, Navigate } from 'react-router-dom';
import Card from '../cards/Card';
import ROUTES from '../../app/routes';
import { selectQuizzes } from './QuizzesSlice';

export default function Quiz() {
  const quizzes = useSelector(selectQuizzes);
  const { quizId } = useParams();
  const quiz = quizzes[quizId];

  if (!quiz) {
    return <Navigate to={ROUTES.quizzesRoute()} replace />;
  }

  return (
    <section className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>{quiz.name}</h1>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <div className='mt-6 text-center'>
        <Link
          to={ROUTES.newQuizRoute()}
          className='inline-block bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600'
        >
          Create a New Quiz
        </Link>
      </div>
    </section>
  );
}
