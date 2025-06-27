import { Input } from "@nextui-org/react";
import React, {useCallback, useState} from 'react'
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {useDropzone} from 'react-dropzone'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { kenvueColorsHex } from "@/app/constants";

// export default function UploadButton(props) {
//   return (
//     <>
//       <label className="flex items-center" htmlFor="file">
//         <span className="sr-only">Choose Planogram file</span>
//       </label>
//       <input
//         type="file"
//         id="file"
//         label={props.selectedFile ? props.selectedFile.name : "ANOOP"}
//         onChange={props.onChange}
//         className="block w-fit text-sm text-slate-500"
//       />
//     </>
//   );
// }


export default function UploadButton(props) {
  const [fname, setFname] = useState()
  
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    let f = acceptedFiles[0]
    props.onChange(f)
    setFname(f.name)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="border-1 hover:border-violet-200 font-semibold m-auto">
      <Card className="max-w-[400px]">
      <CardBody className="items-center">
        <FileUploadOutlinedIcon fontSize="large" sx={{ "&:hover": { color: kenvueColorsHex.TrustGreen.Regular, cursor: "pointer" }}} />
        <p>{fname}</p>
      </CardBody>
      <Divider/>
      <CardFooter className="justify-center">        
        Upload the ACE Planogram file
      </CardFooter>
    </Card>
      
      <input name="upload" {...getInputProps()} />
      {/* {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      } */}
    </div>
  )

}