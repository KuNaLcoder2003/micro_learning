import { BookOpen, Brain, Cross, DollarSign, Flag, HomeIcon, icons, Key, LogOut, Menu, Settings, User, User2, VideoIcon, X } from 'lucide-react'
import React, { FormEvent, ReactElement, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {  useNavigate } from 'react-router-dom'

interface stat {
    heading: string,
    icons: ReactElement,
    stat: number
}
type student = string
const stats = [
    {
        heading: 'Total Courses',
        icons: <BookOpen />,
        stat: 12,
        color: 'bg-blue-50 text-blue-600'
    },
    {
        heading: 'Active Students',
        icons: <User2 />,
        stat: 200,
        color: 'bg-green-50 text-green-600'
    },
    {
        heading: 'Lessons Uploaded',
        icons: <VideoIcon />,
        stat: 400,
        color: 'bg-purple-50 text-purple-600',
    },
    {
        heading: 'Total Earnings',
        icons: <DollarSign />,
        stat: '$23344',
        color: 'bg-orange-50 text-orange-600',
    },
]
const StatCard = ({ stat }: any) => {
    return (
        <div className='p-2 w-[340px] shadow-lg bg-stone-100 rounded-lg'>
            <h4 className='text-md font-semibold text-gray-400'>{stat.heading}</h4>
            <div className='w-full items-center flex justify-between p-1'>
                <p className='p-1 flex items-center text-3xl font-bold'>{`${stat.stat}`}</p>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                    {stat.icons}
                </div>
            </div>
        </div>
    )
}
const CourseCard = ({ obj, students }: any) => {
    const navigate = useNavigate()
    // 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
    return (
        <div  className='max-w-[30%] rounded-lg mb-4 shadow-lg p-4'>
            <div className='flex flex-col'>
                <div className='max-w-full max-h-[180px] overflow-hidden'>
                    <img src={obj.thumbnail ? obj.thumbnail :'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'} alt='Image unavailable' className='rounded-lg w-full object-cover h-full' />
                </div>
                <div className='w-full flex flex-col items-start p-2 gap-6 mt-3'>
                    <h3 className='text-black font-bold w-full truncate'>{obj.course_name}</h3>
                    <div className='w-full flex justify-between items-center'>
                        <span>{students} students</span>
                        <span>8/10 Lessons</span>
                    </div>
                    <div className="flex w-full items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round((8 / 10) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(8 / 10) * 100}%` }}
                        />
                    </div>
                    <button onClick={()=> navigate(`/course/${obj.id}`)} className='w-[70%] m-auto text-white font-bold bg-black p-2 rounded-lg'>Manage Course</button>
                </div>
            </div>
        </div>
    )
}
interface course {
    id: number,
    course_name: string,
    course_description: string,
    teacher_email: string,
    price: number,
    thumbnail: string
}
interface NewCourse {
    course_name: string,
    course_description: string,
    price: number,
    thumbail: File[]
}
interface Prop {
    setIsLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
}

const Dashboard : React.FC<Prop> = ({setIsLoggedIn}) => {
    const [menuOpen, setIsMenuOpen] = useState(false);
    const [avatar , setAvatar] = useState<string>("")
    const [addCouseModalOpen, setAddCourseModalOpen] = useState<boolean>(false)
    const [courses, setCourses] = useState<course[]>([])
    const [students, setStudents] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [teacherName, setTeacherName] = useState<string>("")
    const [uploadLoading, setUploadLoading] = useState<boolean>(false)
    const [newCourseDetails, setNewCourseDetails] = useState<NewCourse>({
        course_name: "",
        course_description: "",
        price: 0,
        thumbail: []
    })
    const navigate = useNavigate()
    useEffect(() => {
        try {
            setLoading(true)
            fetch('http://localhost:3000/api/v1/teacher/details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token') as string
                }
            }).then(async (response: Response) => {
                const data = await response.json()
                console.log(data);
                if (data.teacher_name) {
                    setTeacherName(data.teacher_name)
                    setCourses(data.courses)
                    setStudents(data.student_courses)
                    setAvatar(data.avatar)
                } else {
                    toast.error(data.message)
                }
                setLoading(false)
            })
        } catch (error) {
            toast.error('Something went wrong')
        }
    }, [])
    function handleThumbnail(e: any) {
        setNewCourseDetails({
            ...newCourseDetails,
            thumbail: e.target.files
        })
    }
    function addNewCourseHandler(e: FormEvent) {
        e.preventDefault()

        try {
            setUploadLoading(true);
            const formData = new FormData();
            formData.append('course_name', newCourseDetails.course_name)
            formData.append('course_description', newCourseDetails.course_description)
            formData.append('price', String(newCourseDetails.price))
            formData.append('course_thumbnail', newCourseDetails.thumbail[0])
            fetch('http://localhost:3000/api/v1/teacher/uploadCourse', {
                method: 'POST',
                headers: {
                    authorization: localStorage.getItem('token') as string
                },
                body: formData
            }).then(async (response: Response) => {
                const data = await response.json();
                if (data?.course) {
                    toast.success(data.message);
                    setAddCourseModalOpen(false)
                } else {
                    toast.error(data.message)
                    setUploadLoading(false)
                }
            })
        } catch (error) {
            setUploadLoading(false)
        }
    }
    return (
        <>
            {
                loading ? <div className='flex items-center justify-center w-screen h-screen'>Loading</div> : (
                    <div className='relative w-full'>
                        <Toaster />
                        <div className='lg:ml-64 overflow-hidden'>
                            <div className='flex p-4 justify-between  overflow-hidden border-b border-b-gray-300 bg-white'>
                                <div className='flex items-center gap-4'>
                                    <Menu className='block lg:hidden' onClick={() => { setIsMenuOpen(!menuOpen) }} />
                                    <div className='flex flex-col items-baseline'>
                                        <h1 className='text-2xl font-bold'>Welcome Back , {teacherName}</h1>
                                        <p className='text-gray-300'>Here's whats happening with your courses today</p>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 '>
                                    <img className='text-white bg-blue-500 rounded-full w-[30px] h-[30px]' src={avatar} />
                                    <div className='flex flex-col'>
                                        <h3 className='text-xl font-bold'>{teacherName}</h3>
                                        <p className='text-gray-300'>Instructor</p>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col lg:flex-row items-around p-2 gap-4 m-auto w-[90%] mt-4 '>
                                {
                                    stats.map((obj, index) => {
                                        return (
                                            <StatCard stat={obj} key={index} />
                                        )
                                    })
                                }
                            </div>
                            <div className='w-[90%] m-auto rounded-lg shadow-xl h-auto p-2 mt-8'>
                                <div className='flex w-full items-center justify-between p-4'>
                                    <h2 className='text-xl text-black font-semibold'>Your Courses</h2>
                                    <button className='text-white p-2 bg-black w-[20%] rounded-lg' onClick={() => setAddCourseModalOpen(true)}>Add a new Course</button>
                                </div>
                                <div className='flex flex-col lg:flex-row flex-wrap gap-6 mt-4 w-[90%] m-auto justify-start'>
                                    {
                                        courses.length == 0 ? (<div className='w-full text-2xl font-semibold'>You do not have any courses at the moment</div>) : (
                                            <div className='flex flex-col lg:flex-row flex-wrap gap-6 mt-4 w-[90%] m-auto justify-start items-baseline'>
                                                {
                                                    courses.map((obj, index) => {
                                                        return (
                                                            <CourseCard obj={obj} students={students[String(obj.id)]} key={index} />
                                                        )
                                                    })
                                                }
                                            </div>)
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Sidebar */}
                        <div className={`fixed p-4 left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                            } lg:translate-x-0`}>
                            <div className='flex border-b border-b-gray-300 items-center justify-between lg:justify-start w-[90%] m-auto gap-4'>
                                <div className='p-3 rounded-full bg-black text-white'>
                                    <BookOpen />
                                </div>
                                <div >
                                    <h3 className='text-xl font-bold'>Edu Flow</h3>
                                    <p className='text-lg text-gray-300'>Tech portal</p>
                                </div>
                                <X className='block lg:hidden' onClick={() => setIsMenuOpen(false)} />
                            </div>
                            <div className='flex flex-col justify-center mt-8 gap-4'>
                                <div className='flex items-center gap-2 p-2 bg-black rounded-lg text-white cursor-pointer'>
                                    <HomeIcon />
                                    <p>DashBoard</p>
                                </div>
                                <div className='flex items-center gap-2 p-2 rounded-lg cursor-pointer'>
                                    <Brain />
                                    <p>AI Help</p>
                                </div>
                                <div className='flex items-center gap-2 p-2 cursor-pointer rounded-lg'>
                                    <Settings />
                                    <p>Settings</p>
                                </div>
                            </div>
                            <div className='mt-80 flex border-b border-b-gray-300 items-center justify-between lg:justify-start w-[90%] m-auto gap-4'>
                                <img className='text-white bg-blue-500 rounded-full w-[30px] h-[30px]' src={avatar} />
                                <div className=''>
                                    <h3 className='text-lg font-bold'>{teacherName}</h3>
                                    <p className='text-lg text-gray-300'>Instructor</p>
                                </div>
                                <LogOut className='block' onClick={()=>{
                                    localStorage.removeItem('token')
                                    setIsLoggedIn(false)
                                    navigate("/signin")
                                }}  />
                            </div>
                        </div>
                        {
                            addCouseModalOpen && (
                                uploadLoading ? <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 rounded-lg'>
                                    <div className='rounded-lg shadow-md h-auto p-4 w-[30%] m-auto'>
                                        <div className='flex items-center justify-center p-4 bg-white w-full gap-4 rounded-lg text-2xl font-bold'>Loading...</div>
                                    </div>
                                </div> : <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 rounded-lg'>
                                    <div className='rounded-lg shadow-md h-auto p-4 w-[30%] m-auto'>
                                        <form onSubmit={(e) => addNewCourseHandler(e)} className='flex flex-col p-4 bg-white w-full gap-4 rounded-lg'>
                                            <div className='flex w-full justify-between items-center'>
                                                <h2 className='text-lg font-bold'>Create new course </h2>
                                                <X onClick={() => setAddCourseModalOpen(false)} className='cursor-pointer' />
                                            </div>
                                            <div className='flex flex-col gap-2 items-baseline w-full'>
                                                <div className='w-full'>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Course title</label>
                                                    <input
                                                        value={newCourseDetails.course_name}
                                                        onChange={(e) => setNewCourseDetails({ ...newCourseDetails, course_name: e.target.value })}
                                                        type="text"
                                                        placeholder="Enter course title..."
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div className='w-full'>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                                    <textarea
                                                        value={newCourseDetails.course_description}
                                                        onChange={(e) => setNewCourseDetails({ ...newCourseDetails, course_description: e.target.value })}
                                                        placeholder="Brief course description..."
                                                        rows={4}
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                    />
                                                </div>
                                                <div className='w-full'>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Thumbail</label>
                                                    <input
                                                        onChange={(e) => handleThumbnail(e)}
                                                        type="file"
                                                        placeholder="Choose a thumbail"
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div className='w-full'>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Course price</label>
                                                    <input
                                                        value={newCourseDetails.price}
                                                        onChange={(e) => { setNewCourseDetails({ ...newCourseDetails, price: Number(e.target.value) }) }}
                                                        type="number"
                                                        placeholder="Enter course price"
                                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <button type="submit" className='w-full bg-black text-white p-2 rounded-lg'>Add new Course</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}
export default Dashboard
