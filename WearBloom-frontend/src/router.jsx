import MainDashBoard from "./pages/DashBoard/MainDashBoard"
import MainProfilePage from "./pages/Profile/MainProfilePage"
import MainWardrobe from "./pages/Wardrobe/MainWardrobe"


const routes = [
    {
        name: 'root',
        path: '/dashboard',
        element: MainDashBoard,
    },
    {
        name: 'wardrobe',
        path: '/wardrobe',
        element: MainWardrobe,
    },
    {
        name: 'profile',
        path: '/profile',
        element: MainProfilePage,
    }
]

export default routes