import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import './App.css'
import Navbar from './components/common/Navbar';
import About from './pages/About';
import Contact from './components/home/Contact';
import MyProfile from './components/dashboard/MyProfile';
import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import Settings from './components/dashboard/Settings';
import EnrolledCourses from './components/dashboard/EnrolledCourses';
import Wishlist from './components/dashboard/Wishlist/Wishlist';
import MyCourses from './components/dashboard/MyCourses';
import AddCourse from './components/dashboard/AddCourse/AddCourse';
import EditCourse from './components/dashboard/EditCourse/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import { useSelector } from 'react-redux';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/viewCourse/VideoDetails';
import InstructorDashboard from './components/dashboard/InstructorDashboard/InstructorDashboard';

function App() {
  const {user}=useSelector((state)=>state.profile);
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/update-password/:id' element={<UpdatePassword/>} />
        <Route path='/verify-email' element={<VerifyEmail/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/catalog/:catalogName' element={<Catalog/>}/>
        <Route path='/course/:courseId' element={<CourseDetails/>}/>

        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
          <Route path='/dashboard/my-profile' element={<MyProfile/>} />
          <Route path='/dashboard/settings' element={<Settings/>} />
          {user?.accountType==='Student'&&(<>
            <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>} />
            <Route path='/dashboard/wishlist' element={<Wishlist/>}/>
          </>)}
          {user?.accountType==='Instructor'&&(<>
          <Route path='/dashboard/my-courses' element={<MyCourses/>}/>
          <Route path='/dashboard/add-course' element={<AddCourse/>}/>
          <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/>
          <Route path='/dashboard/instructor' element={<InstructorDashboard/>}/>
          </>)}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }
        >
          {
            user?.accountType==='Student' && (
              <>
                <Route path='view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<VideoDetails/>}/>
              </>
            )
          }
        </Route>
        

        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
