import Input from './Input';
import type { Meta, StoryFn } from '@storybook/react';
import { IInputProps } from './Input.types';

export default {
  title: 'components/Input',
  component: Input,
} as Meta;

const Default: StoryFn<IInputProps> = args => <Input {...args} />;

export const DefaultInput = Default.bind({});

DefaultInput.args = {
  placeholder: '입력해주세요.',
};
