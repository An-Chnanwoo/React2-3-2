import styles from '@/styles/Home.module.css'

export default function navbar() {
    return (
        <div className={styles.navbar}>
            {/*<Link href='./'>Home</Link>*/}
            <a href='./'>Home</a> | 
            <a href='./Chapter2_1'>Chapter2_1</a> | 
            <a href='./Chapter2_2'>Chapter2_2</a> | 
        </div>
    )     
}

