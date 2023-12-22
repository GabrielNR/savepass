import React, { useState } from "react";

import {
  Container,
  ShowPasswordButton,
  Icon,
  PassData,
  Title,
  Password,
  LoginData,
  Email,
  BoldTitle
} from './styles';

interface Data {
  service_name: string;
  email: string;
  password: string;
}

interface Props {
  data: Data;
}

export function LoginDataItem({
  data
}: Props){

  const [passIsVisible, setPassIsVisible] = useState(false);
  
  function handleTogglePassIsVisible() {
    setPassIsVisible(!passIsVisible);
  }

  return(
    <Container
      colors={[
        passIsVisible
          ? '#EBF2FF'
          : '#ffffff',
        '#ffffff'
      ]}
    >
      <ShowPasswordButton
        onPress={handleTogglePassIsVisible}
      >
        <Icon 
          name={passIsVisible ? "eye" : "eye-off"}
          color={passIsVisible ? '#1967FB' : '#888D97'}
        />
      </ShowPasswordButton>

      {passIsVisible
        ? (
          <PassData>
            <Title>{data.service_name}</Title>
            <Password>{data.password}</Password>
          </PassData>
        )
        : (
          <LoginData>
            <BoldTitle>{data.service_name}</BoldTitle>
            <Email>{data.email}</Email>
          </LoginData>
        )
      }
    </Container>
  )
}