import '../styles/globals.scss'

import { useRouter } from 'next/router';
import { wrapper, store } from "../container/store";
import { Provider } from "react-redux";
import { RouteGuard } from '../components/RouteGuard';
import Loader from '../components/common/Loader';

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    //console.log('isAllowed', isAllowed);
    return <Provider store={store}>
        <RouteGuard>
            <Component {...pageProps} />
        </RouteGuard>
        <Loader />
    </Provider>;
}

export default wrapper.withRedux(MyApp);