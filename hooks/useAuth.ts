import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const API_KEY = localStorage.getItem('apiKey');

    if (!API_KEY) {
      router.push('/login');
    }
  }, []);

  return;
};
