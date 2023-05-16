import '@styles/globals.css';
import React from 'react';

export const metadata = {
    title: 'Prompts',
    description: 'Discover and share the best AI prompt examples'
}

const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <html>
        <body lang="en">
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className="app">
                {children}
            </main>
        </body>
    </html>
  )
}

export default RootLayout