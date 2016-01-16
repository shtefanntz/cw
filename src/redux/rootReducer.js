import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import redditFeed from './modules/redditFeed'
export default combineReducers({
  counter,
  router,
  redditFeed
})
