import Dropdown from './Dropdown';
import type { Meta, StoryFn } from '@storybook/react';
import { IDropdownProps } from './Dropdown.types';

export default {
  title: 'components/Dropdown',
  component: Dropdown,
  argTypes: {},
} as Meta;

const Template: StoryFn<IDropdownProps> = args => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: ['방 수정', '나가기'],
};
