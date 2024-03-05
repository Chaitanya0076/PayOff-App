
import { useEffect, useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const Signup = () => {
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [cred, setCred] = useState(false);
    const [usertaken,setUsertaken] = useState('')


    const jwtToken =localStorage.getItem("token")
  

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

    const handleSignup = async () => {
        if (
            username.length < 6 ||
            !username.includes("@") ||
            password.length < 8 ||
            firstname.length < 1 ||
            lastname < 1
        ) {
            setCred(true);
        } else if (!cred) {
            try {
                const response = await axios.post(
                    "http://localhost:3000/api/v1/user/signup",
                    {
                        username,
                        password,
                        firstname,
                        lastname,
                    }
                );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("Id",response.data.userId)
                localStorage.setItem("name",response.data.name)
                navigate('/dashboard')
                // Redirect or do any further processing if needed
            } catch (error) {
                console.log(error.response.data.msg)
                setUsertaken(error.response.data.msg)
                console.error("Signup error:", error);
            }
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center items-center">
            <BackButton destination={'/'} />
            <div className="flex flex-col justify-center items-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4 max-sm:w-[90%]">
                    <Heading label={"Sign up"} />
                    <SubHeading
                        label={"Enter your information to create an account"}
                    />
                    <InputBox
                        placeholder="John"
                        label={"First Name"}
                        onChange={(e) => {
                            setCred(false);
                            setFirstname(e.target.value);
                        }}
                    />
                    <InputBox
                        placeholder="Doe"
                        label={"Last Name"}
                        onChange={(e) => {
                            setCred(false);
                            setLastname(e.target.value);
                        }}
                    />
                    <InputBox
                        placeholder="abc@gmail.com"
                        label={"Email"}
                        onChange={(e) => {
                            setCred(false);
                            setUsertaken('')
                            setUsername(e.target.value);
                        }}
                    />
                    <InputBox
                        placeholder="minimum of 8 characters"
                        label={"Password"}
                        onChange={(e) => {
                            setCred(false);
                            setPassword(e.target.value);
                        }}
                    />
                    <div className={cred ? "block text-xs text-red-600" : "hidden"}>
                        Email should be of type email with minimum length 6, Password
                        should be minimum of length 8, firstname and lastname of
                        minimum length 1
                    </div>
                    <div className={usertaken===''?'hidden':"block text-xs text-red-600"}>{usertaken}</div>
                    <div className="pt-4">
                        <Button label={"Sign up"} onClick={handleSignup} />
                    </div>
                    <BottomWarning
                        label={"Already have an account?"}
                        buttonText={"Sign in"}
                        to={"/signin"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;
