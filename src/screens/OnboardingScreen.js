import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
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

const OnboardingScreen = ({ navigation }) => {
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
      }}
    >
      <ImageBackground
        source={require('../assets/images/stis.jpg')}
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          opacity: 0.88,
        }}
      >
        <LinearGradient
          colors={['#1A2980', '#26a0da']}
          style={{
            flexGrow: 1,
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              // backgroundColor: 'skyblue',
            }}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'Roboto_900Black',
              }}
            >
              Jekz App
            </Text>

            <Image
              source={require('../assets/images/stis.png')}
              style={{
                flex: 1,
                maxWidth: 200,
                maxHeight: 200,
              }}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                backgroundColor: 'white',

                padding: 15,
                width: '80%',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',

                  fontWeight: 'bold',
                  fontSize: 18,
                  color: '#26a0da',
                  fontFamily: 'Roboto_500Medium_Italic',
                }}
              >
                Selamat Datang
              </Text>
              <MaterialIcons
                name='arrow-forward-ios'
                size={24}
                color={'#26a0da'}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
