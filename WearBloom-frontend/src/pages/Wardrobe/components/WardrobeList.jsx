import { core_wardroom_wardrobe_list } from '@/apis/wardroom';
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const WardrobeCard = ({ item }) => {
    return (
        <Card className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => console.log(item)}
        >
            <CardHeader className="p-2">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-44 object-fit rounded-t-lg"
                />
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600 mb-2">{item.description}</CardDescription>
                <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="solid">{item.category}</Badge>
                    {/* <Badge variant="outline">{item.color}</Badge> */}
                </div>
                <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                        <Badge key={index} variant="subtle" className="text-xs bg-blue-100 text-blue-600">
                            #{tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="p-2 flex justify-between items-center">
                <Badge variant="outline" className="text-sm">
                    Created: {new Date(item.created_at).toLocaleDateString()}
                </Badge>
            </CardFooter>
        </Card>
    )
}

const WardrobeList = () => {
    const [wardrobe, setWardrobe] = React.useState([]);

    const fetchWardrobe = async () => {
        const res = await core_wardroom_wardrobe_list();
        if(res.status === 200) {
            setWardrobe(res.data);
        }else {
            console.log('error');
        }
    }

    React.useEffect(() => {
        fetchWardrobe();
    }, []);

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {
            wardrobe?.map((item, index) => (
                <WardrobeCard key={index} item={item} />
            ))
        }
    </div>
  )
}

export default WardrobeList