import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { Toast , toast  ,Toaster} from 'react-hot-toast'

interface cred {
    email: string,
    password: string
}

interface Prop {
    setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
}
const Signin : React.FC<Prop> = ({setIsLoggedIn}) => {
    const [cred, setCred] = useState<cred>({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    function handleSubmit(e : any){
        e.preventDefault()

        try {
            
            fetch('http://localhost:3000/api/v1/teacher/signin' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    cred : cred
                })
            }).then(async(response : Response)=> {
                const data = await response.json();
                console.log(data)
                if(data?.token) {
                    toast.success(data.message)
                    localStorage.setItem('token' , `Bearer ${data.token}`)
                    setIsLoggedIn(true)
                    navigate('/teacher/dashboard')
                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className='p-4 '>

            <div className='max-w-7xl m-auto h-screen flex flex-col justify-center items-center gap-4'>

                <div className='p-4  flex flex-col justify-center items-center'>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h1 className='text-5xl font-bold'>Sign in to your account</h1>
                    <p className='text-5xl font-bold text-gray-300'>Start managing your courses</p>
                </div>

                <h2 className='text-center text-3xl font-bold'>Enter Your credentials here</h2>

                <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col justify-center items-center lg:w-[30%] gap-2 shadow-xl p-4 py-8 rounded-lg'>

                    <div className='w-full p-1 flex flex-col'>
                        <p className='text-md font-bold'>Email : </p>
                        <input placeholder='enter your email...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={cred.email} onChange={(e) => setCred({ ...cred, email: e.target.value })} />
                    </div>
                    <div className='w-full p-1 flex flex-col'>
                        <p className='text-md font-bold'>Password</p>
                        <input placeholder='enter your password...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={cred.password} onChange={(e) => setCred({ ...cred, password: e.target.value })} />
                    </div>
                    <div className='w-full p-1 flex flex-col'>
                        <button type="submit" className='bg-black text-white font-bold lg:w-[90%] p-1 rounded-lg'>Login</button>
                        <p className='text-center'>New User? <span className='text-blue-500 underline cursor-pointer' onClick={() => navigate('/signup')}>Signup</span> </p>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default Signin
