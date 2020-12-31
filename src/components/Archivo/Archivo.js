import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FileActions from './FileActions';
import FileDetails from './FileDetails';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';

export default function Archivo() {

    const [isFileSelected, setIsFileSelected] = useState(false);

    const [file, setFile] = useState({
        name: '',
        size: '',
        base64: '',
    });

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

    return (
        <>
            <View style={styles.InstructionsContent}>
                <Text style={styles.text}>Selecciona un Archivo</Text>
                <Text style={styles.text}>para envíar</Text>
            </View>

            <FileDetails
                isFileSelected={isFileSelected}
                file={file}
            />

            <FileActions
                isFileSelected={isFileSelected}
                chooseAFile={chooseAFile}
                file={file}
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
})
