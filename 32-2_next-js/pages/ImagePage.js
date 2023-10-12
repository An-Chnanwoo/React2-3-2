export default function ImagePage(){
    return(
        <>
            <div
                style={{
                    width: 500,
                    height: 200,
                    position: 'relative'
                }}   
            >
                <Image
                    src='https://cdn.pixabay.com/photo/2023/08/16/13/06/mantis-8194123_640.jpg'
                    layout='fill'
                    objectFit='cover'
                    alt='A beautiful English Setter'
                />
            </div>
        </>
    );
}