
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Text, Pressable } from 'react-native';
import axios from 'axios';

export default function SearchScreen({ navigation }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const searchMovies = () => {
        setHasSearched(true); 
        axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
            .then((response) => {
                setMovies(response.data);
            })
            .catch((error) => console.error(error));
    };

    const renderMovie = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('Details', { movie: item.show })}>
            <View style={styles.movieContainer}>
                <Image source={{ uri: item.show.image?.medium }} style={styles.thumbnail} />
                <View style={styles.movieDetails}>
                    <Text style={styles.title}>{item.show.name}</Text>
                    <Text style={styles.summary} numberOfLines={3}>{item.show.summary?.replace(/<[^>]*>/g, '')}</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Image
                    source={require('../Assets/SearchIconImage.png')}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Movies"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={searchMovies}
                />
            </View>

            {hasSearched ? (
                movies.length > 0 ? (
                    <FlatList
                        data={movies}
                        renderItem={renderMovie}
                        keyExtractor={(item) => item.show.id.toString()}
                    />
                ) : (
                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>No movies found. Try a different search term.</Text>
                    </View>
                )
            ) : (
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Start searching for your favorite movies!</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
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
        height: 20,
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
    message: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
