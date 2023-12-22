import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import Feather from '@expo/vector-icons/Feather';


export const Container = styled.View`
  flex: 1;
  background-color: #F2F3F5;
  padding: 0 ${RFValue(24)}px;

`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${getStatusBarHeight(true) + 16}px  24px 40px 24px;

  justify-content: space-between;
`;

export const BackButton = styled.Pressable``;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: 'Rubik_500Medium';
  color: #3D434D;
  margin: auto;
`;

export const Form = styled.View`
  margin-top: ${RFValue(24)}px;
  flex: 1;
  justify-content: space-between;
`;

export const InputContainer = styled.View`

`;

export const Icon = styled(Feather)``;

export const Footer = styled.View`
  padding-bottom: ${RFValue(30)}px
`;