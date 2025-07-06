import React , {useState} from 'react'
import {
    Play,
    Calendar,
    BarChart3,
    Menu,
    X,
    Star,
    Users,
    BookOpen,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-between items-center py-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">CourseCraft</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button onClick={()=>navigate('/signin')} className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full transition-colors">
                                Sign in
                            </button>
                            <button className="bg-black text-white px-6 py-3 rounded-full hover:opacity-80 transition-opacity">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pb-4 border-t border-gray-100">
                            <div className="flex flex-col space-y-2 pt-4">
                                <button className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full transition-colors text-left">
                                    Sign in
                                </button>
                                <button className="bg-black text-white px-6 py-3 rounded-full hover:opacity-80 transition-opacity mx-4">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-white">
                <div className="max-w-4xl mx-auto px-4 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Create. Share. Teach<br />
                            <span className="text-gray-600">Micro-Courses.</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Launch and sell your own bite-sized course in minutes. Perfect for busy learners who want to master skills quickly.
                        </p>
                        <button className="bg-black text-white px-8 py-4 rounded-full hover:opacity-80 transition-opacity text-lg font-medium shadow-lg">
                            Get Started Free
                        </button>
                        <p className="text-sm text-gray-500 mt-4">No credit card required • 14-day free trial</p>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Everything you need to teach
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful tools designed for educators who want to create engaging micro-learning experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                <Play className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Video Upload</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Upload and organize your video content with our intuitive drag-and-drop interface. Support for all major formats.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Drip Lessons</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Schedule content delivery to keep students engaged. Set up automated lesson releases based on your timeline.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                                <BarChart3 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Progress</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Monitor student engagement and completion rates with detailed analytics and progress tracking tools.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
                            <div className="text-gray-600">Active Students</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <BookOpen className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">2K+</div>
                            <div className="text-gray-600">Courses Created</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <Zap className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
                            <div className="text-gray-600">Completion Rate</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-50 py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Loved by educators worldwide
                        </h2>
                        <p className="text-xl text-gray-600">
                            See what our community has to say about their teaching journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <blockquote className="text-gray-700 mb-6 leading-relaxed">
                                "CourseCraft transformed how I teach. My students love the bite-sized format, and I've seen completion rates triple since switching."
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-sm font-medium text-gray-600">SM</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Sarah Mitchell</div>
                                    <div className="text-sm text-gray-500">Marketing Consultant</div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <blockquote className="text-gray-700 mb-6 leading-relaxed">
                                "The platform is incredibly intuitive. I launched my first course in under an hour and had my first student within 24 hours."
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-sm font-medium text-gray-600">DJ</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">David Johnson</div>
                                    <div className="text-sm text-gray-500">Fitness Trainer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-black text-white py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to start teaching?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of educators who are already creating successful micro-courses.
                    </p>
                    <button className="bg-white text-black px-8 py-4 rounded-full hover:opacity-80 transition-opacity text-lg font-medium shadow-lg">
                        Get Started Free
                    </button>
                    <p className="text-sm text-gray-400 mt-4">Start your 14-day free trial today</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">CourseCraft</span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-500">
                            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
                        © 2025 CourseCraft. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage
