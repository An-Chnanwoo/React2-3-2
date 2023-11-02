import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from './components/Navbar'
import { getServerSideProps } from './getServerSideProps'
import Widget from './components/Widget'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <>
      <Head>
        <title>Head 컴포넌트에서 타이틀 추가</title>
        
      </Head>
      <div>index.js</div>
      <div>
        <Widget pageName='index'/>
      </div>
    </>
  )
}


