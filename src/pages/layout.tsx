import { Nunito } from 'next/font/google'
import '@/app/global.css'

const nunitoFont = Nunito({
    subsets: ['latin'],
    display: 'swap',
})

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="ja" className={nunitoFont.className}>
            <body className="antialiased">
                <div>
                    <ul>
                        <li>home</li>
                        <li>register</li>
                        <li>login</li>
                        <li>logout</li>
                    </ul>
                </div>
                {children}
            </body>
        </html>
    )
}

export const metadata = {
    title: 'Laravel',
}

export default RootLayout