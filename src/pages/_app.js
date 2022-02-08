import { SEO } from '@config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { AUTOR, DESCRIPTION, KEYWORDS, LARGE_TITLE, SITE_NAME, TITLE, TYPE, URL } = SEO;
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content={DESCRIPTION}
        />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="author" content={AUTOR} />
        <meta name="copyright" content={AUTOR} />
        <title>{TITLE}</title>

        {/*** Meta tags for social media ***/}
        {/* Essential META Tags */}
        <meta property="og:title" content={LARGE_TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        {/* <meta property="og:image" itemProp="image" content="https://controlsep.com/images/controlsep_presentation.png" /> */}
        <meta property="og:url" content={URL} />
        <meta property="og:type" content={TYPE} />
        <meta name="twitter:card" content="summary_large_image"></meta>
        {/* Non-Essential, But Recommended */}
        <meta property="og:site_name" content={SITE_NAME}></meta>
        <meta name="twitter:image:alt" content="Preview website image"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
