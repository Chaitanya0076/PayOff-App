import axios from 'axios'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const Balance=()=>{
    const jwtToken = localStorage.getItem("token")
    const [amount,setAmount] = useState(0)
 
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                "Authorization": `Bearer ${jwtToken}`
            }
        })
              .then((res)=>{
                setAmount(res.data.balance)
              })
              .catch(error => console.log(error))
    },[])

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {amount}
        </div>
    </div>
}

Balance.propTypes={
    value:PropTypes.any
}

export default Balance