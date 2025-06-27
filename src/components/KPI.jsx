import { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { kenvueColorsHex } from '@/app/constants';


export default function KPI(props) {

  const [kpi, setKpi] = useState({})

  useEffect(() => {
    // console.log(props.data.kpi)
    // console.log(props.data.suffix)
    setKpi(props.data)
  }, [props.data])


  function round(x) {
    if (x == "-") return x
    return Math.round((x + Number.EPSILON) * 100) / 100
  }

  function toPct(x) {
    if (x == "-") return x
    return round(x * 100)
  }

  return (
    <Card className="min-w-fit w-[calc(25vw)] max-w-[calc(20vw)] h-fit mt-2 mb-2">
      <CardHeader className="flex flex-row items-start">
        <div className="flex flex-col flex-nowrap min-w-full text-md justify-center">
          <p className="text-[0.85rem] text-gray-500 w-fit whitespace-nowrap text-center m-auto">{kpi.kpi}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-3 items-center">
          <p className={`text-md ${kpi.lift > 0 ? 'text-[#00B097]' : "text-red-500"}`}>{`${kpi.lift >= 0 ? "+" : ""}${kpi.prefix ? kpi.prefix : ""}  ${kpi.suffix && kpi.suffix == "%" ?  toPct(kpi.lift) : round(kpi.lift)}`} {kpi.suffix}</p>
          <p className={`text-sm ${kpi.lift > 0 ? 'text-[#00B097]' : "text-red-500"}`}>{`${kpi.lift >= 0 ? "+" : ""} ${toPct(kpi.pct_lift)}`} %</p>
          <p className={`text-sm text-gray-500`}>Lift</p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="flex flex-row w-full justify-between gap-3 items-center">
          <div className="flex flex-col items-center">
            <p className={`text-sm`}>{kpi.prefix} {kpi.suffix && kpi.suffix == "%" ?  toPct(kpi.before) : round(kpi.before)} {kpi.suffix}</p>
            <p className={`text-sm text-gray-500`}>Before</p>
          </div>
          <div className="flex flex-col items-center">
            <p className={`text-sm`}>{kpi.prefix} {kpi.suffix && kpi.suffix == "%" ?  toPct(kpi.after) : round(kpi.after)} {kpi.suffix}</p>
            <p className={`text-sm text-gray-500`}>After</p>
          </div>
        </div>
      </CardFooter>
    </Card>

  )
}