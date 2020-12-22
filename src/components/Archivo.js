import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

const chooseAFile = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        // console.log(res.uri);
        // console.log(res.type); // mime type
        // console.log(res.name);
        // console.log(res.size);

        const result = await RNFetchBlob.fs.readFile(res.uri, 'base64');
        console.log(result);
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
        } else {
            throw err;
        }
    }
}

export default function Archivo() {
    return (
        <>
            <View style={styles.InstructionsContent}>
                <Text style={styles.text}>Selecciona un Archivo</Text>
                <Text style={styles.text}>para envíar</Text>
            </View>

            <View style={styles.viewButtons}>
                <TouchableOpacity onPress={chooseAFile}>
                    <View style={styles.actionButton}>
                        <Image
                            style={styles.imageButtons}
                            source={require('../assets/Archivo/adjuntar.png')}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { }}>
                    <View style={styles.actionButton}>
                        <Image
                            style={styles.imageButtons}
                            source={require('../assets/Archivo/guardar.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>

        </>

    )
}

const styles = StyleSheet.create({
    InstructionsContent: {
        marginTop: '5%',
        width: '100%',
        alignItems: 'center'
    },

    text: {
        color: '#979DAC',
        fontSize: 22,
    },

    viewButtons: {
        flexDirection: 'row',
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 55, width: '100%',
    },

    actionButton: {
        marginBottom: 40,
        backgroundColor: '#33415c',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignItems: 'center',
        width: '100%',
    },

    imageButtons: {
        height: 50,
        width: 50,
    },
})
