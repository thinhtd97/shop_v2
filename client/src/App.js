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
import { current_user } from './function/auth';
import UserRoute from './components/routes/UserRoute';
import HistoryUser from './pages/user/HistoryUser';
import UserNav from './components/nav/UserNav';
import { Row } from 'antd';
import Password from './pages/user/Password';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult();
        current_user(idTokenResult.token).then((res) => {
          dispatch({
              type: userContants.USER_LOGGED_IN,
              payload: {
                  _id: res.data._id,
                  name: res.data.name,
                  email: res.data.email,
                  role: res.data.role,
                  token: idTokenResult.token,
              }
          })
        }).catch((error) => {
          console.log(error);
        })
      }
    })
    return () => unsubscribe();
  }, [dispatch])
  return (
    <Router>
      <Header />
      <Row>
        <UserNav />
        <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/signin" component={Login} />
              <Route path="/signup" component={Register} exact />
              <Route path="/signup/complete" component={RegisterComplete} />
              <Route path="/forgot/password" component={ForgotPassword} />
              <Route path="/password" component={Password} />
              <AdminRoute path="/admin/dashboard" component={AdminDashboard} exact />
              <UserRoute path="/history" component={HistoryUser} exact />
        </Switch>
      </Row>
    </Router>
  );
}

export default App;
