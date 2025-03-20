'use client';

import { useState } from 'react';
import { Tabs, TabPanel } from './tabs';

export default function TabsDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pillsActiveIndex, setPillsActiveIndex] = useState(0);

  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'password', label: 'Password' },
    { id: 'notifications', label: 'Notifications' },
        { id: 'rewards', label: 'Rewards' },
        { id: 'insights', label: 'Insights' },

    { id: 'billing', label: 'Billing', disabled: true },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Underlined Tabs Example */}
      <div>
        <h2 className="text-lg font-medium mb-4">Underlined Tabs</h2>
        <Tabs
          items={tabs}
          defaultActiveIndex={0}
          onTabChange={(index) => setActiveIndex(index)}
          showBottomBorder={true}
          variant="underlined"
        />

        <div className="mt-6 p-4 border rounded-lg">
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
          <TabPanel tabId="billing" active={activeIndex === 3}>
            <h3 className="font-medium">Billing Information</h3>
            <p className="text-muted-foreground mt-2">
              Manage your billing information and subscription.
            </p>
          </TabPanel>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Not Underlined Tabs</h2>
        <Tabs
          items={tabs}
          defaultActiveIndex={0}
          onTabChange={(index) => setActiveIndex(index)}
          showBottomBorder={false}
        />

        <div className="mt-6 p-4 border rounded-lg">
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
          <TabPanel tabId="billing" active={activeIndex === 3}>
            <h3 className="font-medium">Billing Information</h3>
            <p className="text-muted-foreground mt-2">
              Manage your billing information and subscription.
            </p>
          </TabPanel>
        </div>
      </div>

      {/* Pills Tabs Example */}
      <div>
        <h2 className="text-lg font-medium mb-4">Pills Tabs</h2>
        <Tabs
          items={tabs}
          defaultActiveIndex={0}
          onTabChange={(index) => setPillsActiveIndex(index)}
          variant="pills"
          showHoverEffect={true}
          showActiveIndicator={false}
          size="md"
        />

        <div className="mt-6 p-4 border rounded-lg bg-card">
          <TabPanel tabId="account" active={pillsActiveIndex === 0}>
            <h3 className="font-medium">Account Settings</h3>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and preferences.
            </p>
          </TabPanel>
          <TabPanel tabId="password" active={pillsActiveIndex === 1}>
            <h3 className="font-medium">Password Settings</h3>
            <p className="text-muted-foreground mt-2">
              Update your password and security preferences.
            </p>
          </TabPanel>
          <TabPanel tabId="notifications" active={pillsActiveIndex === 2}>
            <h3 className="font-medium">Notification Preferences</h3>
            <p className="text-muted-foreground mt-2">
              Control when and how you receive notifications.
            </p>
          </TabPanel>
          <TabPanel tabId="billing" active={pillsActiveIndex === 3}>
            <h3 className="font-medium">Billing Information</h3>
            <p className="text-muted-foreground mt-2">
              Manage your billing information and subscription.
            </p>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}
