import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import redditDisplay from './modules/redditFeed'

export default combineReducers({
  counter,
  redditDisplay,
  router
})
