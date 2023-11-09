import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(){
  // const {data} = await axios.get(`${process.env.API_ENDPOINT}/api/04/users`);
  const usersReq = await axios.get('https://api.rwnjs.com/01/users');
  //https://jsonplaceholder.typicode.com/users

  return{
    props: {
      users: usersReq.data,
    },
  };
}

export default function HomePage({users}) {
  return (
    <ul>s
      {users.map((user) => (
        <li key={user.id}>
          <link href={`/users/${user.username}`} passHref>
            {user.username}
          </link>
        </li>
      ))}
    </ul>
  );
}
