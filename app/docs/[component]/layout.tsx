import { Metadata } from 'next'
import { getComponentMetadata } from '@/app/routes'
import { ShareButton } from './share-button'

interface ComponentLayoutProps {
  children: React.ReactNode
  params: {
    component: string
  }
}

export async function generateMetadata({ params }: ComponentLayoutProps): Promise<Metadata> {
  return getComponentMetadata(params.component)
}

export default function ComponentLayout({ children, params }: ComponentLayoutProps) {
  return (
    <div className="container mx-auto py-8">
      {children}
      <div className="mt-8 flex justify-center">
        <ShareButton component={params.component} />
      </div>
    </div>
  )
} 