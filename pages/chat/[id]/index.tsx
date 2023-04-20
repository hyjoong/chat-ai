import Chat from '@/components/domain/chat/Chat';
import React from 'react';

import { NextPageContext } from 'next';

interface Props {
  id: string;
}
const ChatPage = ({ id }: Props) => {
  return <Chat roomId={id} />;
};

export async function getServerSideProps({ query }: NextPageContext) {
  const id = query.id as string;
  return { props: { id } };
}

export default ChatPage;
