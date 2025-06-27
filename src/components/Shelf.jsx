import { useEffect, useState } from 'react'
import DroppableItem from './droppable/DroppableItem'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import { green } from '@mui/material/colors'

export default function Shelf(props) {
  const [itemNumbers, setItemNumbers] = useState([])
  const { vwScale, vhScale } = usePlanogram()

  useEffect(() => {
    let _itemNumbers = [...new Set(props.data.map((_item) => _item.upc_nbr))]
    setItemNumbers(_itemNumbers)
  }, [props.data])

  return (
    props.data.length ?
      <div
        className={`flex flex-row justify-items-start align-bottom items-end border-b-large border-b-slate-400`}
        style={{
          width: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * props.data[0].section_width_qty / (props.data[0].modular_width_qty)}vw`,
          height: `${vhScale * props.data[0].shelf_height_qty / props.data[0].modular_height_qty}vw`,
          // marginRight: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * 20 / (props.data[0].modlr_wdth_qty)}vw`
        }}
      >
        {itemNumbers.length ? (
          itemNumbers.map((_itemNbr, _idx) => {
            let item = props.data.find((__item) => __item.upc_nbr == _itemNbr)
            // let facings = []
            // for (let i = 0; i < hfacingsQty; i++) {
            //   facings.push(i)
            // }
            // return (
            //   <div
            //     key={_idx}
            //     className="flex flex-row h-fit justify-items-start"
            //     style={{
            //       marginRight: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * item.finger_space_qty / (item.modular_width_qty)}vw`,
            //       width: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * (item.is_tray_item ? item.tray_width_qty : item.item_width_adj_qty) / (props.data[0].modular_width_qty)}vw`,
            //       backgroundColor: "green"
            //     }}
            //   >
            //     {facings.map((_f, _fidx) => {
                  return <DroppableItem
                    key={_idx}
                    pane={props.pane}
                    splitPane={props.splitPane}
                    // position={item.index}
                    data={item}
                    selectedBrand={props.selectedBrand}
                    selectedSubcat={props.selectedSubcat}
                    selectedFineline={props.selectedFineline}
                    brandColors={props.brandColors}
                    subcatColors={props.subcatColors}
                  />
            //     })}
            //   </div>
            // )
          })
        ) : (
          <></>
        )}
      </div> : <></>
  )
}
