import Head from "next/head";

function PostMeta(props){
    return(
        <Head>
            <title>{props.title}</title>
            <meta name="description" content={props.subtitle}/>

            <meta property="og:title" content={props.title}/>
            <meta property="og:description" content={props.subtitle}/>
            <meta property="og:image" content={props.image}/>

            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:title" content="title"/>
            <meta name="twitter:description" content="description"/>
            <meta name="twitter:image" content="image"/>
        </Head>
    );
}

export default PostMeta;