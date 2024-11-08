import { View, Text, Button, TextInput, TouchableOpacity, Animated, Modal, Keyboard, Vibration  } from 'react-native';
import FlashMessage, { positionStyle } from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import dict from '../dict.json';


export default function GameScreen({ navigation }) {

  const [linha, setLinha] = useState(0);
  const initialViewCount = 5;
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  // Número inicial de Views

  const [modalVisible, setModalVisible] = useState(false);


  const [rowSet, setRowSet] = useState([0, 0, 0, 0, 0]);
  const [inputText, setInputText] = useState(['', '', '', '', '']);
  const [rowSet1, setRowSet1] = useState([0, 0, 0, 0, 0]);
  const [inputText1, setInputText1] = useState(['', '', '', '', '']);
  const [rowSet2, setRowSet2] = useState([0, 0, 0, 0, 0]);
  const [inputText2, setInputText2] = useState(['', '', '', '', '']);
  const [rowSet3, setRowSet3] = useState([0, 0, 0, 0, 0]);
  const [inputText3, setInputText3] = useState(['', '', '', '', '']);
  const [rowSet4, setRowSet4] = useState([0, 0, 0, 0, 0]);
  const [inputText4, setInputText4] = useState(['', '', '', '', '']);

  const inputList = [inputText, inputText1, inputText2, inputText3, inputText4];
  const inputRefs = useRef([...Array(5)].map(() => Array(5).fill(null)));


  const [views, setViews] = useState(Array.from({ length: initialViewCount }, (_, i) => i));

  const [palavraSecreta, setPalavraSecreta] = useState('');
  console.log(palavraSecreta);

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Limpeza dos listeners ao desmontar o componente
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const flipAnim = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    Animated.sequence([
      Animated.timing(flipAnim, {
        toValue: 1, // Roda até 90 graus
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(flipAnim, {
        toValue: 0, // Retorna para 0 graus
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const rotateX = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'], // Rotações de 0 a 180 graus
  });

  const handleGameOver = () => {
    setGameOver(true);
    setModalVisible(true);
    Vibration.vibrate(1000);
  }

  const handleReset = () => {
    setGameOver(false);
    setGameWin(false);
    setModalVisible(false);
    setPalavraSecreta(escolherPalavraAleatoria());
    setLinha(0);
    let novoRowSet = [0, 0, 0, 0, 0];

    for (let i = 0; i <= 4; i++) {
      handleRowSet(novoRowSet, i);
    }

    for (let i = 0; i <= 4; i++) {
      for (let j = 0; j <= 4; j++) {
        handleInputChange(j, '', i);
      }
    }
  }

  const escolherPalavraAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * dict.palavras.length);
    return dict.palavras[indiceAleatorio];
  };

  // Palavra secreta
  useEffect(() => {
    setPalavraSecreta(escolherPalavraAleatoria());
  }, []);

  useEffect(() => {
    console.log("Estado atualizado de rowSet:", rowSet);
    console.log("Estado atualizado de linha:", linha);
  }, [rowSet]);

  const addView = () => {
    setViews([...views, views.length]);
  };

  const handleRowSet = (novoRowSet, ln) => {
    if (ln == 0) {
      setRowSet(novoRowSet);
    }
    if (ln == 1) {
      setRowSet1(novoRowSet);
    }
    if (ln == 2) {
      setRowSet2(novoRowSet);
    }
    if (ln == 3) {
      setRowSet3(novoRowSet);
    }
    if (ln == 4) {
      setRowSet4(novoRowSet);
    }
  }

  const handleInputChange = (index, value, ln) => {


    if (value && index < 4) {
      inputRefs.current[ln][index + 1]?.focus();
    }


    if (ln === 0) {
      setInputText(inputText => {
        const newInputText = [...inputText];
        newInputText[index] = value;
        return newInputText;
      });
    }
    if (ln === 1) {
      setInputText1(inputText1 => {
        const newInputText = [...inputText1];
        newInputText[index] = value;
        return newInputText;
      });
    }
    if (ln === 2) {
      setInputText2(inputText2 => {
        const newInputText = [...inputText2];
        newInputText[index] = value;
        return newInputText;
      });
    }
    if (ln === 3) {
      setInputText3(inputText3 => {
        const newInputText = [...inputText3];
        newInputText[index] = value;
        return newInputText;
      });
    }
    if (ln === 4) {
      setInputText4(inputText4 => {
        const newInputText = [...inputText4];
        newInputText[index] = value;
        return newInputText;
      });
    }
  };

  const atualizarRowSet = (letra, index, novoRowSet , letras_encontradas, set) => {

    if(set == 0)
      novoRowSet[index] = 3;

    for (let i = 0; i < palavraSecreta.length; i++) {
      if(set === 0){
        if (palavraSecreta[i] === letra && index === i) {
            novoRowSet[index] = 2;
            letras_encontradas.push(letra);
            console.log(letras_encontradas);
        } 
      } 

      if(set === 1){
        if (palavraSecreta[i] === letra && index !== i && !letras_encontradas.includes(letra)) {
          novoRowSet[index] = 1;
          console.log(letra);
        }
      } 
   }};

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
    console.log(linha);

    let textoFormatado = formatarTexto(concatenatedString);


    if (textoFormatado.length === 5) {
      checkWord(textoFormatado);
    } else {
      showMessage({
        message: "Palavra Incompleta!",
        type: "warning",
      });
      Vibration.vibrate();
    }

  }

  useEffect(() => {
    if (linha in [1,2,3,4,5]) {
      flipCard(); // Inicie a animação apenas para a linha específica
    }
  }, [linha]);

  const checkWord = (word) => {
    if (word == palavraSecreta) {
      showMessage({
        message: "ACERTOU!",
        description: "",
        type: "success",
      });

      novoRowSet = [2, 2, 2, 2, 2];
      handleRowSet(novoRowSet, linha);

      setGameWin(true);
      handleGameOver();
    } else {
      const novoRowSet = [0,0,0,0,0];

      let letras_encontradas = [];
      word.split('').forEach((caractere, index) => {
        atualizarRowSet(caractere, index, novoRowSet, letras_encontradas, 0);
      });

      word.split('').forEach((caractere, index) => {
        atualizarRowSet(caractere, index, novoRowSet, letras_encontradas, 1);
      });

      handleRowSet(novoRowSet, linha);
      let novaLinha = linha + 1;
      setLinha(novaLinha);
      flipCard();
  
      if (linha == 4) {
        handleGameOver();
      }
    }
  }

  //VIEW
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: keyboardVisible ? 0 : 250}}>


      <Modal
        animationType="slide" // Tipo de animação ("slide", "fade" ou "none")
        transparent={true} // Define o fundo como transparente
        visible={modalVisible} // Controla a visibilidade do modal
        onRequestClose={() => setModalVisible(false)} // Fecha o modal ao pressionar o botão de voltar no Android
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={styles.modalText}>{gameWin ? 'Vitória' : 'Derrota'}</Text>
          <Text style={styles.modalText}>Palavra Secreta: {palavraSecreta}</Text>

            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ marginRight: 10 }}>
                <TryButton title="Jogar novamente" onPress={() => handleReset()} />
              </View>
              <TryButton title="X" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      {/* <Text> {palavraSecreta}</Text> */}

      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {views.map((viewIndex) => (
          <Animated.View
            key={viewIndex}
            style={[getRectangleStyle(rowSet[viewIndex]), { justifyContent: 'center', alignItems: 'center' }, linha === 1 ? { transform: [{ rotateX }] } : {}]}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[0][viewIndex] = ref)}
              style={[styles.input, { width: '70%', textAlign: 'center', color: '#000' }]}
              placeholder=""
              value={inputText[viewIndex] || ''}
              onChangeText={(value) => {
                // Verifica se o valor é apenas letras (sem números ou caracteres especiais)
                if (/^[a-zA-Z]*$/.test(value)) {
                  handleInputChange(viewIndex, value.toUpperCase(), linha); // Atualiza o estado apenas se for uma letra
                }
              }}
              maxLength={1}
              editable={linha == 0 && !gameOver}
            />
          </Animated.View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {views.map((viewIndex) => (
          <Animated.View

            key={viewIndex}
            style={[getRectangleStyle(rowSet1[viewIndex]), { justifyContent: 'center', alignItems: 'center' }, linha === 2 ? { transform: [{ rotateX }] } : {}]}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[1][viewIndex] = ref)}
              style={[styles.input, { width: '70%', textAlign: 'center', color: '#000' }]}
              placeholder=""
              value={inputText1[viewIndex] || ''}
              onChangeText={(value) => {
                // Verifica se o valor é apenas letras (sem números ou caracteres especiais)
                if (/^[a-zA-Z]*$/.test(value)) {
                  handleInputChange(viewIndex, value.toUpperCase(), linha); // Atualiza o estado apenas se for uma letra
                }
              }}
              maxLength={1}
              editable={linha == 1 && !gameOver}
            />
          </Animated.View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {views.map((viewIndex) => (
          <Animated.View

            key={viewIndex}
            style={[getRectangleStyle(rowSet2[viewIndex]), { justifyContent: 'center', alignItems: 'center' }, linha === 3 ? { transform: [{ rotateX }] } : {}]}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[2][viewIndex] = ref)}
              key={`line-${viewIndex}`}
              style={[styles.input, { width: '70%', textAlign: 'center', color: '#000' }]}
              placeholder=""
              value={inputText2[viewIndex] || ''}
              onChangeText={(value) => {
                // Verifica se o valor é apenas letras (sem números ou caracteres especiais)
                if (/^[a-zA-Z]*$/.test(value)) {
                  handleInputChange(viewIndex, value.toUpperCase(), linha); // Atualiza o estado apenas se for uma letra
                }
              }}
              maxLength={1}
              editable={linha == 2 && !gameOver}
            />
          </Animated.View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {views.map((viewIndex) => (
          <Animated.View

            key={viewIndex}
            style={[getRectangleStyle(rowSet3[viewIndex]), { justifyContent: 'center', alignItems: 'center' }, linha === 4 ? { transform: [{ rotateX }] } : {}]}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[3][viewIndex] = ref)}
              style={[styles.input, { width: '70%', textAlign: 'center', color: '#000' }]}
              placeholder=""
              value={inputText3[viewIndex] || ''}
              onChangeText={(value) => {
                // Verifica se o valor é apenas letras (sem números ou caracteres especiais)
                if (/^[a-zA-Z]*$/.test(value)) {
                  handleInputChange(viewIndex, value.toUpperCase(), linha); // Atualiza o estado apenas se for uma letra
                }
              }}
              maxLength={1}
              editable={linha == 3 && !gameOver}
            />
          </Animated.View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginTop: 5 }}>
        {views.map((viewIndex) => (
          <Animated.View

            key={viewIndex}
            style={[getRectangleStyle(rowSet4[viewIndex]), { justifyContent: 'center', alignItems: 'center' }, linha - 1 == 4 ? { transform: [{ rotateX }] } : {}]}
          >
            <TextInput
              ref={(ref) => (inputRefs.current[4][viewIndex] = ref)}
              style={[styles.input, { width: '70%', textAlign: 'center', color: '#000' }]}
              placeholder=""
              value={inputText4[viewIndex] || ''}
              onChangeText={(value) => {
                // Verifica se o valor é apenas letras (sem números ou caracteres especiais)
                if (/^[a-zA-Z]*$/.test(value)) {
                  handleInputChange(viewIndex, value.toUpperCase(), linha); // Atualiza o estado apenas se for uma letra
                }
              }}
              maxLength={1}
              editable={linha == 4 && !gameOver}
            />
          </Animated.View>
        ))}
      </View>

      <TryButton title="Chutar" onPress={() => !gameOver && checkWordFill()} />

      <FlashMessage position="top" />
      {/* Códigos sempre dentro da view */}
    </View>
  );
}

const styles = StyleSheet.create({
  rectangle: {
    width: 60,
    height: 60,
    marginHorizontal: 1.5,
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    boxSizing: 'border-box',
  },

  rectangleGray: {
    width: 60,
    height: 60,
    marginHorizontal: 1.5,
    backgroundColor: '#9C9C9C',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    boxSizing: 'border-box',
  },

  rectanglePurple: {
    width: 60,
    height: 60,
    marginHorizontal: 1.5,
    backgroundColor: '#7AB2D3', // Cor de fundo laranja
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 10,
    boxSizing: 'border-box',
  },

  rectangleGreen: {
    width: 60,
    height: 60,
    marginHorizontal: 1.5,
    backgroundColor: '#B1D690', // Cor de fundo verde
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente para sobreposição
  },
  modalContent: {
    position: 'absolute',
    width: 300,
    height: 488,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
