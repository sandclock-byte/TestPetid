import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'

export default function FileActions(props) {

    const { chooseAFile } = props;
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
