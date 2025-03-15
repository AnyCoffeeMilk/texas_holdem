import { Atomic_Age, Tektur } from "next/font/google";
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
                <link rel="icon" href="/favicon.ico" sizes="256x256" />
            </head>
            <body className={`${font.variable}`}>
                {children}
            </body>
        </html>
    );
}
