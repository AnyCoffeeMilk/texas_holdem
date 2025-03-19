import { Tektur } from "next/font/google";
import "./globals.scss";

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
            <body className={`${font.variable}`}>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
