import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { base64JPGtoEpaper } from '../utils/base64ToEpaper';

export default function Imagen() {
    const [base64Image, setBase64Image] = useState('');
    const [cArray, setCArray] = useState('');
    const [showImg, setShowImg] = useState(defaultImg());

    const takePhoto = () => {
        ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true,
            hideBottomControls: true,
        }).then(image => {
            const base64 = base64JPGtoEpaper(image.data, setCArray);
            setBase64Image(base64);
            setShowImg(updateImg());
            console.log(base64Image);
        });
    }
    
    const choosePhoto = () => {
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true,
            hideBottomControls: true,
        }).then(image => {
            const base64 = base64JPGtoEpaper(image.data, setCArray);
            setBase64Image(base64);
            setShowImg(updateImg(base64));
        });
    }

    const updateImg = () => {
        if (base64Image != '') {
            return (
                <Image
                    source={{ uri: base64Image }}
                />
            );
        }
        else {
            return defaultImg();
        }
    }

    return (
        <>
            <View style={styles.content}>
                <Text style={styles.text}>Toma una Foto</Text>
                <Text style={styles.text}>o</Text>
                <Text style={styles.text}>Selecciona una Imagen</Text>
            </View>

            {showImg}

            <View style={styles.viewButtons}>
                <TouchableOpacity onPress={() => takePhoto(setCArray, setBase64Image)}>
                    <View style={styles.actionButton}>
                        <Image
                            source={require('../assets/Imagen/cameraIcon.png')}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => choosePhoto(setCArray, setBase64Image)}>
                    <View style={styles.actionButton}>
                        <Image
                            source={require('../assets/Imagen/galleryIcon.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>

        </>
    )
}

const defaultImg = () => {
    return (
        <View></View>
    )
}

const styles = StyleSheet.create({
    content: {
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
})
