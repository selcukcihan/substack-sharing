import './globals.css'

const Title = 'Share The Link'
const Description = 'Create a shareable link that bypasses certain platform restrictions.'

export const metadata = {
  title: Title,
  description: Description,
  applicationName: Title,
  keywords: ['share', 'link', 'url', 'bypass', 'restrict', 'twitter link share'],
  twitter: {
    card: 'summary',
    title: Title,
    description: Description,
    creator: '@scihan',
    site: '@scihan',
  },
  openGraph: {
    siteName: Title,
    title: Title,
    type: 'website',
    url: 'https://books.selcukcihan.com',
    description: Description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
