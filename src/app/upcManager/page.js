'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from '@nextui-org/react'
import { PlusIcon } from '@/components/icons/PlusIcon'
import { VerticalDotsIcon } from '@/components/icons/VerticalDotsIcon'
import { SearchIcon } from '@/components/icons/SearchIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { columns, users, statusOptions } from '@/app/upcManager/data'
import { capitalize } from '@/app/upcManager/utils'
import UploadButton from '@/components/UploadButton'

const statusColorMap = {
  ACTIVE: 'success',
  DISCONTINUED: 'danger',
  vacation: 'warning',
}

const INITIAL_VISIBLE_COLUMNS = ['name', 'category', 'status', 'actions']

export default function UPCManager() {
  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS))
  const [statusFilter, setStatusFilter] = useState('all')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortDescriptor, setSortDescriptor] = useState({
    column: 'age',
    direction: 'ascending',
  })
  const [page, setPage] = useState(1)

  const SUPPORTED_FILE_TYPES = ['csv', 'xlsx']
  const [selectedFile, setSelectedFile] = useState()
  const [upcData, setUpcData] = useState([])

  useEffect(() => {}, [])

  function onSelectFile(e) {
    let f = e.target.files[0]
    let ft = f.name.split('.')[1]
    console.log(ft)
    if (!f) return
    if (!SUPPORTED_FILE_TYPES.includes(ft)) return
    setSelectedFile(f)
  }

  async function onFileUpload() {
    const apiUploadUrl = '/api/upload-mod'
    const body = new FormData()
    body.append('file', selectedFile)
    const headers = {
      Accept: '*/*',
    }
    const response = await fetch(apiUploadUrl, {
      method: 'POST',
      headers,
      body,
    })

    const data = await response.json()
    setUpcData(JSON.parse(data['data']['data']))
  }

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
  }, [visibleColumns])

  const filteredItems = useMemo(() => {
    let filteredUpcData = [...upcData]

    if (hasSearchFilter) {
      filteredUpcData = filteredUpcData.filter((upc) => upc.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      console.log("Status filter applied")
      console.log(filteredUpcData.length)
      console.log(Array.from(statusFilter))
      filteredUpcData = filteredUpcData.filter((upc) => Array.from(statusFilter).includes(upc.status))
      console.log(filteredUpcData.length)
    }

    return filteredUpcData
  }, [upcData, filterValue, statusFilter])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = useCallback((upc, columnKey) => {
    const cellValue = upc[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{upc.category}</p>
          </div>
          // <User avatarProps={{ radius: 'lg', src: upc.avatar }} description={upc.name} name={cellValue}>
          //   {upc.name}
          // </User>
        )
      case 'category':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{upc.category}</p>
          </div>
        )
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[upc.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(1)
  }, [])

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            name="upcmanagerinput"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" endContent={<PlusIcon />}>
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {upcData.length} UPCs</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select className="bg-transparent outline-none text-default-400 text-small" onChange={onRowsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [filterValue, statusFilter, visibleColumns, onRowsPerPageChange, upcData.length, onSearchChange, hasSearchFilter])

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all' ? 'All items selected' : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={setPage} />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Previous
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Next
          </Button>
        </div>
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-start bg-tr w-screen h-20 align-middle items-center">
        <UploadButton onChange={onSelectFile} selectedFile={selectedFile} />
        <Button onClick={onFileUpload} className="bg-black text-white ml-5" isDisabled={!selectedFile}>
          Submit
        </Button>
        <div>UPC Manager</div>
      </div>

      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'max-h-[382px]',
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No UPCs found'} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
