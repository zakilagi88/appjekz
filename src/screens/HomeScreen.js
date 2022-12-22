import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
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
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import httpClient from '../api/data';
import { BASE_URL } from '../api/config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [isloading, setLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const { getAllArtikel, listArtikel } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [ImageGallery, setImageGallery] = useState([]);
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    httpClient.getArtikel().then((data) => {
      setData(data);
      setRefreshing(false);
      setLoading(false);
    });

    console.log(data);
    console.log(userInfo);
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setRefreshing(false);
    }
    prepare();
  }, [refreshing]);

  if (!fontsLoaded) {
    return undefined;
  }
  {
    SplashScreen.hideAsync();
  }

  const onRefresh = function () {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);

    httpClient.getArtikel().then((data) => {
      setData(data);
      setRefreshing(false);
      setLoading(false);
    });
  };

  const renderItem = (item) => {
    return (
      <View style={styles.containerFlate}>
        <View style={styles.innerContainer}>
          <Image
            source={{ uri: `${BASE_URL}/img/${item.item.gambar_artikel}` }}
            style={styles.image}
          />
          <View>
            <Text style={styles.header}>{item.item.judul_artikel}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={styles.body}>{item.item.tanggal_artikel}</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DetailArtikel', {
                    id: item.item.id_artikel,
                  });
                }}
              >
                <MaterialIcons
                  style={styles.icon}
                  name='double-arrow'
                  size={30}
                ></MaterialIcons>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ marginTop: StatusBar.currentHeight - 40 }}
    >
      <LinearGradient
        // colors={['#00B4DB', '#0083B0']}
        colors={['#26a0da', '#1A2980']}
        style={{ flexGrow: 1, paddingTop: 20 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#a2d2ff',
              borderRadius: 10,
              margin: 20,
              padding: 10,
            }}
          >
            <Text
              style={{
                marginVertical: 16,
                marginHorizontal: 20,
                fontSize: 18,
                fontFamily: 'Roboto_700Bold',
                color: 'black',
              }}
            >
              Selamat Datang, {userInfo.nama}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}
            >
              <ImageBackground
                source={require('../assets/images/man2.png')}
                imageStyle={{ borderRadius: 25 }}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#a2d2ff',
              marginHorizontal: 80,
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 10,
                marginHorizontal: 20,
              }}
              onPress={() => {
                navigation.navigate('Profile');
              }}
            >
              <IonIcons name='person-circle-outline' size={30}></IonIcons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 10,
                marginHorizontal: 20,
              }}
              onPress={() => {
                logout();
              }}
            >
              <IonIcons name='log-out-outline' size={30}></IonIcons>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <View
              style={{
                margin: 20,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Roboto_700Bold',
                  marginBottom: 10,
                  color: 'white',
                }}
              >
                Buletin STIS terbaru
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('TambahArtikel')}
              >
                <MaterialIcons
                  name='add-circle'
                  size={30}
                  style={{ marginBottom: 10, color: 'white' }}
                ></MaterialIcons>
              </TouchableOpacity>
            </View>

            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={renderItem}
            />

            <StatusBar />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};
const SLIDER_WIDTH = Dimensions.get('window').width + 100;
const styles = StyleSheet.create({
  containerFlate: {
    marginHorizontal: 20,
    padding: 10,
    flex: 1,
    paddingBottom: 40,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  innerContainer: {
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    width: '100%',
    height: '100%',
    aspectRatio: 4 / 2,
  },
  header: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    padding: 10,
  },
  body: {
    color: '#222',
    fontSize: 14,
    padding: 10,
  },
  icon: {
    padding: 10,
    color: '#222',
  },
});

export default HomeScreen;
