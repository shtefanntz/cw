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
    reddit,
    posts: json.data.children.map(child => child.data),
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
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit))
    }
  }
}
export const actions = {
  fetchPostsIfNeeded,
  selectReddit,
  invalidateReddit
}

function posts (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_REDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.payload.posts,
        lastUpdated: action.payload.receivedAt
      })
    default:
      return state
  }
}

//export default combineReducers(
//  handleAction(SELECT_REDDIT, (state = 'handleActionSelectReddit', {payload}) => {
//    debugger
//    return payload.reddit
//  }),
//  handleActions({
//    [REQUEST_POSTS]: (state = {}, action) => {
//      debugger
//      return Object.assign({}, state, {
//        [action.payload.reddit]: posts(state[action.payload.reddit], action)
//      })
//    },
//    [RECEIVE_POSTS]: (state = {}, action) => {
//      debugger
//      return Object.assign({}, state, {
//        [action.payload.reddit]: posts(state[action.payload.reddit], action)
//      })
//    },
//    [INVALIDATE_REDDIT]: (state = {}, action) => {
//      debugger
//      return Object.assign({}, state, {
//        [action.payload.reddit]: posts(state[action.payload.reddit], action)
//      })
//    }
//  }, {
//    isFetching: false,
//    didInvalidate: false,
//    items: []
//  })
//)

export default handleActions({
  [SELECT_REDDIT]: (state = 'handleActionSelectReddit', {payload}) => {
    debugger
    return payload.reddit
  },
  [REQUEST_POSTS]: (state = {}, action) => {
    debugger
    return Object.assign({}, state, {
      [action.payload.reddit]: posts(state[action.payload.reddit], action)
    })
  },
  [RECEIVE_POSTS]: (state = {}, action) => {
    debugger
    return Object.assign({}, state, {
      [action.payload.reddit]: posts(state[action.payload.reddit], action)
    })
  },
  [INVALIDATE_REDDIT]: (state = {}, action) => {
    debugger
    return Object.assign({}, state, {
      [action.payload.reddit]: posts(state[action.payload.reddit], action)
    })
  }
}, {
  isFetching: false,
  didInvalidate: false,
  items: [12],
  postsByReddit: {},
  selectedReddit: ''
})

