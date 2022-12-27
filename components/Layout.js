import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
    return (
        <div className='d-flex flex-column h-100'>
             <Header />
            <main className="flex-shrink-0">
                {
                    props.children
                }
            </main>
            <Footer />
        </div>
    )
}
