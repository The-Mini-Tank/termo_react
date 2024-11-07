import { View, Text, Button, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import FlashMessage, { positionStyle } from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import dict from '../dict.json';


export default function HomeScreen({ navigation }) {

  const [linha, setLinha] = useState(0);
  const initialViewCount = 5; // Número inicial de Views

  const [rowSet, setRowSet] = useState([0, 0, 0, 0, 0]);
  const [inputText, setInputText] = useState(['', '', '', '', '']);

  const [rowSet1, setRowSet1] = useState([0, 0, 0, 0, 0]);
  const [inputText1, setInputText1] = useState(['', '', '', '', '']);

  const inputList = [inputText, inputText1];

  const [views, setViews] = useState(Array.from({ length: initialViewCount }, (_, i) => i));
  const [isLocked, setIsLocked] = useState(true);



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

  useEffect(() => {
    console.log("Estado atualizado de rowSet:", rowSet);
  }, [rowSet]);

  const addView = () => {
    setViews([...views, views.length]);
  };

  const handleRowSet = (novoRowSet) => {
    if (linha == 0) {
      setRowSet(novoRowSet);
    }
    if (linha == 1) {
      setRowSet1(novoRowSet);
    }
  }

  const updateLinha = () => {
     let linha
  }

  const handleInputChange = (index, value) => {

    if (linha === 0) {
      setInputText(inputText => {
        const newInputText = [...inputText];
        newInputText[index] = value;
        return newInputText;
      });
    }
    if (linha === 1) {
      setInputText1(inputText1 => {
        const newInputText = [...inputText1];
        newInputText[index] = value;
        return newInputText;
      });
    }
  };

  const atualizarRowSet = (letra, index, novoRowSet) => {
    let letra_encontrada = false;
    for (let i = 0; i < palavraSecreta.length; i++) {
      if (palavraSecreta[i] === letra) {
        if (index === i) {
          novoRowSet[index] = 2;
          letra_encontrada = true;
        } else {
          novoRowSet[index] = 1;
          letra_encontrada = true;
        }
      } else {
        if (!letra_encontrada)
          novoRowSet[index] = 3;
      }
    }
  };

  const getRectangleStyle = (tipo) => {
    switch (tipo) {
      case 1:
        return styles.rectanglePurple;
      case 2:
        return styles.rectangleGreen;
      case 3:
        return styles.rectangleGray;
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

  const checkWordFill = () => {

    //getActualInput
    let actualInput = inputList[linha];

    const concatenatedString = actualInput.join('');
    console.log(concatenatedString);

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
    if (word == palavraSecreta) {
      showMessage({
        message: "ACERTOU!",
        description: "",
        type: "success",
      });

      novoRowSet = [2, 2, 2, 2, 2];
      handleRowSet(novoRowSet);
    } else {
      const novoRowSet = [...rowSet];

      word.split('').forEach((caractere, index) => {
        atualizarRowSet(caractere, index, novoRowSet);
      });

      handleRowSet(novoRowSet);

      //pularLinha
      let novaLinha = linha + 1;
      setLinha(novaLinha);

      showMessage({
        message: "ERROU!",
        description: "Muito burro",
        type: "info",
      });
    }
  }

  //VIEW
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> {palavraSecreta}</Text>

      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {views.map((viewIndex) => (
          <View

            key={viewIndex}
            style={[getRectangleStyle(rowSet[viewIndex]), { justifyContent: 'center', alignItems: 'center' }]}
          >
            <TextInput
              style={[styles.input, { width: '70%', textAlign: 'center' }]}
              placeholder="-"
              value={inputText[viewIndex] || ''}
              onChangeText={(value) => {
                // Verifica se o valor é apenas letras (sem números ou caracteres especiais)
                if (/^[a-zA-Z]*$/.test(value)) {
                  handleInputChange(viewIndex, value); // Atualiza o estado apenas se for uma letra
                }
              }}
              maxLength={1}
              editable={linha == 0}
            />
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {views.map((viewIndex) => (
          <View

            key={viewIndex}
            style={[getRectangleStyle(rowSet1[viewIndex]), { justifyContent: 'center', alignItems: 'center' }]}
          >
            <TextInput
              style={[styles.input, { width: '70%', textAlign: 'center' }]}
              placeholder="-"
              value={inputText1[viewIndex] || ''}
              onChangeText={(value) => {
                // Verifica se o valor é apenas letras (sem números ou caracteres especiais)
                if (/^[a-zA-Z]*$/.test(value)) {
                  handleInputChange(viewIndex, value); // Atualiza o estado apenas se for uma letra
                }
              }}
              maxLength={1}
              editable={linha == 1}
            />
          </View>
        ))}
      </View>



      <TryButton title="Chutar" onPress={() => checkWordFill()} />

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

  rectangleGray: {
    width: 70,
    height: 70,
    marginHorizontal: 2,
    backgroundColor: '#9C9C9C',
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
