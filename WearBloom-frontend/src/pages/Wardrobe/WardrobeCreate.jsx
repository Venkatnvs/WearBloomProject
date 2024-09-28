import { Breadcrumbs } from '@/components/Breadcrumbs';
import PageContainer from '@/components/layout/PageContainer';
import React from 'react'
import AddClothes from './components/AddClothes';
import TextHeader from '@/components/PageHeaders/TextHeader';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Wardrobe', link: '/wardrobe' },
    { title: 'Add New Clothes', link: '/wardrobe/create' },
];

const WardrobeCreate = () => {
  return (
    <PageContainer scrollable={true}>
      <div className='space-y-2'>
        <Breadcrumbs items={breadcrumbItems} />
        <TextHeader title='Add New Clothes'
        description='Add a new item to your wardrobe' />
        <AddClothes />
      </div>
    </PageContainer>
  )
}

export default WardrobeCreate