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
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import httpClient from '../api/data';
import { BASE_URL } from '../api/config';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const DetailArtikelScreen = ({ route, navigation }) => {
  const item_id = route.params.id;
  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    httpClient.getArtikelById(item_id).then((res) => {
      console.log(res);
      setArtikel(res);
    });
  }, []);

  const SLIDER_WIDTH = Dimensions.get('window').width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

  return (
    <SafeAreaView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        marginTop: StatusBar.currentHeight - 40,
      }}
    >
      <LinearGradient
        colors={['#26a0da', '#1A2980']}
        style={{ flexGrow: 1, paddingTop: 20 }}
      >
        <ScrollView style={{}} contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#a2d2ff',
              alignItems: 'center',
              borderRadius: 20,
              margin: 20,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name='arrow-back-ios'
                size={20}
                style={{
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
              Detail Artikel
            </Text>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                padding: 12,
                fontSize: 22,
                fontWeight: 'bold',
                color: '#fff',
              }}
            >
              {artikel.judul_artikel}
            </Text>
            <Text
              style={{
                paddingHorizontal: 12,
                marginBottom: 10,
                fontSize: 12,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: '#fff',
              }}
            >
              {artikel.pengirim_artikel}
            </Text>
            <Text
              style={{
                paddingHorizontal: 12,
                marginBottom: 10,
                fontSize: 12,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: '#fff',
              }}
            >
              {artikel.tanggal_artikel}
            </Text>
            <Image
              source={{ uri: `${BASE_URL}/img/${artikel.gambar_artikel}` }}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                aspectRatio: 4 / 2,
                alignSelf: 'center',
                // resizeMode: 'contain',
                marginBottom: 20,
              }}
            />
            <Text
              style={{
                padding: 12,
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'justify',
                color: '#fff',
              }}
            >
              {artikel.isi_artikel}
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DetailArtikelScreen;
