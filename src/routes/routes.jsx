import DefaultLayout from '../components/Layout/DefaultLayout/DefaultLayout';
import LoginLayout from '../components/Layout/LoginLayout/LoginLayout';
import LayoutStudent from "../components/Layout/LayoutStudent/LayoutStudent";
import LayoutStaff from "../components/Layout/LayoutStaff/LayoutStaff";
import LayoutTutor from '../components/Layout/LayoutTutor/LayoutTutor';
import ChangePassword from "../pages/Logins/ChangePassword/ChangePassword"
import ForgotPassword from '../pages/Logins/ForgotPassword/ForgotPassword';
import Home from "../pages/Guest/Home/Home";
import HomeStudent from "../pages/Student/Home/HomeStudent";
import LoginPage from '../pages//Logins/Login/LoginPage';
import ProfileStaff from '../pages/Profile/ProfileStaff/ProfilePage';
import ProfileStudent from '../pages/Profile/ProfileStudent/ProfileStudent';
import ProfileTeacher from '../pages/Profile/ProfileTeacher/ProfileTeacher';
import SignUp from "../pages/Logins/SignUp/SignUpPage";
import BookTutorPage from "../pages/BookTutor/BookTutorPage";
import SubjectPage from "../pages/Guest/ListSubject/SubjectPage";
import ListTutor from '../pages/ListTutor/ListTutorPage';
import TeacherProgramList from '../pages/Student/TeacherProgramList/TeacherProgramList';
import BookTime from '../pages/Student/BookTime/BookTimePage';
import ThankYou from '../pages/Student/ThankYou/ThankYouPage';
import DemoPage from '../pages/Demo/DemoPage';
import TutorManagement from '../pages/Staff/TutorManagement';
import StudentManagement from '../pages/Staff/StudentManagement';
import TryLearningManagement from "../pages/Staff/TryLearningManagement";
import CourseManagement from "../pages/Staff/CourseManagement";
import CalendarStudent from "../pages/Student/CalendarStudent/CalendarStudent";
import ExerciseListPage from '../pages/Tutor/ExerciseList/ExercisePage';
import ExerciseDetailPage from '../pages/Tutor/ExerciseDetail/ExerciseDetail';
import CalendarTutor from '../pages/Tutor/CalendarTutor/CalendarTutor';
import StudentGrade from "../pages/Student/StudentGrade/StudentGrade";
import HomeTutor from '../pages/Tutor/HomeTutor/HomeTutor';
import Feedback from '../pages/Student/FeedBack/FeedBackPage';
import ManagerStudent from '../pages/Tutor/ManagerStudent/ManagerStudentPage';
import FeedbackTutor from '../pages/Tutor/Feedback/Feedback';
import SubmitExercise from '../pages/Student/ExerciseHistory/SubmitExercise';
import ListTutorST from '../pages/Student/ListTutor/ListTutorStPage';
import BookTutorSTPage from '../pages/Student/BookTutor/BookTutorSTPage';
import CalendarTutorSelect from '../pages/Tutor/CalendarTutorSelect/CalendarTutorSelect';
import HomeWorkTutor from '../pages/Tutor/HomeWorkTutor/HomeWorkTutor';
import HomeWorkTutorList from '../pages/Tutor/HomeWorkTutorList/HomeWorkTutorList';
import ProfileStudents from '../pages/Student/Profile/ProfileStudents';
import ViewInfomationPage from '../pages/Tutor/ViewInfomationPage/ViewInfomationPage';
import Admin from '../pages/admin/admin';
import LayoutAdmin from '../components/Layout/LayoutAdmin/LayoutAdmin';
import StaffManagement from '../pages/admin/StaffManagement/StaffManagement';
import ResetPassword from '../pages/Logins/Resetpassord/ResetPassordPage';
import DocumentManagement from '../pages/Staff/DocumentManagement';
import TutorRegisterManagement from '../pages/Staff/TutorRegisterManagement';
import ProfileTutor from '../pages/Tutor/Profile/ProfileTutor';
import Dashboard from '../pages/Staff/Dashboard/Dashboard';
import SimulationManagement from '../pages/Staff/SimulationManagement';
import UpdateCalender from '../pages/Tutor/UpdateCalender/UpdateCalender';
import PageNotFound from '../pages/PageNotFound';
import DiscountManagement from '../pages/Staff/DiscountManagement';
import ManagerPayment from '../pages/Staff/ManagerPayment';
import FeedbackTutors from '../pages/Student/FeedBack/FeedBackTutor';
import Feedbackofcourse from '../pages/Tutor/ViewInfomationPage/Feedbackofcourse';
import Demo from '../pages/Tutor/ExerciseDetail/Demo';
import DemoDetail from '../pages/Tutor/ExerciseDetail/DemoDetail';
import HomeworkListScore from '../pages/Tutor/ExerciseList/HomeworkListScore';
import ClassroomListScore from '../pages/Tutor/ExerciseList/ClassroomListScore';

