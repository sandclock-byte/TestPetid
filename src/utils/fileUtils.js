
import RNFetchBlob from 'rn-fetch-blob';
import { ToastAndroid, Platform, AlertIOS } from 'react-native';

/** 
     * Funciones que se utilizan para analizar y procesar archivos en base a las necesidades del dispositivo PET-ID 
     * 
     * @author   Fernando Bernal Díaz (fernando.bernal@ditems.com)
     * @license  DITEMS
     */


/**
 * Función que convierte la cantidad de bytes en KB o MB según sea el caso
 * @param {number} size Tamaño de archivo en bytes 
 * @return {string} Tamaño en KB o MB según sea el caso
 */
export const fileSize = (size) => {
    const mult = 100;
    return size < 1024 ?
        `${size} Bytes`
        : size < (1024 * 1024) ?
            `${Math.round((size / 1024) * mult) / mult} KB`
            : `${Math.round((size / (1024 * 1024)) * mult) / mult} MB`
}

/**
 * Función que recibe la trama de  de un archivo y la envía (En está App la imprime como un Log)
 * @param {string} tramaArchivo Trama del Archivo que se va a envíar 
 */
export const sendFile = (tramaArchivo) => {
    console.log(tramaArchivo);
}

/**
 * Función que recibe la trama de  de un archivo extrae el nombre del archivo y su base64, 
 * posteriormente se decodifica y se guarda en una carpeta llamada "PET"
 * @param {string} tramaArchivo Trama del Archivo que se va a utilizar para contruir el Archivo
 */
export const saveFile = (tramaArchivo) => {
    let index = tramaArchivo.indexOf(';'); // Identificamos el indice dónde se encuentra el caracter ";" que separa el nombre del archivo y su base64 
    let fileName = tramaArchivo.slice(1, index); // Obtenemos el nombre del archivo de la trama
    let base64File = tramaArchivo.slice(index + 1, tramaArchivo.length - 1); // Obtenemos base64 del archivo de la trama

    let dirs = `${RNFetchBlob.fs.dirs.SDCardDir}/PET/${fileName}`; // Definimos la ruta para almacenar archivo, en este caso se crea una carpeta "PET" en la raíz de la memoria interna

    RNFetchBlob.fs.writeFile(dirs, base64File, "base64") // Se decodifica base64, se obtiene archivo y se almacena en la ruta definida
        .then(() => {
            const message = `Se guardó ${fileName} en ${dirs}`; // Definimos mensaje de archivo guardado
            showMessage(message); // Desplegamos mensaje de éxito
        })
        .catch(() => {
            const message = `No se pudo guardar archivo`; // Definimos mensaje de error
            showMessage(message); // Desplegamos mensaje de error
        });
}

/**
 * Función que despliega un mensaje independientemente del S.O. en que se esté ejecutando la aplicación.
 * @param {string} message Mensaje a mostrar
 */
const showMessage = (message) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    } else {
        AlertIOS.alert(message);
    }
}

/**
 * Función que recibe el nombre de un archivo, identifica su tipo y retorna base64 del icono según su tipo 
 * @param {string} fileName Nombre del archivo con extensión
 * @return {string} base64 del icono según su tipo 
 */
