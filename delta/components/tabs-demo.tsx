'use client';

import { useState } from 'react';
import { Tabs, TabPanel } from './tabs';

export default function TabsDemo() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-12">
      <UnderlinedTabsDemo />
      <NotUnderlinedTabsDemo />
      <PillsTabsDemo />
      <CustomPillsTabsDemo />
    </div>
  );
}

export function UnderlinedTabsDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'password', label: 'Password' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'insights', label: 'Insights' },
    { id: 'billing', label: 'Billing', disabled: true },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Underlined Tabs</h2>
      <Tabs
        items={tabs}
        defaultActiveIndex={0}
        onTabChange={(index) => setActiveIndex(index)}
        showBottomBorder={true}
        variant="underlined"
      />

      <div className="mt-6 p-4">
        <TabPanel tabId="account" active={activeIndex === 0}>
          <h3 className="font-medium">Account Settings</h3>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabPanel>
        <TabPanel tabId="password" active={activeIndex === 1}>
          <h3 className="font-medium">Password Settings</h3>
          <p className="text-muted-foreground mt-2">
            Update your password and security preferences.
          </p>
        </TabPanel>
        <TabPanel tabId="notifications" active={activeIndex === 2}>
          <h3 className="font-medium">Notification Preferences</h3>
          <p className="text-muted-foreground mt-2">
            Control when and how you receive notifications.
          </p>
        </TabPanel>
        <TabPanel tabId="rewards" active={activeIndex === 3}>
          <h3 className="font-medium">Rewards Program</h3>
          <p className="text-muted-foreground mt-2">
            View your rewards and redeem points.
          </p>
        </TabPanel>
        <TabPanel tabId="insights" active={activeIndex === 4}>
          <h3 className="font-medium">Usage Insights</h3>
          <p className="text-muted-foreground mt-2">
            View analytics and insights about your account usage.
          </p>
        </TabPanel>
        <TabPanel tabId="billing" active={activeIndex === 5}>
          <h3 className="font-medium">Billing Information</h3>
          <p className="text-muted-foreground mt-2">
            Manage your billing information and subscription.
          </p>
        </TabPanel>
      </div>
    </div>
  );
}

export function NotUnderlinedTabsDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'password', label: 'Password' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'insights', label: 'Insights' },
    { id: 'billing', label: 'Billing', disabled: true },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Not Underlined Tabs</h2>
      <Tabs
        items={tabs}
        defaultActiveIndex={0}
        onTabChange={(index) => setActiveIndex(index)}
        showBottomBorder={false}
      />

      <div className="mt-6 p-4 ">
        <TabPanel tabId="account" active={activeIndex === 0}>
          <h3 className="font-medium">Account Settings</h3>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabPanel>
        <TabPanel tabId="password" active={activeIndex === 1}>
          <h3 className="font-medium">Password Settings</h3>
          <p className="text-muted-foreground mt-2">
            Update your password and security preferences.
          </p>
        </TabPanel>
        <TabPanel tabId="notifications" active={activeIndex === 2}>
          <h3 className="font-medium">Notification Preferences</h3>
          <p className="text-muted-foreground mt-2">
            Control when and how you receive notifications.
          </p>
        </TabPanel>
        <TabPanel tabId="rewards" active={activeIndex === 3}>
          <h3 className="font-medium">Rewards Program</h3>
          <p className="text-muted-foreground mt-2">
            View your rewards and redeem points.
          </p>
        </TabPanel>
        <TabPanel tabId="insights" active={activeIndex === 4}>
          <h3 className="font-medium">Usage Insights</h3>
          <p className="text-muted-foreground mt-2">
            View analytics and insights about your account usage.
          </p>
        </TabPanel>
        <TabPanel tabId="billing" active={activeIndex === 5}>
          <h3 className="font-medium">Billing Information</h3>
          <p className="text-muted-foreground mt-2">
            Manage your billing information and subscription.
          </p>
        </TabPanel>
      </div>
    </div>
  );
}

