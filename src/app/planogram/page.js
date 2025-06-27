'use client'

import React, { useState } from 'react'
import Planogram from '@/components/Planogram'

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PlanogramProvider, usePlanogram } from '@/applicationcontext/PlanogramContextProvider';
import SplitPane, { Pane } from 'react-split-pane';
import PlanogramFilter from '@/components/PlanogramFilter'

export default function Home() {
  const { planogramData, customPlanogramData } = usePlanogram();
  const [selectedBrand, setSelectedBrand] = useState()
  const [selectedSubcat, setSelectedSubcat] = useState()
  const [selectedFineline, setSelectedFineline] = useState()

  const onFilterSelection = (selectedBrand, selectedSubcat, selectedFineline) => {
    setSelectedBrand(selectedBrand);
    setSelectedSubcat(selectedSubcat);
    setSelectedFineline(selectedFineline);
  }

  return (
    <PlanogramProvider>
      <div className="flex flex-col min-w-full max-w-fit min-h-full max-h-fit bg-white">
        {<PlanogramFilter></PlanogramFilter>}
        <div style={{ height: 'auto !important' }}>
          <SplitPane
            split="vertical"
            allowResize={false}
            minSize={'50%'}
            maxSize={'50%'}
            defaultSize={'50%'}
            style={{ overflowY: 'scroll', height: 'auto !important', background: '#FEFEFE' }}
            paneStyle={{ flex: 'none', position: 'relative', outline: 'none', width: '50%' }}
            pane1Style={{ background: '#28272724' }}
          //  pane2Style={{padding:'8px',margin:'8px'}}
          //  style={{ background: '#f0f0f0', borderLeft: '1px solid #ccc' }}
          >
            <Pane style={{ marginRight: '30px', background: '#fff' }} >
              <div>
                {planogramData.length ? <div className="App">
                  <DndProvider backend={HTML5Backend}>
                    <Planogram splitPane={false} pane={'pane-1'} data={planogramData} onFilterSelection={onFilterSelection} selectedBrand={selectedBrand} selectedSubcat={selectedSubcat} selectedFineline={selectedFineline} />
                  </DndProvider>
                </div> : <></>}
              </div>
            </Pane>
            <Pane style={{ background: '#fff' }} >
              <div>
                {planogramData.length ? <div className="App">
                  <DndProvider backend={HTML5Backend}>
                    <Planogram splitPane={false} pane={'pane-2'} data={customPlanogramData} onFilterSelection={onFilterSelection} selectedBrand={selectedBrand} selectedSubcat={selectedSubcat} selectedFineline={selectedFineline} />
                  </DndProvider>
                </div> : <></>}
              </div>
            </Pane>
          </SplitPane>
        </div>
      </div>
    </PlanogramProvider>
  )
}