export const getIcon = (fileName) => {
    let ext = fileName.split('.').pop().toUpperCase(); // Obtenemos la extensión del archivo y la convertimos a mayusculas

    switch (ext) { // Aquí vamos a comparar el tipo de archivo que corresponde y asignarle un base64 con su icono. 

        // Caso de los archivos comprimidos.
        case 'ZIP':
        case 'RAR':
        case 'RAR5':
        case '7Z':
        case 'ACE':
        case 'R00':
        case 'GZ':
        case 'TAR.BZ2':
            return 'data:@file/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAADmElEQVR4nO3dy05TURQG4P+UcpcSEZpIIVxMCgOBoGgME6PVoTOjMye+gAMTn8GBiQ+gb2Bi4gMgQ0LiwCgKiFyUIi2Um0DphdYBASxiT0sPZ+2l/zcsa5Md/qy1dw9JCxARERH9j6xSf8Hz0UTWiY0U6umribw/f3K3y6Wd7Hl0tbKkv6HHqY3QyTAAYQxAmFd6A8Vye8afNnaAMHUdYNotqFTsAGEMQBgDEKbuDNA24+2wA4Sp6wDegshRDEAYAxCm7gzQNuPtsAOEqesA3oLIUQxAGAMQpu4M0Dbj7bADhKnrAN6CyFEMQBgDEKbuDNA24+2wA4Sp6wDegshRDEAYAxCm7gzQNuPtsAOEqesA3oLIUQxAGAMQpu4M0Dbj7bADhKnrAN6CyFEMQBgDEKbuDNA24+2wA4Sp6oDd5C7ePHubt+bO4xvwlpe5tKPSqeqAxE7KtiYVT7uwE+eoCiC+sWNbs70Rd2EnzlEVwNriT/uaiH2NSVQFsBpet6+Zt68xiZoAMpksItMx27rF6RgyuxkXduQMNQEsza4gWcghvJPC8rdVF3bkDDUB/JhcKrh2YaLwWmkqAshms1iYjBZcvzAZRTbr6seZnpiKAJbnVpHYShZcn9hKYnlu7RR35BwVAXz/tFj0mvkTrJFgfACZdOZEMz08HsGugtuQ8c+CItMxpI7cfqp9legNdcHf2QAAiM6uYGx4Cpux7YOaVCKN6NcYzgebXN1vsYzvgKN3/2pfJW4+vIbmbj+8FV54K7xoDvpx/cEVVNdV5l1rIuMDiIVzD9PeUBcqqsr/qKuoKkfPrWDetSYyPoD4eu4DuP2xcxx/x7m8a01kfADFXOePfpC/hrcCxgdQ48ud60uzf3/MEJ1ZyV1bX3Uqe3KS8QH4O3JHzsfhL8c+E0rupDA2PJV3rYmMD6CtLwDLOhwum7FtDL0cQXg8glQijVQijfnPEQy9GMHm6uE11LIstPUFJLZcFOPfB/iazqDjUgDT7+YPXotvJDD6+kPedZ2XW+BrrD3t7ZXM+A4AgJ5QEE3tZwuub2pvwMVQ0L7QACoC8JR5MHivH50DLTnj6CjLsnBhoBWD9/vh8ZT8BVGuMH4E7fOUedB3uxud/a2YfR9GdGYF2+t7/4Cvqa+Gv6MBbX0BFWPnd2oC2FfXWIseJeOlECpG0L+MAQhjAMIYgDAGIIwBCGMAwhiAMAYgjAEIYwBEREREJOAXUaDxNh9ZKVwAAAAASUVORK5CYII='
            

        // Caso de los archivos de excel
        case 'XLSX':
        case 'XLSM':
        case 'XLSB':
        case 'XLTX':
        case 'XLTM':
        case 'XLS':
        case 'XLT':
        case 'XML':
        case 'XLAM':
        case 'XLA':
        case 'XLW':
        case 'XLR':
            return 'data:@file/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEz0lEQVR4nO2dbUxbVRjH/62roRvGFwpjxC0y2Bgdc7o56AZMZCzMD5o5Y9AAQ+brHJljmmhi4mf9ojHqoosKo+K2KGCy4OIHNXM4ocAiy9iSLYYNsxewpGDLWmgLfkBU1lOs6bn3Oc19fh/v/2nzT3/3XA49IQAMwzAMwzBGxBTvGzjeKZqWUUQ3THi7s77jdeoas5ipC+jONF5zvFv0FnWNWYwnAFBKgmEE7CyomntBEQmGEbDjvseUlGAYAYCaEgwlAFBPguEEAGpJMKQAQB0JhhUAqCHB0AIAegmGFwDQSmABf0ElgQX8CwoJLOAm9JbAAgToKYEFREEvCSxgHvSQwAL+A60lsIAY0FICC4iRaBLifV8W8D8QSoiTBVLfTWG2f/w4dQUhvAKIYQHEsABiWAAxLIAYFkAMCyCGBRDDAohhAcSwAGJYADEsgBgWQAwLIEa584CynC1Yv3SdMPvuwvfoGeyN+tpNmRtRnFUkzFyXXfjh4gkpHWWinIDz18/jzfI3YLnFEpGtzbgXVc4aTE1PRWRmkxn7SvZi6R13R2SToUk0uZya9I0X5R5BV8auoqWvTZhlptyDB7OLhdm23HLhhw8AR04fxbU/rkvrKBPlBADAZ12NGAuMCbPagqdhuunvy80mM2ryxWe1nhseOHuapXeUhZICvAEvGjoPCbMVqdkoyiqcc21rThmW3blMOH/w1CfwTYxL7ygLJQUAQEtfGwY9vwmzZxy1f68Cs8mMnRsqhXMDI5dwrL9ds44yUFZAaCqED08eEGY5aSuxMdMBAChd+RCW25YL59478T7CU2HNOspAWQEA8OOvHege7BFmuxwzPwtq8quF+U8DP6PrskvLelJQWgAAfHDygHDbuTrdjldL9yPblhWRhafCUVePaigv4MLwRRw/960w27F2u/B625mvMTByScta0lBeAAB8dOog/MFATLO+CR8+7WzQuJE8EkKA2+fGF72HY5pt6DqEUb/4dwgVSQgBAODsbsaQd3jemStjV/HlLy06NZJDwggIhoPwTfjmnRn1jyIUDunUSA4JI+DRNY8gK8p+f5bV6XZsXVWmUyM5JISAhbcuxLOOXTHN7ineDaslSeNG8kgIAbUFNUhZdFdMs2nJqXhq/ZMaN5KH8gIybl+CivufEGZnr/ULr1c9UInU5FQta0lDeQF1xXuEhzND3iHsa30Fbp87IrNakrC78Hk96sWN0gLWZOShZMVmYdbY1YTxyXEcPn1UmG+zl8OenqtlPSkoK8BsMqO+5OWIwxdg5u5vP3ccAPBVXyvc4yMRMyaYUF+yV/h6lVBWwMP2cuQuXiXMGl1OBMNBADPnvUd6xasgb0ketuSUatZRBkoKsFqseHGT+Bk+5B1Ge/83c661nmmD54ZHOF9X/BKSFqi7LVVSQPWGStiSbcKsqfufu38WfzCA5ijfFS2+LQ0V68S7KBVQTsDMPr5CmA37fsexs+Ijxta+6KugJr8atkUp0jrKRDkBdZujPzKaXJ9H3P2z+IOBqDsiq8WKFwqfk9ZRJsb7/wGS6dzfEddnqNwKMBosgBgWQAwLIIYFEMMCiGEBxLAAYlgAMSyAGBZADAsghgUQwwKIYQHEsABiWAAxLIAYFsAwDMMwDMMQ8Cf7eG7ULKZpfAAAAABJRU5ErkJggg==';
            

        // Caso de los archivos tipo imagen
        case 'JPEG':
        case 'JPG':
        case 'PNG':
        case 'BMP':
        case 'ICO':
        case 'SVG':
        case 'WEBP':
        case 'GIF':
        case 'PSD':
        case 'HEIC':
        case 'NEF':
        case 'CRW':
        case 'AI':
        case 'ID':
            return 'data:@file/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAD8ElEQVR4nO3cX08TWRzG8WemLAg0+Ce4emGMF2a9qF66eqMx8Q15t/sS1jvfCanJqtGsgMRoW5QYp4lYkbWsbaG1bKkUW9qZvdAiwrSdzmnndzbzfK5gOj0d+GbmzAm0ABEREVEYGaoD3EnWnUEcSGAM3L51eex36cNoM6UPIHAOfruTqv8hfRht4QsAaBUhNAFipw78qJpECE2AX6YjWkYITQBAzwihCgDoFyF0AQC9IoQyAKBPhNAGAPSIEOoAgHyE0AcAZCMwwDdSERhgH4kIDHBA0BEYwEWQERigg6AiMEAXQURggB6GHYEBPBhmBAbwqFME1XEZoA+uERSNDHQ0jc2kd6UPwRXPAGEMIIwBhDGAMAYQxgDCGEAYAwhjAGEMIIwBhDGAMAYQxgDCGEAYAwhjAGH/i7+IWSslGA4QOz+tPJZtO3hilZDOVgDDQOzsFK7HpmGaym+Z9kX7ANVaAw+frsJ2gDOnp3A0Oqo03pN0CYm35b3vE8tfv75x6aTSuH5pfQlyHODubAY79SbqjSbisxnYjtob89MfKp62BUXrAInXOfyd29r7fq2whaRVUBvUcLnUuG0LiLYBSps1zC+uHdo+l8pivbzte9zY2alD2y66bAuKlgFaLRszjzNotmzXx+J/uT/mxfXYNK5cOIHo+Aii4yO4cuEErsXUJ3e/tJyEZ1NZbJRrHR8v/ruD+VQWN6+e6zpOe74w911iTNPAjUsnxSbdg7Q7A7KFLSStfM/9Elb+h/nBzYJVwkK6NKhDGwqtAnypN3F3NgMvNzr775DcrOS3kXhbRmK5jEzu84CPdHC0CvDg6Soqnxue96/WGri38N5lexN/LhbgOF9D3UsVUKnxXxO7slZKSK/0f7l4s/oJ6Xffn9eyHcSTuR/OjC+7LcSf52Hb+n24lxYB2qtdv+7vO3PmXhfxsbRzaJ98eQdzVtH3awyLeIBe13Iv2qvkTK6KF+82O+63mNnE8j9V368zDOK3oQdXu36tbWyjmMh3ncAdB7j/ch0/HzuC49GflF9zEETPgE6r3f4ZiExOotnqfY2vN1qYefbR90Ju0MQCdFvt9isyMQ5jxPvJXKzU8fiVHusDsQC9VrtemaOjMMaO9P28pfebsD6oX/pUiQTwutrtxTBNmJOTvp//aGkdn6re1x3DEHiAfla7XRkGzGgUKh/+22jaiD/PYVdwPgg8QL+r3U4iExMwIuo3ccVKHY+WNpTH8St8nx09YLd+HVP6HYovxMKOAYQxgDAGEMYAwhhAGAMIYwBhDCCMAYQxgDAGEMYAwhhAGAMIYwBhDCCMAYQxgDAGEMYAwhhAGAMQERERkYD/AAmIuZw3heC3AAAAAElFTkSuQmCC';
            

        // Caso de los archivos PDF
        case 'PDF':
            return 'data:@file/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEGElEQVR4nO3cS2wUdRzA8e9uX2mtLQmChx5KmpSERxMsGCA1GG1rIakEOAABDmq4EIlEL2jiyQtyMhoT44GQGg9FbYQmHKCYyLM82xhbUF6tJUBspEKtAsHd9TBstrM7u852Zuf3b+f3SZrsPP4z//ab7v77yIJSSimlVBhFvF4gsaku4cdEApNgb+Sbm+9LTyMpKj2BwEXYndhY97H0NJLCFwCMihCaAPG1O+w7DIkQngAt24yMEJoAYGaEUAUA8yKELgCYFSGUAcCcCKENAGZECHUAkI8Q+gAgG0EDPCUVQQNMIhFBA6QJOoIGcBBkBA2QRVARNEAOQUTQAP+j0BE0gAuFjKABXMoWwet1NUAeHCN4VOzr1QxW/E6T9BQc6XeAMA0gTAMI0wDCNIAwDSBMAwjTAMI0gDANIEwDCNMAwjSAMA0gTAMI0wDCNICwYP8itqIdNrznfOzJY5j4E4YG4OwhGB7MPOeVLbBmu31fPAF/34cHo/DreejthvF7zvfY8iEsedXdXDv3QF+Pu3M9CDZAUQlUVGU/Xj0HauZD03o4cQC6PoF4LHW8tMx5fGU1PF8L81+Etrfg4Gdw4tvM80rLc99/spJSd+d5ZOZTUCQCL2+GtTvzH1taDht3w2tv+D+vApD9o/zIZej/wXpcVAINq6B2Yep481boPQS/DzuPv94Hg6ehpAzql1ofSe074NolGPo5+/37euDWL87Hsu33mWyAO9ehpyO1fawD3t2XihCJwvJ26P7cefxvg/bxbW/C629bj6NFsHo7fLEr+/0HT8G5w94+B4/Megr69wmc/M6+b95i9+OPfWW9ICctWAHllf7MrUDMCgBw77Z9u3KW+7GxGIxMeuqIFsG8Bn/mVSDmBah41r796GF+4/8as2/PmuttPgVm3n/GLWm2b48O5Tf+4bh9O9eyc9FLUPVc5v7b1+DymfzuO0WyAWbXwAst1uOyCli4Ehpb7ef89GN+14zH7dvRHO9J1diaeT+wVl6hCJC+dEx39QIMnAxuPgLMewpKutEP+z6AhMd3RIvnGD8xBo8dXmMm7mfuKxBzAsRi1hLy1hW4eAQuHbX/GsKt9GXno4ns537/qfjPAbIBznbD1x/5e83qtFXPgz/8vb7PzFuGehGJQk19ajuRgOEBufm4MLMCNK2Dqtmp7Rv91q+4DWbOa8BUzK21lrHPVEH9MmhssR8/sl9mXnmY3gEaVlkfTo53wpXeYOczBdM7gJNYDHr2w+EvpWfiyswI8M84jN2FqxfhVBeMjkjPyLXwvXe0zyIHbnr6Gs6sVdA0pAGEaQBhGkCYBhCmAYRpAGEaQJgGEKYBhGkAYRpAmAYQpgGEaQBhGkCYBhCmAYRpAGEaQJgGEKYBhGkApZRSSikl4D+zmShOjtHOcAAAAABJRU5ErkJggg==';
            

        // Caso de los archivos TXT
        case 'TXT':
            return 'data:@file/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEP0lEQVR4nO3cW1MaZxzH8R9ECUZADuHsGqyJaPWi6USb6fTOmbyHvoL2HbT3vWnfQXKdF9GZTC87k6qZSacmHjqmIngABRERoxZ2e5Fk2Uc0EQb2v0/3/7lyH3aXlS8Ph1UAGGOMMcbsyNGtHT37/g+tW/syheb45dGTr36kPgwn9QGQcWg/PPtu/mfqw7BvAMASEWwX4M5cTBwgjmC7AImvw5aKYLsAgLUi2DIAYJ0Itg0AWCOCrQMA9BFsHwCgjcAB3qOKwAEMKCJwgAvMjsABLmFmBA5wBbMicICPMCMCB/iEXkfgANfQywgc4Jp6FYEDtKEXEThAm66K0On+OEAHLo3Qob6u7EUiz39aoj4EAc8AYhyAGAcgxgGIcQBiHIAYByDGAYhxAGIcgBgHIMYBiHEAYhyAGAcgxgGIcQBipv9FLJMv49eFtba3m51QMHUngqe/vUS9oerj9+8m8PDzEWHdP9d38Hw5qy874cC3c19gs1DG768ybV/33Jd3MT58u+3trsP0AKqq4ey83vZ29YYK981+jCVC+OvNrj6+9E8esxMKnM7mZ86XNvLCdYwrYfgGb6Kuqh1dd8MQvNukewiaSSdxw3Bj107PkSmU9eXdUhWlyknLNlZl+gwI+m7hm+mUMLZVrCCTb96I8ZAXY/GQsE4yPAQA8N5yI62Esby5p1/2aiOPz+JB/Wej0VgAYb8HAJAI+Vque32nhPxBtbl+PIhkyCesE3m/fS+YHsDvcePBxLA4uAohQDTgbV3HYGZCwXJ2H9DefT1FJl9G7e05+vv78PdWUVj3waRi2K8H0YB4Yx6dnAkBRiJDuH/PvBkj3UMQAAS8AxhLNGeIqmp4vVnAWnYP/9Yb+ng85Gu5N1uNtP8XNJNO4s12897+eqMAt0v8dWYN936rknIGAEAs6MVI1K8vV2qnKJSP9eXbQ4NIxQIUh9YWaQMAwEz66ueJ2Umle1+G1ENSB1AifsRD3pZxv8eNe8nevHHqNqkDAEC90fpFXQ1Vg6b17s1TN0kdYGP3APuHxy3j1ZMzrGT3CY6ofVIHeLG6deVli6u5D28TLE3aAFv7R9guHenLfs8AYsHm88Hh8SnWt4uXbWop0gZYXMsJy9OpKKZHxQ9NzK/kYPVJIGWAvcMasoZTF06nA5OpCMaVMFz9N/TxYqWGTcN6ViRlgIWVrHDPHo2HMOh2wdXnRHo4LKw7vyLOFKuRLkC5+hbrOwfC2HQq0vz5wsPQbukIO8WKKcfWCekCLK7mYHx54xlwIRUL6svRoEc//fzBwkdeLVGTKkD15BRrOfH1/VQqCseFcw5ThhkBvDtdbTxPZCX2/e7oLnv0+GFHt6VUM+D/iAMQ4wDEOAAxDkCMAxDjAMQ4ADEOQIwDEOMAxDgAMQ5AjAMQ4wDEOAAxDkCMAxDjAMQ4ADEOQIwDEOMAjDHGGGOMwH+t2FX1CofvaAAAAABJRU5ErkJggg==';
            

        // Caso de los archivos de Word
        case 'DOCX':
        case 'DOCM':
        case 'DOTX':
        case 'DOTM':
        case 'DOC':
        case 'DOT':
        case 'RTF':
            return 'data:@file/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAE10lEQVR4nO2dz1NbVRTHv/kBITRNkbYkAVJbZ2wJSuWHumCnCxeOjgv3LjouXVdXrlzULl36F7hxxo0bVy5000QJseiMU8cEQmlBoKGGpPn1XNBn3su9N9Am5JyZdz47Lo+Xy/3ce855h2QABEEQBEEQvIiv1xskbuasfkxkUFjAlw9uX/+Meh42fuoJDBof8Gn8Zu4W9TxsPCcA4CXBMwI+eTvm+pqLBM8I+Gj5AksJnhEA8JTgKQEAPwmeEwDwkuBJAQAfCZ4VAPCQ4GkBAL0EzwsAaCWIgKdQSRABDigkiIAOBi1BBGgYpAQRYGBQEkRAFwYhQQQcw2lLEAEn4DQliIATYpLQ631FwDOgk9Arwb7ejTFvfrFGPQUtcgKIEQHEiABiRAAxIoAYEUCMCCBGBBAjAogRAcSIAGJEADEigBgRQIwIIIb87wGfvzuB8JC6D7768R9slRrK+FtXI3gnFXGNlSpN3PphR3v/G8vjePnisDL+bbaETKHynLPuH+QCXpsK4/UXw8r4T3+V8X3psTL+4UIU789FXWOWBXz98z72yqqwj5fHMTWm/prfZB71MOv+QR6CVor6XZiKh7TjC0lVls8HzE+PKOPRcACT59TFrzUs/PHwyTPO9HQgF5A1CJhNqAt6MRLE9NiQ9nqdgFQsBJ/mo+hrW1XUGjw+X04uYLVY1Y6n4uqCLl5Sx2yWNCdjxnCKTK9JAbmAjf06dv5VY/fkuSBeGA24xham1UW2mU+GEfC7t/usQYDp1FFALgAw78hrMfcC6uK/TSTkV6qdlCaMAUBWToCb3KYpDLUFBPw+zE2ZQxAALF5qCwr4fbg6oZafB5Um8nu155xp/2EhwLQjZx15YCYWwpnh7tNddJyQy+ND2ueLbLEKi0f+BcBEwEqxol2UVKJ9Aha7hB+bJccJcP5s52txgoUAU1i4NhFC8GlinU92Dz8AcOX8MMbPHNX9qRj/CghgIgDQh6HhoA9XLhzV/boE3Pnk63wgm9GUsQDw230RoMVUGs7ERhANB/DSeXdCLVWa+G71QLneFvDqpCqg+KiO7cdqyUsJHwEbhkScCGEpGVaeaNOFCu5ommlLyTDGRgOIR9UWBKfy04a8GWdjtweGg+6VTsVD2rbBL+sV3MkfJW+nnPlkWLv7AWCVWQIGGJ2AetPC7w/UHfpKYkRbAWXWK9gtN5TkHQn58UFHt9SG4wlgIwDQh6GJs0G8cdktoN60/n94S+fVXf3e3FllrNmycJdZAga4CTCEiM4Hqrv3q6jWWwCA9Pqhcv2o5oHtz+0aDmutPsyyvzATcLIdmllvi9KdAB0rG/ziP8BMQH6vhv3D5rHXZQrtXf/3bu1EpeWqod9EDSsBlgXkNo/fqSsdueJXQwnrhFML2gkrAcDxYaiwV8fDjh2fLqh5wMlhrYV723w6oE7YCTC1pm0ymsVO57sLyG1W0WgxaoE6YCegM7x04kzANmtbT1DuUuFwDT8AQwG75QY29uvG7+vey9NoWch2qXK4dUCdsBMAmBfsoNLEvR3920l0fSEbzifAc/8/oN9s3b7e0xqyPAFeQgQQIwKIEQHEiABiRAAxIoAYEUCMCCBGBBAjAogRAcSIAGJEADEigBgRQIwIIEYEECMCBEEQBEEQBAL+A3WdpGM2w5YKAAAAAElFTkSuQmCC';
            

        // Caso de los archivos con extensión desconocida
        default:
            return 'data:@file/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAABYklEQVR4nO3TwUlDURRF0RMj2IBgB5k4ti9nWoLO0ol96NhigoM4MSDhJ0Z+8vaFu3cBl/NYvMTMzMysY4u5B9bvm+05hgxrkdfHh5tnesauK3rA8LZ5Wn9sXugZu/oBJKUQ2gDc3+09tQhCG4DV7bIkQhuApCZCK4CkHkI7gKQWQkuApA5CW4CkBkJrgIRHaA+QsAgC/EQhCPArAkGAvUYjCDDRSAQBDjQKQYAjjUAQ4I8ujSDACV0SQYATO4Qw964A/2gSYWbXZ71WuLfPL3rCZP4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AOAHgBIATAE4AMzMzMwP6Bp5HZQsBArZtAAAAAElFTkSuQmCC';
            
    }
}