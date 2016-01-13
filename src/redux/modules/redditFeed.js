import { createAction, handleActions } from 'redux-actions'
import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const requestRedditPosts = createAction(REQUEST_POSTS)
export const receiveRedditPosts = createAction(RECEIVE_POSTS,
  (reddit, json) => ({
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }))

export function fetchPosts (mouseEv, reddit) {
  debugger
  return (dispatch, getState) => {
    debugger
    console.log(getState())
    dispatch(requestRedditPosts('batman'))
    return fetch(`http://www.reddit.com/r/batman.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveRedditPosts(reddit, json)))
  }
}

export const actions = {
  showRedditFeed: fetchPosts
}

export default handleActions({
  [REQUEST_POSTS]: (state = {isFetching: false, items: []}) => {
    debugger
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  [RECEIVE_POSTS]: (state = {isFetching: false, items: []}, {payload}) => {
    debugger
    return Object.assign({}, state, {
      isFetching: false,
      items: payload.posts,
      lastUpdated: payload.receivedAt
    })
  }
}, {})
