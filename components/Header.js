import Image from 'next/image';

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
                <Image src='/Icon.png' width= {1000} height={1000} alt='Logo' className='top-0 left-0 w-80 h-80' />
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