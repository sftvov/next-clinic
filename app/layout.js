import { ViewTransitions } from 'next-view-transitions';
import './globals.css';
import { Inter, Roboto, Montserrat } from 'next/font/google';

const inter  = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400'],
  display: 'swap',
});

const montserrat  = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['700'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="ru">
        <body>{children}</body>
      </html>
    </ViewTransitions>
  );
}