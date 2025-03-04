import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from '../features/topics/TopicsSlice';
// import reducers

export default configureStore({
  reducer: {
    topics: topicsReducer,
  },
});
