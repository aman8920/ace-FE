import { useEffect, useState } from 'react'
import { Tooltip } from '@nextui-org/react'
import { kenvueColorsHex } from '@/app/constants'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import ItemTooltip from './ItemTooltip';
import Tray from './Tray';
import Sku from './Sku';


export default function ItemSet(props) {
  const { vwScale, vhScale, selectedBlock, highlightedBlockValue } = usePlanogram()
  const [item, setItem] = useState()
  const [hfacings, setHfacings] = useState([])
  const [vfacings, setVfacings] = useState([])

  useEffect(() => {
    let _item = props.data
    if (_item) {
      let _hfacingsQty = _item.is_tray_item ? _item.tot_tray_hfacings_qty : _item.tot_item_hfacings_qty
      let _vfacingsQty = _item.is_tray_item ? _item.tot_tray_vfacings_qty : _item.tot_item_vfacings_qty

      let _hfacings = []
      let _vfacings = []

      for (let i = 0; i < _hfacingsQty; i++) {
        _hfacings.push(i)
      }
      for (let i = 0; i < _vfacingsQty; i++) {
        _vfacings.push(i)
      }

      setItem(_item)
      setHfacings(_hfacings)
      setVfacings(_vfacings)
    }
  }, [props.data])


  return item && Object.keys(item).length ? (
    <Tooltip content={<ItemTooltip data={item} delay={10} closeDelay={10} />} className="text-black">
      <div
        className={`flex flex-row justify-items-start align-bottom items-end hover:opacity-70 box-content hover:border-b-1 hover:border-b-yellow-500`}
        style={{
          // backgroundColor: "#fff",
          // background: `repeating-linear-gradient( -45deg, #fff 4px, #fff 8px, #333 1px, #333 1px, #fff 10px)`,
          marginLeft: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * item.finger_space_qty / 2 / (item.modular_width_qty)}vw`,
          marginRight: `${(props.splitPane ? vwScale : Math.floor(vwScale / 2)) * item.finger_space_qty / 2 / (item.modular_width_qty)}vw`,
          opacity: highlightedBlockValue ? (highlightedBlockValue == item[selectedBlock] ? 1 : 0.2) : 1
        }}
      >
        {hfacings.map((hf, hfidx) => {
          return (
            <div
              key={hfidx}
              className={`flex flex-col justify-items-start align-bottom items-end`}
            >
              {vfacings.map((vf, vfidx) => {
                return (
                  item.is_tray_item ? <Tray key={`${hfidx}_${vfidx}`} data={item} splitPane={props.splitPane} /> : <Sku key={`${hfidx}_${vfidx}`} data={item} splitPane={props.splitPane} />
                )
              })}
            </div>
          )
        })}
      </div >
    </Tooltip>
  ) : <></>
}