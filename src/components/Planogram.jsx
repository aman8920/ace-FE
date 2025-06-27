import { useEffect, useMemo, useState } from 'react'
import uniqolor from 'uniqolor';
import Section from './Section'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import useWindowDimensions from '@/app/hooks/WindowDimensions';
import ColorLegend from './ColorLegend';
import Zoom from './Zoom';


export default function Planogram(props) {
  const { planogramData, setPlanogramData, customPlanogramData, setCustomPlanogramData, selectedBrand, selectedSubcat, selectedFineline, planogramVersion, setPlanogramWidth, setPlanogramHeight, vwScale, vhScale, setVwScale, setVhScale } = usePlanogram();
  const [sections, setSections] = useState([])
  const [brandColors, setBrandColors] = useState({})
  const [subcatColors, setSubcatColors] = useState({})

  const { vHeight, vWidth } = useWindowDimensions();

  useEffect(() => {
    // let startTime = performance.now()

    let _sections = [...new Set(planogramData.map((_item) => parseInt(_item.section_nbr)))]
    let _brands = [...new Set(planogramData.map((_item) => _item.brand_nm))]

    setSections(_sections.sort((a,b) => a - b))

    if (props.pane === 'pane-1') {
      // setPlanogramData(planogramData)
      if (planogramData && planogramData && planogramData.length) {
        const modular_width_qty = planogramData[0].modular_width_qty
        const modular_height_qty = planogramData[0].modular_height_qty
        if (modular_width_qty && modular_height_qty) {
          setPlanogramWidth(modular_width_qty)
          setPlanogramHeight(modular_height_qty)
          setVhScale(80 * modular_height_qty / modular_width_qty)
        }
      }
    }
    else {
      setCustomPlanogramData(planogramData)
    }
    // let endTime = performance.now()
    // console.log(`Call to useEffect in Planogram.jsx took ${endTime - startTime} milliseconds.`)
  }, [planogramData])

  let _sections = [...new Set(planogramData.map((_item) => parseInt(_item.section_nbr)))]

  return (
    <div className={`flex flex-row justify-center relative h-fit w-[${props.splitPane ? vwScale : Math.floor(vwScale / 2)}vw] grow max-w-full items-end overflow-y-auto overflow-x-auto ${props.pane ? 'overflow-x-auto' : ''}`}>
      {/* <div className={`absolute w-[calc(${props.splitPane ? vwScale : Math.floor(vwScale/2)}vw)] h-[calc(${vhScale}vw)]`}></div> */}
      {/* <div className={`absolute w-[${vWidth-100}px] h-[${vHeight-100}px]`}></div> */}
      <div className={`absolute bottom-[0px] border-4 opacity-25`} style={{ width: `${vWidth}px`, height: `${vhScale * vWidth / 100}px` }}></div>
      {/* <Zoom /> */}
      <ColorLegend />
      {sections && _sections.length == sections.length ? (
        sections.map((_section, idx) => {
          return (
            (planogramData && customPlanogramData) &&
            <Section
              key={idx}
              pane={props.pane}
              splitPane={props.splitPane}
              data={props.pane === 'pane-1' && planogramData ? planogramData.filter((_item) => Math.floor(_item.section_nbr) == _section) : customPlanogramData.filter((_item) => Math.floor(_item.section_nbr) == _section)}
              // data={ planogramData.filter((_item) => Math.floor(_item.modlr_sect_nbr_derived) == _section)}
              selectedBrand={selectedBrand}
              selectedSubcat={selectedSubcat}
              selectedFineline={selectedFineline}
              brandColors={brandColors}
              subcatColors={subcatColors}
            />
          )
        })
      ) : (
        <></>
      )}
    </div>
  )
}
