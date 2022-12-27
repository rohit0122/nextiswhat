import { useSelector } from "react-redux";

function Loader() {
    const { page } = useSelector(state => state);
    return (
        page.loading &&
        <div className="bg-dark opacity-75 position-fixed fixed-top w-100 h-100 d-flex justify-content-center">
            <div className="align-self-center d-flex" role="status">
                <span className="visually-hidden">Loading...</span>
                <div className="bg-primary p-2 w-4 h-4 rounded-circle bounce-it blue-bounce-circle" aria-hidden="true"></div>
                <div className="bg-success p-2 w-4 h-4 rounded-circle mx-2 bounce-it green-bounce-circle" aria-hidden="true"></div>
                <div className="bg-danger p-2 w-4 h-4 rounded-circle bounce-it red-bounce-circle" aria-hidden="true"></div>
            </div>
        </div>
    );
}

export default Loader;