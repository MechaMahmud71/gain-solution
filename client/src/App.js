import './App.css';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import AddSubject from "./components/AddSubject";
import AddStudent from "./components/AddStudent";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard/>
          </Route>
          <Route exact path="/add-subject">
            <AddSubject/>
          </Route>
          <Route exact path="/edit-subject/:id">
            <AddSubject/>
          </Route>
          <Route exact path="/add-student">
            <AddStudent/>
          </Route>
          <Route exact path="/edit-student/:id">
            <AddStudent/>
          </Route>
        </Switch>
            
      </Router>
        
    </div>
  );
}

export default App;
