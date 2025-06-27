import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import { useEffect, useState } from 'react'

export default function ColorLegend(props) {
  const { activeBlockColors, selectedBlock } = usePlanogram()
  const { highlightedBlockValue, setHighlightedBlockValue } = usePlanogram()

  useEffect(() => {
    setHighlightedBlockValue(undefined)
  }, [selectedBlock])

  function onBlockHighlight(blockValue) {
    if (highlightedBlockValue == blockValue) blockValue = undefined
    setHighlightedBlockValue(blockValue)
  }

  return (
    <div className="absolute flex flex-col right-0 top-[0px] text-sm h-[300px] overflow-y-auto mt-2 scrollbar-thin">
      {selectedBlock && Object.entries(activeBlockColors).length && Object.entries(activeBlockColors).length ? (
        Object.entries(activeBlockColors).map((_blockColor, _idx) => {
          let boxStyle = {
            backgroundColor: _blockColor[1],
            width: "10px",
            height: "10px",
            marginTop: "auto",
            marginBottom: "auto",
            borderRadius: "30%",
            opacity: highlightedBlockValue ? (highlightedBlockValue == _blockColor[0] ? 1 : 0.2) : 1
          }
          let textStyle = {
            // color: "black",
            // margin: "2px"
            opacity: highlightedBlockValue ? (highlightedBlockValue == _blockColor[0] ? 1 : 0.2) : 1
          }
          return (
            <div key={_idx} className="flex flex-row ml-5 mr-5 cursor-pointer group" onClick={() => onBlockHighlight(_blockColor[0])}>
              <div className={`group-hover:text-[color:${_blockColor[1]}]`} style={boxStyle}></div>
              <div className={`group-hover:text-[color:${_blockColor[1]}]`} style={textStyle}>&emsp;{_blockColor[0]}</div>
            </div>
          )
        })
      ) : (
        <></>
      )}
    </div>
  )
}
