import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen';
import { useSelector } from 'react-redux';
import JournalScreen from './screens/JournalScreen';
import Sidebar from './components/Sidebar';
import UsersScreen from './screens/UsersScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import { useState } from 'react';
import AddAccountant from './components/AddAccountant';
import AddIncExpTransaction from './components/AddIncExpTransaction';
import AddTransTransaction from './components/AddTransTransaction';
import ChangePassword from './components/ChangePassword';
import BurgerMenu from './components/BurgerMenu';
import AddDebt from './components/AddDebt';
import DebtsScreen from './screens/DebtsScreen';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  return (
    <BrowserRouter>
      {userInfo && window.location.pathname !== '/register' && (
        <>
          <BurgerMenu state={sidebarIsOpen} setState={setSidebarIsOpen} />
          <Sidebar state={sidebarIsOpen} setState={setSidebarIsOpen} />
        </>
      )
      }
      <main className={userInfo && window.location.pathname !== '/register' && 'main'}>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path={["/journal", "/journal/neobis", "/journal/neolabs"]} component={JournalScreen}></Route>
        <Route path="/analytics" component={AnalyticsScreen}></Route>
        <Route path="/debts" component={DebtsScreen}></Route>
        <Route path="/users" component={UsersScreen}></Route>
        <Route path="/addAccountant" component={AddAccountant}></Route>
        <Route path="/addTransaction" component={AddIncExpTransaction}></Route>
        <Route path="/addDebt" component={AddDebt}></Route>
        <Route path="/addTransferTransaction" component={AddTransTransaction}></Route>
        <Route path="/changePassword" component={ChangePassword}></Route>

        <Route path="/" component={HomeScreen} exact></Route>
      </main>
    </BrowserRouter>
  );
}

export default App;
