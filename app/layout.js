import './globals.css'

export const metadata = {
  title: 'AI Floor Plan Designer',
  description: 'WABO/AFH compliance tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
