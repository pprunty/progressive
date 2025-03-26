import { Metadata } from 'next';
import { getComponentMetadata } from '@/app/routes';
import { ShareButton } from './share-button';

interface ComponentLayoutProps {
  children: React.ReactNode;
  params: Promise<{ component: string }>;
}

export async function generateMetadata({
  params,
}: ComponentLayoutProps): Promise<Metadata> {
  const resolvedParams = await params;
  return getComponentMetadata(resolvedParams.component);
}

export default async function ComponentLayout({
  children,
  params,
}: ComponentLayoutProps) {
  const resolvedParams = await params;
  return (
    <div className="container mx-auto py-8">
      {children}
      <div className="mt-8 flex justify-center">
        <ShareButton component={resolvedParams.component} />
      </div>
    </div>
  );
}
