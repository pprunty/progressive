'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

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
      <Tabs defaultValue="account">
        <TabsList showBottomBorder={true} variant="underlined">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} disabled={tab.disabled}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="account" className="mt-6 p-4">
          <h3 className="font-medium">Account Settings</h3>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="password" className="mt-6 p-4">
          <h3 className="font-medium">Password Settings</h3>
          <p className="text-muted-foreground mt-2">
            Update your password and security preferences.
          </p>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6 p-4">
          <h3 className="font-medium">Notification Preferences</h3>
          <p className="text-muted-foreground mt-2">
            Control when and how you receive notifications.
          </p>
        </TabsContent>
        <TabsContent value="rewards" className="mt-6 p-4">
          <h3 className="font-medium">Rewards Program</h3>
          <p className="text-muted-foreground mt-2">
            View your rewards and redeem points.
          </p>
        </TabsContent>
        <TabsContent value="insights" className="mt-6 p-4">
          <h3 className="font-medium">Usage Insights</h3>
          <p className="text-muted-foreground mt-2">
            View analytics and insights about your account usage.
          </p>
        </TabsContent>
        <TabsContent value="billing" className="mt-6 p-4">
          <h3 className="font-medium">Billing Information</h3>
          <p className="text-muted-foreground mt-2">
            Manage your billing information and subscription.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function NotUnderlinedTabsDemo() {
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
      <Tabs defaultValue="account">
        <TabsList showBottomBorder={false}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} disabled={tab.disabled}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="account" className="mt-6 p-4">
          <h3 className="font-medium">Account Settings</h3>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="password" className="mt-6 p-4">
          <h3 className="font-medium">Password Settings</h3>
          <p className="text-muted-foreground mt-2">
            Update your password and security preferences.
          </p>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6 p-4">
          <h3 className="font-medium">Notification Preferences</h3>
          <p className="text-muted-foreground mt-2">
            Control when and how you receive notifications.
          </p>
        </TabsContent>
        <TabsContent value="rewards" className="mt-6 p-4">
          <h3 className="font-medium">Rewards Program</h3>
          <p className="text-muted-foreground mt-2">
            View your rewards and redeem points.
          </p>
        </TabsContent>
        <TabsContent value="insights" className="mt-6 p-4">
          <h3 className="font-medium">Usage Insights</h3>
          <p className="text-muted-foreground mt-2">
            View analytics and insights about your account usage.
          </p>
        </TabsContent>
        <TabsContent value="billing" className="mt-6 p-4">
          <h3 className="font-medium">Billing Information</h3>
          <p className="text-muted-foreground mt-2">
            Manage your billing information and subscription.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function PillsTabsDemo() {
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
      <Tabs defaultValue="account">
        <TabsList
          variant="pills"
          showHoverEffect={true}
          showActiveIndicator={false}
          size="md"
        >
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} disabled={tab.disabled}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="account" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Account Settings</h3>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="password" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Password Settings</h3>
          <p className="text-muted-foreground mt-2">
            Update your password and security preferences.
          </p>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Notification Preferences</h3>
          <p className="text-muted-foreground mt-2">
            Control when and how you receive notifications.
          </p>
        </TabsContent>
        <TabsContent value="rewards" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Rewards Program</h3>
          <p className="text-muted-foreground mt-2">
            View your rewards and redeem points.
          </p>
        </TabsContent>
        <TabsContent value="insights" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Usage Insights</h3>
          <p className="text-muted-foreground mt-2">
            View analytics and insights about your account usage.
          </p>
        </TabsContent>
        <TabsContent value="billing" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Billing Information</h3>
          <p className="text-muted-foreground mt-2">
            Manage your billing information and subscription.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function CustomPillsTabsDemo() {
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
      <Tabs defaultValue="discover">
        <TabsList
          variant="pills"
          showHoverEffect={true}
          showActiveIndicator={false}
          size="md"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="text-gray-700 dark:text-gray-300 font-medium"
              activeClassName="bg-[#1cd760] dark:bg-[#1cd760] text-white dark:text-black font-medium"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="discover" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Discover New Music</h3>
          <p className="text-muted-foreground mt-2">
            Find new music based on your listening habits.
          </p>
        </TabsContent>
        <TabsContent value="podcasts" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Podcasts</h3>
          <p className="text-muted-foreground mt-2">
            Browse popular podcasts and discover new shows.
          </p>
        </TabsContent>
        <TabsContent value="artists" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Artists</h3>
          <p className="text-muted-foreground mt-2">
            Browse your favorite artists and discover new ones.
          </p>
        </TabsContent>
        <TabsContent value="albums" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Albums</h3>
          <p className="text-muted-foreground mt-2">
            Browse your favorite albums and discover new releases.
          </p>
        </TabsContent>
        <TabsContent value="playlists" className="mt-6 p-4 bg-card">
          <h3 className="font-medium">Playlists</h3>
          <p className="text-muted-foreground mt-2">
            Browse your playlists and discover curated collections.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
