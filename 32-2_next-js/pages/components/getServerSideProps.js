export async function getServerSideProps() {
    const userRequest = await fetch('https:example.com/api/user');
    const userData = await userRequest.json();

    return {
        props:{
            user: userData,
        },
    };
}

function IndexPage(props){
    return <div>Welcome, {props.user.name}!</div>;
}

export default IndexPage;