import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, NativeModules } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import base64toPixels from '../utils/base64ToPixels';



export default function QR() {


    const [formQr, setFormQr] = useState('');
    const [showQr, setShowQr] = useState(defaultQR());
    const [qrBase64, setQrBase64] = useState('');
    const [qrSvg, setQrSvg] = useState(null);



    const onChange = (e) => {
        setFormQr(e.nativeEvent.text.trim());
    }

    const imprimirbase64 = () => {
        base64toPixels(qrBase64);

    }

    if (qrSvg != null) {
        qrSvg.toDataURL((data) => {
            setQrBase64(`data:image/png;base64,${data}`);
        });
    }

    const updateQR = (text) => {
        if (text != '') {
            return (
                <View style={styles.qr}>
                    <QRCode
                        value={text}
                        size={118}
                        quietZone={5}
                        logo={require('../assets/QR/logoQR.png')}
                        logoSize={30}
                        getRef={c => {
                            setQrSvg(c);
                        }}
                    />
                </View>
            )
        } else {
            return defaultQR();
        }
    }

    return (
        <>
            <View style={styles.content}>

                <Text style={styles.text}>Ingresa un texto para crear un QR</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Ingresa un texto'
                    placeholderTextColor='#7d8597'
                    onChange={(e) => onChange(e)}
                />

            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => setShowQr(updateQR(formQr))}>
                    <View style={styles.button}>
                        <Text style={styles.textButton} >Generar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => imprimirbase64()}>
                    <View style={styles.button}>
                        <Text style={styles.textButton} >Envíar</Text>
                    </View>
                </TouchableOpacity>

            </View>

            {showQr}

        </>
    )



}

const defaultQR = () => {
    return (
        <View></View>
    )
}


const styles = StyleSheet.create({
    content: {
        marginTop: '10%',
        width: '100%',
        alignItems: 'center'
    },

    text: {
        color: '#979DAC',
        fontSize: 22,
        marginBottom: 20
    },

    input: {
        height: 50,
        color: '#979DAC',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#002855',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#33415C',
    },

    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 70,
    },

    button: {
        backgroundColor: '#33415c',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30,
        width: 130
    },

    textButton: {
        fontSize: 16,
        color: '#979dac',
        textAlign: 'center',
    },

    qr: {
        width: '100%',
        alignItems: 'center',
        marginTop: '20%'
    }
})
