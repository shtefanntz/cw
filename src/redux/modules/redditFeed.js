import { createAction, handleActions, handleAction } from 'redux-actions'
import { combineReducers } from 'redux'
import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'

export const requestRedditPosts = createAction(REQUEST_POSTS)
export const selectReddit = createAction(SELECT_REDDIT)
export const invalidateReddit = createAction(INVALIDATE_REDDIT)
export const receiveRedditPosts = createAction(RECEIVE_POSTS,
  (reddit, json) => ({
    reddit: reddit,
    posts: (json.data.children || []).map(child => child.data),
    receivedAt: Date.now()
  }))

function fetchPosts (reddit) {
  return (dispatch, getState) => {
    console.log('fetching posts: ', reddit)
    dispatch(requestRedditPosts(reddit))
    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveRedditPosts(reddit, json)))
  }
}

function shouldFetchPosts (state, reddit) {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded (reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState().redditFeed, reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}
export const actions = {
  fetchPostsIfNeeded,
  selectReddit,
  invalidateReddit
}
export const defaultReddits = ['reactjs', 'batman']

export default combineReducers(
  {
    selectedReddit: handleAction(SELECT_REDDIT, (state = '', {payload}) => {
      return payload
    }, defaultReddits[0]),
    postsByReddit: handleActions({
      [REQUEST_POSTS]: (state = {}, {payload}) => {
        console.log(REQUEST_POSTS, payload)
        return Object.assign({}, state, {
          [payload]: Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false,
            items: []
          })
        })
      },
      [RECEIVE_POSTS]: (state = {}, {payload}) => {
        console.log(RECEIVE_POSTS, payload)
        return Object.assign({}, state, {
          [payload.reddit]: Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            items: payload.posts.map(({title, url}) => ({title, url})),
            lastUpdated: payload.receivedAt
          })
        })
      },
      [INVALIDATE_REDDIT]: (state = {}, {payload}) => {
        console.log(INVALIDATE_REDDIT, payload)
        return Object.assign({}, state, {
          [payload]: Object.assign({}, state, {
            didInvalidate: true
          })
        })
      }
    }, {})
  }
)
