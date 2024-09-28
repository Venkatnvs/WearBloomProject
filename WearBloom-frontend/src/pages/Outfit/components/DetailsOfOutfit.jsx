import React, { useEffect, useState } from 'react';
import { Heart, Calendar, Tag, Shirt } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { core_wardroom_outfit_partial_update } from '@/apis/outfit';
import { useToast } from '@/hooks/use-toast';

const DetailsOfOutfit = ({ outfit }) => {
  const [isFavorite, setIsFavorite] = useState(null);
    const id = outfit?.id;

    const { toast } = useToast();

  const changeFavorite = async() => {
    try {
        const res = await core_wardroom_outfit_partial_update(id, { favorite: !isFavorite });
        if (res.status === 200) {
            toast({
                title: 'Success!',
                description: 'Outfit updated successfully',
                variant: 'default',
            });
            setIsFavorite(!isFavorite);
        } else {
            toast({
                title: 'Error!',
                description: 'Failed to update outfit',
                variant: 'destructive',
            });
        }
    } catch(error) {
        console.error(error?.response?.data);
        toast({
            title: 'Error!',
            description: 'Failed to update outfit',
            variant: 'destructive',
        });
    }
    };

    useEffect(() => {
        setIsFavorite(outfit.favorite);
    }, [outfit.favorite]);

  const toggleFavorite = () => {
    changeFavorite();
  };

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div>
            <CardTitle className='text-3xl'>{outfit.name}</CardTitle>
            <CardDescription className='text-lg mt-1'>
              <span className='font-semibold text-gray-700'>Occasion:</span> {outfit.occasion}
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={'outline'}
                  size='icon'
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={isFavorite ? 'text-red-500 fill-red-500' : ''}
                  />
                  <span className='sr-only'>Toggle favorite</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex items-center gap-4 mb-6'>
          <Badge variant='secondary' className='text-sm'>
            <Calendar className='w-4 h-4 mr-1' />
            {outfit.date}
          </Badge>
          <Badge variant='secondary' className='text-sm'>
            <Shirt className='w-4 h-4 mr-1' />
            {outfit?.items?.length} items
          </Badge>
        </div>

        <h3 className='text-xl font-semibold mb-4'>Items:</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {outfit.items?.map(item => (
              <Card key={item.id} className='overflow-hidden'>
                <div className='aspect-square relative text-center flex justify-center items-center'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='object-fit w-full h-full max-h-[200px] rounded-lg max-w-[200px]'
                  />
                </div>
                <CardContent className='p-4'>
                  <h4 className='text-lg font-bold mb-2'>{item.name}</h4>
                  <p className='text-sm text-gray-600 mb-1'>
                    Category: {item.category}
                  </p>
                  <p className='text-sm text-gray-600 mb-2'>
                    Color: {item.color}
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full mb-2'
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='sm:max-w-[425px] max-h-screen overflow-y-auto'>
                      <DialogHeader>
                        <DialogTitle>{item.name}</DialogTitle>
                        <DialogDescription>Item Details</DialogDescription>
                      </DialogHeader>
                      <div className='grid gap-4 py-4'>
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-full h-auto rounded-lg'
                        />
                        <p>
                          <strong>Category:</strong> {item.category}
                        </p>
                        <p>
                          <strong>Color:</strong> {item.color}
                        </p>
                        <p>
                          <strong>Description:</strong>{' '}
                          {item.description || 'No description available'}
                        </p>
                        <div>
                          <strong>Tags:</strong>
                          <div className='flex flex-wrap gap-2 mt-2'>
                            {item?.tags.map((tag, index) => (
                              <Badge key={index} variant='secondary'>
                                <Tag className='w-3 h-3 mr-1' />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className='flex flex-wrap gap-2'>
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant='outline' className='text-xs'>
                        {tag}
                      </Badge>
                    ))}
                    {item?.tags?.length > 3 && (
                      <Badge variant='outline' className='text-xs'>
                        +{item.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
      </CardContent>
    </Card>
  );
};

export default DetailsOfOutfit;
