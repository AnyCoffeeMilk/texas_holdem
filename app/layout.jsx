import { Tektur } from "next/font/google";
import "./globals.css";

const font = Tektur({
    variable: "--font-prime",
    subsets: ["latin"],
})

export const metadata = {
    title: "Texas Holdem Online",
    description: "Play Texas Holdem online",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script src="https://js.pusher.com/8.2.0/pusher.min.js" />
            </head>
            <body className={`${font.variable}`}>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
