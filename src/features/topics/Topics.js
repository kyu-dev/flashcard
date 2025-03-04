import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ROUTES from '../../app/routes';
import { selectTopics } from './topicsSlice';

export default function Topics() {
  const topics = useSelector(selectTopics);

  return (
    <section className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Topics</h1>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Object.values(topics).map((topic) => (
          <li
            key={topic.id}
            className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow'
          >
            <Link to={ROUTES.topicRoute(topic.id)} className='block p-6'>
              <div className='flex items-center space-x-4'>
                <img src={topic.icon} alt={topic.name} className='w-12 h-12' />
                <div>
                  <h2 className='text-xl font-semibold'>{topic.name}</h2>
                  <p className='text-gray-500'>
                    {topic.quizIds.length} Quizzes
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className='mt-6 text-center'>
        <Link
          to={ROUTES.newTopicRoute()}
          className='inline-block bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600'
        >
          Create New Topic
        </Link>
      </div>
    </section>
  );
}
