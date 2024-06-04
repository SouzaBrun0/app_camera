import { CameraView, useCameraPermissions,Camera } from 'expo-camera';
import { useState,useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Modal,Image } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';


export default function App() {
  const camRef =useRef(null)
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturePhoto, setCapturedPhoto] = useState(null)
  const [open, setOpen] =useState(false)

  if (!permission) {
    // As permissões da câmera ainda estão carregando..
    return <View />;
  }

  if (!permission.granted) {
    //As permissões da câmera ainda não foram concedidas.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos da sua permissão para mostrar a câmera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));// função que muda camera
  }

  async function takePicture(){
    if(camRef){
        const data = await camRef.current.takePictureAsync();
        setCapturedPhoto(data.uri)
        setOpen(true)
      }
    
  }
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camRef}>
        <View style={styles.buttonContainer}>

          <TouchableOpacity style={styles.buttonFlip} onPress={toggleCameraFacing}> 
            <FontAwesome  name='exchange' size={23} color="red"></FontAwesome>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.buttonCamera}
          onPress={takePicture}>
            <FontAwesome name='camera' size={23} color="#fff"></FontAwesome>
          </TouchableOpacity>
        </View>
       
        {capturePhoto &&(
          <Modal
          animationType="slide"
          trasparent={true}
          visible={open}>
          <View style={styles.contentModal}>

              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {setOpen(false)}}>
                
              <FontAwesome name='close' size={50} color="fff"></FontAwesome>
              </TouchableOpacity>

          
            <Image style={styles.imgPhoto} source={{uri : capturePhoto}} />
          </View>
          </Modal>
        )}
          
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width:"100%",
    height:"100%"

  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
   
  },
  buttonFlip: {
    position:"absolute",
    bottom:50,
    left:30,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff",
    margin:20,
    height:50,
    width:50,
    borderRadius:50,

},  buttonCamera: {
  position:"absolute",
  bottom:50,
  right:30,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"red",
  margin:20,
  height:50,
  width:50,
  borderRadius:50,
},
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
   
    
  },contentModal:{
    flex:1,
    justifyContent:"center",
    alignItems:"flex-end",
    margin:20,

  },closeButton:{
    position:"absolute",
    top:10,
    left:2,
    margin:10,
    color:"black",
  },
  imgPhoto:{
    width:"100%",
    height:400,
  }

});