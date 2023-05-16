import '@/styles/globals.css'
import '@/styles/sidebar.css'

import store, { persister } from '@/redux/reduxConfig'

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}
