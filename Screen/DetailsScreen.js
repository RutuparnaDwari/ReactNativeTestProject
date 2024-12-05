import React from 'react';
import {Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route }) {
  const { movie } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image source={{ uri: movie.image?.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.genres}>{movie.genres?.join(', ')}</Text>
      <Text style={styles.summary}>{movie.summary?.replace(/<[^>]*>/g, '')}</Text>
      <Text style={styles.info}>Language: {movie.language}</Text>
      <Text style={styles.info}>Premiered: {movie.premiered}</Text>
      <Text style={styles.info}>Rating: {movie.rating?.average || 'N/A'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
    paddingBottom:'40%'
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
    elevation:4
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genres: {
    color: '#bbb',
    fontSize: 16,
    marginBottom: 10,
  },
  summary: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
  },
  info: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  contentContainer: {
    padding: 10,
    paddingBottom: 30, 
  },
});
