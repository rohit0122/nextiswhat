import { store } from "../../container/store";
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import {  setErrorInfo } from "../../container/Page/pageActions";


function Notification() {
    const { page } = useSelector(state => state);

    return (
        page.errorInfo.type && <>
            <Alert key={page.errorInfo.class} variant={page.errorInfo.class} onClose={
                () => store.dispatch(setErrorInfo())
                } dismissible>
                {page.errorInfo.message}
            </Alert>
        </>
    );
}

export default Notification;