import Nav from '@components/nav';
import Provider from '@components/provider';
import '@styles/globals.css';
import React from 'react';

export const metadata = {
    title: 'Prompts',
    description: 'Discover and share the best AI prompt examples'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html>
            <body lang="en">
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout