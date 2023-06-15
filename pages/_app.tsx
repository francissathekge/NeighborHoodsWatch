import React from "react";
import { RestfulProvider } from "restful-react";
import { AppProps } from 'next/app';
import { PatrolsProvider } from "../providers/PatrolProvider";
import { UserProvider } from "../providers/LoginProvider"


function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
       <RestfulProvider base="https://localhost:44311/api/services/app/">
        <UserProvider>
         <PatrolsProvider>
          <Component {...pageProps} />
         </PatrolsProvider>
        </UserProvider>  
       </RestfulProvider>
       
</>
  )
 ;
}
export default MyApp;