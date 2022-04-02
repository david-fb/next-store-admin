import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import jsCookie from 'js-cookie';
import endPoints from '@services/api';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  // if (jsCookie.get('token') && !user) {
  //   axios.defaults.headers.Authorization = `Bearer ${jsCookie.get('token')}`;
  //   axios
  //     .get(endPoints.profile.getProfile)
  //     .then((response) => {
  //       setUser(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       jsCookie.remove('token');
  //     });
  // }

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(endPoints.auth.login, { email, password }, options);
    const token = data.token;
    if (data.token) {
      jsCookie.set('token', token, { expires: 5 });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      //const { data: user } = await axios.get(endPoints.profile.getProfile);
      setUser(data.user);
    }
  };

  const logOut = () => {
    jsCookie.remove('token');
    setUser(null);
  };

  return {
    user,
    signIn,
    logOut,
  };
}
