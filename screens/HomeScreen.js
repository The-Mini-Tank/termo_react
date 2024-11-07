import { View, Text, Button, TextInput, TouchableOpacity, Alert, ToastAndroid  } from 'react-native';
import FlashMessage, { positionStyle } from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import React, { useState, useEffect  } from 'react';
import { StyleSheet } from 'react-native';
import dict from '../dict.json';


export default function HomeScreen({ navigation }) {

    const [rowSet, setRowSet] = useState([0, 0, 0, 0, 0]);
    const [inputText, setInputText] = useState('');
    const [inputText2, setInputText2] = useState('');
    const [inputText3, setInputText3] = useState('');
    const [inputText4, setInputText4] = useState('');
    const [inputText5, setInputText5] = useState('');

    const [palavraSecreta, setPalavraSecreta] = useState('');
    console.log(palavraSecreta);

    // Palavra secreta
    useEffect(() => {
      const escolherPalavraAleatoria = () => {
        const indiceAleatorio = Math.floor(Math.random() * dict.palavras.length);
        return dict.palavras[indiceAleatorio];
      };
      
      setPalavraSecreta(escolherPalavraAleatoria());
    }, []);

    const atualizarRowSet = (letra, index, novoRowSet) => {
        for (let i = 0; i < palavraSecreta.length; i++) {
          if (palavraSecreta[i] === letra) {
            if(index === i){ 422
                novoRowSet[index] = 2;
            } else { 
                novoRowSet[index] = 1;
            } 
          }
        }
      };

    useEffect(() => {
        console.log("Estado atualizado de rowSet:", rowSet);
    }, [rowSet]);

    const getRectangleStyle = (tipo) => {
        switch (tipo) {
          case 1:
            return styles.rectanglePurple;
          case 2:
            return styles.rectangleGreen;
          default:
            return styles.rectangle;
        }
      };

    function formatarTexto(texto) {
        return texto
          .toLowerCase() 
          .normalize("NFD") 
          .replace(/[\u0300-\u036f]/g, ""); 
    }

    // Configurar Botão
    const TryButton = ({ title, onPress }) => {
        const [isPressed, setIsPressed] = useState(false);
      
        return (
          <TouchableOpacity
            style={[styles.button, isPressed && styles.buttonActive]}
            onPress={onPress}
            activeOpacity={0.8}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            <Text style={[styles.buttonText, isPressed && styles.buttonTextActive]}>
              {title}
            </Text>
          </TouchableOpacity>
        );
      };

      
 
      const checkWordSpell = () => {
        const values = [inputText, inputText2, inputText3, inputText4, inputText5];
        const concatenatedString = values.join('');

        let textoFormatado = formatarTexto(concatenatedString);

        if (textoFormatado.length === 5) {
            checkWord(textoFormatado);
        } else {
            showMessage({
                message: "Palavra Incompleta!",
                description: "Muito burro",
                type: "warning",
              });
        }
      }

      const checkWord = (word) => {
        if(word == palavraSecreta){
            console.log('acertou');
        } else {
            const novoRowSet = [...rowSet];

            word.split('').forEach((caractere, index) => {
                atualizarRowSet(caractere, index, novoRowSet);
            });
            console.log(novoRowSet);
            setRowSet(novoRowSet); 

            showMessage({
                message: "ERROU!",
                description: "Muito burro",
                type: "info",
              });
        }
      }
    
      const handleInputChange = (setter, index) => (text) => {
        setter(text);
      };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> {palavraSecreta}</Text> 

        <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={[getRectangleStyle(rowSet[0]), { justifyContent: 'center', alignItems: 'center' }]}>
                <TextInput
                    style={[styles.input, { width: '70%', textAlign: 'center' }]}
                    placeholder="-"
                    value={inputText}
                    onChangeText={handleInputChange(setInputText, 0)}
                    maxLength={1}
                />
            </View>
            <View style={[getRectangleStyle(rowSet[1]), { justifyContent: 'center', alignItems: 'center' }]}>
                <TextInput
                    style={[styles.input, { width: '70%', textAlign: 'center' }]}
                    placeholder="-"
                    value={inputText2}
                    onChangeText={handleInputChange(setInputText2, 1)}
                    maxLength={1}
                />
            </View>
            <View style={[getRectangleStyle(rowSet[2]), { justifyContent: 'center', alignItems: 'center' }]}>
                <TextInput
                    style={[styles.input, { width: '70%', textAlign: 'center' }]}
                    placeholder="-"
                    value={inputText3}
                    onChangeText={handleInputChange(setInputText3, 2)}
                    maxLength={1}
                />
            </View>
            <View style={[getRectangleStyle(rowSet[3]), { justifyContent: 'center', alignItems: 'center' }]}>
                <TextInput
                    style={[styles.input, { width: '70%', textAlign: 'center' }]}
                    placeholder="-"
                    value={inputText4}
                    onChangeText={handleInputChange(setInputText4, 3)}
                    maxLength={1}
                />
            </View>
            <View style={[getRectangleStyle(rowSet[4]), { justifyContent: 'center', alignItems: 'center' }]}>
                <TextInput
                    style={[styles.input, { width: '70%', textAlign: 'center' }]}
                    placeholder="-"
                    value={inputText5}
                    onChangeText={handleInputChange(setInputText5, 4)}
                    maxLength={1}
                />
            </View>
        </View>
         
        <TryButton title="Chutar" onPress={() => checkWordSpell()} />

      <FlashMessage position="top" />
      {/* Códigos sempre dentro da view */}
      </View>
    );
  }

const styles = StyleSheet.create({
    rectangle: {
      width: 70,
      height: 70,
      marginHorizontal: 2,
      backgroundColor: '#EFEFEF',
      borderWidth: 2,
      borderColor: '#000000',
      borderRadius: 10,
      boxSizing: 'border-box',
    },

    rectanglePurple: {
        width: 70,
        height: 70,
        marginHorizontal: 2,
        backgroundColor: '#6959CD', // Cor de fundo laranja
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        boxSizing: 'border-box',
      },

      rectangleGreen: {
        width: 70,
        height: 70,
        marginHorizontal: 2,
        backgroundColor: '#2E8B57', // Cor de fundo verde
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10,
        boxSizing: 'border-box',
      },

    button: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        marginTop: 50,
        borderRadius: 4,
        paddingVertical: 12, // Adapted from calc(.875rem - 1px)
        paddingHorizontal: 20, // Adapted from calc(1.5rem - 1px)
        minHeight: 48, // Converted from 3rem
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 3,
        elevation: 2, // Android shadow
        justifyContent: 'center',
      },
      buttonText: {
        fontFamily: 'system-ui',
        fontSize: 16,
        fontWeight: '600',
        color: 'rgba(0, 0, 0, 0.85)',
      },
  });
  