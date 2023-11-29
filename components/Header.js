"use client"
import "./Header.css"
import { FaRegSun, FaRegMoon } from "react-icons/fa";


const Header=(props)=>{
    const {theme, setTheme} = props
    function ToggleTheme(){
        if (theme === "light"){
            setTheme("dark")
        }else{
            setTheme("light")
        }
    }
    return(
        <header>
            <div className="logo">
                <span>Energy Dashboard</span>
            </div>
            {/* <div className="theme-container">
                <span>{theme === "light" ? "โหมดกลางวัน" : "โหมดกลางคืน"}</span>
                <span className="icon" onClick={ToggleTheme}>
                    {theme==="light"? <FaRegSun/> : <FaRegMoon/>}
                </span>
            </div> */}
        </header>
    )
}

export default Header