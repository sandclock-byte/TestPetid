import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Actions() {
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

const styles = StyleSheet.create({})
