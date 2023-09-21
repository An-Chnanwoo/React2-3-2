import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from './components/navbar'
// import { getServerSideProps } from './getServerSideProps'

export async function getServerSideProps() {
    const userRequest = await fetch('https:api.github.com/repos/vercel/next.js');
    const userData = await userRequest.json();

    return {
        props:{
            user: userData,
        },
    };
}

function IndexPage(props){
    return  <div>Welcome, {props.user.full_name}!</div>;
}

export default IndexPage;