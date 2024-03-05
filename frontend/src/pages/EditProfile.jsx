import axios from "axios"
import BackButton from "../components/BackButton"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import LoopIcon from '@mui/icons-material/Loop';
import { useSnackbar } from "notistack";



const EditProfile = () => {
   const [searchParams] = useSearchParams();
   const userId = searchParams.get('id')
   const [firstname,setFirstname] = useState('')
   const [lastname,setLastname] = useState('')
   const [password,setPassword] = useState('')
   const [cred,setCred] = useState(false)
   const [loading,setLoading] =useState(false)
   const [editload,setEditload] = useState(false)
   const { enqueueSnackbar } = useSnackbar();
   const navigate = useNavigate()

  
     const jwtToken = localStorage.getItem("token")
 
   useEffect(()=>{
     setLoading(true)
     axios.get(`http://localhost:3000/conf?id=${userId}`,{
      headers:{
        "Authorization":`Bearer ${jwtToken}`
      }
     })
          .then(response =>{
             setLoading(false)
             setFirstname(response.data.firstname)
             setLastname(response.data.lastname)
             setPassword(response.data.password)
          })
          .catch(error =>{ setLoading(false); console.log(error)})
   },[])

  const handleEdit =async()=>{
    if (
      password.length < 8 ||
      firstname.length < 1 ||
      lastname < 1
  ) {
      setCred(true);
  } else if (!cred) {
      try {
          setEditload(true)
          const response = await axios.put(
              "http://localhost:3000/api/v1/user/",
              {
                  password,
                  firstname,
                  lastname,
              },{
                headers:{
                  "Authorization" : `Bearer ${jwtToken}`
                }
              }
          );
          console.log(response.data.msg);
          localStorage.setItem("name",response.data.name)
          setEditload(false)
          enqueueSnackbar('Profile Edited successfully',{variant:'success'})
          navigate('/dashboard')
          // Redirect or do any further processing if needed
      } catch (error) {
          setEditload(false)
          console.log(error.response.data.msg)
          enqueueSnackbar('Failed',{variant:'error'})
          console.error("Edit error:", error);
      }
  }
};
  return (
    <>
      <BackButton destination={'/dashboard'} />
      <div className="h-[100vh] w-full flex justify-center items-center ">
        {loading? <Spinner />:''}
        <div className="border-2 shadow-lg shadow-slate-700 rounded-md p-8 w-[25vw] min-w-[270px]">
          <div className="text-2xl font-medium text-center mb-6 text-yellow-400 ">Edit Profile</div>
          <div className="text-base">First Name</div>
          <input type="text" value={firstname} onChange={e => {setCred(false); setFirstname(e.target.value)}} className="w-full px-2 py-1 mb-3 border rounded border-slate-200" />
          <div className="text-base">Last Name</div>
          <input type="text" value={lastname} onChange={e => {setCred(false); setLastname(e.target.value)}} className="w-full px-2 py-1 mb-3 border rounded border-slate-200" />
          <div className="text-base">Password</div>
          <input type="text" value={password} onChange={e => {setCred(false); setPassword(e.target.value)}} className="w-full px-2 mb-3 py-1 border rounded border-slate-200" />
          <div className={cred ? "block text-xs text-red-600" : "hidden"}>
                        Password should be minimum of length 8, firstname and lastname cannot be empty
                    </div>
          <button onClick={handleEdit} className="w-full h-12 text-black font-medium rounded-lg mt-3 bg-yellow-400 hover:scale-105">
          { editload?<div className="animate-spin"><LoopIcon fontSize="small" color="black" /></div>:"Save Changes"} </button>
        </div>
      </div>
    </>
  )
}

export default EditProfile