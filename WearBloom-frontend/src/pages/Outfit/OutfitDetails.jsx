import { core_wardroom_outfit_details_read } from '@/apis/outfit'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import PageContainer from '@/components/layout/PageContainer'
import TextHeader from '@/components/PageHeaders/TextHeader'
import { useToast } from '@/hooks/use-toast'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DetailsOfOutfit from './components/DetailsOfOutfit'



const OutfitDetails = () => {
    const { id } = useParams();
    const [outfits, setOutfits] = useState([]);

    const { toast } = useToast();

    const featchDetails = async () => {
        try {
            const res = await core_wardroom_outfit_details_read(id);
            if (res.status === 200) {
                setOutfits(res.data);
            } else {
                toast({
                    title: 'Error!',
                    description: 'Failed to fetch outfits',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error(error?.response?.data);
            toast({
                title: 'Error!',
                description: 'Failed to fetch outfits',
                variant: 'destructive',
            });
        }
    }

    useEffect(() => {
        featchDetails();
    }, []);

    const breadcrumbItems = [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Outfits', link: '/outfits' },
        { title: `${outfits?.name || "Outfit details"}`, link: `/outfits/${id}` },
    ];

    if (!outfits) return <div>Loading...</div>

  return (
    <PageContainer scrollable={true}>
      <div className='space-y-2'>
        <Breadcrumbs items={breadcrumbItems} />
        <TextHeader title='Outfits'
        description='Outfit details' />
        <DetailsOfOutfit outfit={outfits} />
      </div>
    </PageContainer>
  )
}

export default OutfitDetails