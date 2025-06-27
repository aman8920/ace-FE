'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
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
import { Spacer, Spinner } from '@nextui-org/react'
import PlanogramTabs from '@/components/PlanogramTabs'
import { ProtectRoute, useAuth } from '@/applicationcontext/AuthProvider'
import UploadPlanogram from '@/components/UploadPlanogram'
import KPIScorecard from '@/components/KPIScorecard'
import { CatchingPokemonSharp } from '@mui/icons-material'
// import LoginForm from '@/components/LoginForm'

export default function Home() {
  const params = useParams()
  const { token } = useAuth()
  const [runId, setRunId] = useState()
  const {
    planogramData,
    setPlanogramData,
    setCustomPlanogramData,
    allPlanogramsData,
    setAllPlanogramsData,
    planogramVersion,
    baseScorecardData,
    setBaseScorecardData,
    attrScorecardData,
    setAttrScorecardData,
  } = usePlanogram()
  const [responseStatus, setResponseStatus] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setRunId(params.runId)

    async function fetchPlanogram() {
      const apiPlanogramUrl = `/api/planogram/${params.runId}`
      const body = new FormData()
      const headers = {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }
      const response = await fetch(apiPlanogramUrl, {
        method: 'GET',
        headers,
      })

      const data = await response.json()
      const _responseStatus = response.status
      setResponseStatus(_responseStatus)
      // console.log(_responseStatus)
      // console.log(data)
      if (_responseStatus === 200) {
        let _allPlanogramsData = {
          before: data["data"]["planogram"].filter((item) => item.version === 'before'),
          after: data["data"]["planogram"].filter((item) => item.version === 'after'),
        }
        // console.log(_allPlanogramsData)

        let _baseScorecardData = data["data"]["base_scorecard"]
        setBaseScorecardData(_baseScorecardData)

        let _attrScorecardData = data["data"]["attr_scorecard"]
        setAttrScorecardData(_attrScorecardData)

        _allPlanogramsData['before'] = _allPlanogramsData['before'].sort(
          (a, b) => a.section_nbr - b.section_nbr || a.shelf_nbr - b.shelf_nbr || a.modular_loc_id - b.modular_loc_id,
        )
        _allPlanogramsData['after'] = _allPlanogramsData['after'].sort(
          (a, b) => a.section_nbr - b.section_nbr || a.shelf_nbr - b.shelf_nbr || a.modular_loc_id - b.modular_loc_id,
        )

        setAllPlanogramsData(_allPlanogramsData)
        const actualPlanogramItems = _allPlanogramsData[planogramVersion]
        const paneOnePlanogramItems = actualPlanogramItems.map((ite, index) => ({
          ...ite,
          'pane-1': true,
          index: index + 'pane-1',
        }))
        const paneTwoPlanogramItems = actualPlanogramItems.map((ite, index) => ({
          ...ite,
          'pane-2': true,
          index: index + 'pane-2',
        }))
        let _planogramData = paneOnePlanogramItems.sort(
          (a, b) => a.section_nbr - b.section_nbr || a.shelf_nbr - b.shelf_nbr || a.modular_loc_id - b.modular_loc_id,
        )
        setPlanogramData(_planogramData)
        setCustomPlanogramData(paneTwoPlanogramItems)
        setIsLoading(false)
      } else if ([400, 404].includes(_responseStatus)) {
        setIsLoading(false)
      }
    }

    if (token) fetchPlanogram()
  }, [token])

  useEffect(() => {
    setPlanogramData(allPlanogramsData[planogramVersion])
  }, [planogramVersion])

  return (
    <ProtectRoute>
      <div className="flex flex-col w-screen h-screen justify-center items-center" style={{ backgroundColor: '#fff' }}>
        {/* <Zoom /> */}
        {/* <LoginForm /> */}
        {!isLoading ? (planogramData.length ? (
          <div className={`App w-screen h-[calc(100vh-100px)] flex flex-col justify-between`}>
            {/* {<PlanogramFilter></PlanogramFilter>} */}
            {/* {<CDTFilter></CDTFilter>} */}
            <div className="w-full h-[50px] flex flex-row">
              {<BlockSelection></BlockSelection>}
              <Spacer x={10} />
              {<PogFilters></PogFilters>}
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
              <Planogram splitPane={true} pane={'pane-1'} />
              {/* </TransformComponent> */}
              {/* </TransformWrapper> */}
              <div className="flex flex-row max-h-[10vh] mt-8 pl-4 pr-4 justify-between">
                <PlanogramTabs />
                <Zoom />
                {baseScorecardData && attrScorecardData ? <KPIScorecard /> : <></>}
              </div>
            </DndProvider>
          </div>
        ) : (
          <>404 NOT FOUND</>
        )) : <Spinner label="Loading..." />}
      </div>
    </ProtectRoute>
  )
}
