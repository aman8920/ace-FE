'use client'

import React, { useState } from 'react'
import { Button, Image } from '@nextui-org/react'

import UploadButton from '@/components/UploadButton'
import Planogram from '@/components/Planogram'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PlanogramProvider } from '@/applicationcontext/PlanogramContextProvider'
import { redirect } from 'next/navigation'
// import KenvueLogo from "@/components/kenvue_logo.png"
// import KenvueLogo from "/kenvue_logo.png"

export default function Home() {
  const [selectedFile, setSelectedFile] = useState()
  const [planogramData, setPlanogramData] = useState([])
  const SUPPORTED_FILE_TYPES = ['csv', 'xlsx']

  function onSelectFile(e) {
    let f = e.target.files[0]
    if (!f) return
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
    }
    const response = await fetch(apiUploadUrl, {
      method: 'POST',
      headers,
      body,
    })

    const data = await response.json()
    let _planogramData = JSON.parse(data['data']['data'])
    _planogramData = _planogramData.sort((a,b) => a.modlr_sectn_nbr_derived - b.modlr_sectn_nbr_derived || a.modlr_loc_id - b.modlr_loc_id)
    setPlanogramData(_planogramData)
  }

  redirect("/pane")

  return (
    <div>
      ANOOP SHARMA
    </div>
  //   <PlanogramProvider>
  //     <div className="flex flex-col min-w-full max-w-fit min-h-full max-h-fit bg-white">
  //       <div className="flex flex-row justify-between align-middle items-center">
  //         <Image src="/kenvue_logo.png" alt="Kenvue logo" width={80} height={80} />
  //         <svg fill="#00B097" viewBox="0 0 500 80" width="500" xmlns="http://www.w3.org/2000/svg">
  //           <polygon points="50,0 0,80 500,80 500,0" />
  //           <text x="250" y="50" textAnchor="middle" fill="black" fontSize="30" fontWeight="bold">
  //             Kenvas
  //           </text>
  //         </svg>
  //       </div>
  //       <div className="flex flex-row justify-start bg-tr w-screen h-20 align-middle items-center">
  //         <UploadButton onChange={onSelectFile} selectedFile={selectedFile} />
  //         <Button onClick={onFileUpload} className="bg-black text-white ml-5" isDisabled={!selectedFile}>
  //           Submit
  //         </Button>
  //       </div>
  //       {planogramData.length ? <div className="App">
  //         <DndProvider backend={HTML5Backend}>
  //           <Planogram data={planogramData} />
  //         </DndProvider>
  //       </div> : <></>}
  //     </div>
  //   </PlanogramProvider>
  )
}
