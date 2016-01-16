import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { actions as counterActions } from '../redux/modules/counter'
import { actions as redditActions } from '../redux/modules/redditFeed'
import styles from './HomeView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter,
  doubleAsync: counterActions.doubleAsync,
  increment: counterActions.increment
})
export class HomeView extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.selectReddit = this.selectReddit.bind(this)
    this.doubleAsync = this.doubleAsync.bind(this)
  }

  selectReddit() {
    this.props.dispatch(redditActions.selectReddit)
  }

  doubleAsync() {
    this.props.dispatch(this.props.doubleAsync())
  }
  increment(number) {
    this.props.dispatch(this.props.increment(number))
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to the React Redux Starter Kit</h1>
        <h2>
          Sample Counter:&nbsp;
          <span className={styles['counter--green']}>{this.props.counter}</span>
        </h2>
        <button className='btn btn-default'
                onClick={() => this.increment(1)}>
          Increment
        </button>
        <button className='btn btn-default'
                onClick={this.doubleAsync}>
          Double (Async)
        </button>
        <Link className='btn btn-default'
              onClick={this.selectReddit}
                to='/reddit'>
          View reddit feed
        </Link>
        <hr />
        <Link to='/about'>Go To About View</Link>
      </div>
    )
  }
}
export default connect(mapStateToProps)(HomeView)
