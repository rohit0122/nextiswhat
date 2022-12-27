import { store } from "../container/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { setErrorInfo } from "../container/Page/pageActions";
import {  setSampleData } from "../container/Sample/sampleAction";

function Sample() {
    /**
     * Get redux state variable using useSelector
     */
    const { sample, page } = useSelector(state => state);

    useEffect(() => {
        /**
         * Dispatching the redux thunk action
         */
        store.dispatch(setSampleData());
        setTimeout(() => {
            /** 
             * trying to dispatch the action when needed
             */
            store.dispatch(setErrorInfo({ type: 'error', class: 'danger', message: 'This is sample error from redux.' }));
        }, 3000, store)
    }, []);

    return (
        <div>
            {
                sample.sampleData && <p>
                    Name: {sample.sampleData.name} <br />
                    Age: {sample.sampleData.age} <br />
                    Car: {sample.sampleData.car} <br />
                </p>
            }

            {
                page.errorInfo && <>
                    <div className={`alert alert-${page.errorInfo.class}`} role="alert">
                        <strong>{page.errorInfo.type}</strong> {page.errorInfo.message}
                    </div>
                </>

            }
        </div>
    );
}

export default Sample;