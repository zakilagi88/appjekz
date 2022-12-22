import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
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
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const { userRegis } = useContext(AuthContext);
  const [nim, setNim] = useState(null);
  const [nama, setNama] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [cpassword, setCPassword] = useState(null);
  const [fontsLoaded] = useFonts({
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
      style={{
        flexGrow: 1,
        justifyContent: 'center',
      }}
    >
      <LinearGradient
        colors={['#1A2980', '#26a0da']}
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 50,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            flexGrow: 1,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 30,
                borderRadius: 20,
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../assets/images/stis.png')}
                style={{
                  flex: 1,
                  maxWidth: 180,
                  maxHeight: 180,
                }}
              />
            </View>

            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'Roboto_700Bold',
                textAlign: 'center',
                marginBottom: 30,
              }}
            >
              Register Account
            </Text>

            <InputField
              label={'Masukkan Nama Anda'}
              icon={
                <Ionicons
                  name='person-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ margin: 5 }}
                />
              }
              value={nama}
              onChangeText={(text) => setNama(text)}
            />
            <InputField
              label={'Masukkan NIM Anda'}
              icon={
                <Ionicons
                  name='card-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ margin: 5 }}
                />
              }
              value={nim}
              onChangeText={(text) => setNim(text)}
            />
            <InputField
              label={'Email Anda'}
              icon={
                <MaterialIcon
                  name='alternate-email'
                  size={24}
                  color={'skyblue'}
                  style={{ margin: 5 }}
                />
              }
              keyboardType='email-address'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <InputField
              label={'Password'}
              icon={
                <Ionicons
                  name='ios-lock-closed-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ margin: 5 }}
                />
              }
              inputType='password'
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <InputField
              label={'Confirm Password'}
              icon={
                <Ionicons
                  name='ios-lock-closed-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ margin: 5 }}
                />
              }
              inputType='password'
              value={cpassword}
              onChangeText={(text) => setCPassword(text)}
            />

            <CustomButton
              style={{
                backgroundColor: 'white',
                padding: 10,
                width: '80%',
                marginVertical: 20,
                marginHorizontal: 10,
                borderRadius: 20,
              }}
              label='Register'
              onPress={() => {
                register(nim, nama, email, password, cpassword);
                if (userRegis.messages != null) {
                  alert(
                    `${userRegis.messages.success}, Silahkan Login `.toString()
                  );
                  navigation.navigate('Login');
                } else alert(JSON.stringify(userRegis));
              }}
            />

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'normal',
                  fontFamily: 'Roboto_400Regular',
                  fontSize: 16,
                }}
              >
                Sudah Punya Akun?
              </Text>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: 'Roboto_700Bold',
                  fontSize: 16,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default RegisterScreen;
