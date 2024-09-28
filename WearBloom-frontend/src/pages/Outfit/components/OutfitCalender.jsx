import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // For date selection
import { z } from 'zod';
import DetailsDialog from './DetailsDialog';
import { core_wardroom_outfit_detailed_list, core_wardroom_outfit_list } from '@/apis/outfit';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const OutfitSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  items: z.array(z.number()).min(1, 'Select at least one item'),
  date: z.string(),
  occasion: z.string().optional(),
  favorite: z.boolean().optional(),
});

const OutfitCalender = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDateClick = info => {
    setSelectedDate(info.dateStr);
    setOpenDialog(true);
  };

  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchOutfits = async () => {
    try {
      const res = await core_wardroom_outfit_detailed_list();
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
    fetchOutfits();
  }, []);

  const renderEventContent = (eventInfo) => {
    return (
      <div className="fc-event-content cursor-pointer p-1"
        onClick={() => {
          navigate(`/outfits/${eventInfo.event.extendedProps.outfit_id}`);
        }}
      >
        <div className="flex space-x-2 flex-wrap items-center">
          {
            eventInfo.event.extendedProps.items.map((item, index) => (
              <img
                key={index}
                src={item.image}
                alt={item.name}
                className="w-6 h-6 rounded-full"
              />
            ))
          }
        </div>
        <span>{eventInfo.event.title}</span>
      </div>
    );
  };

  return (
    <div className='container mx-auto p-4'>
      <DetailsDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedDate={selectedDate}
        OutfitSchema={OutfitSchema}
        fetchOutfits={fetchOutfits}
      />

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        dateClick={handleDateClick}
        events={outfits.map(outfit => ({
          title: outfit.name,
          date: outfit.date,
          items: outfit.items,
          outfit_id : outfit.id
        }))}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default OutfitCalender;
