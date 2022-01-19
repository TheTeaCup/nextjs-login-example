import '../styles/globals.css'
import Script from "next/script";
import {Toaster} from 'react-hot-toast'

function MyApp({Component, pageProps}) {
  return (
      <>
          <Toaster position="bottom-right"/>
          <Script
            src="https://kit.fontawesome.com/93d4a9547f.js"
            strategy="beforeInteractive"
        />
        {/*  */}
        <Component {...pageProps} />
      </>
  )
}

export default MyApp