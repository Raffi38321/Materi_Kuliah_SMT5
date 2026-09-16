import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{textAlign:"center"}}>Nama Lengkap: Muhammad Raffi</Text>
      <Text style={{textAlign:"center"}}>Tempat Tanggal Lahir:Cirebon 23-januari-2006</Text>
      <Text style={{textAlign:"center"}}>Cita-Cita: Backend Developer</Text>
      <Text style={{textAlign:"center"}}>Rencana Hidup: jadi saya akan terus mengasah skill saya</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
