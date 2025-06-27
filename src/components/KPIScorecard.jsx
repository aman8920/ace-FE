import { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tab, Tabs, Spacer } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import { useAuth } from '@/applicationcontext/AuthProvider';
import KPI from './KPI';
import { kenvueColorsHex } from '@/app/constants';
import KPIBaseScorecard from './KPIBaseScorecard';
import PogFilters from './PogFilters';
import KPIAttrScorecard from './KPIAttrScorecard';
import BlockSelection from './BlockSelection';


export default function KPIScorecard(props) {
  const { baseScorecardData, attrScorecardData } = usePlanogram()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md')
  const [selectedScorecardCategory, setSelectedScorecardCategory] = useState("base");
  const [selectedScorecardData, setSelectedScorecardData] = useState(baseScorecardData);


  useEffect(() => {
    let _baseScorecardData = baseScorecardData.filter(kpi => kpi.category === selectedScorecardCategory)
    setSelectedScorecardData(_baseScorecardData)
  }, [selectedScorecardCategory])



  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }


  // async function fetchScorecard() {

  //   const headers = {
  //     Accept: '*/*',
  //     Authorization: `Bearer ${token}`
  //   }

  //   const response = await fetch('/api/scorecard', {
  //     method: 'GET',
  //     headers,
  //   })

  // }



  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button color="danger" onPress={() => handleOpen("full")} endContent={<AssessmentOutlinedIcon />}>View Scorecard</Button>
      </div>
      <Modal
        size={size}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 flex-wrap mt-[50px] mb-5">
                {/* <p className="text-sm p-1">Select Scorecard Category</p> */}
                <Tabs variant={"underlined"} aria-label="Scorecard Category" selectedKey={selectedScorecardCategory} onSelectionChange={setSelectedScorecardCategory}>
                  <Tab key="base" title="Base Scorecard" />
                  <Tab key="attr" title="Attribute Scorecard" />
                </Tabs>
              </ModalHeader>
              <ModalBody className="flex flex-row w-screen h-fit p-0 flex-wrap overflow-y-auto content-start scrollbar-thin">
                {selectedScorecardCategory === "base" ? <KPIBaseScorecard /> : <KPIAttrScorecard />}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="solid" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}



