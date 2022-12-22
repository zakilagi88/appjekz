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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from '../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';
// import { headers } from '../api/config';
import { BASE_URL } from '../api/config';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TambahArtikelScreen = ({ navigation }) => {
  const [judul_artikel, setJudulArtikel] = useState(null);
  const [isi_artikel, setIsiArtikel] = useState(null);
  const [pengirim_artikel, setPengirimArtikel] = useState(null);
  const [gambar_artikel, setGambarArtikel] = useState(null);
  const [tanggal_artikel, setTanggalArtikel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [gambar, setGambar] = useState(null);
  const [tampil, setTampil] = useState(null);
  const [type, setType] = useState(null);
  const [filename, setFilename] = useState(null);
  const { userToken } = useContext(AuthContext);
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

  const pilihGambar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    // const img = result.assets[0];
    // console.log(img.uri);

    if (!result.canceled) {
      setGambar(result.assets[0].uri);
      console.log(gambar);
    }
    let filename = result.assets[0].uri.split('/').pop();
    setFilename(filename);
  };

  return (
    <SafeAreaView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ marginTop: StatusBar.currentHeight - 40 }}
    >
      <LinearGradient
        // colors={['#1A2980', '#26a0da']}
        colors={['#26a0da', '#1A2980']}
        style={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <ScrollView
          style={{ padding: 10 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#a2d2ff',
              alignItems: 'center',
              margin: 20,
              borderRadius: 20,
              marginBottom: 50,
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
              Tambah Artikel
            </Text>
          </View>
          <View
            style={{
              marginVertical: -5,
              marginHorizontal: 10,
            }}
          >
            <InputField
              label={'Judul Artikel'}
              icon={
                <Ionicons
                  name='pencil-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ padding: 5 }}
                />
              }
              value={judul_artikel}
              onChangeText={(text) => setJudulArtikel(text)}
            />
          </View>
          <View
            style={{
              marginVertical: -5,
              marginHorizontal: 10,
            }}
          >
            <InputField
              label={'Pengirim Artikel'}
              icon={
                <Ionicons
                  name='person-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ padding: 5 }}
                />
              }
              value={pengirim_artikel}
              onChangeText={(text) => setPengirimArtikel(text)}
            />
          </View>
          <View
            style={{
              marginVertical: -5,
              marginHorizontal: 10,
            }}
          >
            <InputField
              label={'Isi Artikel'}
              icon={
                <Ionicons
                  name='text-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ padding: 5 }}
                />
              }
              value={isi_artikel}
              onChangeText={(text) => setIsiArtikel(text)}
            />
          </View>
          <View
            style={{
              marginVertical: -5,
              marginHorizontal: 10,
            }}
          >
            <InputField
              label={'Tanggal Artikel'}
              icon={
                <Ionicons
                  name='calendar-outline'
                  size={24}
                  color={'skyblue'}
                  style={{ padding: 5 }}
                />
              }
              value={tanggal_artikel}
              onChangeText={(text) => setTanggalArtikel(text)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}
            >
              <CustomButton
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  marginHorizontal: 10,
                  borderRadius: 20,
                }}
                label={'Pilih Gambar'}
                onPress={() => pilihGambar()}
              />
              <CustomButton
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  marginHorizontal: 10,
                  borderRadius: 20,
                }}
                label={'Tambah Artikel'}
                onPress={async () => {
                  let token = await AsyncStorage.getItem('userToken');
                  console.log(token);
                  let data = new FormData();
                  let file = {
                    uri: gambar,
                    type: mime.getType(gambar),
                    name: filename,
                  };
                  data.append('judul_artikel', judul_artikel);
                  data.append('gambar_artikel', file);
                  data.append('isi_artikel', isi_artikel);
                  data.append('pengirim_artikel', pengirim_artikel);
                  data.append('tanggal_artikel', tanggal_artikel);

                  try {
                    const response = await fetch(`${BASE_URL}/artikel`, {
                      method: 'POST',
                      body: data,
                      headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
                      },
                    });
                    const json = await response.json();
                    console.log(json);
                  } catch (error) {
                    console.log(error);
                  }

                  alert('Artikel berhasil ditambahkan');
                  navigation.navigate('Home', { refreshing });
                }}
              />
            </View>
          </View>
          <View>
            <Image
              source={{
                uri: gambar,
              }}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                aspectRatio: 1,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            ></Image>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default TambahArtikelScreen;
