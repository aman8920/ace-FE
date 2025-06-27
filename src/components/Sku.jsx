import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import { kenvueColorsHex } from '@/app/constants'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import ItemTooltip from './ItemTooltip';

export default function Sku(props) {
  const { vwScale, vhScale } = usePlanogram()
  const [item, setItem] = useState()


  useEffect(() => {
    setItem(props.data)
  }, [props.data])


  return item && Object.keys(item).length ? (
    
      <div
        style={{
          width: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * item.item_width_adj_qty / item.modular_width_qty}vw`,
          height: `${vhScale * item.item_height_adj_qty / item.modular_height_qty}vw`,
          backgroundColor: item.itemColor
          // backgroundColor: "green"
        }}
        className={`itemx self-center shadow-small border-r-[0px] border-t-[0px] border-gray-300 box-border relative`}>
      </div>
    // </Tooltip>
  ) : <></>
}
