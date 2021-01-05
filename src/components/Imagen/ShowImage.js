import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ShowImage(props) {
    const { base64 } = props;
    let showimg = base64 != '' ?
        <View style={styles.preViewContent}>
            <TouchableOpacity onPress={() => { sendImage() }}>
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

        return showimg
}

const styles = StyleSheet.create({})
