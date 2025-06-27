import { useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import randomColor from 'randomcolor';
import uniqolor from 'uniqolor';

import Section from './Section'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import Item from './ItemSet';

export default function Planogram(props) {
  const { planogramData, setPlanogramData,customPlanogramData, setCustomPlanogramData } = usePlanogram();
  const [sections, setSections] = useState([])
  const [brands, setBrands] = useState([])
  const [subcats, setSubcats] = useState([])
  const [finelines, setFinelines] = useState([])
  const [brandColors, setBrandColors] = useState({})
  const [subcatColors, setSubcatColors] = useState({})
  // const [selectedBrandIndex, setSelectedBrandIndex] = useState();
  const [selectedBrand, setSelectedBrand] = useState()
  const [selectedSubcat, setSelectedSubcat] = useState()
  const [selectedFineline, setSelectedFineline] = useState()
  const [selectableItems, setSelectableItems] = useState(props.data)
  const [selectableBrands, setSelectableBrands] = useState()
  const [selectableSubcats, setSelectableSubcats] = useState()
  const [selectableFinelines, setSelectableFinelines] = useState()

  useEffect(() => {
    if(props.pane === 'pane-1')
    setPlanogramData(props.data)
  else
    setCustomPlanogramData(props.data)
  }, [props.data])

  useEffect(() => {
    let _sections = [...new Set(planogramData.map((_item) => Math.floor(_item.modlr_sect_nbr_derived)))]
    let _brands = [...new Set(planogramData.map((_item) => _item.brand_nm))]
    let _subcats = [...new Set(planogramData.map((_item) => _item.omni_subcatg_desc))]
    let _finelines = [...new Set(planogramData.map((_item) => _item.fineline_desc))]
    setSections(_sections)
    setBrands(_brands)
    setSubcats(_subcats)
    setFinelines(_finelines)
    let _brandColors = randomColor({
      count: _brands.length,
      format: 'rgba',
      alpha: '0.4',
    })
    // console.log(_brandColors)
    let _brandColorsObj = {}
    _brands.forEach((b, i) => {
      _brandColorsObj[b] = uniqolor(b).color // _brandColors[i]
    })
    setBrandColors(_brandColorsObj)
  }, [props.data,planogramData,customPlanogramData])

  useEffect(() => {
    let _selectableItems = selectableItems.filter((_item) => {
      return (
        (selectedBrand ? selectedBrand == _item.brand_nm : true) &&
        (selectedSubcat ? selectedSubcat == _item.omni_subcatg_desc : true) &&
        (selectedFineline ? selectedFineline == _item.fineline_desc : true)
      )
    })
    let _selectableBrands = [...new Set(_selectableItems.map((_item) => _item.brand_nm))]
    let _selectableSubcats = [...new Set(_selectableItems.map((_item) => _item.omni_subcatg_desc))]
    let _selectableFinelines = [...new Set(_selectableItems.map((_item) => _item.fineline_desc))]
    setSelectableItems(_selectableItems)
    setSelectableBrands(_selectableBrands)
    setSelectableSubcats(_selectableSubcats)
    setSelectableFinelines(_selectableFinelines)
    // console.log(_selectableBrands)
  }, [selectedBrand, selectedSubcat, selectedFineline])

  function onSelectBrand(e) {
    // console.log(e)
    // setSelectedBrandIndex(e.target.value)
    setSelectedBrand(brands[e.target.value])
  }
  function onSelectSubcat(e) {
    // console.log(e)
    // setSelectedSubcatIndex(e.target.value)
    setSelectedSubcat(subcats[e.target.value])
  }
  function onSelectFineline(e) {
    // console.log(e)
    // setSelectedSubcatIndex(e.target.value)
    setSelectedFineline(finelines[e.target.value])
  }
  // useEffect(() => {
  //   let _brandColors = {};
  //   console.log(selectedBrand);
  //   brands.forEach((_brand) => {
  //     if (_brand == selectedBrand) {
  //       _brandColors[_brand] = "#ff0000";
  //     } else {
  //       _brandColors[_brand] = "#ababab";
  //     }
  //   });
  //   setBrandColors(_brandColors);
  //   // console.log(_brandColors)
  // }, [selectedBrand]);

  // useEffect(() => {
  //   let _subcatColors = {};
  //   if (subcats.length) {
  //     console.log(selectedSubcat);
  //     subcats.forEach((_subcat) => {
  //       if (_subcat == selectedSubcat) {
  //         _subcatColors[_subcat] = "#ff0000";
  //       } else {
  //         _subcatColors[_subcat] = "#ababab";
  //       }
  //     });
  //   }
  //   setSubcatColors(_subcatColors);
  //   // console.log(_subcatColors)
  // }, [selectedSubcat]);

  return (
    <div className="flex flex-col max-w-full">
      <div className="flex flex-row w-1/2">
        {brands.length ? (
          <Select label="Brand" placeholder="Select a brand" className="max-w-auto" onChange={onSelectBrand}>
            {brands.map((brand, idx) => (
              <SelectItem key={idx} value={brand} className="text-black min-w-fit" isDisabled={false}>
                {brand}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <></>
        )}
        {subcats.length ? (
          <Select
            label="Subcat"
            placeholder="Select a subcat"
            className="grow"
            onChange={onSelectSubcat}
          >
            {subcats.map((subcat, idx) => (
              <SelectItem key={idx} value={subcat} className="text-black">
                {subcat}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <></>
        )}
        {finelines.length ? (
          <Select label="Fineline" placeholder="Select a fineline" className="grow" onChange={onSelectFineline}>
            {finelines.map((fineline, idx) => (
              <SelectItem key={idx} value={fineline} className="text-black">
                {fineline}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <></>
        )}
      </div>
      <div className={`flex flex-row h-fit grow ${props.pane ? 'overflow-x-scroll':''}`}>
        {sections.length ? (
          sections.map((_section, idx) => {
            return (
               (planogramData && customPlanogramData) && 
              <Section
                key={idx}
                pane={props.pane}
                data={ props.pane === 'pane-1' && planogramData ? planogramData.filter((_item) => Math.floor(_item.modlr_sect_nbr_derived) == _section) : customPlanogramData.filter((_item) => Math.floor(_item.modlr_sect_nbr_derived) == _section)}
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
    </div>
  )
}
