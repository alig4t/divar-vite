import { Typography } from "@material-tailwind/react";
 
import React from 'react';

const Footer = () => {
    return (  
        <footer className="flex w-full flex-row flex-wrap items-center text-sm justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 px-5 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal text-xs">
        &copy; کدنویسی علی قاسمی
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-4">
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors text-xs  hover:text-pink-500 focus:text-pink-500"
          >
           درباره ما
          </Typography>
        </li>
        <span className="text-gray-400">|</span>
        <li>
          <Typography
            as="a"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors text-xs  hover:text-pink-500 focus:text-pink-500"
          >
            پشتیبانی
          </Typography>
        </li>
        
      </ul>
    </footer>
    );
}
 
export default Footer;