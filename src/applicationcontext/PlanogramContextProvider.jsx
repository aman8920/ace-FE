'use client'
import { createContext, useContext, useState } from "react"

const PlanogramContext = createContext(undefined)

export function PlanogramProvider({ children }) {
  const [planogramData, setPlanogramData] = useState([]);
  const [customPlanogramData, setCustomPlanogramData] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState();
  const [selectedSubcat, setSelectedSubcat] = useState();
  const [selectedFineline, setSelectedFineline] = useState();

  const [cdtLevels, setCdtLevels] = useState([])
  const [cdtValues, setCdtValues] = useState({})
  const [selectedCdtValues, setSelectedCdtValues] = useState({})
  const [activeCdtValues, setActiveCdtValues] = useState({})

  const [selectedItems, setSelectedItems] = useState([])

  const [filterValues, setFilterValues] = useState({})
  const [selectedFilterValues, setSelectedFilterValues] = useState({})
  const [activeFilterValues, setActiveFilterValues] = useState({})

  const [selectedBlock, setSelectedBlock] = useState("")
  const [selectedBlockValues, setSelectedBlockValues] = useState([])
  const [highlightedBlockValue, setHighlightedBlockValue] = useState()
  const [blockColors, setBlockColors] = useState({})
  const [activeBlockColors, setActiveBlockColors] = useState({})

  const initZoom = 80
  const [zoom, setZoom] = useState(initZoom)
  
  const initPlanogramWidth = 532
  const initPlanogramHeight = 180
  const [planogramWidth, setPlanogramWidth] = useState(initPlanogramWidth)
  const [planogramHeight, setPlanogramHeight] = useState(initPlanogramHeight)
  
  const initVhScale = initZoom * initPlanogramHeight / initPlanogramWidth
  const [vhScale, setVhScale] = useState(initVhScale)
  const [vwScale, setVwScale] = useState(100)

  const [planogramVersion, setPlanogramVersion] = useState("after")
  const [allPlanogramsData, setAllPlanogramsData] = useState({})

  const [baseScorecardData, setBaseScorecardData] = useState({})
  const [attrScorecardData, setAttrScorecardData] = useState({})

  return (
    <PlanogramContext.Provider
      value={{
        planogramData,
        setPlanogramData,
        customPlanogramData,
        setCustomPlanogramData,
        selectedBrand, setSelectedBrand,
        selectedSubcat, setSelectedSubcat,
        selectedFineline, setSelectedFineline,
        cdtLevels, setCdtLevels,
        cdtValues, setCdtValues,
        selectedCdtValues, setSelectedCdtValues,
        activeCdtValues, setActiveCdtValues,
        selectedItems, setSelectedItems,
        filterValues, setFilterValues,
        selectedFilterValues, setSelectedFilterValues,
        activeFilterValues, setActiveFilterValues,
        selectedBlock, setSelectedBlock,
        selectedBlockValues, setSelectedBlockValues,
        highlightedBlockValue, setHighlightedBlockValue,
        blockColors, setBlockColors,
        activeBlockColors, setActiveBlockColors,
        zoom, setZoom,
        vwScale, setVwScale,
        vhScale, setVhScale,
        planogramWidth, setPlanogramWidth,
        planogramHeight, setPlanogramHeight,
        planogramVersion, setPlanogramVersion,
        allPlanogramsData, setAllPlanogramsData,
        baseScorecardData, setBaseScorecardData,
        attrScorecardData, setAttrScorecardData,
      }}
    >
      {children}
    </PlanogramContext.Provider>
  )
}


export function usePlanogram() {
  const context = useContext(PlanogramContext)

  if (!context)
    throw new Error('usePlanogram must be used inside a `PlanogramProvider`')

  return context
}