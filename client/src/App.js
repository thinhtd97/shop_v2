import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css'; 
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterComplete from './pages/auth/RegisterComplete';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as userContants from './redux/constant/userContants';
import ForgotPassword from './pages/auth/ForgotPassword';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: userContants.USER_LOGGED_IN,
          payload: {
            name: user.email,
            token: idTokenResult.token
          }
        })
      }
    })
    unsubscribe();
  }, [])
  return (
    <Router>
      <Header />
       <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={Register} exact />
          <Route path="/signup/complete" component={RegisterComplete} />
          <Route path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </Router>
  );
}

export default App;
