import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

export default function QR() {

    const [formQr, setFormQr] = useState('');

    const onChange = (e) => {
        setFormQr(e.nativeEvent.text.trim());
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
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.textButton} >Generar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.textButton} >Envíar</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </>
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
})
