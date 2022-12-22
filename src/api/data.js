import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { BASE_URL, headers } from './config';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';

const httpClient = axios.create();

httpClient.defaults.withCredentials = true;

httpClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers['Content-Type'] = 'multipart/form-data';
    config.headers['Access-Control-Allow-Origin'] = '*';
  }
  return config;
});

// get all artikel
httpClient.getArtikel = async function () {
  try {
    const response = await this({
      method: 'get',
      url: `${BASE_URL}/artikel`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

httpClient.createArtikel = async function (data) {
  try {
    await axios.post(`${BASE_URL}/artikel`, data).then((response) => {
      console.log(response.data);
    });
  } catch (error) {
    console.log(`Error is: ${error}`);
  }
};

// get artikel
httpClient.getArtikelById = async function (id) {
  try {
    const response = await this({
      method: 'get',
      url: `${BASE_URL}/artikel/${id}`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default httpClient;
