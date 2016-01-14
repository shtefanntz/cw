import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import {connect} from 'react-redux'
import { actions } from '../redux/modules/redditFeed'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

export class RedditView extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const {dispatch, selectedReddit} = this.props
    dispatch(actions.fetchPostsIfNeeded(selectedReddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const {dispatch, selectedReddit} = nextProps
      dispatch(actions.fetchPostsIfNeeded(selectedReddit))
    }
  }

  handleChange(nextReddit) {
    this.props.dispatch(actions.selectReddit(nextReddit))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const {dispatch, selectedReddit} = this.props
    dispatch(actions.invalidateReddit(selectedReddit))
    dispatch(actions.fetchPostsIfNeeded(selectedReddit))
  }

  render () {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props

    return (
      <div>
        <Link to='\'>Home</Link>
        <Picker value={selectedReddit}
                onChange={this.handleChange}
                options={['reactjs', 'batman']}/>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href='#' onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty !?!</h2>
        }
        {posts.length > 0 &&
          <div style={{opacity: isFetching ? 0.5 : 1}}>
            <Posts posts={posts} />
          </div>
        }
      </div>
    )
  }
}
RedditView.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  debugger
  const { selectedReddit, postsByReddit } = state.redditFeed
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(RedditView)
