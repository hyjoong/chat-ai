import Text from './Text';
import type { Meta, StoryFn } from '@storybook/react';
import { ITextProps } from './Text.types';

export default {
  title: 'components/Text',
  component: Text,
  argTypes: {},
} as Meta;

const Template: StoryFn<ITextProps> = args => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'white',
  children: '글자',
};

export const BoldText = Template.bind({});
BoldText.args = {
  size: 'large',
  isBold: true,
};
