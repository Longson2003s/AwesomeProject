import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import React,{useState} from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';

const LoginScreen = () => {
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://w7.pngwing.com/pngs/345/378/png-transparent-mobile-shop-smartphone-texts-logo-thumbnail.png",
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            login in to your
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop:30
            }}
          >
            <MaterialIcons style={{marginLeft:8}} name="email" size={24} color="gray" />

            <TextInput style={{color:"gray",marginVertical:10,width:300}} placeholder="Enter your email" />
          </View>
        </View>


        <View style={{marginTop:10}}>
        <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop:30
            }}
          >
           <AntDesign name="lock1" size={24} color="gray" style={{marginLeft:8}} />

            <TextInput style={{color:"gray",marginVertical:10,width:300}} placeholder="Enter your password" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
