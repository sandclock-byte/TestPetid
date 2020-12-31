import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { fileSize, getFileType, getIcon } from '../../utils/fileUtils';

export default function FileDetails(props) {

    const { isFileSelected, file } = props;

    let type = getFileType(file.name);

    let details =
        isFileSelected ?
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
                    <Text style={styles.textArchivo}>Nombre: {file.name}</Text>
                    <Text style={styles.textArchivo}>Tamaño: {fileSize(file.size)}</Text>
                </View>
            </View>
            : undefined;

    return (
        <>
            {details}
        </>
    );
}

const styles = StyleSheet.create({

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

    textArchivo: {
        color: '#979DAC',
        fontSize: 20,
    },

})
