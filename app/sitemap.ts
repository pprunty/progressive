import { componentMetadata } from './routes';

const BASE_URL = 'https://deltacomponents.dev';

export default async function sitemap() {
  // Get all component routes
  const componentRoutes = Object.keys(componentMetadata).map((component) => ({
    url: `${BASE_URL}/docs/${component}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Add main routes
  const routes = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...componentRoutes,
  ];

  return routes;
}
