import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function ActionBar(props) {

    const { setScreen } = props;

    return (
        <View style={styles.viewFooter}>

            <TouchableOpacity onPress={() => setScreen(1)}>
                <View style={styles.viewButton}>
                    <Text style={styles.text} >QR</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setScreen(2)}>
                <View style={styles.viewButton}>
                    <Text style={styles.text} >Imagen</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setScreen(3)}>
                <View style={styles.viewButton}>
                    <Text style={styles.text} >Archivo</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        marginBottom: 20
    },

    viewButton: {
        backgroundColor: '#33415c',
        borderRadius: 50,
        paddingVertical: 10,
        width: 100,
    },

    text: {
        fontSize: 16,
        color: '#979dac',
        textAlign: 'center',
    },
})
