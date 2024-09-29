import { Breadcrumbs } from '@/components/Breadcrumbs'
import PageContainer from '@/components/layout/PageContainer'
import HeaderWithButton from '@/components/PageHeaders/HeaderWithButton';
import { Plus } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import CommunityItemsList from './components/CommunityItemsList';

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'community', link: '/community' },
];

const MainCommunity = () => {
  const navigate = useNavigate();

  return (
    <PageContainer scrollable={true}>
      <div className='space-y-2'>
        <Breadcrumbs items={breadcrumbItems} />
        <HeaderWithButton
            title='Community'
            description='Share your outfits with the community'
            buttonText='Share Clothes'
            onClick={() => {
              navigate('/community/create');
            }}
            icon={<Plus className='mr-2 h-4 w-4' />}
        />
        <CommunityItemsList />
      </div>
    </PageContainer>
  )
}

export default MainCommunity