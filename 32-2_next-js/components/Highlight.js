import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib.languages/javascript';

// const { default: Head } = require("next/head");
// const { useRouter } = require("next/router");
// const { useEffect } = require("react");

function Highlight({code, laguge = 'js'}){
    const {asPath} = useRouter();

    useEffect(() => {
        hljs.registerLanguage('javascript', javascript);
        hljs.initHighlighting();
    }, [asPath]);

    return (
        <>
            <Head>
                <link rel="stylesheet" href="@highlight.css"/>
            </Head>
            <pre>
                <code className={laguge}></code>
            </pre>
        </>
    );
}

export default Highlight;