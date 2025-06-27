import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import UploadButton from './UploadButton'
import { Button } from '@nextui-org/react'
import UPC from '@/models/upcManager'


export default function UpcManager(props) {
  const SUPPORTED_FILE_TYPES = ['csv', 'xlsx']
  const [selectedFile, setSelectedFile] = useState()

  useEffect(() => {}, [])

  function onSelectFile(e) {
    let f = e.target.files[0]
    let ft = f.name.split('.')[1]
    console.log(ft)
    if (!f) return
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
    setPlanogramData(JSON.parse(data['data']['data']))
  }



  return (
    <div className="flex flex-row justify-start bg-tr w-screen h-20 align-middle items-center">
      <UploadButton onChange={onSelectFile} selectedFile={selectedFile} />
      <Button onClick={onFileUpload} className="bg-black text-white ml-5" isDisabled={!selectedFile}>
        Submit
      </Button>
      <div>UPC Manager</div>
    </div>
  )
}
