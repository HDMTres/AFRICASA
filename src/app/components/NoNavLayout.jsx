
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Poppins, Montserrat } from "next/font/google";
import '../styles/auth.css';

const poppins = Poppins({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700']
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700']
});

const NoNavLayout = ({ children }) => (
  <html lang="fr" suppressHydrationWarning={true}>
    <body className={`${poppins.variable} ${montserrat.variable}`}>
      {children}
    </body>
  </html>
);

export default NoNavLayout;
