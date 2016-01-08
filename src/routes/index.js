<<<<<<< HEAD
import { Route, IndexRoute } from 'react-router'
=======
import { Route, IndexRoute, Redirect } from 'react-router'
>>>>>>> 6104786a14f09fa62654cfb4ce15ff2b0d4a5ec2

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout'
import HomeView from 'views/HomeView'
import AboutView from 'views/AboutView'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
<<<<<<< HEAD
    <Route path='/about' component={AboutView} />
=======
    <Route path='/about' component={AboutView} >
      <Redirect from='/about/:_' to='/about' />
    </Route>
>>>>>>> 6104786a14f09fa62654cfb4ce15ff2b0d4a5ec2
  </Route>
)
