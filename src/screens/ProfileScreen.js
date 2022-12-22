import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import httpClient from '../api/data';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
import { BASE_URL, headers } from '../api/config';
import { AuthContext } from '../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  const [nama, setNama] = useState(null);
  const [nim, setNim] = useState(null);
  const [email, setEmail] = useState(null);
  const [kelas, setKelas] = useState(null);
  const [angkatan, setAngkatan] = useState(null);
  const [alamat, setAlamat] = useState(null);
  const { userInfo, editProfile } = useContext(AuthContext);

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  }
  {
    SplashScreen.hideAsync();
  }
  return (
    <SafeAreaView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ marginTop: StatusBar.currentHeight - 40 }}
    >
      <LinearGradient
        // colors={['#00B4DB', '#0083B0']}
        colors={['#26a0da', '#1A2980']}
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#a2d2ff',
              alignItems: 'center',
              margin: 40,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name='arrow-back-ios'
                size={20}
                style={{
                  marginVertical: 18,
                  marginHorizontal: 20,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                marginVertical: 18,
                marginHorizontal: 20,
                fontSize: 16,
                fontFamily: 'Roboto_700Bold_Italic',
              }}
            >
              Halaman Profil Pengguna
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#a2d2ff',
              borderRadius: 20,
              padding: 10,
              marginBottom: 40,
              marginHorizontal: 10,
            }}
          >
            <Image
              source={require('../assets/images/man2.png')}
              style={{
                width: 150,
                height: 150,
                borderRadius: 20,
              }}
            ></Image>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginHorizontal: 10,
                marginVertical: 20,
              }}
            >
              <Text> Nama : {userInfo.nama}</Text>
              <Text> NIM : {userInfo.nim}</Text>
              <Text> Email : {userInfo.email}</Text>
              <Text> Kelas : {userInfo.kelas}</Text>
              <Text> Angkatan :{userInfo.angkatan}</Text>
              <Text> Alamat : {userInfo.alamat}</Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: -5,
              marginHorizontal: 10,
            }}
          >
            <InputField
              label={'Nama Pengguna'}
              icon={
                <Ionicons
                  name='ios-person-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ padding: 5 }}
                />
              }
              value={nama}
              onChangeText={(text) => setNama(text)}
            />
          </View>

          <View
            style={{
              marginVertical: -5,
              marginHorizontal: 10,
            }}
          >
            <InputField
              label={'Email Pengguna'}
              icon={
                <Ionicons
                  name='mail-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ padding: 5 }}
                />
              }
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View
            style={{
              marginVertical: -5,
              marginHorizontal: 10,
            }}
          >
            <InputField
              label={'Kelas Pengguna'}
              icon={
                <Ionicons
                  name='briefcase-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ padding: 5 }}
                />
              }
              value={kelas}
              onChangeText={(text) => setKelas(text)}
            />
          </View>
          <View
            style={{
              marginVertical: -5,
              marginHorizontal: 10,
            }}
          >
            <InputField
              label={'Angkatan Pengguna'}
              icon={
                <Ionicons
                  name='people-circle-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ padding: 5 }}
                />
              }
              value={angkatan}
              onChangeText={(text) => setAngkatan(text)}
            />
          </View>
          <View
            style={{
              marginVertical: -5,
              marginHorizontal: 10,
            }}
          >
            <InputField
              label={'Alamat Pengguna'}
              icon={
                <Ionicons
                  name='location-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ padding: 5 }}
                />
              }
              value={alamat}
              onChangeText={(text) => setAlamat(text)}
            />
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 20,
            }}
          >
            <CustomButton
              label={'Edit Profil'}
              style={{
                backgroundColor: 'white',
                padding: 10,
                marginHorizontal: 10,
                borderRadius: 20,
              }}
              onPress={async () => {
                let id = userInfo.id;
                await editProfile(id, nama, email, kelas, angkatan, alamat);
                Alert.alert('Profil Berhasil Diubah');
                navigation.navigate('Home');
              }}
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ProfileScreen;
