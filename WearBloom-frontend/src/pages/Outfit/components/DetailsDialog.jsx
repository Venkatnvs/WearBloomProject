import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { core_wardroom_outfit_create } from '@/apis/outfit';
import { useToast } from '@/hooks/use-toast';
import formatErrorMessages from '@/lib/formatErrorMessages';
import { core_wardroom_wardrobe_list } from '@/apis/wardroom';
import { MultiSelect } from '@/components/ui/multi-select';
import moment from 'moment';

const DetailsDialog = ({
  openDialog,
  setOpenDialog,
  OutfitSchema,
  selectedDate,
  fetchOutfits,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [wardrobeItems, setWardrobeItems] = useState([]);

  const fetchWardrobeItems = async () => {
    try {
      const res = await core_wardroom_wardrobe_list();
      if (res.status === 200) {
        setWardrobeItems(res.data);
      } else {
        toast({
          title: 'Error!',
          description: 'Failed to fetch wardrobe items',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error?.response?.data);
      toast({
        title: 'Error!',
        description: 'Failed to fetch wardrobe items',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchWardrobeItems();
  }, []);

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(OutfitSchema),
    defaultValues: {
      name: '',
      items: [],
      date: '',
      occasion: '',
      favorite: false,
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('date', moment(selectedDate).format('YYYY-MM-DD'));
      formData.append('occasion', data.occasion);
      formData.append('favorite', data.favorite ? 'true' : 'false');
      data.items.forEach(item => {
        formData.append('items', parseInt(item, 10));
      });
      const res = await core_wardroom_outfit_create(formData);
      if (res.status === 201) {
        form.reset();
        setOpenDialog(false);
        fetchOutfits();
      } else {
        toast({
          title: 'Error!',
          description: 'Failed to create outfit',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error?.response?.data);
      toast({
        title: 'Error!',
        description: formatErrorMessages(error?.response?.data),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create new OutFit</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4 mt-4'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter outfit name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='items'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Items</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={
                            wardrobeItems.map(item => ({
                              label: item.name,
                              value: item.id,
                              icon: item.image ? () => <img src={item.image} alt={item.name} width={20} height={20} className='mr-2 h-4 w-4 text-muted-foreground' /> : null
                          }))
                          || []
                          }
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          placeholder='Select fields...'
                          variant='outlined'
                          animation={1}
                          maxCount={8}
                          disabled={loading || wardrobeItems.length === 0}
                        />
                      </FormControl>
                      {
                        wardrobeItems.length === 0 && (
                          <div className='mt-2'>
                            <FormDescription>
                              No wardrobe items found. Please add some items to wardrobe.
                            </FormDescription>
                          </div>
                        )
                      }
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter date'
                          {...field}
                          type='date'
                          value={moment(selectedDate).format('YYYY-MM-DD')}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='occasion'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occasion</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter occasion' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex items-center space-x-2'>
                  <FormField
                    control={form.control}
                    name='favorite'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Checkbox
                            id = 'id_favorite'
                            checked={field.value}
                            onCheckedChange={checked => field.onChange(checked)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />
                    <FormLabel
                      htmlFor='id_favorite'
                    >Favorite</FormLabel>
                </div>

                <div className='flex items-center'>
                  <Button
                    type='submit'
                    disabled={loading || !form.formState.isValid}
                    className='text-sm'
                  >
                    Save Outfit
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
