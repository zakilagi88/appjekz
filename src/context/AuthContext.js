import React, { createContext, useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { BASE_URL, headers } from '../api/config';
import { func } from 'prop-types';
import httpClient from '../api/data';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userRegis, setUserRegis] = useState(null);
  const [userArtikel, setUserArtikel] = useState(null);
  const [listArtikel, setListArtikel] = useState(null);
  const [messages, setMessages] = useState(null);
  const config = {
    headers: { Authorization: `Bearer ${userToken}` },
  };

  const login = async (email, password) => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
        let userToken = response.data.token;
        setUserToken(userToken);
        let userInfo = jwt_decode(userToken);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('userToken', userToken);

        console.log(`Token: ${userToken}`);
        console.log(userInfo);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
    setIsLoading(false);
  };

  const register = async (nim, nama, email, password, cpassword) => {
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL}/register`,
        {
          nim: nim,
          nama: nama,
          email: email,
          password: password,
          cpassword: cpassword,
        },
        headers
      )
      .then((response) => {
        console.log(response.data);
        let userRegis = response.data;
        setUserRegis(userRegis);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
    setIsLoading(false);
  };

  const editProfile = async (id, nama, email, kelas, angkatan, alamat) => {
    AsyncStorage.getItem('userToken').then((token) => {
      jwt_decode(token);
      console.log(token);
      axios
        .post(
          `${BASE_URL}/userme/update/${id}`,
          {
            nama: nama,
            email: email,
            kelas: kelas,
            angkatan: angkatan,
            alamat: alamat,
          },
          headers
        )
        .then((response) => {
          console.log(response.data);
          console.log(response.data.token);
          let userToken = response.data.token;
          setUserToken(userToken);
          let userInfo = jwt_decode(userToken);
          setUserInfo(userInfo);

          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          AsyncStorage.setItem('userToken', userToken);

          console.log(`Token: ${userToken}`);
          console.log(userInfo);
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    });
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        editProfile,
        // getArtikelById,
        // createArtikel,
        isLoading,
        userToken,
        userInfo,
        userRegis,
        // listArtikel,
        // userArtikel,
        messages,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
