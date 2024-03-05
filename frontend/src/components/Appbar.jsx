import PropTypes from 'prop-types'
import { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

const Appbar = ({ username, id }) => {
    const [mode,setMode] = useState(false)
    const navigate = useNavigate()
    const handleClick =()=> setMode(prev =>!prev)

    const handlelogout =()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("Id")
        navigate('/signin')
    }

    return (
        <>
            <div className="shadow h-14 flex justify-between top-0 sticky bg-white bg-opacity-100">
                <div className="flex justify-center items-center h-full ml-4 font-semibold">
                    <img src="wallet-icon.svg" className='w-5 h-5 mr-2' alt="" />
                    PayOff
                </div>
                <div className="flex">
                    <div className="flex flex-col justify-center h-full mr-4 font-medium">
                        Hello
                    </div>
                    <div onClick={handleClick} className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {username[0]}
                        </div>
                    </div>
                </div>
            </div>
            {mode && <div 
            className='fixed h-[50vh] w-[20%] rounded-md bg-black bg-opacity-40 top-0 right-0 z-50 max-xl:w-[25%] max-lg:w-[40%] max-md:w-[55%] max-sm:w-[65%]'> 
            <div className=' flex flex-col justify-center items-center mt-10'>
                 <AiOutlineClose className="absolute right-4 top-4 text-2xl text-white cursor-pointer" onClick={handleClick}/>
                 <div className='flex flex-col justify-center items-center'>
                 <div className="rounded-full h-20 w-20 bg-slate-200 flex justify-center ">
                        <div className="flex flex-col justify-center h-full text-3xl">
                            {username[0]}
                        </div>
                    </div>
                 <div className='text-3xl text-white mt-1'>{username}</div>
                 </div>
            </div>
                <div className='mt-8'>
                 <div onClick={()=>{navigate(`/editprofile?id=${id}`);setMode(false)}} className='text-white text-2xl text-left hover:bg-slate-400 pl-2 cursor-pointer'>Edit Profile</div>
                 <div onClick={handlelogout} className='text-white text-2xl text-left hover:bg-slate-400 pl-2 mt-2 cursor-pointer'>LogOut</div>
                 </div>
            </div>
            }
        </>
    )
}

Appbar.propTypes = {
    username: PropTypes.string,
    id:PropTypes.string
}

export default Appbar