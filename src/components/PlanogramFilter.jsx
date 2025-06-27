import { useEffect, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'

export default function PlanogramFilter() {

  const {planogramData,customPlanogramData, setSelectedBrand , setSelectedSubcat, setSelectedFineline,selectedBrand,selectedSubcat, selectedFineline } = usePlanogram();
  const [brands, setBrands] = useState([])
  const [subcats, setSubcats] = useState([])
  const [finelines, setFinelines] = useState([])

  const [activeBrands, setActiveBrands] = useState([])
  const [activeSubcats, setActiveSubcats] = useState([])
  const [activeFinelines, setActiveFinelines] = useState([])


  useEffect(() => {
    let _brands = [...new Set(planogramData.map((_item) => _item.brand_nm))]
    let _subcats = [...new Set(planogramData.map((_item) => _item.omni_subcatg_desc))]
    let _finelines = [...new Set(planogramData.map((_item) => _item.fineline_desc))]

    setBrands(_brands)
    setSubcats(_subcats)
    setFinelines(_finelines)
    setActiveBrands(_brands)
    setActiveSubcats(_subcats)
    setActiveFinelines(_finelines)

    // console.log(planogramData.length)

  }, [planogramData,customPlanogramData])


  // useEffect(() => {

  // }, [selectedBrand, selectedSubcat, ])


  function onSelectBrand(e) {
    setSelectedBrand(brands[e.target.value])
    
    // console.log(brands[e.target.value])
    // console.log(selectedSubcat)
    // console.log(selectedFineline)

    let _selectedItems = [...new Set(planogramData
      .filter((_item) => _item.brand_nm === brands[e.target.value] || e.target.value === '')
      .filter((_item) => _item.omni_subcatg_desc === selectedSubcat || selectedSubcat === '' || !selectedSubcat)
      .filter((_item) => _item.fineline_desc === selectedFineline || selectedFineline === '' || !selectedFineline)
    )]
    // console.log(_selectedItems.length)

    let _activeSubcats = [...new Set(planogramData
      .filter(_item => _item.brand_nm === brands[e.target.value] || e.target.value === '')
      .filter((_item) => _item.fineline_desc === selectedFineline || selectedFineline === '' || !selectedFineline)
      .map(_item => _item.omni_subcatg_desc)
    )]
    setActiveSubcats(_activeSubcats)
    // console.log(_activeSubcats)


    let _activeFinelines = [...new Set(planogramData
      .filter(_item => _item.brand_nm === brands[e.target.value] || e.target.value === '')
      .filter((_item) => _item.omni_subcatg_desc === selectedSubcat || selectedSubcat === '' || !selectedSubcat)
      .map(_item => _item.fineline_desc)
    )]
    setActiveFinelines(_activeFinelines)
    // console.log(_activeFinelines)
    
  }
  
  function onSelectSubcat(e) {
    setSelectedSubcat(subcats[e.target.value])
    
    // console.log(selectedBrand)
    // console.log(subcats[e.target.value])
    // console.log(selectedFineline)

    let _selectedItems = [...new Set(planogramData
      .filter((_item) => _item.brand_nm === selectedBrand || selectedBrand === '' || !selectedBrand)
      .filter((_item) => _item.omni_subcatg_desc === subcats[e.target.value] || e.target.value === '')
      .filter((_item) => _item.fineline_desc === selectedFineline || selectedFineline === '' || !selectedFineline)
    )]
    // console.log(_selectedItems.length)

    let _activeBrands = [...new Set(planogramData
      .filter(_item => _item.omni_subcatg_desc === subcats[e.target.value] || e.target.value === '')
      .filter((_item) => _item.fineline_desc === selectedFineline || selectedFineline === '' || !selectedFineline)
      .map(_item => _item.brand_nm)
    )]
    setActiveBrands(_activeBrands)
    // console.log(_activeBrands)

        let _activeFinelines = [...new Set(planogramData
      .filter((_item) => _item.brand_nm === selectedBrand || selectedBrand === '' || !selectedBrand)
      .filter(_item => _item.omni_subcatg_desc === subcats[e.target.value] || e.target.value === '')
      .map(_item => _item.fineline_desc)
    )]
    setActiveFinelines(_activeFinelines)
    // console.log(_activeFinelines)
    
  }

  function onSelectFineline(e) {
    setSelectedFineline(finelines[e.target.value])
    
    // console.log(selectedBrand)
    // console.log(selectedSubcat)
    // console.log(finelines[e.target.value])

    let _selectedItems = [...new Set(planogramData
      .filter((_item) => _item.brand_nm === selectedBrand || selectedBrand === '' || !selectedBrand)
      .filter((_item) => _item.omni_subcatg_desc === selectedSubcat || selectedSubcat === '' || !selectedSubcat)
      .filter((_item) => _item.fineline_desc === finelines[e.target.value] || e.target.value === '')
    )]
    // console.log(_selectedItems.length)

    let _activeBrands = [...new Set(planogramData
      .filter((_item) => _item.omni_subcatg_desc === selectedSubcat || selectedSubcat === '' || !selectedSubcat)
      .filter(_item => _item.fineline_desc === finelines[e.target.value] || e.target.value === '')
      .map(_item => _item.brand_nm)
    )]
    setActiveBrands(_activeBrands)
    // console.log(_activeBrands)

    
    let _activeSubcats = [...new Set(planogramData
      .filter((_item) => _item.brand_nm === selectedBrand || selectedBrand === '' || !selectedBrand)
      .filter(_item => _item.fineline_desc === finelines[e.target.value] || e.target.value === '')
      .map(_item => _item.omni_subcatg_desc)
    )]
    setActiveSubcats(_activeSubcats)
    // console.log(_activeSubcats)
    
  }
 

  return (
    <div  className="flex flex-col max-w-full">
      <div className={`flex flex-row w-1/2`}>
        {brands.length ? (
          <Select
            label="Brand"
            placeholder="Select a brand"
            className="max-w-auto"
            onChange={onSelectBrand}
            disabledKeys={[...new Set(brands.filter(br => !activeBrands.includes(br)).map(br => brands.indexOf(br).toString()))]}
          >
            {brands.map((br, idx) => (
              <SelectItem key={idx} value={br} className="text-black min-w-fit" isDisabled={false}>
                {br}
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
            disabledKeys={[...new Set(subcats.filter(sc => !activeSubcats.includes(sc)).map(sc => subcats.indexOf(sc).toString()))]}
            onChange={onSelectSubcat}
          >
            {subcats.map((sc, idx) => (
              <SelectItem key={idx} value={sc} className={activeSubcats.includes(sc) || sc == selectedSubcat ? "text-black" : "text-red-200"}>
                {sc}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <></>
        )}
        {finelines.length ? (
          <Select
            label="Fineline"
            placeholder="Select a fineline"
            className="grow"
            onChange={onSelectFineline}
            disabledKeys={[...new Set(finelines.filter(fl => !activeFinelines.includes(fl)).map(fl => finelines.indexOf(fl).toString()))]}
          >
            {finelines.map((fl, idx) => (
              <SelectItem key={idx} value={fl} className="text-black">
                {fl}
              </SelectItem>
            ))}
          </Select>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
