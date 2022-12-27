import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { store } from "../container/store";
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { hideLoader, showLoader, setAuthInformation, setErrorInfo } from "../container/Page/pageActions";
import { useSelector } from 'react-redux';
import Home from '../pages';

export { RouteGuard };

function RouteGuard({ children }) {
    const { page } = useSelector(state => state);
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => {
            store.dispatch(showLoader());
            store.dispatch(setErrorInfo());
            setAuthorized(false);
        }
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        const protectedUrls = ['/dashboard'];
        const authTokenCookie = Cookies.get('_authToken');
        const serverTokenCookie = Cookies.get('_serverToken');
        //console.log(router.pathname)
        //console.log(protectedUrls.indexOf(router.pathname))
        if (protectedUrls.indexOf(router.pathname) != -1) {

            jwt.verify(authTokenCookie, process.env.JWT_SECRET, async function (error, decoded) {

                console.log('decoded', decoded);
                if (!error && decoded) {
                    if (page.isUserLoggedIn == false || page.authToken == null || page.serverToken == null) {
                        await store.dispatch(setAuthInformation(authTokenCookie, serverTokenCookie, true));
                    }
                    setAuthorized(true);

                } else {
                    await store.dispatch(setAuthInformation());
                    setAuthorized(false);
                    ///router.replace('/');
                    console.log(' I am here');
                    window.location.href = '/';
                    //throw new Error(404)
                }
            });
        } else {
            setAuthorized(true);
        }
        store.dispatch(hideLoader());
    }

    return (authorized && children);
}