import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Poppins } from "next/font/google";
import ConditionalLayout from './components/ConditionalLayout';
import './styles/africasa-design-system.css';

const poppins = Poppins({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: "AFRICASA",
  description: "Crée par Loic et Hadama",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning={true}>
      <body className={poppins.className}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"
          integrity="sha512-X/YkDZyjTf4wyc2Vy16YGCPHwAY8rZJY+POgokZjQB2mhIRFJCckEGc6YyX9eNsPfn0PzThEuNs+uaomE5CO6A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"></script>
      </body>
    </html>
  );
}