export function PillsTabsDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'password', label: 'Password' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'insights', label: 'Insights' },
    { id: 'billing', label: 'Billing', disabled: true },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Pills Tabs</h2>
      <Tabs
        items={tabs}
        defaultActiveIndex={0}
        onTabChange={(index) => setActiveIndex(index)}
        variant="pills"
        showHoverEffect={true}
        showActiveIndicator={false}
        size="md"
      />

      <div className="mt-6 p-4  bg-card">
        <TabPanel tabId="account" active={activeIndex === 0}>
          <h3 className="font-medium">Account Settings</h3>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabPanel>
        <TabPanel tabId="password" active={activeIndex === 1}>
          <h3 className="font-medium">Password Settings</h3>
          <p className="text-muted-foreground mt-2">
            Update your password and security preferences.
          </p>
        </TabPanel>
        <TabPanel tabId="notifications" active={activeIndex === 2}>
          <h3 className="font-medium">Notification Preferences</h3>
          <p className="text-muted-foreground mt-2">
            Control when and how you receive notifications.
          </p>
        </TabPanel>
        <TabPanel tabId="rewards" active={activeIndex === 3}>
          <h3 className="font-medium">Rewards Program</h3>
          <p className="text-muted-foreground mt-2">
            View your rewards and redeem points.
          </p>
        </TabPanel>
        <TabPanel tabId="insights" active={activeIndex === 4}>
          <h3 className="font-medium">Usage Insights</h3>
          <p className="text-muted-foreground mt-2">
            View analytics and insights about your account usage.
          </p>
        </TabPanel>
        <TabPanel tabId="billing" active={activeIndex === 5}>
          <h3 className="font-medium">Billing Information</h3>
          <p className="text-muted-foreground mt-2">
            Manage your billing information and subscription.
          </p>
        </TabPanel>
      </div>
    </div>
  );
}

export function CustomPillsTabsDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { id: 'discover', label: 'Discover' },
    { id: 'podcasts', label: 'Podcasts' },
    { id: 'artists', label: 'Artists' },
    { id: 'albums', label: 'Albums' },
    { id: 'playlists', label: 'Playlists' },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">
        Custom Spotify-Style Pills Tabs
      </h2>
      <Tabs
        items={tabs}
        defaultActiveIndex={0}
        onTabChange={(index) => setActiveIndex(index)}
        variant="pills"
        showHoverEffect={true}
        showActiveIndicator={false}
        size="md"
        tabClassName="text-gray-700 dark:text-gray-300 font-medium"
        activeTabClassName="bg-[#1cd760] dark:bg-[#1cd760] text-white dark:text-black font-medium"
        inactiveTabClassName=""
      />

      <div className="mt-6 p-4  bg-card">
        <TabPanel tabId="discover" active={activeIndex === 0}>
          <h3 className="font-medium">Discover New Music</h3>
          <p className="text-muted-foreground mt-2">
            Find new music based on your listening habits.
          </p>
        </TabPanel>
        <TabPanel tabId="podcasts" active={activeIndex === 1}>
          <h3 className="font-medium">Podcasts</h3>
          <p className="text-muted-foreground mt-2">
            Browse popular podcasts and discover new shows.
          </p>
        </TabPanel>
        <TabPanel tabId="artists" active={activeIndex === 2}>
          <h3 className="font-medium">Artists</h3>
          <p className="text-muted-foreground mt-2">
            Browse your favorite artists and discover new ones.
          </p>
        </TabPanel>
        <TabPanel tabId="albums" active={activeIndex === 3}>
          <h3 className="font-medium">Albums</h3>
          <p className="text-muted-foreground mt-2">
            Browse your favorite albums and discover new releases.
          </p>
        </TabPanel>
        <TabPanel tabId="playlists" active={activeIndex === 4}>
          <h3 className="font-medium">Playlists</h3>
          <p className="text-muted-foreground mt-2">
            Browse your playlists and discover curated collections.
          </p>
        </TabPanel>
      </div>
    </div>
  );
}
