import { Breadcrumbs } from '@/components/Breadcrumbs'
import PageContainer from '@/components/layout/PageContainer'
import TextHeader from '@/components/PageHeaders/TextHeader'
import React from 'react'
import OutfitCalender from './components/OutfitCalender'

const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Outfits', link: '/outfit' },
];

const MainOutfit = () => {
  return (
    <PageContainer scrollable={true}>
      <div className='space-y-2'>
        <Breadcrumbs items={breadcrumbItems} />
        <TextHeader title='Outfits'
        description='Plan your outfits for the week' />
        <OutfitCalender />
      </div>
    </PageContainer>
  )
}

export default MainOutfit