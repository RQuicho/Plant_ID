import React, { useEffect, useState } from 'react';
import './App.css';
import PlantIdApi from './api';
import jwt from 'jsonwebtoken';
import useLocalStorage from './hooks/useLocalStorage';
import { BrowserRouter } from 'react-router-dom';
import RoutePaths from './routes-nav/RoutePaths';
import NavBar from './routes-nav/NavBar';
import UserContext from './UserContext';

export const TOKEN_STORAGE_ID = 'plantid-token';

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      if (token) {
        try {
          console.log('token in front end App: ', token);
          let {username} = jwt.decode(token);
          console.log('username in front end App: ', username);
          PlantIdApi.token = token;
          let currentUser = await PlantIdApi.getUser(username);
          setCurrentUser(currentUser);
          console.log('currentUser in front end App: ', currentUser); // undefined
        } catch (err) {
          console.error('Unable to get user info in App.js', err);
          setCurrentUser(null);
        }
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    getUserInfo();
  }, [token]);

  const login = async (loginData) => {
    try {
      let token = await PlantIdApi.login(loginData);
      setToken(token);
      // console.log('successfully logged in'); // good
      // console.log('token:', token); // undefined
      return {success: true};
    } catch (err) {
      console.error('login failed', err);
      return {success: false, err};
    }
  }

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }

  const signup = async (signupData) => {
    try {
      let token = await PlantIdApi.signup(signupData);
      setToken(token);
      return {success: true};
    } catch (err) {
      console.error('signup failed', err);
      return {success: false, err};
    }
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{currentUser, setCurrentUser}}>
        <div className='App'>
          <NavBar logout={logout} />
          <RoutePaths login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
