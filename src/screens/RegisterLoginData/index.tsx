import React from "react";
import { useNavigation } from '@react-navigation/native';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import { RFValue } from "react-native-responsive-fontsize";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { StackNavigationProp } from "@react-navigation/stack";

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";

import {
  Container,
  Header,
  BackButton,
  Form,
  InputContainer,
  Icon,
  Title,
  Footer
} from './styles';

interface FormData {
  service_name: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  service_name: Yup.string().required('Nome do serviço é obrigatório!'),
  email: Yup.string().email('Não é um email válido').required('Email é obrigatório!'),
  password: Yup.string().required('Senha é obrigatória!'),
})

type RootStackParamList = {
  Home: undefined;
  RegisterLoginData: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export function RegisterLoginData(){

  const { navigate, goBack } = useNavigation<NavigationProps>();
  const {
    control,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(schema)
  });



  async function handleRegister(formData: FormData) {
    

    const newLoginData = {
      id: String(uuid.v4()),
      ...formData
    }

    const dataKey = '@savepass:logins';

    // Save data on AsyncStorage and navigate to 'Home' screen
  
    const response = await AsyncStorage.getItem(dataKey)
    const parsedData = JSON.parse(response!) || [];

    const newLoginListData = [
      ...parsedData,
      newLoginData
    ];

    await AsyncStorage.setItem(
      dataKey, 
      JSON.stringify(newLoginListData)
    );

    navigate('Home')
  }

  return(
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <StatusBar 
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
   
        <Header>
          <BackButton onPress={goBack}>
            <Icon
              name="chevron-left"
              color="#1967FB"
              size={28}
            />
          </BackButton>

          <Title>Cadastro de senha</Title>

        </Header>
       
        <Container>
          <Form>
            <InputContainer>
              <Input
                testID="service-name-input"
                title="Nome do serviço"
                name="service_name"
                error={errors.service_name && errors.service_name.message}
                control={control}
                autoCapitalize="sentences"
                autoCorrect
              />

              <Input
                testID="email-input"
                title="E-mail ou usuário"
                name="email"
                error={errors.email && errors.email.message}
                control={control}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Input
                testID="password-input"
                title="Senha"
                name="password"
                error={errors.password && errors.password.message}
                control={control}
                secureTextEntry
              />
            </InputContainer>
            <Footer>
              <Button 
                style={{
                  marginTop: RFValue(8)
                }}
                title="Salvar"
                onPress={handleSubmit(handleRegister)}
              />
            </Footer>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}