import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import OverViewCard from './components/OverViewCards';
import {
  CalendarCheck,
  CircuitBoardIcon,
  Laptop2Icon,
  MicrochipIcon,
  RadioTowerIcon,
  Shirt,
  UserRoundCheck,
  Users,
} from 'lucide-react';
import {
  fetchDashBoardCardCounts,
} from '@/apis/dashboard';
import CalendarDateRangePicker from '@/components/date-range-picker';
import moment from 'moment';

const MainDashBoardContainer = ({
  countData,
}) => {
  const data = [
    {
      title: 'Total Clothing Items',
      icon: <Shirt size={24} className='text-primary' />,
      amount: countData.wardroom_items,
      description: 'Total Clothing Items',
    },
    {
      title: 'Total Outfit Items',
      icon: <UserRoundCheck size={24} className='text-primary' />,
      amount: countData.outfit_items,
      description: 'Total Outfit Items',
    },
    {
      title: 'Total Community Items',
      icon: <Users size={24} className='text-primary' />,
      amount: countData.community_items,
      description: 'Total Community Items',
    },
    {
      title: 'Total Usage Records',
      icon: <CalendarCheck size={24} className='text-primary' />,
      amount: countData.usage_records,
      description: 'Total Usage Records',
    },
  ];

  return (
    <>
      <div className='grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-4'>
        {data.map((item, index) => (
          <OverViewCard
            key={index}
            title={item.title}
            icon={item.icon}
            amount={item.amount}
            // description={item.description}
          />
        ))}
      </div>
    </>
  );
};

const MainDashBoard = () => {
  const [countData, setCountData] = useState({
    wardroom_items: 0,
    outfit_items: 0,
    community_items: 0,
    usage_records: 0,
  });

  const [date, setDate] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  const fetchCountData = async (from = date.from, to = date.to) => {
    try {
      const res = await fetchDashBoardCardCounts(
        moment(from).format('YYYY-MM-DD'),
        moment(to).add(1, 'days').format('YYYY-MM-DD'),
      );
      if (res.status == 200) {
        setCountData(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = changeDate => {
    setDate(changeDate);
    fetchCountData(changeDate?.from, changeDate?.to);
  };

  useEffect(() => {
    fetchCountData();
  }, []);

  return (
    <PageContainer scrollable={true}>
      <div className='space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
          <div className='hidden items-center space-x-2 md:flex lg:flex'>
            <CalendarDateRangePicker
              handleDateChange={handleDateChange}
              date={date}
            />
          </div>
        </div>
      </div>
      <MainDashBoardContainer
        countData={countData}
        setCountData={setCountData}
        fetchCountData={fetchCountData}
      />
    </PageContainer>
  );
};

export default MainDashBoard;
