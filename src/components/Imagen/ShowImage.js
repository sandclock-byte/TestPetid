import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

export default function ShowImage(props) {
    const { base64, cArray } = props;
    let showimg = base64 != '' ?
        <View style={styles.preViewContent}>
            <TouchableOpacity onPress={() => { sendImage(cArray) }}>
                <View style={styles.viewButton}>
                    <Text style={styles.textButton} >Envíar</Text>
                </View>
            </TouchableOpacity>

            <Image
                style={styles.preViewImage}
                source={{
                    uri: base64,
                }}
            />
        </View>
        : undefined;

    return (
        <>
            {showimg}
        </>
    )
}

const sendImage = (imagenCArray) => {
    console.log(imagenCArray);
}

const styles = StyleSheet.create({

    preViewContent: {
        height: '64%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewButton: {
        marginBottom: '15%',
        backgroundColor: '#33415c',
        borderRadius: 50,
        paddingVertical: 10,
        width: 100,
    },

    textButton: {
        fontSize: 16,
        color: '#979dac',
        textAlign: 'center',
    },

    preViewImage: {
        width: 200,
        height: 200,
    },

})
