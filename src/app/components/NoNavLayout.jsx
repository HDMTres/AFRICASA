
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const NoNavLayout = ({ children }) => (
  <html lang="fr" suppressHydrationWarning={true}>
    <body className={poppins.className}>
      {children}
      
    </body>
  </html>
);

export default NoNavLayout;
