import type { Metadata } from "next";
import { Providers } from "./providers";
import Box from '@mui/material/Box';
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "Praxis Telous ∆",
  description: "Get organized with Praxis Telous ∆",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}