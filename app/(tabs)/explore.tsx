import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function TabTwoScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned,setScanned]= useState(false)

  useEffect(() => {
    (async () => {
      if (!permission) {
        await requestPermission();
      }
    })();
  }, [permission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanned) {
      return;
    }
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(true);
  };

  return (
    <View style={styles.container}>
      { <CameraView style={styles.camera} facing={facing} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          {scanned && (
            <TouchableOpacity onPress={() => setScanned(false)}>
            <Text style={styles.text}>scan</Text>
              
              </TouchableOpacity>
          )}
        </View>
      </CameraView> }
    </View>
  );
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  ViewContainer:{
    flex: 1,
    paddingTop: 30,
    flexDirection:"column",
    justifyContent: "center",
    alignItems:"center"
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})