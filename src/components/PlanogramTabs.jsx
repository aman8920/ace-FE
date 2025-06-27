import { useEffect, useState } from 'react'
import {Tabs, Tab } from "@nextui-org/react";
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'

export default function PlanogramTabs(props) {
  const { planogramVersion, setPlanogramVersion, allPlanogramsData, setPlanogramData } = usePlanogram()


  useEffect(() => {
    if (!planogramVersion) {
      setPlanogramVersion("after")
    }
  }, [])

  function onTabChange(tab) {
    // console.log(tab)
    setPlanogramVersion(tab)
    setPlanogramData(allPlanogramsData[tab])
  }


  return (
    <div className="flex w-fit flex-col">
      <Tabs
        color="primary"
        selectedKey={planogramVersion}
        onSelectionChange={onTabChange}
      >
        <Tab key="before" title="Before" />
        <Tab key="after" title="After" />
      </Tabs>
    </div>
  )
}