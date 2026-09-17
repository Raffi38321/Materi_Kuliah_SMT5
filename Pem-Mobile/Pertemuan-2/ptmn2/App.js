import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, 
  Text, 
  View,
  Image,
  Button,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaViewBase,
  Alert,
  Platform 
} from 'react-native';

const PROFILE = {
  name:"Muhammad Raffi",
  title:"Backend Developer",
  email:"raffi38321@gmail.com",
  phone:"0859-7181-5705",
  location:"Cirebon, West Java",
  bio:"Lususan bootcamp asah dan coding camp",
  avatar:"./assets/selena potrait.jpg"
}

const SKILLS = [
  {
    id:"1",name:"ExpressJs", level:90,color:"#844e4e"
  },
  {
    id:"2",name:"NestJs", level:60,color:"#14e2ce"
  },
  {
    id:"3",name:"TypeScipt", level:90,color:"#844e4e"
  },
  {
    id:"4",name:"NextJs", level:80,color:"#45e111"
  },
  {
    id:"5",name:"MongoDB", level:90,color:"#7863c5"
  },
  {
    id:"1",name:"ExpressJs", level:90,color:"#2b064e80"
  }
]

const SECTIONS = [
  {
    "title":"pengalama kerja",
    data:[
      {
        id:"",
        role:"",
        company:"",
        period:"",
        desc:""
      }
    ]
  },
  {
    "title":"🎓️pedidikan",
    data :[
      {
        id:"e1",
        role:"S1 informatika",
        company:"UIN SIBER SYEKH NURJATI CIREBON",
        periode:"2024-2029",
        desc:"IPK 3.75 / 4.00 | SKRIPSI Implementasis Machine Learning Pada Web"
      }
    ]
  }
]

const SOCIAL = [
  {id:"s1",label:"Github",icon:"🏅",url:"https://github.com/Raffi38321"},
  {id:"s2",label:"Linkedin",icon:"",url:"www.linkedin.com/in/muhammad-raffi-52658130a"},
  {id:"s3",label:"Linkedin",icon:"",url:"www.linkedin.com/in/muhammad-raffi-52658130a"},
]

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{textAlign:"center"}}>{PROFILE.name}</Text>
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
