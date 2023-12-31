import React, { useState } from "react";
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import { 
  Container,
  Label,
  Error,
  InputContainer,
  FormInput,
  ToggleShowPassButton,
  Icon
} from './styles';

interface Props extends TextInputProps {
  control: Control<any, object>;
  name: string;
  title: string;
  error: string | undefined;
}

export function Input({
  name,
  control,
  title,
  error,
  secureTextEntry,
  ...rest
}:Props){
  const [passwordHidden, setPasswordHidden] = useState(true);

  return (
    <Container>
      <Label>{title}</Label>
      {error && <Error>{error}</Error>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <InputContainer>
            <FormInput 
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry && passwordHidden}
              {...rest}
            />

            {secureTextEntry && (
              <ToggleShowPassButton onPress={() => setPasswordHidden(!passwordHidden)}>
                <Icon name={passwordHidden ? "eye-off" : "eye"} />
              </ToggleShowPassButton>
            )}
          </InputContainer>
        )}
       />
    </Container>
  )
}