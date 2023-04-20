import React, { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Text from '@/components/common/Text';

import * as S from './LoginForm.styles';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleApiKeyUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValid) {
      setIsValid(true);
    }
    setApiKey(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/validateApiKey', {
        method: 'POST',
        body: JSON.stringify({ apiKey }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push('/chat-list');
      } else {
        setErrorMessage('API key is invalid. Please try again.');
        setIsValid(false);
      }
    } catch (error) {
      console.error('Login Failed', error);
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container onSubmit={handleSubmit}>
      <div>
        <S.logoBox>
          <img src="./svgs/logo.svg" />
        </S.logoBox>
        <Text isBold={true}>API KEY</Text>
        <Input isValid={isValid} onChange={handleApiKeyUpdate} />
        <S.ErrorMessageBox>{errorMessage}</S.ErrorMessageBox>
      </div>
      <div>
        <Button
          size="large"
          variant="primary"
          disabled={apiKey === '' || isLoading === true}
        >
          로그인
        </Button>
        <S.KeyInfo>
          <Text size="small" isUnderline={true}>
            KEY 발급받는 방법
          </Text>
        </S.KeyInfo>
      </div>
    </S.Container>
  );
};

export default LoginForm;
