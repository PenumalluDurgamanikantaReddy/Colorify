
import './App.css';
import Authentication from './components/Auth';
import Colorify from './components/colorifypage';
import { BrowserRouter,Route,Redirect } from 'react-router-dom';
import Palattes from './components/Palattes';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route path="/">
        <Redirect to="/Auth"></Redirect>
      </Route>
      <Route path="/Auth">
      <Authentication/>
      </Route>
      <Route path="/colorify">
    <Palattes/>
    </Route>
    </BrowserRouter>
   
    </div>
  );
}

export default App;
