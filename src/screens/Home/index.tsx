import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from '../../components/Header';
import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  LoginList,
  Metadata,
  Title,
  TotalPassCount
} from './styles';

interface LoginDataProps {
  id: string;
  service_name: string;
  email: string;
  password: string;
};

type LoginListDataProps = LoginDataProps[];

export function Home() {

  const [searchText, setSearchText] = useState('');
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([]);
  const [data, setData] = useState<LoginListDataProps>([]);

  async function loadData() {
    const dataKey = '@savepass:logins';

    const response = await AsyncStorage.getItem(dataKey)
    
    if(response) {
      const parsedData = JSON.parse(response)
  
      setSearchListData(parsedData)
      setData(parsedData)
    }
  }

  function handleFilterLoginData() {
    const filteredData = searchListData.filter(data => {
      const isValid = data.service_name
      .toLowerCase()
      .includes(searchText.toLowerCase())
      
      if(isValid) {
        return data;
      }
    });

    setSearchListData(filteredData)
  }

  function handleChangeInputText(text: string) {
    if(!text) {
      setSearchListData(data);
    }
    
    setSearchText(text)
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, []));

  return (
    <>
      <Header 
        user={{
          name: 'Gabriel N',
          avatar_url: 'https://github.com/GabrielNR.png'
        }}
      />
      <Container>
        <SearchBar 
          placeholder="Qual senha você procura?"
          onChangeText={handleChangeInputText}
          value={searchText}
          returnKeyType="search"
          onSubmitEditing={handleFilterLoginData}

          onSearchButtonPress={handleFilterLoginData}        
        />

        <Metadata>
          <Title>Suas senhas</Title>
          <TotalPassCount>
            {searchListData.length
              ? `${`${searchListData.length}`.padStart(2, '0')} ao total`
              : 'Nada a ser exibido'
            }
          </TotalPassCount>
        </Metadata>

        <LoginList
          keyExtractor={(item: any) => item.id}
          data={searchListData}
          renderItem={({ item }: any) => 
            <LoginDataItem 
              data={item} 
            />
          }
        />
      </Container>
    </>
  )
}
