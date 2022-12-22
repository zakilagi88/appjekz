import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://192.168.18.55/restapi/uasppk/public';
const token = AsyncStorage.getItem('userToken');
export const headers = {
  headers: {
    // Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  },
};
