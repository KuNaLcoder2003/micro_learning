import React, { EventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

interface deatils {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    files: File[]

}

const Signup = () => {
    const [deatils, setDetails] = useState<deatils>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        files: []
    })

    function handleFileChange(e: any) {
        setDetails({
            ...deatils,
            files: e.target.files
        })
    }

    const navigate = useNavigate()

    function handleSubmit(e : any){
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append("first_name" , deatils.first_name)
            formData.append("last_name" , deatils.last_name)
            formData.append("email" , deatils.password)
            formData.append("password" , deatils.password)
            formData.append("avatar" , deatils.files[0])
            fetch('http://localhost:3000/api/v1/teacher/signup' , {
                method : 'POST',
                body : formData
            }).then(async(response : Response)=> {
                const data = await response.json();
                if(data?.token) {
                    toast.success(data.message)
                    navigate('/signin')
                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    }


    return (
        <div className='p-2 overflow-y-hidden'>
            <Toaster/>

            <div className='max-w-7xl m-auto h-screen flex flex-col justify-center items-center gap-4 overflow-y-hidden'>

                <div className='p-4  flex flex-col justify-center items-center'>
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h1 className='text-5xl font-bold'>Sign up to our platform</h1>
                    <p className='text-5xl font-bold text-gray-300'>Start selling your courses</p>
                </div>

                <h2 className='text-center text-3xl font-bold'>Enter Your details here</h2>

                <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col justify-center items-center lg:w-[30%] gap-2 shadow-xl p-4 py-8 rounded-lg'>
                    <div className='w-full p-1 flex flex-col'>
                        <p className='text-md font-bold'>First Name: </p>
                        <input placeholder='enter your first name...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={deatils.first_name} onChange={(e) => setDetails({ ...deatils, first_name: e.target.value })} />
                    </div>
                    <div className='w-full p-1 flex flex-col'>
                        <p className='text-md font-bold'>Last Name : </p>
                        <input placeholder='enter your last name...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={deatils.last_name} onChange={(e) => setDetails({ ...deatils, last_name: e.target.value })} />
                    </div>
                    <div className='w-full p-1 flex flex-col'>
                        <p className='text-md font-bold'>Email : </p>
                        <input placeholder='enter your email...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={deatils.email} onChange={(e) => setDetails({ ...deatils, email: e.target.value })} />
                    </div>
                    <div className='w-full p-1 flex flex-col'>
                        <p className='text-md font-bold'>Password : </p>
                        <input placeholder='enter your password...' className='border border-gray-300 lg:w-[90%] p-1 rounded-lg' value={deatils.password} onChange={(e) => setDetails({ ...deatils, password: e.target.value })} />
                    </div>
                    <div className='w-full p-1 flex flex-col'>
                        <p className='text-md font-bold'>Upload your pic : </p>
                        <input
                            type="file"
                            className='border border-gray-300 lg:w-[90%] p-1 rounded-lg'
                            onChange={(e) => handleFileChange(e)}
                        />
                    </div>
                    <div className='w-full p-1 flex flex-col'>
                        <button type="submit" className='bg-black text-white font-bold lg:w-[90%] p-1 rounded-lg'>Signup</button>
                        <p className='text-center'>Already have an account? <span className='text-blue-500 underline cursor-pointer' onClick={()=>navigate('/signin')}>Signin</span> </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
