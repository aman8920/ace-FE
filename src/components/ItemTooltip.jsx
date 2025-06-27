import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import { kenvueColorsHex } from '@/app/constants'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'

export default function ItemTooltip(props) {

  const itemKeys = ["upc_nbr", "cdt_7", "cdt_6", "cdt_5", "cdt_4", "cdt_3", "cdt_2", "cdt_1", "brand_nm", "subcategory_desc", "fineline_desc", "item_desc"]

  useEffect(() => {
  }, [])

  return (
    <div className="flex flex-col">
      {itemKeys.map((k, i) => {
        return <div key={i} className="flex flex-row justify-between">
          <span className='text-slate-500 text-sm'>{k}</span><span className='grow'>&emsp;</span><span className='font-semibold text-sm'>{props.data[k]}</span>
        </div>
      })}
    </div>
  )
}
