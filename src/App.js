import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen';
import { useSelector } from 'react-redux';
import JournalScreen from './screens/JournalScreen';
import Sidebar from './components/Sidebar';
import UsersScreen, { NoMatch } from './screens/UsersScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import AppBar from './components/AppBar';
import { useState } from 'react';
import AddAccountant from './components/AddAccountant';
import AddIncExpTransaction from './components/AddIncExpTransaction';
import AddTransTransaction from './components/AddTransTransaction';
import ChangePassword from './components/ChangePassword';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [logOutButton, setLogOutButton] = useState(false);

  return (
    <BrowserRouter>
      {userInfo && window.location.pathname !== '/register' && (
        <>
          <AppBar logOutButton={logOutButton} setLogOutButton={setLogOutButton} state={sidebarIsOpen} setState={setSidebarIsOpen} />
          <Sidebar setLogOutButton={setLogOutButton} state={sidebarIsOpen} setState={setSidebarIsOpen} />
        </>
      )
      }
      <main className={userInfo && window.location.pathname !== '/register' && 'main'}>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path={["/journal", "/journal/neobis", "/journal/neolabs"]} component={JournalScreen}></Route>
        <Route path="/analytics" component={AnalyticsScreen}></Route>
        <Route path="/users" component={UsersScreen}></Route>
        <Route path="/addAccountant" component={AddAccountant}></Route>
        <Route path="/addTransaction" component={AddIncExpTransaction}></Route>
        <Route path="/addTransferTransaction" component={AddTransTransaction}></Route>
        <Route path="/changePassword" component={ChangePassword}></Route>

        <Route path="/" component={HomeScreen} exact></Route>
      </main>
    </BrowserRouter>
  );
}

export default App;
