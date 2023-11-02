import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import ThemeContext from './themeContext'
import { useContext } from 'react'

export default function Navbar() {
    
    const {toggleTheme, theme} = useContext(ThemeContext)
    const newThemeName = theme === 'dark' ? 'light' : 'dark'

    return (
        <div className={styles.navbar}>
            {/*<Link href='./'>Home</Link>*/}
            <a href='/'>Home</a> | 
            <a href='/about'>About</a> | 
            <a href='/contact'>Contact</a> | 
        </div>
    )     
}

