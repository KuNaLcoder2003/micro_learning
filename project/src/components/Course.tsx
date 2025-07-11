import { useEffect, useState } from 'react'
import { ArrowLeft, Plus, ChevronDown, ChevronUp, Play, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

interface Week {
  id: number,
  week_number: number,
  course_id: number
}
interface Video {
  id: number,
  video_url: string,
  course_id: number,
  week_id: number
}
interface vid {
  video_id: number,
  video_url: string
}
interface Video_Week {
  week_id: number,
  week_number: number,
  videos: vid[]
}
interface Course {
  id: number,
  course_name: string,
  course_description: string,
  teacher_email: string,
  price: number,
  thumbnail: string
}

const Course = () => {
  const [week, setWeek] = useState<Week[]>([])
  const [course, setCourse] = useState<Course>()
  const [loading, setLoading] = useState<boolean>(false)
  const [video_weeks, setVideo_Weeks] = useState<Video_Week[]>([])
  const [currentWeek, setCuurentWeek] = useState<number>(0);
  function toggleWeek(weekNumber: number) {
    if(!video_weeks[weekNumber]) {
      return
    } 
    setCuurentWeek(weekNumber)
  }

  const path = useLocation()

  function addNewWeek() {
    try {
      const id = path.pathname.split('/')[2];
      fetch('http://localhost:3000/api/v1/course/newWeek/' + id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token') as string
        },
        body: JSON.stringify({
          week_number: video_weeks.length + 1
        })
      }).then(async (response: Response) => {
        const data = await response.json();
        console.log(data)
        if (data.valid) {
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      })
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    try {
      const id = path.pathname.split('/')[2]
      console.log(id)
      setLoading(true)
      fetch('http://localhost:3000/api/v1/course/details/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token') as string
        }
      }).then(async (response: Response) => {
        const data = await response.json()
        console.log(data)
        if (data.course) {
          setCourse(data.course)
          setWeek(data.weeks)
          let arr = weeks_videos(data.weeks, data.videos)
          setVideo_Weeks(arr)
        } else {
          toast.error(data.message);
        }
        setLoading(false)
      })
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong")
    }
  }, [])

  const weeks_videos = (weeks: Week[], videos: Video[]): (Video_Week[]) => {
    let arr: Video_Week[] = [];
    if (!weeks || weeks.length == 0 || !videos || videos.length == 0) {
      return []
    }
    for (let i = 0; i < videos.length; i++) {
      let obj: Video_Week
      for (let k = 0; k < weeks.length; k++) {
        if (weeks[k]?.id == videos[i].week_id) {
          let matched = arr.find(obj => obj.week_id == weeks[k].id)
          if (matched) {
            obj = {
              ...matched,
              videos: [...matched.videos, { video_url: videos[i].video_url, video_id: videos[i].id }]
            }
            arr = arr.map((object) => {
              if (object.week_id == obj.week_id) {
                return obj
              } else {
                return object
              }
            })
          } else {
            obj = {
              week_id: weeks[k].id,
              week_number: weeks[k].week_number,
              videos: [{
                video_id: videos[i].id,
                video_url: videos[i].video_url
              }]
            }
            arr.push(obj)
          }

        }
      }
    }
    return arr;
  }

  const navigate = useNavigate();
  
  return (
    <>
      {
        loading ? (<div className='w-screen h-screen flex items-center justify-center'>Loading...</div>) : (
          <div className='min-h-screen bg-gray-50'>
            <div className='max-w-screen-lg mx-auto px-4 py-6'>
              <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition-colors">
                      <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-800">{course?.course_name}</h1>
                    </div>
                  </div>
                  <button onClick={() => navigate('/teacher/dashboard')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors">
                    Back to Dashboard
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Course Content</h2>
                  <button onClick={() => addNewWeek()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add New Week
                  </button>
                </div>

                <div className="space-y-4">
                  {week.map((week, index) => (
                    <div key={week.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                      <div
                        className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => toggleWeek(index)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              Week {week.week_number}
                            </div>
                            <h3 className="font-medium text-gray-800">{week.week_number}</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{video_weeks[index] ? video_weeks[index].videos.length : 0} lectures</span>
                            {video_weeks[index] ?
                              <ChevronUp className="w-5 h-5 text-gray-600" /> :
                              <ChevronDown className="w-5 h-5 text-gray-600" />
                            }
                          </div>
                        </div>
                      </div>

                      {(currentWeek == index) ? <div className="p-4 bg-white">
                        <div className="space-y-3 mb-4">
                          {video_weeks[currentWeek].videos.map((video) => (
                            <div key={video.video_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-lg">
                                  <Play className="w-4 h-4 text-gray-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-800">{video.video_id}</h4>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    {30} min
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-colors">
                          <Plus className="w-4 h-4" />
                          Add New Lecture
                        </button>
                      </div> : (
                        video_weeks[index] ? <></> : <div className='p-4'>Nothing to show</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Course
