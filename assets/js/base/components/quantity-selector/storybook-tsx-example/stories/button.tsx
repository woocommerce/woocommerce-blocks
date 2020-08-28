import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Button } from '../button';

export default { component: Button, title: 'Examples / Button' } as Meta;

export const WithArgs = (args: any) => <Button {...args} />;
WithArgs.args = { label: 'With args' };
export const Basic = () => <Button label="Click me" />;