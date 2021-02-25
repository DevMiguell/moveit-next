// ESSE ARQUIVO FICAR ESTATICO POR VOLTA DA APLICAÇÃO EX:HEADER, SIDEBAR.
import '../styles/global.css'

import { ChallengesProvider } from '../contexts/ChallengesContext'

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp

