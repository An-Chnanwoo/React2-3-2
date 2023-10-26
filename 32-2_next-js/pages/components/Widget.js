const { useState } = require("react");
import Head from "next/head";


function Widget({pageName}){
    const [active, setActive] = useState(false);

    if(active){
        return(
            <>
                <Head>
                    <title>이 페이지 타이틀은 "{pageName}" 입니다.</title>
                </Head>
                <div>
                    <button onClick={() =>setActive(false)}>
                        original title
                    </button>
                    Take a look at the title!
                </div>
            </>
        );
    }
    return(
        <>
            <button onClick={() =>setActive(true)}>
                Change page title
            </button>
        </>
    );
}

export default Widget;