import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
// import { Slider } from "@nextui-org/slider"
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { useEffect, useState } from 'react'
import { kenvueColorsHex } from '@/app/constants'
import { IconButton } from '@mui/material'

export default function Zoom(props) {
  const { vwScale, setVwScale, vhScale, setVhScale, planogramWidth, planogramHeight } = usePlanogram()
  const [scale, setScale] = useState(80)

  useEffect(() => {
    let _scale = 80
    setScale(_scale)
    setVwScale(_scale)
    setVhScale(_scale * planogramHeight / planogramWidth)
  }, [])


  function onZoomOut() {
    if (scale <= 50) return
    let _scale = scale - 10
    setScale(_scale)
    setVwScale(_scale)
    setVhScale(_scale * planogramHeight / planogramWidth)
  }

  function onZoomIn() {
    if (scale >= 100) return
    let _scale = scale + 10
    setScale(_scale)
    setVwScale(_scale)
    setVhScale(_scale * planogramHeight / planogramWidth)
  }

  // console.log(props.data);
  return (
    <div className="w-fit flex flex-row items-center">
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onZoomOut}
        color="inherit"
        disabled={scale <= 50}
      >
        <ZoomOutIcon />
      </IconButton>
      <div className="text-small border-1 text-center min-w-[40px] w-[40px]">{scale}</div>
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onZoomIn}
        color="inherit"
        disabled={scale >= 100}
      >
        <ZoomInIcon />
      </IconButton>

    </div>
  )
}