const publicRoute = [
  {
    path: '/',
    component: Home,
    layout: DefaultLayout,
    allowedRoles: ["default"]
  },
  {
    path: '/subject/:id',
    component: SubjectPage,
    layout: DefaultLayout,
    allowedRoles: ["default"]
  },
  {
    path: '/listtutor/:id',
    component: ListTutor,
    layout: DefaultLayout,
    allowedRoles: ["default"]
  },
  {
    path: '/booktutor/:tutorid/:classcourseid',
    component: BookTutorPage,
    layout: DefaultLayout,
    allowedRoles: ["default"]
  },
  {
    path: '/viewinfomationpages/:tutorid',
    component: ViewInfomationPage,
    layout: DefaultLayout,
    allowedRoles: ["default"]
  },
  {
    path: '/signup',
    component: SignUp,
    layout: LoginLayout
  },
  {
    path: '/login',
    component: LoginPage,
    layout: LoginLayout
  },
  {
    path: '/forgotpass',
    component: ForgotPassword,
    layout: LoginLayout
  },
  {
    path: '/resetpassword/:token',
    component: ResetPassword,
    layout: LoginLayout
  },
  {
    path: '/page-not-found',
    component: PageNotFound,
    layout: LoginLayout
  },
];


const privateRoute = [
  {
    path: '/changepass',
    component: ChangePassword,
    layout: LoginLayout
  },
  {
    path: '/demo',
    component: DemoPage,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/feedbacktutors',
    component: FeedbackTutors,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/listtutorst/:id',
    component: ListTutorST,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/homestudent',
    component: HomeStudent,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/booktutorst/:tutorid/:classcourseid',
    component: BookTutorSTPage,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/studentgrade/:bookid',
    component: StudentGrade,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/profile-student',
    component: ProfileStudent,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/profilestudent',
    component: ProfileStudents,
    layout: LoginLayout,
    allowedRoles: ["student"]
  },
  {
    path: '/calendarstudent',
    component: CalendarStudent,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/viewinfomationpage/:tutorid',
    component: ViewInfomationPage,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/teacherprogramlist/:bookid',
    component: TeacherProgramList,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/feedback',
    component: Feedback,
    layout: LoginLayout,
    allowedRoles: ["student"]
  },
  {
    path: '/booktime/:tutorId',
    component: BookTime,
    layout: LoginLayout,
    allowedRoles: ["student"]
  },
  {
    path: '/thankyou',
    component: ThankYou,
    layout: LoginLayout,
    allowedRoles: ["student"]
  },
  {
    path: '/submitExercise/:bookid',
    component: SubmitExercise,
    layout: LayoutStudent,
    allowedRoles: ["student"]
  },
  {
    path: '/hometutor',
    component: HomeTutor,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/calendartutor',
    component: CalendarTutor,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/homeworktutorlist',
    component: HomeWorkTutorList,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/calendartutorselect',
    component: CalendarTutorSelect,
    layout: LoginLayout,
    allowedRoles: ["tutor"]
  },
  {
    path: '/feedbacktutor',
    component: FeedbackTutor,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/exerciselist/:bookid',
    component: ExerciseListPage,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/exercisedetail/:exerciseid',
    component: ExerciseDetailPage,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/profile-teacher',
    component: ProfileTeacher,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/viewinfomationpagett/:classcourseid',
    component: Feedbackofcourse,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/homeworktutor',
    component: HomeWorkTutor,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/managerstudent/:courseId',
    component: ManagerStudent,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/profiletutor',
    component: ProfileTutor,
    layout: LoginLayout,
    allowedRoles: ["tutor"]
  },
  {
    path: '/updatecalender',
    component: UpdateCalender,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/demo/:classcourseid',
    component: Demo,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },
  {
    path: '/demodetail/:demoid',
    component: DemoDetail,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },

  {
    path: '/homeworklistscore/:bookid',
    component: HomeworkListScore,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },

  {
    path: '/classroomlistscore/:bookid',
    component: ClassroomListScore,
    layout: LayoutTutor,
    allowedRoles: ["tutor"]
  },

  {
    path: '/tutormanagement',
    component: TutorManagement,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/coursemanagement',
    component: CourseManagement,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/studentmanagement',
    component: StudentManagement,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/documentmanagement',
    component: DocumentManagement,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/tutorregistermanagement',
    component: TutorRegisterManagement,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/profile-staff',
    component: ProfileStaff,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/trylearningmanagement',
    component: TryLearningManagement,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/dashboard',
    component: Dashboard,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/admin',
    component: Admin,
    layout: LayoutAdmin,
    allowedRoles: ["admin"]
  },
  {
    path: '/staffManagement',
    component: StaffManagement,
    layout: LayoutAdmin,
    allowedRoles: ["admin"]
  },
  {
    path: '/discountManagement',
    component: DiscountManagement,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/simulationmanagement',
    component: SimulationManagement,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/managerpayment',
    component: ManagerPayment,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
  {
    path: '/simulationmanagement',
    component: SimulationManagement,
    layout: LayoutStaff,
    allowedRoles: ["staff"]
  },
];

export { publicRoute, privateRoute };
