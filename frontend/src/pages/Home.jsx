import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Home = () => {
    const navigate = useNavigate()
   
    const jwtToken= localStorage.getItem("token")
   

    const handleToken =async()=>{
        await axios.get("http://localhost:3000/me",{
        headers:{
            "Authorization": `Bearer ${jwtToken}`
        }
       })
                  .then(response =>{
                        localStorage.setItem("name",response.data.name)
                        localStorage.setItem("Id",response.data.userId)
                        navigate('/dashboard')
                  })
                  .catch(console.error())
    }
    useEffect(()=>{
        if(jwtToken){
        handleToken();}
    },[])

    const handleLogin =()=>{
       navigate('/signin')
    }
    const handleSignup =()=>{
       navigate('/signup')
    }
    return (
        <>
            <div className="shadow h-14 flex justify-between top-0 sticky bg-white bg-opacity-100">
                <div className="flex justify-center items-center h-full ml-4 font-semibold">
                    <img src="wallet-icon.svg" className='w-5 h-5 mr-2' alt="" />
                    PayOff
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={handleLogin} type="button" className="text-gray-800 h-10 bg-white border-2 rounded-md font-medium border-black w-24 text-sm p-2 mr-2 hover:bg-gray-800 hover:text-white max-md:w-20 max-md:p-0 max-sm:w-16">Login</button>
                    <button onClick={handleSignup} type="button" className="text-white h-10 rounded-md font-medium bg-gray-800 w-24 text-sm p-2 mr-2 border-2 border-black hover:bg-white hover:text-gray-800 max-md:w-20 max-md:p-0 max-sm:w-16">Sign Up</button>
                    
                </div>
            </div>
            {/* max-md:w-20   */}
            <div className="flex items-center justify-around h-[91vh] w-screen bg-slate-200 max-lg:flex-col-reverse max-lg:justify-center">
                <div className="w-[53vw] ml-10 p-10 border-black border-2 rounded-lg max-lg:p-5 max-lg:w-[90vw] max-lg:mx-2 max-lg:ml-0 max-lg:mt-10 max-md:p-2"><q className="xl:text-4xl max-xl:text-3xl max-lg:text-xl max-md:text-lg ">Making your payments faster,easier and secure than ever before. Simplify transactions for seamless experiences</q></div>
                <div className="w-[45vw] flex justify-center items-center mr-3 ml-5 max-lg:w-[90vw] max-lg:ml-3 max-lg:mt-5"><img className="rounded-md h-[50vh] max-lg:rounded-xl max-lg:h-[40vh]"  src="payment.gif" alt="" /></div>
            </div>
        </>
    )
}

export default Home