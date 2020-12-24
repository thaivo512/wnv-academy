import './App.scss';

import Login from './authenicate/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './authenicate/register';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Route path='/login' exact={true} component={Login} />
        <Route path='/' exact={true} component={Login} />
        <Route path='/register' exact={true} component={Register} />
      </Router>
    </div >
  );
}

export default App;
