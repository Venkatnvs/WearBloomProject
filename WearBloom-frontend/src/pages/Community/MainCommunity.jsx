import { Breadcrumbs } from '@/components/Breadcrumbs'
import PageContainer from '@/components/layout/PageContainer'
import TextHeader from '@/components/PageHeaders/TextHeader'
import React from 'react'

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'community', link: '/community' },
];

const MainCommunity = () => {
  return (
    <PageContainer scrollable={true}>
      <div className='space-y-2'>
        <Breadcrumbs items={breadcrumbItems} />
        <TextHeader title='Community'
        description='Share your outfits with the community' />
      </div>
    </PageContainer>
  )
}

export default MainCommunity