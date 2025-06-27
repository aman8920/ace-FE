'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import localFont from 'next/font/local';


// Font files can be colocated inside of `pages`
const kenvueSans = localFont({
    src: [
      {
        path: './../public/fonts/Kenvue_Sans-Regular.woff2',
        weight: '400',
        style: 'normal',
      },
      {
        path: './../public/fonts/Kenvue_Sans-Regular_Italic.woff2',
        weight: '400',
        style: 'italic',
      },
      {
        path: './../public/fonts/Kenvue_Sans-Medium.woff2',
        weight: '500',
        style: 'normal',
      },
      {
        path: './../public/fonts/Kenvue_Sans-Medium_Italic.woff2',
        weight: '500',
        style: 'italic',
      },
      {
        path: './../public/fonts/Kenvue_Sans-Bold.woff2',
        weight: '700',
        style: 'normal',
      },
      {
        path: './../public/fonts/Kenvue_Sans-Bold_Italic.woff2',
        weight: '700',
        style: 'italic',
      },
    ],
  })

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: kenvueSans.style.fontFamily,
  },
  palette: {
    // Define color palette here
    primary: {
      main: '#019870',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f6f6f6',
    },
    slate: {
      main: "#343434"
    },
    unslate: {
      main: "#cdcdcd"
    },
    // Add more color options as needed
  },
});

export default theme;
