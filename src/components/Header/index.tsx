import React from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  AboutUser,
  Avatar,
  TextContainer,
  HelloMessage,
  BoldText,
  SecondaryMessage,
  AddButton,
  Icon,
  BackButton,
  Title
} from './styles'

import { StackNavigationProp } from "@react-navigation/stack";

interface HeaderProps {
  user?: {
    name: string;
    avatar_url: string;
  }
}

type RootStackParamList = {
  Home: undefined;
  RegisterLoginData: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export function Header({
  user
}: HeaderProps) {
  const { navigate, goBack } = useNavigation<NavigationProps>();

  function handleAddPass() {
    navigate('RegisterLoginData');
  }

  return(
    <Container
      hasUserData={!!user}
      style={{
        backgroundColor: '#1967FB'
      }}
    >
      {user ? (
        <>
          <AboutUser>
            <Avatar source={{uri: user.avatar_url}} />

            <TextContainer>
              <HelloMessage>
                Olá, <BoldText>{user.name}</BoldText>
              </HelloMessage>

              <SecondaryMessage>
                Sinta-se seguro aqui
              </SecondaryMessage>
            </TextContainer>
          </AboutUser>

          <AddButton onPress={handleAddPass}>
            <Icon
              name="plus"
              color="#FFFFFF"
              size={24}
            />
          </AddButton>
        </>
        ) : (
        <>
         
        </> 
        )}
    </Container>
  )
}
