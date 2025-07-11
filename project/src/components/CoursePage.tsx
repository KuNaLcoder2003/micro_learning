import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, Plus, Play, Users, Calendar, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';

type TabType = 'content' | 'students';
type LectureStatus = 'completed' | 'in-progress' | 'draft';
type StudentStatus = 'active' | 'behind';



interface Course {
  id : number,
  course_name : string,
}

interface Lecture {
  id: number;
  title: string;
  duration: string;
  status: LectureStatus;
}

interface Week {
  id: number;
  title: string;
  lectures: Lecture[];
}

interface Student {
  id: number;
  name: string;
  avatar: string;
  progress: number;
  status: StudentStatus;
}

interface CourseData {
  title: string;
  status: string;
  totalWeeks: number;
  totalLectures: number;
  enrolledStudents: number;
  startDate: string;
  completedWeeks: number;
}

const TeacherCourseDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({});

  // Mock data
  const courseData: CourseData = {
    title: "Advanced React Development",
    status: "Ongoing",
    totalWeeks: 12,
    totalLectures: 48,
    enrolledStudents: 156,
    startDate: "March 15, 2025",
    completedWeeks: 8
  };

  const weeks: Week[] = [
    {
      id: 1,
      title: "Getting Started with React",
      lectures: [
        { id: 1, title: "Introduction to React", duration: "25 min", status: "completed" },
        { id: 2, title: "JSX Fundamentals", duration: "30 min", status: "completed" },
        { id: 3, title: "Components and Props", duration: "35 min", status: "completed" }
      ]
    },
    {
      id: 2,
      title: "State Management",
      lectures: [
        { id: 4, title: "useState Hook", duration: "28 min", status: "completed" },
        { id: 5, title: "useEffect Hook", duration: "32 min", status: "in-progress" },
        { id: 6, title: "Custom Hooks", duration: "40 min", status: "draft" }
      ]
    },
    {
      id: 3,
      title: "Advanced Patterns",
      lectures: [
        { id: 7, title: "Context API", duration: "45 min", status: "draft" },
        { id: 8, title: "Higher Order Components", duration: "35 min", status: "draft" }
      ]
    }
  ];

  const students: Student[] = [
    { id: 1, name: "Alice Johnson", avatar: "AJ", progress: 85, status: "active" },
    { id: 2, name: "Bob Smith", avatar: "BS", progress: 72, status: "active" },
    { id: 3, name: "Carol Davis", avatar: "CD", progress: 94, status: "active" },
    { id: 4, name: "David Wilson", avatar: "DW", progress: 60, status: "behind" },
    { id: 5, name: "Emma Brown", avatar: "EB", progress: 88, status: "active" },
    { id: 6, name: "Frank Miller", avatar: "FM", progress: 76, status: "active" }
  ];

  const toggleWeek = (weekId: number): void => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekId]: !prev[weekId]
    }));
  };

  const getStatusColor = (status: LectureStatus): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: LectureStatus): JSX.Element => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Play className="w-4 h-4" />;
      case 'draft': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const CourseOverview: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Course Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="bg-blue-50 rounded-xl p-3 mb-2">
            <BookOpen className="w-6 h-6 text-blue-600 mx-auto" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{courseData.totalWeeks}</div>
          <div className="text-sm text-gray-600">Total Weeks</div>
        </div>
        <div className="text-center">
          <div className="bg-green-50 rounded-xl p-3 mb-2">
            <Play className="w-6 h-6 text-green-600 mx-auto" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{courseData.totalLectures}</div>
          <div className="text-sm text-gray-600">Lectures</div>
        </div>
        <div className="text-center">
          <div className="bg-purple-50 rounded-xl p-3 mb-2">
            <Users className="w-6 h-6 text-purple-600 mx-auto" />
          </div>
          <div className="text-2xl font-bold text-gray-800">{courseData.enrolledStudents}</div>
          <div className="text-sm text-gray-600">Students</div>
        </div>
        <div className="text-center">
          <div className="bg-orange-50 rounded-xl p-3 mb-2">
            <Calendar className="w-6 h-6 text-orange-600 mx-auto" />
          </div>
          <div className="text-sm font-semibold text-gray-800">{courseData.startDate}</div>
          <div className="text-sm text-gray-600">Start Date</div>
        </div>
      </div>
    </div>
  );

  const WeekSection: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Course Content</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Week
        </button>
      </div>
      
      <div className="space-y-4">
        {weeks.map((week) => (
          <div key={week.id} className="border border-gray-200 rounded-2xl overflow-hidden">
            <div 
              className="p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => toggleWeek(week.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Week {week.id}
                  </div>
                  <h3 className="font-medium text-gray-800">{week.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{week.lectures.length} lectures</span>
                  {expandedWeeks[week.id] ? 
                    <ChevronUp className="w-5 h-5 text-gray-600" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  }
                </div>
              </div>
            </div>
            
            {expandedWeeks[week.id] && (
              <div className="p-4 bg-white">
                <div className="space-y-3 mb-4">
                  {week.lectures.map((lecture) => (
                    <div key={lecture.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg">
                          <Play className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{lecture.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {lecture.duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(lecture.status)}`}>
                          {getStatusIcon(lecture.status)}
                          {lecture.status.charAt(0).toUpperCase() + lecture.status.slice(1).replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add New Lecture
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const StudentsSection: React.FC = () => (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Enrolled Students ({students.length})</h2>
      <div className="space-y-4">
        {students.map((student) => (
          <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {student.avatar}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{student.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{student.progress}%</span>
                </div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
            }`}>
              {student.status === 'active' ? 'On Track' : 'Behind'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-xl transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{courseData.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    courseData.status === 'Ongoing' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {courseData.status}
                  </span>
                  <span className="text-sm text-gray-600">• {courseData.completedWeeks} of {courseData.totalWeeks} weeks completed</span>
                </div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors">
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Course Overview */}
        <CourseOverview />

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'content' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('content')}
            >
              Course Content
            </button>
            <button
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === 'students' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('students')}
            >
              Students
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'content' && <WeekSection />}
        {activeTab === 'students' && <StudentsSection />}
      </div>
    </div>
  );
};

export default TeacherCourseDetail;