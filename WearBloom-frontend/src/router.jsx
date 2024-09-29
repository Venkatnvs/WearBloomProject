import CreateCommunityClothes from "./pages/Community/CreateCommunityClothes"
import MainCommunity from "./pages/Community/MainCommunity"
import MainDashBoard from "./pages/DashBoard/MainDashBoard"
import MainOutfit from "./pages/Outfit/MainOutfit"
import OutfitDetails from "./pages/Outfit/OutfitDetails"
import MainProfilePage from "./pages/Profile/MainProfilePage"
import MainWardrobe from "./pages/Wardrobe/MainWardrobe"
import WardrobeCreate from "./pages/Wardrobe/WardrobeCreate"


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
        name: 'wardrobe-create',
        path: '/wardrobe/create',
        element: WardrobeCreate,
    },
    {
        name: 'outfits',
        path: '/outfits',
        element: MainOutfit,
    },
    {
        name: 'outfit-details',
        path: '/outfits/:id',
        element: OutfitDetails,
    },
    {
        name: 'community',
        path: '/community',
        element: MainCommunity,
    },
    {
        name: 'community-create',
        path: '/community/create',
        element: CreateCommunityClothes,
    },
    {
        name: 'profile',
        path: '/profile',
        element: MainProfilePage,
    }
]

export default routes