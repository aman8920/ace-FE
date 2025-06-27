import { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tab, Tabs } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import { useAuth } from '@/applicationcontext/AuthProvider';
import KPI from './KPI';
import { kenvueColorsHex } from '@/app/constants';


export default function KPIBaseScorecard(props) {
  const { baseScorecardData } = usePlanogram()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md')
  const baseScorecardTabs = ["Sales", "Productivity", "Days of Supply (DoS)", "Assortment", "Merchandising"]
  const [selectedBaseScorecardCategory, setSelectedBaseScorecardCategory] = useState("Sales");
  const [selectedBaseScorecardData, setSelectedBaseScorecardData] = useState(baseScorecardData);


  useEffect(() => {
    let _baseScorecardData = baseScorecardData.filter(kpi => kpi.category === selectedBaseScorecardCategory)
    setSelectedBaseScorecardData(_baseScorecardData)
  }, [selectedBaseScorecardCategory])



  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  return (
    <div className="flex flex-col w-full ml-2">
      <Tabs className="mb-10" color={"secondary"} aria-label="Scorecard Tabs" radius="full" selectedKey={selectedBaseScorecardCategory} onSelectionChange={setSelectedBaseScorecardCategory} disableAnimation={true}>
        {baseScorecardTabs.map((tab, tidx) => (
          <Tab key={tab} title={tab}></Tab>
        ))}
      </Tabs>
      <div className="flex flex-row w-full h-fit gap-4 flex-wrap overflow-y-auto content-start">
        {selectedBaseScorecardData.map((kpi, idx) => {
          return <KPI key={idx} data={kpi} />
        })}
      </div>
    </div>
  );
}



