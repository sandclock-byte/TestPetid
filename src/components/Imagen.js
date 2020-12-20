import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { base64JPGtoEpaper } from '../utils/base64ToEpaper';

const croperOptions = {
    width: 200,
    height: 200,
    cropping: true,
    includeBase64: true,
    hideBottomControls: true,
}
let imagenCArray;

export default function Imagen() {
    const [base64, setBase64Image] = useState('');
    const [cArray, setCArray] = useState('');
    const [showImg, setShowImg] = useState(defaultImg());


    useEffect(() => {
        imagenCArray = cArray;
    }, [cArray])

    const takePhoto = () => {
        ImagePicker.openCamera(croperOptions).then(image => {
            const base64 = base64JPGtoEpaper(image.data, setCArray);
            setBase64Image(base64);
            setShowImg(updateImg(base64, cArray));
        });
    }

    const choosePhoto = () => {
        ImagePicker.openPicker(croperOptions).then(image => {
            const base64 = base64JPGtoEpaper(image.data, setCArray);
            setBase64Image(base64);
            setShowImg(updateImg(base64, cArray));
        });
    }

    const sendImage = () => {
        console.log(imagenCArray);
    }

    const updateImg = (base64) => {
        if (base64 != '') {
            return (
                <View style={styles.preViewContent}>
                    <TouchableOpacity onPress={() => {sendImage()}}>
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
            );
        }
        else {
            return defaultImg();
        }
    }

    return (
        <>
            <View style={styles.InstructionsContent}>
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
        <View>
        </View>
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

    preViewContent: {
        height: '64%',
        alignItems:'center',
        justifyContent: 'center',
    },

    textButton: {
        fontSize: 16,
        color: '#979dac',
        textAlign: 'center',
    },

    viewButton: {
        marginBottom: '15%',
        backgroundColor: '#33415c',
        borderRadius: 50,
        paddingVertical: 10,
        width: 100,
    },

    preViewImage: {
        width: 200,
        height: 200,
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
