import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import ActionBar from './src/components/ActionBar';
import QR from './src/components/QR';
import Imagen from './src/components/Imagen/Imagen';
import Archivo from './src/components/Archivo/Archivo';


const showScreen = (screen) => {
  switch (screen) {
    case 1:
      return <QR />;
    case 2:
      return <Imagen />;
    case 3:
      return <Archivo />;
  }
}

export default function App() {

  // const [screen, setScreen] = useState(1);
  const [screen, setScreen] = useState(2);

  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView style={styles.background}>
        {showScreen(screen)}
        <ActionBar
          setScreen={setScreen}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#001233',
    height: '100%',
  }
});