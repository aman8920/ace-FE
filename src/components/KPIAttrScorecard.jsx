import { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tab, Tabs, Spacer } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   getKeyValue,
//   Spinner,
//   Tooltip,
// } from '@nextui-org/react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


import { usePlanogram } from '@/applicationcontext/PlanogramContextProvider'
import { useAuth } from '@/applicationcontext/AuthProvider';
import KPI from './KPI';
import { kenvueColorsHex } from '@/app/constants';
import BlockSelection from './BlockSelection';
import PogFilters from './PogFilters';


export default function KPIAttrScorecard(props) {
  const { baseScorecardData, attrScorecardData, selectedBlock, selectedFilterValues } = usePlanogram()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md')
  const [selectedAttrScorecardCategory, setSelectedAttrScorecardCategory] = useState("Sales");
  const [selectedAttrScorecardData, setSelectedAttrScorecardData] = useState(attrScorecardData);
  const [selectionBehavior, setSelectionBehavior] = useState('toggle')

  const columns = [
    // {
    //   key: 'attr_nm',
    //   label: 'Attribute Name',
    //   align: "center",
    // },
    {
      key: 'attr_val',
      label: 'Attribute Value',
      align: "center",
    },
    {
      key: 'kpi',
      label: 'KPI',
      align: "center",
    },
    {
      key: 'before',
      label: 'Before',
      align: "center",
      format: (value) => value.toFixed(2)
    },
    {
      key: 'after',
      label: 'After',
      align: "center",
      format: (value) => value.toFixed(2)
    },
    {
      key: 'lift',
      label: 'Lift',
      align: "center",
      format: (value) => value.toFixed(2)
    },
    {
      key: 'pct_lift',
      label: 'Lift (%)',
      align: "center",
      format: (value) => value.toFixed(2)
    },
  ]


  const kpis = [...new Set(attrScorecardData.map(item => item.kpi))]


  useEffect(() => {
    
  }, [])


  useEffect(() => {
    
    let _attrScorecardData = attrScorecardData.filter(item => item.attr_nm === selectedBlock)
    _attrScorecardData.sort((x, y) => x.attr_val.localeCompare(y.attr_val));
    setSelectedAttrScorecardData(_attrScorecardData)

  }, [selectedBlock])


  useEffect(() => {
    
    let _attrScorecardData = selectedBlock ? attrScorecardData.filter(item => item.attr_nm === selectedBlock) : attrScorecardData
    if (selectedFilterValues[selectedBlock]) {
      _attrScorecardData = _attrScorecardData.filter(item => item.attr_val == selectedFilterValues[selectedBlock].replace(`${selectedBlock}_`, ""))
    }
    _attrScorecardData.sort((x, y) => x.attr_val.localeCompare(y.attr_val));
    setSelectedAttrScorecardData(_attrScorecardData)

  }, [selectedFilterValues])

  return (
    <div className="flex flex-col w-full">
      <div className="h-[50px] flex flex-row">
        <BlockSelection />
        <Spacer x={10} />
        <PogFilters />
      </div>
      {/* <Table
        aria-label="Planogram Runs Table"
        selectionMode="single"
        selectionBehavior={selectionBehavior}
        color="default"
      >
        <TableHeader columns={columns}>
          {(column) => (
            ["before", "after", "lift"].includes(column.key) ? (<TableColumn className="bg-slate-500 text-gray-50" key={column.key} aria-colspan={1} colSpan={1} align="center">
              {column.label}
            </TableColumn>) : (<TableColumn className="bg-slate-500 text-gray-50" key={column.key} aria-colspan={1} colSpan={1}>
              {column.label}
            </TableColumn>)
          )}
        </TableHeader>
        <TableBody
          items={selectedAttrScorecardData}
          emptyContent={'No rows to display.'}
        >
          {selectedAttrScorecardData.length
            ? (item) => (
              <TableRow className="hover:cursor-pointer" key={`${item.attr_nm}_${item.attr_val}_${item.kpi}`}>
                {(columnKey) => (
                  // <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  ["attr_nm", "attr_val"].includes(columnKey) ? <TableCell aria-rowspan={kpis.length} rowSpan={kpis.length}>{getKeyValue(item, columnKey)}</TableCell> : <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )
            : []}
        </TableBody>
      </Table> */}



      <Paper sx={{ width: '100%', marginTop: "5vh" }}>
        <TableContainer sx={{ maxHeight: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead stickyHeader>
              {/* <TableRow>
                <TableCell align="center" colSpan={2}>
                  Attribute
                </TableCell>
                <TableCell align="center" colSpan={5}>
                  KPIs
                </TableCell>
              </TableRow> */}
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    align={column.align}
                    // style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedAttrScorecardData
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.key];
                        return (
                          <TableCell key={column.key} align={column.align} size="small" sx={{ fontSize: "small" }}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>





    </div>
  );
}



