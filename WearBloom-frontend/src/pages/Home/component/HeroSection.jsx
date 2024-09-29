import GradientButtonLink from '@/components/Buttons/GradientButtonLink';
import { SITE_NAME } from '@/constants/BaseAxios';
import { ArrowTopRightIcon, DashboardIcon } from '@radix-ui/react-icons';
import { LogOut } from 'lucide-react';
import React from 'react';

const HeroSection = ({
  isLoggedin,
  handleLogout,
}) => {
  return (
    <section className='relative z-10 text-center pt-5 lg:pt-8 pb-0 px-4 sm:px-4 lg:px-8 min-h-[60vh]'>
      <h1 className='text-4xl sm:text-4xl lg:text-5xl mb-8 lg:mb-10 font-semibold leading-tight'>
        Checkout the new way to<br />
        <span className='ctm_highlight text-[50px] lg:text-[65px] lg:my-2'
        style={{ lineHeight: '1.4' }}
        >
        Wardrobe Management
          </span><br /> with <span className='ctm_highlight2 font-oswald'>{SITE_NAME}</span>
      </h1>
      <p className='text-base sm:text-base lg:text-xl max-w-[90%] sm:max-w-[600px] mx-auto mb-8'>
        {SITE_NAME} is a wardrobe management platform that helps you manage your wardrobe, create outfits, and plan your shopping.

      </p>
      <div className='flex flex-col sm:flex-col lg:flex-row justify-center'>
        <GradientButtonLink 
          href={isLoggedin ? '/dashboard' : '/sign-up'}
          text={isLoggedin ? 'Dashboard' : 'Get Started'}
          Icon={isLoggedin ? ArrowTopRightIcon : null}
        />
        <GradientButtonLink 
          href={isLoggedin ? '/' : '/login'}
          text={isLoggedin ? 'Logout' : 'Login'}
          className="lg:hidden"
          onClick={isLoggedin ? handleLogout : null}
        />
      </div>
    </section>
  );
};

export default HeroSection;
