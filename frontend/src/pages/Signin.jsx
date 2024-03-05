import { useEffect, useState } from "react"
import  BottomWarning  from "../components/BottomWarning"
import  Button  from "../components/Button"
import  Heading  from "../components/Heading"
import  InputBox  from "../components/InputBox"
import  SubHeading  from "../components/SubHeading"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import BackButton from "../components/BackButton"

const Signin = () => {
    
    
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [cred, setCred] = useState(false);
    const navigate = useNavigate()
    // const [usertaken,setUsertaken] = useState('')
    const jwtToken = localStorage.getItem("token")
    

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
      handleToken();
      }
  },[])

    const handleClick= async()=>{
      if (
        username.length < 6 ||
        !username.includes("@") ||
        password.length < 8 
    ) {
        setCred(true);
    } else if (!cred) {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                    username,
                    password
                },{
                  headers:{
                    "Authorization":`Bearer ${jwtToken}`
                  }
                }
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name",response.data.name);
            localStorage.setItem("Id",response.data.userId);
            navigate('/dashboard')
            // Redirect or do any further processing if needed
        } catch (error) {
            console.log(error.response.data.msg)
            // setUsertaken(error.response.data.msg)
            setCred(true)
            console.error("Signin error:", error);
        }
    }
    }

    return <div className="bg-slate-300 h-screen flex justify-center items-center">
      <BackButton destination={'/'} />
    <div className="flex flex-col justify-center items-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 max-sm:w-[90%]">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="abc@gmail.com" label={"Email"} onChange={e=>{ setCred(false); setUsername(e.target.value)}} />
        <InputBox placeholder="12345678" label={"Password"} onChange={e=>{ setCred(false); setPassword(e.target.value)}} />
        <div className={cred ? "block text-xs text-red-600" : "hidden"}>
                        Invalid Credentials or User doesnot exists
                    </div>
        <div className="pt-4">
          <Button label={"Sign in"} onClick={handleClick}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}

export default Signin