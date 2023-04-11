import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return null;
};

export default Index;
