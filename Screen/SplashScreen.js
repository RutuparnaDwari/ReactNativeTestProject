import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, [3000]);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../Assets/SplashIconImage.png')} style={styles.image} />
      <Text style={styles.text}>Welcome to MovieApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    tintColor:'#fff'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginTop: 20,
  },
});