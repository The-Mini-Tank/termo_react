import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    
    <View style={styles.container}>
      <View style={styles.menuBox}>
        
        {/* Logo "Termo" */}
        <Text style={styles.logo}>Termo</Text>
        
        {/* Botão para iniciar o jogo */}
        <View style={styles.buttonContainer}>
          <Button
            title="Iniciar Jogo"
            onPress={() => router.push('/game')}
            color="#007bff"
          />
        </View>

        {/* Botão para ver as regras */}
        <View style={styles.buttonContainer}>
          <Button
            title="Regras"
            onPress={() => alert('O jogador tem cinco tentativas para adivinhar uma palavra de cinco letras, Após cada tentativa, o jogo indica se as letras estão corretas e na posição correta, se estão na palavra mas na posição errada, ou se não estão na palavra, As letras corretas ficam verdes, as que estão na palavra mas na posição errada ficam azuis, e as que não estão na palavra não mudam de cor  ')}
            
            color="#007bff"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  menuBox: {
    width: '90%',             // Limite lateral mais reduzido
    maxWidth: 350,             // Limite máximo para centralização em telas maiores
    backgroundColor: '#f0f0f0',
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderRadius: 20,          // Bordas mais arredondadas para um efeito mais estilizado
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',

    // Gradiente leve para fundo (para melhorar visualmente em iOS)
    backgroundColor: 'linear-gradient(180deg, #f8f9fa, #e0e0e0)',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
    letterSpacing: 2,          // Espaçamento entre letras para dar um toque mais "clean"
  },
  buttonStyle: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  }, 
  buttonContainer: {
    width: '100%',
    marginVertical: 10,           // Espaço entre os botões
  },       
});