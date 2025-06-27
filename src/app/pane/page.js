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
        {/* <Zoom /> */}
        {/* <LoginForm /> */}
        {planogramData.length ? (
          <div className={`App w-screen h-[calc(100vh-100px)] flex flex-col justify-between`}>
            {/* {<PlanogramFilter></PlanogramFilter>} */}
            {/* {<CDTFilter></CDTFilter>} */}
            <div className="w-full h-[50px] flex flex-row">
              {<BlockSelection></BlockSelection>}
              <Spacer x={10} />
              {/* {<PogFilters></PogFilters>} */}
            </div>
            
            <DndProvider backend={HTML5Backend}>
              {/* <TransformWrapper
                doubleClick={{
                  mode: 'reset'
                }}
                initialScale={1}
                disabled={false}
                limitToBounds={true}
                pinch={{ step: 5 }}
              >
                <TransformComponent
                  wrapperStyle={{ width: '100%' }}
                  contentStyle={{ width: '100%' }}
                > */}
              <Planogram splitPane={true} pane={'pane-1'} data={planogramData} />
              {/* </TransformComponent> */}
              {/* </TransformWrapper> */}
              <div className="flex flex-row gap-20 mt-20 pl-4 pr-4 justify-between">
              <PlanogramTabs />
              <Zoom />
              <KPIScorecard />
            </div>
            </DndProvider>
          </div>
        ) : (
          <UploadPlanogram />
        )}
      </div>
    </ProtectRoute>
  )
}
