import { Breadcrumbs } from '@/components/Breadcrumbs'
import PageContainer from '@/components/layout/PageContainer'
import React from 'react'
import WardrobeList from './components/WardrobeList';
import HeaderWithButton from '@/components/PageHeaders/HeaderWithButton';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Wardrobe', link: '/wardrobe' },
];

const MainWardrobe = () => {
    const navigate = useNavigate();

  return (
    <PageContainer scrollable={true}>
      <div className='space-y-2'>
        <Breadcrumbs items={breadcrumbItems} />
        <HeaderWithButton
            title='Wardrobe'
            description='Manage your wardrobe'
            buttonText='Add Clothes'
            onClick={() => {
            navigate('/wardrobe/create');
            }}
            icon={<Plus className='mr-2 h-4 w-4' />}
        />
        <WardrobeList />
      </div>
    </PageContainer>
  )
}

export default MainWardrobe