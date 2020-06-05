import React from 'react'
import { StyleSheet, View, Image, Text, SafeAreaView } from 'react-native'
import Constants from 'expo-constants'
import { FontAwesome as Icon, Feather } from '@expo/vector-icons'

import Back from '../../components/GoBack'
import { RectButton } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'


interface Params {
  point_id: number
}

const Detail = () => {

  const route = useRoute()

  const routeParams = route.params as Params

  route.params

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Back />
        <Image style={styles.pointImage} source={{ uri: "https://images.unsplash.com/photo-1514792368985-f80e9d482a02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" }} />
        <Text style={styles.pointName}>Mercadão do josé</Text>

        <Text style={styles.pointItems}>Lampâdas, Óleo de cozinha</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>São Paulo, SP</Text>

        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
            <Icon name="whatsapp" size={20} color="#fff" />
            <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => {}}>
            <Feather name="mail" size={20} color="#fff" />
            <Text style={styles.buttonText}>E-Mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  )
}

export default Detail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  pointItems: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  button: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },
});