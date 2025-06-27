import React, { useEffect, useState } from 'react'
import { select, Select, SelectItem } from '@nextui-org/react'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import { kenvueColorsHex } from '@/app/constants';
import Zoom from './Zoom';

export default function PogFilters() {

  const { allPlanogramsData, planogramData, setPlanogramData, planogramVersion, setSelectedItems, filterValues, setFilterValues, selectedFilterValues, setSelectedFilterValues, activeFilterValues, setActiveFilterValues } = usePlanogram();

  const filterNames = ["cdt_7", "cdt_6", "cdt_5", "cdt_4", "cdt_3", "cdt_2", "cdt_1", "brand_nm"]

  useEffect(() => {
    if (!Object.keys(selectedFilterValues).length) {
      let _filterValues = {}
      let _selectedFilterValues = {}

      for (let i = 0; i < filterNames.length; i++) {
        let fn = filterNames[i]
        let _fv = new Set(allPlanogramsData["before"].map((_item) => _item[fn]))
        _fv = [..._fv.union(new Set(allPlanogramsData["after"].map((_item) => _item[fn])))]
        _filterValues[fn] = [..._fv]
        _filterValues[fn].sort()
        _selectedFilterValues[fn] = undefined
      }

      let _selectedItems = [...planogramData]
      setSelectedItems(_selectedItems)

      setFilterValues(_filterValues)
      setActiveFilterValues(_filterValues)
      setSelectedFilterValues(_selectedFilterValues)
    }


  }, [])

  useEffect(() => {
    let startTime = performance.now()
    onSelectFilter(undefined, undefined)
    let endTime = performance.now()
  }, [planogramVersion])


  function onSelectFilter(sfv, sfn) {

    let _filterValues = { ...filterValues }
    let _selectedFilterValues = { ...selectedFilterValues }
    let _activeFilterValues = { ...activeFilterValues }

    let _selectedItems = [...planogramData]

    _selectedFilterValues[sfn] = sfv

    for (let i = 0; i < filterNames.length; i++) {
      let ifn = filterNames[i]
      _selectedItems = _selectedItems.filter(_item => _item[ifn] === _selectedFilterValues[ifn] || _selectedFilterValues[ifn] === '' || !_selectedFilterValues[ifn])

      if (ifn === sfn) continue
      let _activeItems = [...planogramData]
      for (let j = 0; j < filterNames.length; j++) {
        let jfn = filterNames[j]
        if (jfn === ifn) continue
        if (!_selectedFilterValues[jfn]) continue
        _activeItems = [...new Set(_activeItems
          .filter(_item => _item[jfn] === _selectedFilterValues[jfn] || _selectedFilterValues[jfn] === '' || !_selectedFilterValues[jfn])
        )]
      }

      let _fnActiveFilterValues = new Set()
      for (let j = 0; j < filterNames.length; j++) {
        let jfn = filterNames[j]
        if (ifn === jfn) continue

        _fnActiveFilterValues = _fnActiveFilterValues.union(new Set(_activeItems
          .filter((_item) => _item[jfn] === _selectedFilterValues[jfn] || _selectedFilterValues[jfn] === '' || !_selectedFilterValues[jfn])
          .map(_item => _item[ifn])
        ))

      }
      _activeFilterValues[ifn] = [..._fnActiveFilterValues]
    }

    let _planogramData = [...planogramData]
    _planogramData.forEach(_item => {
      if (_selectedItems.map(_sitem => _sitem.upc_nbr).includes(_item.upc_nbr)) {
        _item["itemColor"] = _selectedItems.length === planogramData.length ? "transparent" : kenvueColorsHex.TrustGreen.Regular
      } else {
        _item["itemColor"] = "white"
      }
    })
    setPlanogramData(_planogramData)
    setSelectedFilterValues(_selectedFilterValues)
    setActiveFilterValues(_activeFilterValues)
    setSelectedItems(_selectedItems)

  }


  return (
    <div key={"pog"} className={`flex flex-row items-center flex-grow`}>
      {Object.keys(filterValues).length ? filterNames.map((fn, nix) => {
        return (
          <Select
            key={`${fn}_${nix}`}
            label={fn}
            radius="none"
            variant="underlined"
            textValue={fn}
            size="sm"
            placeholder="(All)"
            className="cdt mr-2 grow pog-filters"
            onChange={(e) => onSelectFilter(e.target.value, fn)}
            selectedKeys={[selectedFilterValues[fn]]}
            disabledKeys={[...new Set(filterValues[fn].filter(fv => !activeFilterValues[fn].includes(fv)))]}
          >
            {filterValues[fn].map((fv, vix) => {
              return <SelectItem key={`${fv}`} textValue={fv} className="text-small">
                {fv}
              </SelectItem>
            })}
          </Select>
        )
      }) : <></>}
      {/* <Zoom /> */}
    </div>
  )
}
