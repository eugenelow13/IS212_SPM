import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { useEffect } from 'react';
// import './ListingTable.css';
import axios from 'axios'
import { ENDPOINTS } from '../../../common/utilities';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalJob from './Modal';


type RoleListing = {
  role_name: string
  role_desc: string
  role_skills: string[]
  start_date: string
  end_date: string
  managerID: number
  department: string
  country: string
}

const fetchData: RoleListing[] = [
  {
    role_name: 'Designer',
    role_desc: 'Responsible for creating visually appealing designs.',
    role_skills: ['Creative thinking', 'Graphic design software'],
    start_date: '01-01-2023',
    end_date: '31-12-2023',
    managerID: 1,
    department: 'IT',
    country: 'Singapore',
  },
  {
    role_name: 'Manager',
    role_desc: 'Oversees team activities and ensures project success.',
    role_skills: ['Leadership', 'Project management', 'Communication'],
    start_date: '15-02-2023',
    end_date: '30-11-2023',
    managerID: 2,
    department: 'Sales',
    country: 'Malaysia',
  },
  {
    role_name: 'Analyst',
    role_desc: 'Analyzes data to provide insights and support decision-making.',
    role_skills: ['Data analysis', 'Statistics', 'Excel'],
    start_date: '10-03-2023',
    end_date: '20-10-2023',
    managerID: 3,
    department: 'IT',
    country: 'Thailand',
  },
]

const columnHelper = createColumnHelper<RoleListing>()

const columns = [
  {
    header:"Role",
    accessorKey:"role_name",
    footer:'Role'
  },
  {
    header:"Application Window",
    accessorFn: row => `${row.start_date} - ${row.end_date}`,
    footer:'Application Window'
  },
  {
    header:"Manager's ID",
    accessorKey:"manager_id",
    footer:"Manager's ID"
  },
  {
    header:"Department",
    accessorKey:"dept",
    footer:"Department"
  },
  {
    header:"Country",
    accessorKey:"country",
    footer:"Country"
  },
  {
    header:"skill match",
    accessorKey:"skillmatch",
    footer:"skillmatch"
  },
]



function tablelist() {
  // const [data, setData] = React.useState(()=>[]) 
  const user ="Adam";
  const skills = ['Account Management', 'Budgeting','Database Administration', 'Problem Management', 'Problem Solving','Configuration Tracking', 'People and Performance Management', 'Communication']

  const [data, setData] = React.useState(() => []) 
  const [modal,setModal] = React.useState(false);
  const [filtering, setFiltering] = React.useState("")
  const [sorting, setSorting] = React.useState([])

  const toggleModal = (props,visible)=>{
    console.log(props.role_name,visible,modal);
    window.sessionStorage.setItem("roledata",JSON.stringify(props));
    const view = !visible;
    setModal(view);
  }
  
  
  useEffect(() => { 
    // Fetch data asynchronously
    axios.get(ENDPOINTS.listings)
      .then((response) => {
        // Update the state with the fetched data

        const fetchedListings = response.data.role_listings;
        for(var item of fetchedListings){
          console.log("ITEM:",item);
          const skillsMatched = skills.filter(skillName => item.role_skills.includes(skillName));
          console.log("skillsMatched:",skillsMatched);
          item.skillmatch = ((skillsMatched.length/item.role_skills.length)*100).toFixed(0)+"%";

        }

        setData(fetchedListings);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []); //FETCHDATA

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
    <div>
    <div className="p-2">
      {modal &&(<ModalJob/>)}
      <p>your skills</p><p>{skills.join(', ')}</p>
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
            <tr key={row.id} onClick={()=>{
              var show = false;
              console.log("here",row.original)
              toggleModal(row.original,show);}}>
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
    </div>
    </div>
  )
}

export default tablelist;

