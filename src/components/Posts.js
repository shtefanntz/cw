import {PropTypes, Component} from 'react'

class Posts extends Component {
  render () {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <li key={i}>
            <a target='_blank' href={post.url}>
              <h4>{post.title}</h4>
            </a>
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
