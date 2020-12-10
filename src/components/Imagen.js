import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function Imagen() {
    return (
        <>
            <View style={styles.content}>
                <Text style={styles.text}>Toma una Foto</Text>
                <Text style={styles.text}>o</Text>
                <Text style={styles.text}>Selecciona una Imagen</Text>
            </View>

            <View style={styles.viewButtonCamera}>
                <TouchableOpacity onPress={() => { }}>
                    <View style={styles.cameraButton}>
                        <Image
                            source={require('../assets/Imagen/cameraIcon.png')}
                        />
                    </View>
                </TouchableOpacity>
            
                <TouchableOpacity onPress={() => { }}>
                    <View style={styles.cameraButton}>
                        <Image
                            source={require('../assets/Imagen/galleryIcon.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    content: {
        marginTop: '5%',
        width: '100%',
        alignItems: 'center'
    },

    text: {
        color: '#979DAC',
        fontSize: 22,
    },

    viewButtonCamera: {
        flexDirection: 'row',
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 55, width: '100%',
    },

    cameraButton: {
        marginBottom: 40,
        backgroundColor: '#33415c',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
        width: '100%',
    },
})
