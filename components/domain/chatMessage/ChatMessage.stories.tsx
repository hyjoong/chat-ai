import ChatMessage from './ChatMessage';
import type { Meta, StoryFn } from '@storybook/react';
import { IChatMessageProps } from './ChatMessage.types';

export default {
  title: 'components/ChatMessage',
  component: ChatMessage,
  argTypes: {},
} as Meta;

const Template: StoryFn<IChatMessageProps> = args => <ChatMessage {...args} />;

export const MyChat = Template.bind({});

MyChat.args = {
  userId: 0,
  message: '안녕',
  displayTime: '20:30',
};
export const OpponentChat = Template.bind({});
OpponentChat.args = {
  userId: 1,
  message: '안녕하세요',
  displayTime: '20:30',
};
