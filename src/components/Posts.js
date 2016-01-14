import React, {PropTypes, Component} from 'react'

class Posts extends Component {
  render () {
    debugger

    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>
            <h2>{post.title}</h2>
            <h5>{post.link}</h5>
          </li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default Posts
