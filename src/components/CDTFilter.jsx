import { useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'

export default function CDTFilter() {

  const {planogramData,customPlanogramData, setSelectedBrand , setSelectedSubcat, setSelectedFineline,selectedBrand,selectedSubcat, selectedFineline, cdtLevels, setCdtLevels, cdtValues, setCdtValues, selectedCdtValues, setSelectedCdtValues, activeCdtValues, setActiveCdtValues, selectedItems, setSelectedItems } = usePlanogram();

  const cdtLevelCnt = 7
  // const [cdtLevels, setCdtLevels] = useState([])
  // const [cdtValues, setCdtValues] = useState({})
  // const [selectedCdtValues, setSelectedCdtValues] = useState({})
  // const [activeCdtValues, setActiveCdtValues] = useState({})


  useEffect(() => {
    
    let _cdtLevels = []
    let _cdtValues = {}
    let _selectedCdtValues = {}

    for(let i=1;i<=cdtLevelCnt;i++) {
      let lvl = `cdt_${i}`
      _cdtLevels.push(lvl)
      _cdtValues[lvl] = [...new Set(planogramData.map((_item) => _item[lvl]))]
      _selectedCdtValues[lvl] = undefined
    }

    setCdtLevels(_cdtLevels.reverse())
    setCdtValues(_cdtValues)
    setSelectedCdtValues(_selectedCdtValues)
    setActiveCdtValues(_cdtValues)

  }, [planogramData, customPlanogramData])


  function onSelectCDTLevel(sval, slvl) {
    
    let _cdtValues = {...cdtValues}
    let _selectedCdtValues = {...selectedCdtValues}
    let _activeCdtValues = {...activeCdtValues}

    let _selectedItems = [...planogramData]
    
    _selectedCdtValues[slvl] = sval
    
    for(let i=1; i<=cdtLevelCnt; i++) {
      let ilvl = `cdt_${i}`
      _selectedItems = _selectedItems.filter(_item => _item[ilvl] === _selectedCdtValues[ilvl] || _selectedCdtValues[ilvl] === '' || !_selectedCdtValues[ilvl])

      if(ilvl === slvl) continue
      let _activeItems = [...planogramData]
      for(let j=1; j<=cdtLevelCnt; j++) {
        let jlvl = `cdt_${j}`
        if(jlvl === ilvl) continue
        if(!_selectedCdtValues[jlvl]) continue
        _activeItems = [...new Set(_activeItems
          .filter(_item => _item[jlvl] === _selectedCdtValues[jlvl] || _selectedCdtValues[jlvl] === '' || !_selectedCdtValues[jlvl])
        )]
      }

      let _lvlActiveCdtValues = new Set()
      for(let j=1; j<=cdtLevelCnt; j++) {
        let jlvl = `cdt_${j}`
        if(ilvl === jlvl) continue

        _lvlActiveCdtValues = _lvlActiveCdtValues.union(new Set(_activeItems
          .filter((_item) => _item[jlvl] === _selectedCdtValues[jlvl] || _selectedCdtValues[jlvl] === '' || !_selectedCdtValues[jlvl])
          .map(_item => _item[ilvl])
        ))

      }
      _activeCdtValues[ilvl] = [..._lvlActiveCdtValues]
    }
    
    setSelectedCdtValues(_selectedCdtValues)
    setActiveCdtValues(_activeCdtValues)
    setSelectedItems(_selectedItems)
    
  }


  return (
    <div  className="flex flex-col max-w-full">
      <div className={`flex flex-row w-1/2`}>
        {cdtLevels.length ? cdtLevels.map((lvl,lix) => {
          return <Select
            key={lix}
            label={`${lvl}`}
            placeholder="(All)"
            className="max-w-auto cdt"
            onChange={(e) => onSelectCDTLevel(e.target.value,lvl)}
            disabledKeys={[...new Set(cdtValues[lvl].filter(cv => !activeCdtValues[lvl].includes(cv)))]}
          >
            {cdtValues[lvl].map((val, vix) => {
              return <SelectItem key={val} value={val} className="text-black min-w-fit" isDisabled={false}>
                {val}
              </SelectItem>
          })}
          </Select>

        }) : <></>}
      </div>
    </div>
  )
}
