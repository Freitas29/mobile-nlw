import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, Image, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MapView, { Marker } from 'react-native-maps'
import { SvgUri } from 'react-native-svg'
import Back from '../../components/GoBack'
import api from '../../services/api'

interface Item {
  id: number
  title: string
  image: string
}

const Point = () => {
  const navigation = useNavigation()

  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItem] = useState<number[]>([])

  function handleNavigateToDetail() {
    navigation.navigate('Detail')
  }

  function handleSelectItem(id: number){
    const alreadySelected = selectedItems.findIndex(item => item === id)

    if(alreadySelected >= 0){
      const filtredItems = selectedItems.filter(item => item !== id);

      setSelectedItem(filtredItems)
    }else{
      setSelectedItem([...selectedItems, id])
    }
  }

  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data)
      console.log(response.data)
    })
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Back />

        <Text style={styles.title} >Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -23.4027282,
              longitude: -46.7381793,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}>
            <Marker
              style={styles.mapMarker}
              onPress={handleNavigateToDetail}
              coordinate={{
                latitude: -23.4027282,
                longitude: -46.7381793,
              }}>
              <View style={styles.mapMarkerContainer}>
                <Image
                  style={styles.mapMarkerImage}
                  source={{ uri: "https://images.unsplash.com/photo-1514792368985-f80e9d482a02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" }} />
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>


      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}>

          {items.map(item => (
            <TouchableOpacity
              activeOpacity={0.6}
              key={String(item.id)}
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {},
              ]}
              onPress={() => handleSelectItem(item.id)}>
              <SvgUri width={45} height={42} uri={item.image} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}


export default Point

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});