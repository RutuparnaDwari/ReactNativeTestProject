import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('https://api.tvmaze.com/search/shows?q=all')
            .then(response => setMovies(response.data))
            .catch(error => console.error(error));
    }, []);

    const renderMovie = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
            <View style={styles.movieContainer}>
                <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
                <View style={styles.movieDetails}>
                    <Text style={styles.title}>{item.show.name}</Text>
                    <Text style={styles.summary} numberOfLines={3}>{item.show.summary?.replace(/<[^>]*>/g, '')}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>

                <Image source={require('../Assets/SearchIconImage.png')}
                    style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Movies"
                    onFocus={() => navigation.navigate('Search')}
                />
            </View>
            <FlatList
                data={movies}
                renderItem={renderMovie}
                keyExtractor={item => item.show.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    searchBar: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 0,
    },
    movieContainer: {
        flexDirection: 'row',
        margin: 10,
        backgroundColor: '#1c1c1c',
        borderRadius: 5,
    },
    thumbnail: {
        width: 100,
        height: 150,
        borderRadius: 5,
    },
    movieDetails: {
        flex: 1,
        padding: 10,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    summary: {
        color: '#ccc',
        fontSize: 14,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    searchIcon: {
        marginRight: 10,
        width: 20,
        height: 20
    },
});