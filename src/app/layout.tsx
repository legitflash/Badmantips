import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Badman Tips',
  description: 'Your daily dose of winning predictions, with AI-powered quality assessment.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <script async={true} data-cfasync="false" src="https://beastlyfluke.com/aa7ebc9bb17938b4cb1231f5ef53f12f/invoke.js"></script>
      </head>
      <body className="font-body antialiased">
        <div id="container-aa7ebc9bb17938b4cb1231f5ef53f12f"></div>
        {children}
        <Toaster />
        <Script src="https://pl28595302.effectivegatecpm.com/01/d5/54/01d5542797b7e675533dc8f46bb77294.js" />
        <Script src="https://beastlyfluke.com/49/07/a1/4907a13284531ba77ccb47da6fc6d8a3.js" />
      </body>
    </html>
  );
}
