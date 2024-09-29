import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { core_community_exchange_create } from '@/apis/community';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tag } from 'lucide-react';
import { core_wardroom_wardrobe_list } from '@/apis/wardroom';

const formSchema = z.object({
  exchange_type: z.enum(['Sale', 'Trade', 'Donate', 'Lend']),
  price: z.string().nullable(),
  item: z.string(),
  lend_duration: z.string().nullable(),
  description: z.string().nullable(),
  tags: z.array(z.string()).optional(),
  trade_item: z.string().nullable(),
});

const CreateShareCommunity = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [wardrobes, setWardrobes] = useState([]);

  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchWardrobes = async () => {
    try {
      const res = await core_wardroom_wardrobe_list();
      if (res.status === 200) {
        setWardrobes(res.data);
      } else {
        toast({
          title: 'Error!',
          description: 'Failed to fetch wardrobes',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error?.response?.data);
      toast({
        title: 'Error!',
        description: 'Failed to fetch wardrobes',
        variant: 'destructive',
      });
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exchange_type: 'Sale',
      price: '',
      lend_duration: '',
      description: '',
      tags: {},
      item: '',
      trade_item: '',
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('exchange_type', data.exchange_type);
      formData.append('price', data.price);
      formData.append('lend_duration', parseInt(data.lend_duration || 0));
      formData.append('description', data.description);
      formData.append('tags', JSON.stringify(data.tags));
      formData.append('item', data.item);
      formData.append('trade_item', data.trade_item);
      const res = await core_community_exchange_create(formData);
      if (res.status === 201) {
        toast({
          title: 'Success!',
          description: 'Exchange created successfully',
          variant: 'success',
        });
        navigate('/community');
      } else {
        toast({
          title: 'Error!',
          description: 'Failed to create exchange',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error?.response?.data);
      toast({
        title: 'Error!',
        description: 'Failed to create exchange',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      form.setValue('tags', [...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = tagToRemove => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue('tags', updatedTags);
  };

  useEffect(() => {
    fetchWardrobes();
  }, []);

  console.log(
    // Print the form errors
    form.formState.errors,
  );

  return (
    <Card className='w-full max-w-3xl mx-auto'>
      <CardContent className='p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='exchange_type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exchange Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue>{field.value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Sale'>Sale</SelectItem>
                          <SelectItem value='Trade'>Trade</SelectItem>
                          <SelectItem value='Donate'>Donate</SelectItem>
                          <SelectItem value='Lend'>Lend</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='item'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder='Select Item'
                    >
                      <SelectTrigger>
                        <SelectValue>{field.value}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {wardrobes?.map(wardrobe => (
                          <SelectItem key={wardrobe.id} value={wardrobe.id}>
                            <div className='flex items-center'>
                              <img
                                src={wardrobe.image}
                                alt={wardrobe.name}
                                className='w-6 h-6 rounded-full'
                              />
                              <span className='ml-2'>{wardrobe.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {form.watch('exchange_type') === 'Sale' && (
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} type='text' placeholder='Price' />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              {form.watch('exchange_type') === 'Lend' && (
                <FormField
                  control={form.control}
                  name='lend_duration'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lend Duration</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          placeholder='Lend Duration'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder='Description' />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Tags</FormLabel>
                <div className='flex flex-wrap gap-2 mb-2'>
                  {tags.map((tag, index) => (
                    <Badge key={index} variant='secondary' className='text-sm'>
                      {tag}
                      <button
                        type='button'
                        onClick={() => handleRemoveTag(tag)}
                        className='ml-2 text-red-500 hover:text-red-700'
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Add a tag'
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    className='flex-grow'
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button
                    type='button'
                    onClick={handleAddTag}
                    variant='outline'
                  >
                    <Tag className='mr-2 h-4 w-4' /> Add Tag
                  </Button>
                </div>
              </FormItem>

              {form.watch('exchange_type') === 'Trade' && (
                <FormField
                  control={form.control}
                  name='trade_item'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trade Item</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          placeholder='Trade Item'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <Button type='submit' loading={loading}>
                Create Exchange
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateShareCommunity;
