import * as React from 'react';
import { useEffect, useContext } from 'react';
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
  getPaginationRowModel
} from '@tanstack/react-table';
import { Outlet, useNavigate } from 'react-router-dom';

import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { AccessContext } from '../../../common/AccessProvider';


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

type Applicant = {
  listing_id: number
  dept: string
  role_name: string
  staff_name: string
  application_date: string
}


const columns=[
  {
    header: "Applicant",
    accessorKey: "staff_name",
    footer: 'Applicant'
  },
  {
    header: "Role",
    accessorKey: "role_name",
    footer: 'Role'
  },
  {
    header: "Department",
    accessorKey: "dept",
    footer: 'Department'
  },
  {
    header: "Application Date",
    accessorKey: "application_date",
    footer: 'Application Date'
  },
  {
    header: "Listing ID",
    accessorKey: "listing_id",
    footer: 'Listing ID'
  },

]


function tablelist() {
  const navigate = useNavigate();

  const { currentUser } = useContext(AccessContext);
  const skills = currentUser.staff_skills;

  const [data, setData] = React.useState(() => [])
  const [modal, setModal] = React.useState(false);
  const [filtering, setFiltering] = React.useState("")
  const [sorting, setSorting] = React.useState([])

  const toggleModal = (props) => {
    console.log("try navigating")
    navigate("/listings/" + props.id)
  }


  useEffect(() => {
    // Fetch data asynchronously  
    // axios.get(ENDPOINTS.listings)
    //   .then((response) => {
    //     // Update the state with the fetched data

    //     const fetchedListings = response.data.role_listings.reverse();
    //     for (var item of fetchedListings) {
    //       console.log("ITEM:", item);
    //       item.start_date_simple = new Date(item.start_date).toDateString().split(" ").splice(1).join(" ");
    //       item.end_date_simple = new Date(item.end_date).toDateString().split(" ").splice(1).join(" ");
    //       const skillsMatched = skills.filter(skillName => item.role_skills.includes(skillName));
    //       console.log("skillsMatched:", skillsMatched);
    //       item.skillmatch = ((skillsMatched.length / item.role_skills.length) * 100).toFixed(0) + "%";

    //     }

    //     setData(fetchedListings);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    const applicants = [
      {
        "listing_id": 1,
        "dept": "Sales",
        "role_name": "Sales Manager",
        "staff_name": "Alice",
        "application_date": new Date().toDateString(),
      },
      {
        "listing_id": 2,
        "dept": "Marketing",
        "role_name": "Marketing Specialist",
        "staff_name": "Bob",
        "application_date": new Date().toDateString(),
      },
      {
        "listing_id": 3,
        "dept": "HR",
        "role_name": "HR Coordinator",
        "staff_name": "Charlie",
        "application_date": new Date().toDateString(),
      },
      {
        "listing_id": 4,
        "dept": "IT",
        "role_name": "Software Developer",
        "staff_name": "David",
        "application_date": new Date().toDateString(),
      },
      {
        "listing_id": 5,
        "dept": "Finance",
        "role_name": "Financial Analyst",
        "staff_name": "Eve",
        "application_date": new Date().toDateString(),
      }
    ];
    
    setData(applicants);
  }, []); //FETCHDATA

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
    onSortingChange: setSorting,
  })


  return (
    <div>
      <div className="p-2">
        {/* <InputGroup style={{ width: "40%" }}>
          <InputGroup.Text>Search for a role here:</InputGroup.Text>
          <Form.Control type="text"
            value={filtering}
            placeholder="Search for a role!"
            onChange={(e) => setFiltering(e.target.value)}
          ></Form.Control>
        </InputGroup> */}
        <Table className="text-center" hover>
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
                      { asc: ' ASC', desc: ' DESC' }[header.column.getIsSorted() ?? null]
                    }

                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} onClick={() => {
                var show = false;
                console.log("here", row.original)
                toggleModal(row.original, show);
              }}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        {(<Outlet />)}
        <div className="h-2" />
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
          <span> </span>
          <Form.Select
            value={table.getState().pagination.pageSize}
            style={{ width: "10%", display: "inline-block", outline: "none" }}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Form.Select>

          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
      </div>
    </div>
  )
}

export default tablelist;

