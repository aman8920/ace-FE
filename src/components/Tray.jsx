import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import { kenvueColorsHex } from '@/app/constants'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import ItemTooltip from './ItemTooltip';
import Item from './ItemSet';
import Sku from './Sku';

export default function Tray(props) {
  const { vwScale, vhScale } = usePlanogram()
  const [item, setItem] = useState()
  const [hTrayItemFacings, setHTrayItemFacings] = useState()
  const [vTrayItemFacings, setVTrayItemFacings] = useState()


  useEffect(() => {
    let _item = props.data

    let _hTrayItemFacings = []
    for (let i = 0; i < _item.tray_item_hfacings_qty; i++) {
      _hTrayItemFacings.push(i+1)
    }

    let _vTrayItemFacings = []
    for (let i = 0; i < _item.tray_item_vfacings_qty; i++) {
      _vTrayItemFacings.push(i+1)
    }

    setItem(_item)
    setHTrayItemFacings(_hTrayItemFacings)
    setVTrayItemFacings(_vTrayItemFacings)

  }, [props.data])


  
  return item && Object.keys(item).length ? (
    <div
      className={`flex flex-row justify-between align-bottom items-bottom`}
      style={{
        width: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * item.tray_width_qty / (item.modular_width_qty)}vw`,
        height: `${vhScale * item.tray_height_qty / item.modular_height_qty}vw`,
        // backgroundColor: "blue"
      }}
    >
      {hTrayItemFacings.map((hf, hfidx) => {
        return (
          <div
            key={`x${hfidx}`}
            className={`flex flex-col justify-end items-center`}
            style={{
              width: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * item.tray_width_qty / (item.modular_width_qty)}vw`,
              height: `${vhScale * item.tray_height_qty / item.modular_height_qty}vw`,
            }}
          >
            {vTrayItemFacings.map((vf, vfidx) => {
              return <Sku key={`x${hfidx}_${vfidx}`} data={item} splitPane={props.splitPane} />
            })}
          </div>
        )
      })}
    </div>
  ) : <></>
}
