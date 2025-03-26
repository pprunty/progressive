import { Metadata } from 'next'
import { getComponentMetadata } from '@/app/routes'

interface ComponentLayoutProps {
  children: React.ReactNode
  params: Promise<{
    component: string
  }>
}

export async function generateMetadata({ params }: ComponentLayoutProps): Promise<Metadata> {
  const { component } = await params
  return getComponentMetadata(component)
}

export default function ComponentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-8">
      {children}
    </div>
  )
} 