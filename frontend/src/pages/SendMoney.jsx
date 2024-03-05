import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import LoopIcon from '@mui/icons-material/Loop';
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";


export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name")
    const userId = searchParams.get('id')
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()


    const jwtToken = localStorage.getItem("token")


    const handleTransfer = async () => {
        setLoading(true)
        try {
            const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: userId,
                amount
            }, {
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            })

            console.log(res.data.msg)
            setLoading(false)
            enqueueSnackbar('Transaction Successful', { variant: 'success' })
            navigate('/dashboard')

        } catch (error) {
            console.log(error.response.data.msg)
            setLoading(false);
            enqueueSnackbar(error.response.data.msg, { variant: 'error' })
            navigate('/dashboard')
        }

    }

    return <div className="flex justify-center h-screen bg-gray-100">
        <BackButton destination={'/dashboard'} />
        <div className="h-full flex flex-col justify-center max-w-md w-[95%]">
            <div
                className="border h-min text-card-foreground  p-4 space-y-8  bg-white shadow-lg rounded-lg max-md:px-1"
            >
                <div className="flex flex-col space-y-1.5 p-1">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6 max-md:p-4 max-sm:p-1">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="amount"
                            >
                                Amount (in Rs)
                            </label>
                            <input
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                id="amount"
                                placeholder="Enter amount"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <button onClick={handleTransfer} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                            {loading ? <div className="animate-spin"><LoopIcon fontSize="small" /></div> : "Initiate Transfer"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}