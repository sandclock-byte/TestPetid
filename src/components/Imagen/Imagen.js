import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ShowImage from './ShowImage';
import ImageActions from './ImageActions';
import ImagePicker from 'react-native-image-crop-picker';
import { base64JPGtoEpaper } from '../../utils/base64ToEpaper';

const croperOptions = {
    width: 200,
    height: 200,
    cropping: true,
    includeBase64: true,
    hideBottomControls: true,
}

export default function Imagen() {
    const [base64, setBase64Image] = useState('');
    const [cArray, setCArray] = useState('');

    const takePhoto = () => {
        ImagePicker.openCamera(croperOptions).then(image => {
            const base64 = base64JPGtoEpaper(image.data, setCArray);
            setBase64Image(base64);
        });
    }

    const choosePhoto = () => {
        ImagePicker.openPicker(croperOptions).then(image => {
            const base64 = base64JPGtoEpaper(image.data, setCArray);
            setBase64Image(base64);
        });
    }
    return (
        <>
            <View style={styles.InstructionsContent}>
                <Text style={styles.text}>Toma una Foto</Text>
                <Text style={styles.text}>o</Text>
                <Text style={styles.text}>Selecciona una Imagen</Text>
            </View>

            <ShowImage
                base64={base64}
                cArray={cArray}
            />

            <ImageActions
                takePhoto={takePhoto}
                choosePhoto={choosePhoto}
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
