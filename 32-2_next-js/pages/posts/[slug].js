import { useRouter } from "next/router"

const Post = () => {
    const router = useRouter()
    const {pid} = router.query
    // {"pid":"foo "}, {"pid": "bar"}
    return(
    <p>Post: {pid}</p>
    )
}

export default Post;