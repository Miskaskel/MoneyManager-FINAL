import { View, Text, Image, StyleSheet, TouchableOpacity,TextInput, Button, Alert, ScrollView, KeyboardAvoidingView} from 'react-native'
import React from 'react'
import loginBg from './../../assets/imagens/loginbg.png';
import { useRouter } from 'expo-router';
import { auth } from '../../services/firebase';
import Colors from '../../services/Colors';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth'

export default function LoginScreen() {

    const router = useRouter();    
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {        
        if (user) {
          router.replace('')
        }else{
          
        }
      })
      
      return unsubscribe
    }, [])

    
    const Registrar = async () => {
      setLoading(true)
        try{
          const response = await createUserWithEmailAndPassword(auth, email, senha)
          .then(userCredentials =>{
            const user = userCredentials.user
            console.log(user.email)
          })
          .catch(error => alert(error.message))
          
        }catch(error){
          Alert.alert('Falha no Registro: ' + error.message)
        }
    }
      
    const Login = async () => {
      setLoading(true)
      try{        
        const response = await signInWithEmailAndPassword(auth, email, senha)
        .then(userCredentials => {
          const user = userCredentials.user
          console.log('Realizou Login com', user.email)          
        })
        setLoading(false)
      }catch(error){
          Alert.alert('Falha no Login: '+ error.message);
        }finally{
          setLoading(false)
        }
        
    }


  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
    <ScrollView>
    <View style={{
      display: 'flex',
      alignItems: 'center',
    }}>

      <Image source={loginBg}
        style={styles.bgImage}
      />

      <View style={{
        backgroundColor: Colors.PRIMARY,
        width: '100%',
        height: '100%',
        padding: 20,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }} >
       <View style={styles.loginFormView}>
            <Text style={styles.logoText}>MoneyManager</Text>
            <TextInput
              value={email}
              placeholder="email"
              placeholderColor="#c4c3cb"
              autoCapitalize='none'
              onChangeText={(text) => setEmail(text)}
              style={styles.loginFormTextInput}
            />
            <TextInput
              value={senha}
              placeholder="senha"
              placeholderColor="#c4c3cb"
              autoCapitalize='none'
              onChangeText={(text) => setSenha(text)}
              style={styles.loginFormTextInput}
              secureTextEntry={true}
            />
            <View style={{marginTop:10}}>
              <Button
                buttonStyle={styles.loginButton}
                onPress={Login}
                title="Login"
              />
             </View>
            <View style={{marginTop:10}}>
            <Button
              buttonStyle={styles.RegisterButton}
              onPress={Registrar}
              title="Registrar"
            />        
            </View>       
          </View>
      </View>


    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  bgImage: {
    width: 200,
    height: 420,
    borderWidth: 5,
    borderRadius: 20,
    borderColor: '#000',
    marginTop: 40
  },
  logoText:{
    fontSize: 35,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
    color:'#fff'
  },
  loginFormTextInput: {
    height: 50,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  RegisterButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 40,
    width: 350,
    alignItems: "center"
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 30,
    width: 350,
    alignItems: "center"
  },
  loginScreenContainer: {
    display:'flex',
    alignItems:'center',
  },
  containerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor:'#4B0082'
  },
})