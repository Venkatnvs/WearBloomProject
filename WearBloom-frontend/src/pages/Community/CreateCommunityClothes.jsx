import { Breadcrumbs } from '@/components/Breadcrumbs'
import PageContainer from '@/components/layout/PageContainer'
import TextHeader from '@/components/PageHeaders/TextHeader'
import React from 'react'
import CreateShareCommunity from './components/CreateShareCommunity'

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Community', link: '/community' },
    { title: 'Create', link: '/community/create' },
    ];

const CreateCommunityClothes = () => {
  return (
    <PageContainer scrollable={true}>
      <div className='space-y-2'>
        <Breadcrumbs items={breadcrumbItems} />
        <TextHeader title='Share Clothes'
        description='Share your outfits with the community' />
        <CreateShareCommunity />
      </div>
    </PageContainer>
  )
}

export default CreateCommunityClothes