import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Opportunities for High Schoolers',
  description: "It's not Poolesville vs. Poolesville, it's Poolesville vs. the world.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
          <head>
              <script
                  async
                  src="https://analytics.umami.is/script.js"
                  data-website-id="e15a0c0a-3a68-4194-930f-5167e2b80a29"
              ></script>
          </head>
          <body>{children}</body>
      </html>
  );
}
