import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import './ListingTable.css'

// import './index.css'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table'

type RoleListing = {
  roleName: string
  startDate: string
  endDate: string
  managerID: number
  department: string
  country: string
}

const defaultData: RoleListing[] = [
  {
    roleName: 'Helpdesk staff',
    startDate: '1 june 2020',
    endDate: '1 june 2021',
    managerID: 100,
    department: 'HR',
    country: 'Singapore',
  },
  {
    roleName: 'IT staff',
    startDate: '10 june 2020',
    endDate: '12 june 2021',
    managerID: 40,
    department: 'IT',
    country: 'Malaysia',
  },
  {
    roleName: 'Sales staff',
    startDate: '1 june 2020',
    endDate: '13 june 2021',
    managerID: 20,
    department: 'Sales',
    country: 'Indonesia',
  },
]

const columnHelper = createColumnHelper<RoleListing>()

const columns = [
  {
    header:"Role",
    accessorKey:"roleName",
    footer:'Role'
  },
  {
    header:"Application Window",
    accessorFn: row => `${row.startDate} - ${row.endDate}`,
    footer:'Application Window'
  },
  {
    header:"Manager's ID",
    accessorKey:"managerID",
    footer:"Manager's ID"
  },
  {
    header:"Department",
    accessorKey:"department",
    footer:"Department"
  },
  {
    header:"Country",
    accessorKey:"country",
    footer:"Country"
  },
]

function tablelist() {
  const [data, setData] = React.useState(() => [...defaultData])
  const [filtering, setFiltering] = React.useState("")
  const [sorting, setSorting] = React.useState([])
  const rerender = React.useReducer(() => ({}), {})[1]


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
      globalFilter:filtering,
    },
    onGlobalFilterChange:setFiltering,
    onSortingChange: setSorting,
  })

  return (
    <div className="p-2">
      <input type="text" 
            value={filtering} 
            onChange ={(e)=> setFiltering(e.target.value)} ></input>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}                      
                      {
                        { asc: 'ASC', desc: 'DESC'}[ header.column.getIsSorted() ?? null]
                        }

                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  )
}

export default tablelist;

