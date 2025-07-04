import '../styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Primary Meta Tags */}
        <title>Joshua Hawley | Instagrow Media - Premium Digital Solutions</title>
        <meta name="title" content="Joshua Hawley | Instagrow Media - Premium Digital Solutions" />
        <meta name="description" content="Elevating businesses with elegant, modern digital solutions. 500+ projects delivered with 98% client satisfaction. Web development, mobile apps, digital marketing, cloud solutions, and UI/UX design." />
        <meta name="keywords" content="web development, mobile apps, digital marketing, cloud solutions, UI/UX design, React, Next.js, AWS, Node.js, Joshua Hawley, Instagrow Media" />
        <meta name="author" content="Joshua Hawley" />
        <meta name="robots" content="index, follow" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://instagrowmedia.netlify.app/" />
        <meta property="og:title" content="Joshua Hawley | Instagrow Media - Premium Digital Solutions" />
        <meta property="og:description" content="Elevating businesses with elegant, modern digital solutions. 500+ projects delivered with 98% client satisfaction." />
        <meta property="og:image" content="https://instagrowmedia.netlify.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Instagrow Media" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://instagrowmedia.netlify.app/" />
        <meta property="twitter:title" content="Joshua Hawley | Instagrow Media - Premium Digital Solutions" />
        <meta property="twitter:description" content="Elevating businesses with elegant, modern digital solutions. 500+ projects delivered with 98% client satisfaction." />
        <meta property="twitter:image" content="https://instagrowmedia.netlify.app/og-image.svg" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#1877f2" />
        <meta name="msapplication-TileColor" content="#1877f2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Joshua Hawley",
              "jobTitle": "Founder",
              "worksFor": {
                "@type": "Organization",
                "name": "Instagrow Media"
              },
              "description": "Elevating businesses with elegant, modern digital solutions",
              "url": "https://instagrowmedia.netlify.app",
              "sameAs": [
                "https://linkedin.com/in/joshua-hawley",
                "https://github.com/joshua-hawley"
              ],
              "knowsAbout": [
                "Web Development",
                "Mobile App Development", 
                "Digital Marketing",
                "Cloud Solutions",
                "UI/UX Design"
              ]
            })
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
} 