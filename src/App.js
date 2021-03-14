import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      {userInfo ? (
        <header className="App-header">
          <Link className="signout" to="#" onClick={signoutHandler}>
            Sign Out
          </Link>
        </header>
      ) : ''
      }
      <main>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
}

export default App;
