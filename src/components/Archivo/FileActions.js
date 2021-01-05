import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { sendFile, saveFile } from '../../utils/fileUtils'

export default function FileActions(props) {
    const { isFileSelected, chooseAFile, file } = props;
    let tramaArchivo = `*${file.name};${file.base64}#`;
    let moreActions =
        isFileSelected ?
            {
                send:
                    <TouchableOpacity onPress={() => sendFile(tramaArchivo)}>
                        <View style={styles.actionButton}>
                            <Image
                                style={styles.imageButtons}
                                source={require('../../assets/Archivo/enviar.png')}
                            />
                        </View>
                    </TouchableOpacity>,

                save:
                    <TouchableOpacity onPress={() => saveFile(tramaArchivo)}>
                        <View style={styles.actionButton}>
                            <Image
                                style={styles.imageButtons}
                                source={require('../../assets/Archivo/guardar.png')}
                            />
                        </View>
                    </TouchableOpacity>
            }
            : {};

    return (
        <View style={styles.viewButtons}>

            <TouchableOpacity onPress={() => chooseAFile()}>
                <View style={styles.actionButton}>
                    <Image
                        style={styles.imageButtons}
                        source={require('../../assets/Archivo/adjuntar.png')}
                    />
                </View>
            </TouchableOpacity>

            {moreActions.send}
            {moreActions.save}

        </View>
    )
}

const styles = StyleSheet.create({

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
