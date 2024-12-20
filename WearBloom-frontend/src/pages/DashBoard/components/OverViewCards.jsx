import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import NumberTicker from '@/components/ui/number-ticker';

const OverViewCard = ({ title, icon, amount, description }) => {
  return (
    <Card className='shadow-md'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {(amount === 0 || amount === null)
           ? (
            <span className='text-2xl font-bold'>0</span>
          ) : (
            <NumberTicker value={amount} delay={0.1} />
          )}
        </div>
        <p className='text-xs text-muted-foreground'>{description}</p>
      </CardContent>
    </Card>
  );
};

export default OverViewCard;
