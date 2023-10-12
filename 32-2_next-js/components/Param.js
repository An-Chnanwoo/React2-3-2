import { useRouter } from "next/router";

export default function Param(){
    const {query} = useRouter();
    console.log(query);
    return(
        <>
            <h1>Hello {query.name}!</h1>
        </>
    )
}