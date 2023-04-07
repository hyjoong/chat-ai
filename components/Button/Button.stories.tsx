import Button from './Button';
import type { Meta, StoryFn } from '@storybook/react';
import { IButtonProps } from './Button.types';

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: StoryFn<IButtonProps> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '버튼',
};

export const Large = Template.bind({});
Large.args = {
  children: '라지 버튼',
  size: 'large',
};

export const Warning = Template.bind({});
Warning.args = {
  children: '경고 버튼',
  variant: 'warning',
};
