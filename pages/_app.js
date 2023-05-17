import '@/styles/globals.css'
import '@/styles/sidebar.css'
import { Provider } from 'react-redux';
import store from '@/redux/configureStore';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
