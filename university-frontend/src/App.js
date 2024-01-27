import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import Header from './Components/Header';
import University from './Components/University';
import LeftSidebar from './Components/LeftSidebar';
import Department from './Components/Department';
import UserProfile from './Components/UserProfile';
import Users from './Components/Users';
import Dashboard from './Components/Dashboard';
import Management from './Components/Management';
import Student from './Components/Student';
import Teacher from './Components/Teacher';
import Course from './Components/Course';
import Room from './Components/Room';
import Schedule from './Components/Schedule';
import Role from './Components/Role';


const PrivateRoute = ({ component: Component, isLoggedIn, userId, token, ...rest }) => (
  
<Route
    {...rest}
    render={props => isLoggedIn ? <Component userId={userId} token={token} {...props} /> : <Redirect to="/" />}
  />
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [isNotificationVisible, setNotificationVisible] = useState(false); // Add this state variable

  const handleLogin = (role, token, userId) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setToken(token);
    setUserId(userId);
    setUsername('');
    const userData = { isLoggedIn: true, userRole: role, token, userId };
    sessionStorage.setItem('userData', JSON.stringify(userData));
    console.log(token);
    console.log(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    setUserId('');
    sessionStorage.removeItem('userData');
  };
  const handleCloseNotification = () => {
    setNotificationVisible(false);
  };
  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      const { isLoggedIn, userRole, token, userId } = JSON.parse(storedUserData);
      setIsLoggedIn(isLoggedIn);
      setUserRole(userRole);
      setToken(token);
      setUserId(userId);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Header token={token} userId={userId} handleLogout={handleLogout} userRole={userRole} />}
        <div className="app-content">
        {isLoggedIn && <LeftSidebar token={token} userId={userId} />}
          <div className="main-content">
            <Switch>
              <Route exact path="/">
                {isLoggedIn ? <Redirect to="/home" /> : <Login handleLogin={handleLogin} />}
              </Route>
              <PrivateRoute
                path="/home"
                component={Home}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/university"
                component={University}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/course"
                component={Course}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/role"
                component={Role}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/schedule"
                component={Schedule}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/room"
                component={Room}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/student"
                component={Student}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/department"
                component={Department}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/management"
                component={Management}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/users"
                component={Users}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/teacher"
                component={Teacher}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/user"
                component={UserProfile}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />
              <PrivateRoute
                path="/dashboard"
                component={Dashboard}
                isLoggedIn={isLoggedIn}
                userId={userId}
                token={token}
                userRole={userRole}
              />

              {/* Add more routes as needed */}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
  
};

export default App;
