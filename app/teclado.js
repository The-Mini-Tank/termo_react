import { View, Text, TextInput, TouchableOpacity, Animated, Modal, Keyboard, Vibration } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import dict from '../dict.json';
import { useRouter } from 'expo-router';
import { alphabet_set } from './game.js'



const Teclado = () => {
    
    const alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    const colunas = [[0, 13], [13, 26]];
    const [displayedLetters, setDisplayedLetters] = useState([]);
    useEffect(() => {
        setDisplayedLetters(alphabet);
    }, []);


    return <View>
        <View style={{ marginTop: 30 }} >
            {colunas.map((n, c_index) => (
                <View key={c_index} style={{ flexDirection: 'row', marginTop: 5 }}>
                    {displayedLetters.slice(n[0], n[1]).map((letter, index) => (
                        <View 
                        key={index} 
                        style={[
                          alphabet_set[n[0] + index] === 1 ? styles.rectangle_blue   :
                          alphabet_set[n[0] + index] === 2 ? styles.rectangle_green  :
                          alphabet_set[n[0] + index] === 3 ? styles.rectangle_gray   :
                                                      styles.rectangle 
                        ]}
                        >
                            <Text style={styles.text}>{letter}</Text>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    </View>
};

const styles = StyleSheet.create({

    rectangle: {
        width: 20,
        height: 30,
        marginHorizontal: 1.5,
        backgroundColor: '#c9c9c9',
        borderWidth: 0,
        borderColor: '#000000',
        borderRadius: 5,
        boxSizing: 'border-box',
        justifyContent: 'center', // centraliza o conteúdo verticalmente
        alignItems: 'center',
    },

    rectangle_green: {
        width: 20,
        height: 30,
        marginHorizontal: 1.5,
        backgroundColor: '#B1D690',
        borderWidth: 0,
        borderColor: '#000000',
        borderRadius: 5,
        boxSizing: 'border-box',
        justifyContent: 'center', // centraliza o conteúdo verticalmente
        alignItems: 'center',
    },

    rectangle_blue: {
        width: 20,
        height: 30,
        marginHorizontal: 1.5,
        backgroundColor: '#7AB2D3',
        borderWidth: 0,
        borderColor: '#000000',
        borderRadius: 5,
        boxSizing: 'border-box',
        justifyContent: 'center', // centraliza o conteúdo verticalmente
        alignItems: 'center',
    },
    rectangle_gray: {
        width: 20,
        height: 30,
        marginHorizontal: 1.5,
        backgroundColor: '#9C9C9C',
        borderWidth: 0,
        borderColor: '#000000',
        borderRadius: 5,
        boxSizing: 'border-box',
        justifyContent: 'center', // centraliza o conteúdo verticalmente
        alignItems: 'center',
    },

});

export default Teclado;
