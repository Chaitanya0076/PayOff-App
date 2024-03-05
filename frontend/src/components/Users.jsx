import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'
import MoneyButton from './MoneyButton';

const Users=()=>{
   
    const [users, setUsers] = useState([]);
    const [filter,setFilter]=useState('');
    const [loading,setLoading]= useState(false)

    const jwtToken= localStorage.getItem("token")

    useEffect(()=>{
        setLoading(true)
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            headers:{
                "Authorization": `Bearer ${jwtToken}`
            }
        })
             .then(res => {
                setLoading(false); 
                setUsers(res.data.user)})
             .catch(error => {
                setLoading(false)
                console.log(error)})
    },[filter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange={(e)=>setFilter(e.target.value)} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div className='mt-4'>
            {loading ? <Spinner /> : ''}
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate()

    return <div className="flex justify-between items-center mt-2 rounded-md hover:bg-slate-300">
        <div className="flex justify-center items-center">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mr-2 max-md:h-6 max-md:w-6">
                <div className="flex flex-col justify-center h-full text-xl max-md:text-sm">
                    {user.firstname[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful max-md:font-medium max-md:text-sm">
                <div>
                    {user.firstname} {user.lastname}
                </div>
            </div>
        </div>

        <div >
            <MoneyButton label={"Send Money"} onClick={()=>{navigate(`/send?id=${user._id}&name=${user.firstname}`)}}/>
        </div>
    </div>
}

User.propTypes={
    user:PropTypes.any
}

export default Users