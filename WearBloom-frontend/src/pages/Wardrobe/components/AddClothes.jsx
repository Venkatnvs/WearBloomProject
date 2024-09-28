import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Upload, Eraser, Shirt, Tag } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { core_wardroom_wardrobe_create } from '@/apis/wardroom';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import formatErrorMessages from '@/lib/formatErrorMessages';

const WARDROOM_CATEGORY_CHOICES = {
  TOPS: 'Tops',
  BOTTOMS: 'Bottoms',
  DRESSES: 'Dresses',
  OUTERWEAR: 'Outerwear',
  SHOES: 'Shoes',
  ACCESSORIES: 'Accessories',
};

const formSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  name: z.string().min(1, 'Name is required').max(100),
  description: z
    .string()
    .max(500, 'Description must be 500 characters or less'),
  color: z.string().min(1, 'Color is required'),
  image: z
    .instanceof(File)
    .refine(file => file.size <= 5000000, `Max image size is 5MB.`),
  tags: z.array(z.string()).optional(),
});

const AddClothes = () => {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: WARDROOM_CATEGORY_CHOICES.TOPS,
      name: '',
      description: '',
      season: '',
      color: '',
      tags: [],
    },
  });

  const onSubmit = async values => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('category', values.category);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('season', values.season);
      formData.append('color', values.color);
      formData.append('image', values.image);
      formData.append('tags', JSON.stringify(values.tags));

      const res = await core_wardroom_wardrobe_create(formData);
      if (res.status === 201) {
        toast({
          title: 'Success!',
          description: 'Clothes added successfully',
        });
        navigate('/wardrobe');
      } else {
        toast({
          title: 'Error!',
          description: 'Failed to add clothes',
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

  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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

  return (
    <Card className='w-full max-w-3xl mx-auto'>
      <CardContent className='p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {step === 1 && (
              <div className='space-y-4'>
                <h2 className='text-2xl font-bold'>
                  Step 1: Upload Clothes Image
                </h2>
                <div className='flex items-center justify-center w-full'>
                  <label
                    htmlFor='dropzone-file'
                    className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                  >
                    <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                      <Upload className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400' />
                      <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span className='font-semibold'>Click to upload</span>{' '}
                        or drag and drop
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        PNG, JPG or GIF (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id='dropzone-file'
                      type='file'
                      className='hidden'
                      onChange={handleImageChange}
                      accept='image/*'
                    />
                  </label>
                </div>
                {imagePreview && (
                  <div className='mt-4'>
                    <img
                      src={imagePreview}
                      alt='Preview'
                      className='w-full h-auto rounded-lg max-h-64 object-fit max-w-60'
                    />
                  </div>
                )}
                <Button
                  type='button'
                  onClick={() => setStep(2)}
                  disabled={!imagePreview}
                >
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className='space-y-4'>
                <h2 className='text-2xl font-bold'>Step 2: Add Details</h2>
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a category' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(WARDROOM_CATEGORY_CHOICES).map(
                            ([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {key}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter cloth name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder='Enter description' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='color'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Color (Click on the color picker to select a color)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter color'
                          {...field}
                          type='color'
                          className='w-50 h-10'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='text-sm'
                      >
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
                <div className='flex justify-between space-x-4'>
                  <Button
                    type='submit'
                    disabled={loading || !form.formState.isValid}
                  >
                    Submit
                  </Button>
                  <Button
                    type='button'
                    onClick={() => setStep(1)}
                    variant='outline'
                    disabled={loading}
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddClothes;
