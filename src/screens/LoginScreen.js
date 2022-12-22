import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { login } = useContext(AuthContext);
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
        }}
      >
        <View
          style={{
            paddingHorizontal: 25,
            // backgroundColor: 'skyblue',
            flex: 1,
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
                maxWidth: 200,
                maxHeight: 200,
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
            Login
          </Text>
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

          <TouchableOpacity onPress={() => {}}>
            <Text
              style={{
                color: 'white',
                textAlign: 'right',
                fontSize: 16,
                fontFamily: 'Roboto_700Bold',
              }}
            >
              Lupa Password?
            </Text>
          </TouchableOpacity>

          <CustomButton
            style={{
              backgroundColor: 'white',
              padding: 10,
              width: '80%',
              marginVertical: 20,
              marginHorizontal: 10,
              borderRadius: 10,
            }}
            label='Login'
            onPress={() => {
              login(email, password);
            }}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Roboto_400Regular',
                fontSize: 16,
              }}
            >
              Belum punya akun?
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Roboto_700Bold',
                fontSize: 16,
              }}
            >
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginScreen;
