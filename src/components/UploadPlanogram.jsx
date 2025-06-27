'use client'

import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import UploadButton from '@/components/UploadButton'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider';
import { useAuth } from '@/applicationcontext/AuthProvider';
import { useRouter } from 'next/navigation';

export default function UploadPlanogram(props) {
  const { setPlanogramData, setCustomPlanogramData, setAllPlanogramsData, planogramVersion, setScorecardData } = usePlanogram();
  const [selectedFile, setSelectedFile] = useState()
  const SUPPORTED_FILE_TYPES = ['csv', 'xlsx']

  const [responseStatus, setResponseStatus] = useState(0)
  const { token } = useAuth()
  const router = useRouter()

  function onSelectFile(f) {
    // let f = e.target.files[0]
    if (!f) return
    // console.log(f.name)
    let ft = f.name.split('.')[1]
    if (!SUPPORTED_FILE_TYPES.includes(ft)) return
    setSelectedFile(f)
  }

  async function onFileUpload() {
    const apiUploadUrl = '/api/upload'
    const body = new FormData()
    body.append('file', selectedFile)
    const headers = {
      Accept: '*/*',
      Authorization: `Bearer ${token}`
    }
    const response = await fetch(apiUploadUrl, {
      method: 'POST',
      headers,
      body,
    })

    const data = await response.json()
    const _responseStatus = await response.status
    setResponseStatus(_responseStatus)
    console.log(_responseStatus)
    console.log(data)
    if (_responseStatus === 200) {
      let _runId = data["data"]["id"]
      router.push(`/planogram/${_runId}`)

      // let _allPlanogramsData = {
      //   "before": JSON.parse(data['data']['before']),
      //   "after": JSON.parse(data['data']['after'])
      // }

      // let _scorecardData = JSON.parse(data['data']['scorecard'])
      // setScorecardData(_scorecardData)

      // _allPlanogramsData["before"] = _allPlanogramsData["before"].sort((a, b) => a.section_nbr - b.section_nbr || a.shelf_nbr - b.shelf_nbr || a.modular_loc_id - b.modular_loc_id)
      // _allPlanogramsData["after"] = _allPlanogramsData["after"].sort((a, b) => a.section_nbr - b.section_nbr || a.shelf_nbr - b.shelf_nbr || a.modular_loc_id - b.modular_loc_id)

      // setAllPlanogramsData(_allPlanogramsData)
      // const actualPlanogramItems = JSON.parse(data['data'][planogramVersion])
      // const paneOnePlanogramItems = actualPlanogramItems.map((ite, index) => ({ ...ite, 'pane-1': true, index: index + 'pane-1' }))
      // const paneTwoPlanogramItems = actualPlanogramItems.map((ite, index) => ({ ...ite, 'pane-2': true, index: index + 'pane-2' }))
      // let _planogramData = paneOnePlanogramItems.sort((a, b) => a.section_nbr - b.section_nbr || a.shelf_nbr - b.shelf_nbr || a.modular_loc_id - b.modular_loc_id)
      // setPlanogramData(_planogramData)
      // setCustomPlanogramData(paneTwoPlanogramItems)
      
      // router.push("/pane")
    }
  }

  return (
    responseStatus === 200 ? <></> :
      <div style={{ background: '#fff' }} className="flex flex-col bg-tr w-fit h-fit justify-around text-sm items-center">
        <UploadButton onChange={onSelectFile} selectedFile={selectedFile} className="text-sm" />
        {responseStatus == 400 ? <span className="text-red-500 mt-2 inline"><ErrorOutlineIcon /> <p className="inline h-full">Planogram Run Already Exists</p></span> : <></>}
        <Button onClick={onFileUpload} className="bg-black text-white text-sm mt-5 w-full" isDisabled={!selectedFile}>
          Submit
        </Button>
      </div>
  )
}
