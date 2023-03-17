import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/logInForm/index'
import Home from './components/home/index'
import Jobs from './components/jobs/index'
import NotFound from './components/NotFound/index'
import JobItemDetailsRoute from './components/jobDetails/index'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/jobs" component={Jobs} />
    <Route exact path="/jobDetails/:id" component={JobItemDetailsRoute} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
