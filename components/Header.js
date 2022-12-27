import Image from "next/image";
import Link from "next/link";
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Router, useRouter } from "next/router";
import { store } from "../container/store";
import { setAuthInformation } from "../container/Page/pageActions";


export default function Header() {
    const { page } = useSelector(state => state);
    const router = useRouter();

    // console.log('page ========', page);

    const signOut = async () => {
        await store.dispatch(setAuthInformation());
        Cookies.remove('_authToken');
        Cookies.remove('_serverToken');
        router.push('/');
    }

    const addActiveClass = (currentRoute) => {
        return router.pathname == currentRoute ? 'link-secondary' : 'link-dark';
    }
    return (
        <header className="container-fluid">
            <nav className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <Link href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <Image src={'/logo.png'}
                        width="120"
                        height="32">
                    </Image>
                </Link>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    {
                        page.isUserLoggedIn == true && <li>
                            <Link href="/dashboard" className={`nav-link px-2 ${addActiveClass("/dashboard")}`}>
                                Dashboard
                            </Link>
                        </li>
                    }
                    <li>
                        <Link href="/features" className={`nav-link px-2 ${addActiveClass("/features")}`}>
                            Features
                        </Link>
                    </li>
                    
                    <li>

                        <Link href="/faqs" className={`nav-link px-2 ${addActiveClass("/faqs")}`}>FAQs
                        </Link>
                    </li>
                   
                </ul>


                <div className="col-md-3 text-end">
                    {
                        page.isUserLoggedIn == false ? (
                            <>
                                <Link href="/" className="btn btn-outline-primary me-2">Login   
                                </Link>
                                <Link href="/signup" className="btn btn-primary">Sign-up</Link>
                            </>
                        ) : <Link href={'/'}
                            onClick={
                                () => {
                                    signOut();
                                }
                            }
                            className="btn btn-outline-primary me-2">
                            Logout
                        </Link>
                    }</div>
            </nav>
        </header>
    )
}
