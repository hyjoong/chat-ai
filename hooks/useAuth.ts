import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getOpenApiKey } from 'storage/service';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const API_KEY = getOpenApiKey();

    if (!API_KEY) {
      router.push('/login');
    }
  }, []);

  return;
};
