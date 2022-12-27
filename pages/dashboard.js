import Layout from "../components/Layout";
import { wrapper, store } from "../container/store";
import { setUsersData } from "../container/Users/usersAction";
import { useSelector } from 'react-redux';

function Dashboard(props) {
    const { users } = useSelector(state => state);
    return (
        <Layout>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>{
                    users.usersList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">
                                    {
                                        item.id
                                    }</th>
                                <td> {
                                    item.firstName
                                } </td>
                                <td> {
                                    item.lastName
                                } </td>

                                <td> {
                                    item.email
                                } </td>
                            </tr>

                        )
                    })
                }</tbody>
            </table>
        </Layout>
    );
}

export default Dashboard;

export const getServerSideProps = wrapper.getServerSideProps(store => async ({

    req,
    res,
    ...etc
}) => {
    // console.log('2. Page.getServerSideProps uses the store to dispatch things');
    // const serverToken = store.getState().page.serverToken;
    // console.log('mystate ', req.cookies);

    try {
        await store.dispatch(setUsersData(req));
    } catch (e) {
        //console.log('not working', e.response.data);
        return {
            //notFound: true,
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
});
