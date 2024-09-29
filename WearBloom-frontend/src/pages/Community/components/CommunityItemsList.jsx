import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, RefreshCcw, Gift, Clock } from 'lucide-react';
import { core_community_exchange_list } from '@/apis/community';
import { useToast } from '@/hooks/use-toast';

const CommunityItemsList = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const { toast } = useToast();

  const fetchCommunityItems = async () => {
    try {
      const res = await core_community_exchange_list();
      if (res.status === 200) {
        console.log(res.data);
        setItems(res.data);
        setFilteredItems(res.data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch community items',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error?.response?.data);
      toast({
        title: 'Error',
        description: 'Failed to fetch community items',
        variant: 'destructive',
      });
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCommunityItems();
  }, []);

  useEffect(() => {
    let result = items;

    if (searchTerm) {
      result = result.filter(
        item =>
          item.item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags?.some(tag =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    if (selectedType !== 'all') {
      result = result.filter(item => item.exchange_type === selectedType);
    }

    if (activeTab !== 'all') {
      result = result.filter(item => item.exchange_type === activeTab);
    }

    setFilteredItems(result);
  }, [items, searchTerm, selectedType, activeTab]);

  const exchangeTypeIcon = {
    Sale: <DollarSign className='h-4 w-4' />,
    Trade: <RefreshCcw className='h-4 w-4' />,
    Donate: <Gift className='h-4 w-4' />,
    Lend: <Clock className='h-4 w-4' />,
  };

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Exchange Items</h1>

      <div className='mb-6 space-y-4'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <Label htmlFor='search'>Search</Label>
            <Input
              id='search'
              placeholder='Search by name, description, or tags'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='w-full sm:w-48'>
            <Label htmlFor='type'>Exchange Type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id='type'>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Types</SelectItem>
                <SelectItem value='Sale'>Sale</SelectItem>
                <SelectItem value='Trade'>Trade</SelectItem>
                <SelectItem value='Donate'>Donate</SelectItem>
                <SelectItem value='Lend'>Lend</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className='mb-6'>
        <TabsList className='grid w-full grid-cols-5'>
          <TabsTrigger value='all'>All</TabsTrigger>
          <TabsTrigger value='Sale'>Sale</TabsTrigger>
          <TabsTrigger value='Trade'>Trade</TabsTrigger>
          <TabsTrigger value='Donate'>Donate</TabsTrigger>
          <TabsTrigger value='Lend'>Lend</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredItems?.map(item => (
          <Card key={item.id} className='overflow-hidden'>
            <CardHeader className='p-0'>
              <img
                src={
                    "https://wearbloomproject.onrender.com" +item.item.image
                }
                alt={item.item.name}
                className='w-full h-44 object-fit px-4'
              />
            </CardHeader>
            <CardContent className='p-4'>
              <div className='flex justify-between items-start mb-2'>
                <CardTitle className='text-xl'>{item.item.name}</CardTitle>
                <Badge variant='secondary'>
                  {exchangeTypeIcon[item.exchange_type]}
                  <span className='ml-1'>{item.exchange_type}</span>
                </Badge>
              </div>
              <p className='text-sm text-gray-600 mb-2'>{item.description}</p>
              {item.exchange_type === 'Sale' && (
                <p className='font-bold'>Price: ${parseFloat(item?.price)?.toFixed(2)}</p>
              )}
              {item.exchange_type === 'Trade' && (
                <p>Trade for: {item.trade_item?.name}</p>
              )}
              {item.exchange_type === 'Lend' && (
                <p>Lend duration: {item.lend_duration} days</p>
              )}
              <div className='flex flex-wrap gap-2 mt-2'>
                {item.tags?.map((tag, index) => (
                  <Badge key={index} variant='outline'>
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className='bg-gray-50 p-4'>
              <Button className='w-full'>Contact Owner</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityItemsList;
