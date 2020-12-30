import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import FileActions from './FileActions';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { fileSize, getFileType, sendFile, saveFile, getIcon } from '../../utils/fileUtils'

export default function Archivo() {

    const [isFileSelected, setIsFileSelected] = useState(false);

    const [file, setFile] = useState({
        name: '',
        size: '',
        base64: '',
    });

    useEffect(() => {
        if (file.base64 != '') {

            let tramaArchivo = `*${file.name};${file.base64}#`;

            let act =
                <View style={styles.viewButtons}>
                    <TouchableOpacity onPress={() => chooseAFile()}>
                        <View style={styles.actionButton}>
                            <Image
                                style={styles.imageButtons}
                                source={require('../../assets/Archivo/adjuntar.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => sendFile(tramaArchivo)}>
                        <View style={styles.actionButton}>
                            <Image
                                style={styles.imageButtons}
                                source={require('../../assets/Archivo/enviar.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => saveFile(tramaArchivo)}>
                        <View style={styles.actionButton}>
                            <Image
                                style={styles.imageButtons}
                                source={require('../../assets/Archivo/guardar.png')}
                            />
                        </View>
                    </TouchableOpacity>
                </View>;
            setShowActions(act);

            let type = getFileType(file.name);
            let deta =
                <View style={styles.viewDetails}>
                    <View style={styles.viewContentDetails}>
                        <View style={styles.viewIconDetails}>
                            <Image
                                style={styles.iconDetails}
                                source={{
                                    uri: getIcon(type)
                                }}
                            />
                        </View>
                        <Text style={styles.text}>Nombre: {file.name}</Text>
                        <Text style={styles.text}>Tamaño: {fileSize(file.size)}</Text>
                    </View>
                </View>;

            setShowDetails(deta);
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
                name: res.name,
                size: res.size,
                base64: result,
            });

            setIsFileSelected(true);

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
                        source={require('../../assets/Archivo/adjuntar.png')}
                    />
                </View>
            </TouchableOpacity>

        </View>;

    let details = <View></View>;

    const [showActions, setShowActions] = useState(actions);
    const [showDetails, setShowDetails] = useState(details)

    return (
        <>
            <View style={styles.InstructionsContent}>
                <Text style={styles.text}>Selecciona un Archivo</Text>
                <Text style={styles.text}>para envíar</Text>
            </View>

            {showDetails}

            {/* {showActions} */}

            <FileActions
                isFileSelected={isFileSelected}
                chooseAFile={chooseAFile}
            />

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
