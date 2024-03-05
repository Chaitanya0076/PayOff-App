

import { useEffect, useState } from "react"
import  Appbar  from "../components/Appbar"
import  Balance  from "../components/Balance"
import  Users  from "../components/Users"

export const Dashboard = () => {
    const [name,setName] = useState('')
    const [id,setId]= useState('')
    useEffect(()=>{
        setName(localStorage.getItem("name").toUpperCase())
        setId(localStorage.getItem("Id"))
    },[name])
    return <div>
        <Appbar username={name} id={id}/>
        <div className="m-8 max-md:m-4 max-sm:m-2">
            <Balance />
            <Users />
        </div>
    </div>
}

export default Dashboard