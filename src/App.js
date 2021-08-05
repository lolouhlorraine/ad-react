import './App.css';
import Offer from './components/Offer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 

function App() {
  return (
    <>
      <Router>
        <Offer />
        <Switch>
          <Route path='/www.jackpotjoy.com' exact component={() => {
            window.location.href = 'https://www.jackpotjoy.com';
            return null;
          } } />
        </Switch>
      </Router>
    </>
  );
}

export default App;
