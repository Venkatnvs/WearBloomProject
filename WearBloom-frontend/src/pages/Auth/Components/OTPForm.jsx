import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { sendOtpToEmail, verifyOtp } from '@/store/actions/authActions';
import { useAuthContext } from '@/context/auth-context';
import formatErrorMessages from '@/lib/formatErrorMessages';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

const OTPForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { email } = useAuthContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  const onSubmit = async data => {
    setLoading(true);
    try {
      const res = await dispatch(verifyOtp(email, data.pin));
      if (res.status === 200 || res.status === 201) {
        console.log('OTP verified');
        toast({
          title: 'Success!',
          description: 'Your Email has been verified',
        });
        navigate('/login');
      } else {
        throw res?.response?.data || 'An error occurred';
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error!',
        description: formatErrorMessages(error),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    const timer =
      resendTimer > 0 &&
      setInterval(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleResendOTP = async () => {
    try {
      const res = await dispatch(sendOtpToEmail(email));
      if (res.status === 200 || res.status === 201) {
        toast({
          title: 'Success!',
          description: 'OTP has been resent to your email',
        });
        setResendTimer(60);
      } else {
        throw res?.response?.data || 'An error occurred';
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error!',
        description: formatErrorMessages(error),
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <div className='flex flex-col space-y-2 text-center lg:mt-4 mt-8'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          One-Time Password
        </h1>
        <p className='text-sm text-muted-foreground'>
          Enter the OTP sent to your email address
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-3 items-center'
        >
          <FormField
            control={form.control}
            name='pin'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center mt-2'>
                <FormLabel className='text-start'>Enter OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='py-2'></div>

          <Button
            disabled={!form.formState.isValid || loading}
            className='w-full'
            type='submit'
          >
            Verify OTP
          </Button>
        </form>
      </Form>

      <div className='text-center'>
        <span className='text-sm text-muted-foreground pointer-events-none'>
          {"Didn't receive the OTP ?"}
        </span>
        <Button
          variant='link'
          onClick={handleResendOTP}
          disabled={resendTimer > 0}
        >
          {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
        </Button>
      </div>
    </>
  );
};

export default OTPForm;
