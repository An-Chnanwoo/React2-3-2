import Navbar from "./components/Navbar";
import Head from "next/head";
import Widget from "./components/Widget";


export default function Home(){
    return(
        <>
            <Head>
                <title>about 페이지</title>
            </Head>
            <div>
                about.js
            </div>
            <div>
                <Widget pageName='about'/>
            </div>
        </>
    )
}