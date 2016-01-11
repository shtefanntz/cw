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

export function fetchPosts (reddit) {
  return (dispatch, getState) => {
    console.log(getState())
    dispatch(requestRedditPosts(reddit))
    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveRedditPosts(reddit, json)))
  }
}

export const actions = {
  viewForeignCurrency: fetchPosts
}

export default handleActions({
  [REQUEST_POSTS]: (state = {isFetching: false, items: []}) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },
  [RECEIVE_POSTS]: (state = {isFetching: false, items: []}, {payload}) => {
    return Object.assign({}, state, {
      isFetching: false,
      items: payload.items.posts,
      lastUpdated: payload.receivedAt
    })
  }
})
