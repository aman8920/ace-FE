import { useEffect, useState } from 'react'
// import iUPC from '@/models/UPC'


export default function UPC(props) {
  const SUPPORTED_FILE_TYPES = ['csv', 'xlsx']
  const [selectedFile, setSelectedFile] = useState()

  useEffect(() => {}, [])



  return (
    <div className="flex flex-row justify-start bg-tr w-screen h-20 align-middle items-center">
      <div>UPC Manager</div>
    </div>
  )
}
