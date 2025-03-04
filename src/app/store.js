import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from '../features/topics/topicsSlice';
import quizzesReducer from '../features/quizzes/QuizzesSlice';
import cardsReducer from '../features/cards/CardsSlice';
// import reducers

export default configureStore({
  reducer: {
    topics: topicsReducer,
    quizzes: quizzesReducer,
    cards: cardsReducer,
  },
});
