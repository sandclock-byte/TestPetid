import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { fileSize, getFileType, getIcon } from '../utils/fileUtils'

export default function Archivo() {

    const [file, setFile] = useState(defaultValue());
    const [fileTram, setFileTram] = useState('');

    useEffect(() => {
        if (file.base64 != '') {
            let act =
                <View style={styles.viewButtons}>
                    <TouchableOpacity onPress={() => chooseAFile()}>
                        <View style={styles.actionButton}>
                            <Image
                                style={styles.imageButtons}
                                source={require('../assets/Archivo/adjuntar.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => sendFile()}>
                        <View style={styles.actionButton}>
                            <Image
                                style={styles.imageButtons}
                                source={require('../assets/Archivo/enviar.png')}
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
                </View>;
            setShowActions(act);
            console.log(file.uri);
            console.log(file.type);
            console.log(file.name);
            console.log(file.size);
        }
    }, [file])

    const chooseAFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            const result = await RNFetchBlob.fs.readFile(res.uri, 'base64');

            setFile({
                ...file,
                uri: res.uri,
                type: res.type,
                name: res.name,
                size: res.size,
                base64: result,
            });

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    let actions =
        <View style={styles.viewButtons}>

            <TouchableOpacity onPress={() => chooseAFile()}>
                <View style={styles.actionButton}>
                    <Image
                        style={styles.imageButtons}
                        source={require('../assets/Archivo/adjuntar.png')}
                    />
                </View>
            </TouchableOpacity>

        </View>;

    const [showActions, setShowActions] = useState(actions);

    const sendFile = () => {
        const tramaArchivo = `*${file.base64}#`
        setFileTram(tramaArchivo);
        console.log(tramaArchivo);
    }

    return (
        <>
            <View style={styles.InstructionsContent}>
                <Text style={styles.text}>Selecciona un Archivo</Text>
                <Text style={styles.text}>para envíar</Text>
            </View>

            <View style={styles.viewDetails}>
                <View style={styles.viewContentDetails}>
                    <View style={styles.viewIconDetails}>
                        <Image
                            style={styles.iconDetails}
                            source={{
                                uri: getIcon(getFileType('Imagen2.jpg'))
                            }}
                        />
                    </View>
                    <Text style={styles.text}>Nombre: Imagen2.jpg</Text>
                    <Text style={styles.text}>Tamaño: {fileSize(10338)}</Text>
                </View>
            </View>

            {showActions}

        </>

    )
}

const defaultValue = () => {
    return {
        uri: '',
        type: '',
        name: '',
        size: '',
        base64: '',
    }
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

    viewDetails: {
        height: '68.5%',
        marginHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },

    viewContentDetails: {
        backgroundColor: '#33415c',
        borderRadius: 30,
        padding: 20,
    },

    viewIconDetails: {
        alignItems: 'center',
        marginBottom: 15,
    },

    iconDetails: {
        height: 80,
        width: 80
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

    textArchivo: {
        color: '#979DAC',
        fontSize: 15,
    },
})
