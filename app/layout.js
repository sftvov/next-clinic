import { ViewTransitions } from 'next-view-transitions';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="ru">
        <body>{children}</body>
      </html>
    </ViewTransitions>
  );
}