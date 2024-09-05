// ProfileCard.stories.js
import React from 'react';
import ProfileCard from './ProfileCard';

export default {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
  },
};

export const Default = () => <ProfileCard />;

export const Mobile = () => (
  <div className="max-w-sm">
    <ProfileCard />
  </div>
);

export const Desktop = () => (
  <div className="max-w-4xl">
    <ProfileCard />
  </div>
);

Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
};

Desktop.parameters = {
  viewport: {
    defaultViewport: 'desktop',
  },
};
