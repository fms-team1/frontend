import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import JournalScreen from './screens/JournalScreen';
import Sidebar from './components/Sidebar';
import UsersScreen, { NoMatch } from './screens/UsersScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      {userInfo && (
        // <header className="App-header">
        //   <Link className="signout" to="#" onClick={signoutHandler}>
        //     Sign Out
        //   </Link>
        // </header>
        <Sidebar />
      )
      }
      <main className={userInfo && 'main'}>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>

        <Route path={["/journal", "/journal/neobis", "/journal/neolabs"]} component={JournalScreen}></Route>
        <Route path="/analytics" component={AnalyticsScreen}></Route>
        <Route path="/users" component={UsersScreen}></Route>

        <Route path="/" component={HomeScreen} exact></Route>
      </main>
    </BrowserRouter>
  );
}

export default App;
