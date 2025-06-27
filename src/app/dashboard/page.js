'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Spinner,
  Tooltip,
} from '@nextui-org/react'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useRouter } from 'next/navigation'
import { ProtectRoute, useAuth } from '@/applicationcontext/AuthProvider'
import { IconButton } from '@mui/material'

export default function Home() {
  const { token } = useAuth()
  const router = useRouter()

  const [runData, setRunData] = useState([])
  const [selectionBehavior, setSelectionBehavior] = useState('toggle')
  const [isLoading, setIsLoading] = useState(true)

  const columns = [
    {
      key: 'id',
      label: 'RUN ID',
    },
    {
      key: 'name',
      label: 'RUN NAME',
    },
    {
      key: 'created_dt',
      label: 'DATE CREATED',
    },
    {
      key: 'action',
      label: 'ACTION',
    },
  ]

  useEffect(() => {
    async function fetchAllPlanograms() {
      const apiPlanogramsUrl = '/api/planogram'

      const headers = {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }
      const response = await fetch(apiPlanogramsUrl, {
        method: 'GET',
        headers,
      })

      const data = await response.json()
      let _runData = data['data']
      console.log(_runData)
      setRunData(_runData)
      setIsLoading(false)
    }
    if (token) fetchAllPlanograms()
  }, [token])

  function onUpload() {
    router.push('/upload')
  }

  function onRunView(item) {
    console.log(item)
    router.push(`/planogram/${item.id}`)
  }

  function onRunDelete(item) {
    async function deletePlanogram() {
      const apiPlanogramsUrl = `/api/planogram/${item.id}`

      const headers = {
        Accept: '*/*',
        Authorization: `Bearer ${token}`,
      }
      const response = await fetch(apiPlanogramsUrl, {
        method: 'DELETE',
        headers,
      })

      const data = await response.json()
      const status = response.status
      if (status === 200) {
        let _runData = [...new Set(runData)]
        _runData = _runData.filter((run) => run.id != item.id)
        setRunData(_runData)
        setIsLoading(false)
      } else if ([400, 404, 405].includes(status)) {
        setIsLoading(false)
      }
    }

    if (token) {
      setIsLoading(true)
      deletePlanogram()
    }
  }

  return (
    <ProtectRoute>
      <div className="flex flex-col justify-start pt-20 w-screen h-screen bg-white">
        <Button
          className="max-w-fit mb-4 mr-4 self-end"
          color="danger"
          variant="solid"
          onPress={onUpload}
          endContent={<FileUploadOutlinedIcon />}
        >
          Upload
        </Button>
        <Table
          aria-label="Planogram Runs Table"
          selectionMode="single"
          selectionBehavior={selectionBehavior}
          color="default"
          // onRowAction={(key) => onRunClick(key)}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn className="bg-[#343434] text-gray-50" key={column.key} align="left">
                {column.label}
              </TableColumn>
            )}
            {/* <TableColumn className="bg-slate-500 text-gray-50" key={"action"}>
              {"ACTION"}
            </TableColumn> */}
          </TableHeader>
          <TableBody
            items={runData}
            emptyContent={'No rows to display.'}
            isLoading={isLoading}
            loadingContent={<Spinner label="Loading..." />}
          >
            {runData.length
              ? (item) => (
                  // <TableRow className="hover:cursor-pointer" key={item.key} onClick={() => onRunClick(item)}>
                  <TableRow className="hover:cursor-pointer" key={item.key}>
                    {(columnKey) =>
                      columnKey === 'action' ? (
                        <TableCell align="center">
                          <Tooltip color="default" content="View run" className="z-10">
                            <span className="text-lg text-warning cursor-pointer active:opacity-50">
                              <IconButton
                                size="small"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => onRunView(item)}
                                color="slate"
                              >
                              <VisibilityIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip color="default" content="Delete run" className="z-10">
                            <span className="text-lg text-warning cursor-pointer active:opacity-50">
                            <IconButton
                                size="small"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={() => onRunDelete(item)}
                                color="warning"
                                variant="faded"
                              >
                              <DeleteIcon />
                              </IconButton>
                              </span>
                          </Tooltip>
                        </TableCell>
                      ) : (
                        <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                      )
                    }
                  </TableRow>
                )
              : []}
          </TableBody>
        </Table>
      </div>
    </ProtectRoute>
  )
}
