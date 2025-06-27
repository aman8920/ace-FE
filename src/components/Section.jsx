import { useEffect, useState } from 'react'
import Shelf from './Shelf'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'

export default function Section(props) {
  const [shelves, setShelves] = useState([])
  const { vwScale, vhScale } = usePlanogram()

  useEffect(() => {
    let _shelves = [...new Set(props.data.map((_item) => _item.shelf_nbr))]
    setShelves(_shelves)
  }, [props.data, props.brandColors])

  // console.log(props.data);
  return (
    <div
      style={{
        width: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * props.data[0].section_width_qty / (props.data[0].modular_width_qty)}vw`,
        scrollbarGutter: "stable",
        bottom: "0px",
      }}
      className={`section max-h-fit min-h-[calc(${vhScale}vw)] border-dashed border-l-slate-500 overflow-x-auto overflow-y-auto scrollbar-thin`}
    >
      {shelves.length ? (
        shelves.map((_shelf, idx) => {
          return (
            <Shelf
              key={idx}
              pane={props.pane}
              splitPane={props.splitPane}
              data={props.data.filter((_item) => _item.shelf_nbr == _shelf)}
              selectedBrand={props.selectedBrand}
              selectedSubcat={props.selectedSubcat}
              selectedFineline={props.selectedFineline}
              brandColors={props.brandColors}
              subcatColors={props.subcatColors}
            />
          )
        })
      ) : (
        <></>
      )}
    </div>
  )
}
