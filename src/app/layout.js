import { Inter } from 'next/font/google'
import './globals.css'
import localFont from 'next/font/local'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { StyledRoot } from './../StyledRoot'
import AppNavigation from './appnavigation'
import { DrawerContextProvider } from '@/applicationcontext/DrawerContextProvider'
import UploadPlanogram from '@/components/UploadPlanogram'
import { PlanogramProvider } from '@/applicationcontext/PlanogramContextProvider'
import { AuthProvider, ProtectRoute } from '@/applicationcontext/AuthProvider'
import { CssBaseline } from '@mui/material'

// Font files can be colocated inside of `pages`
const kenvueSans = localFont({
  src: [
    {
      path: './../../public/fonts/Kenvue_Sans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './../../public/fonts/Kenvue_Sans-Regular_Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './../../public/fonts/Kenvue_Sans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './../../public/fonts/Kenvue_Sans-Medium_Italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './../../public/fonts/Kenvue_Sans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './../../public/fonts/Kenvue_Sans-Bold_Italic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
})
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kenvas',
  description: 'Planogram viewer',
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={kenvueSans.className}>
          <AppRouterCacheProvider options={{ key: 'kenvue' }}>
            <DrawerContextProvider>
              <StyledRoot>
              <CssBaseline />
                <AppNavigation></AppNavigation>
                <PlanogramProvider>
                  {/* <UploadPlanogram></UploadPlanogram> */}
                  {children}
                </PlanogramProvider>
              </StyledRoot>
            </DrawerContextProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
