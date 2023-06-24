import React from "react";
import { RestfulProvider } from "restful-react";
import { AppProps } from 'next/app';
import { PatrolsProvider } from "../providers/PatrolProvider";
import { UserProvider } from "../providers/LoginProvider"
import { IncidentsProvider } from "../providers/IncidentProvider";
import { ForumsProvider } from "../providers/ForumProvider";
import { DonationsProvider } from "../providers/DonationProvider";
import { RewardsProvider } from "../providers/RewardProvider";


function MyApp({ Component, pageProps }: AppProps) {
  const token = () => {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('token');
        return token;
    }
    return null;
}
  
  return (
    <>
       <RestfulProvider base="https://localhost:44311/api/services/app/"
             requestOptions={{
              headers: {
                  authorization: `Bearer ${token()}`,
              },
          }}
       >


        <UserProvider>
         <PatrolsProvider>
          <IncidentsProvider>
            <ForumsProvider>
              <DonationsProvider>
                <RewardsProvider>
                  <Component {...pageProps} />
                </RewardsProvider>
              </DonationsProvider>
            </ForumsProvider>
          </IncidentsProvider>
         </PatrolsProvider>
        </UserProvider>  
       </RestfulProvider>
       
</>
  )
 ;
}
export default MyApp;