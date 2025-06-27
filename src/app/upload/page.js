'use client'

import React from 'react'
import Planogram from '@/components/Planogram'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import PlanogramFilter from '@/components/PlanogramFilter'
import CDTFilter from '@/components/CDTFilter'
import PogFilters from '@/components/PogFilters'
import BlockSelection from '@/components/BlockSelection'
import Zoom from '@/components/Zoom'
import { Spacer } from '@nextui-org/react'
import PlanogramTabs from '@/components/PlanogramTabs'
import { ProtectRoute } from '@/applicationcontext/AuthProvider'
import UploadPlanogram from '@/components/UploadPlanogram'
import KPIScorecard from '@/components/KPIBaseScorecard'
// import LoginForm from '@/components/LoginForm'

export default function Home() {
  const { planogramData } = usePlanogram()
  return (
    <ProtectRoute>
      <div className="flex flex-col w-screen h-screen justify-center items-center" style={{ backgroundColor: '#fff' }}>
        <UploadPlanogram />
      </div>
    </ProtectRoute>
  )
}
