import { useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import uniqolor from 'uniqolor';
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import { kenvueColorsHex } from '@/app/constants';


export default function BlockSelection() {

  const { allPlanogramsData, planogramData, setPlanogramData, customPlanogramData, selectedFilterValues, selectedBlock, setSelectedBlock, selectedItems, blockColors, setBlockColors, activeBlockColors, setActiveBlockColors } = usePlanogram();

  const cdtLevelCnt = 7
  const filterNames = ["cdt_7", "cdt_6", "cdt_5", "cdt_4", "cdt_3", "cdt_2", "cdt_1", "brand_nm"]

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    
    if (!selectedBlock) {
      let _blockColors = {}
      
      for (let i = 0; i < filterNames.length; i++) {
        let fn = filterNames[i]
        _blockColors[fn] = {}
        let fv = new Set(allPlanogramsData["before"].map((_item) => _item[fn]))
        fv = [...fv.union(new Set(allPlanogramsData["after"].map((_item) => _item[fn])))]
        fv.sort()
        fv.forEach((_fv, ix) => {
          // _blockColorsObj[sb] = uniqolor(`${sb}, ${getRandomInt(30)}`).color // _brandColors[i]
          _blockColors[fn][_fv] = getColor(ix * 10)
        })
      }
      
      // console.log(_blockColors)
      setBlockColors(_blockColors)
    }
  }, [])

  useEffect(() => {

    if(selectedBlock) onSelectBlock(selectedBlock)

  }, [selectedItems])


  function getColor(number) {
    const hue = number * 137.508; // use golden angle approximation
    return `hsl(${hue},40%,60%)`;
  }

  function sortObject(obj) {
    const sortedObj = {};
    const sortedKeys = Object.keys(obj).sort();
    sortedKeys.forEach(key => {
      sortedObj[key] = obj[key];
    });
    return sortedObj

  }

  function onSelectBlock(block) {
    let _selectedBlock = block
    let _selectedBlockValues = []
    if (_selectedBlock) {
      _selectedBlockValues = [...new Set(selectedItems.map(item => item[_selectedBlock]))]
    }
    let _selectedItemNumbers = [...new Set(selectedItems.map(item => item["upc_nbr"]))]

    setSelectedBlock(block)
    // _selectedBlockValues.sort()
    // let _blockColorsObj = {}
    // _selectedBlockValues.forEach((sb, ix) => {
    //   // _blockColorsObj[sb] = uniqolor(`${sb}, ${getRandomInt(30)}`).color // _brandColors[i]
    //   _blockColorsObj[sb] = getColor(ix * 10)
    // })
    // setBlockColors(_blockColorsObj)

    let _planogramData = [...planogramData]
    let _activeBlockColors = {}
    _activeBlockColors[_selectedBlock] = {}
    _planogramData.forEach(item => {
      if (_selectedBlock) {
        if (_selectedItemNumbers.includes(item["upc_nbr"])) {
          item["itemColor"] = blockColors[_selectedBlock][item[_selectedBlock]]
          _activeBlockColors[_selectedBlock][item[_selectedBlock]] = blockColors[_selectedBlock][item[_selectedBlock]]
        } else {
          item["itemColor"] = "white"
        }
      } else if (_selectedItemNumbers.includes(item["upc_nbr"])) {
        item["itemColor"] = selectedItems.length === planogramData.length ? "white" : kenvueColorsHex.TrustGreen.Regular
      } else {
        item["itemColor"] = "white"
      }
    })


    // _activeBlockColors[_selectedBlock] = sortObject(_activeBlockColors[_selectedBlock])
    // console.log(_activeBlockColors[_selectedBlock])
    setPlanogramData(_planogramData)
    setActiveBlockColors(sortObject(_activeBlockColors[_selectedBlock]))
  }


  return (
    <div className={`flex flex-row min-w-[10vw]`}>
      <Select
        label="Block"
        placeholder="(All)"
        radius="none"
        variant="underlined"
        textValue={"block"}
        size="sm"
        className="max-w-auto border-green-700"
        onChange={(e) => onSelectBlock(e.target.value)}
        selectedKeys={[selectedBlock]}
      >
        {filterNames.map((fn, nix) => {
          return <SelectItem key={fn} textValue={fn} value={fn} className="text-black min-w-fit">
            {fn}
          </SelectItem>
        })}
      </Select>
    </div>
  )
}
