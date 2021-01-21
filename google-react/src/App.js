import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import Login from './component/login'
import PeopleList from './component/peopleList'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/PeoplesList" component={PeopleList} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
