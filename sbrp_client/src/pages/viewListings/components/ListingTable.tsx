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
import "./ListingTable.css"


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
    header: "Role",
    accessorKey: "role_name",
    footer: 'Role'
  },
  {
    header: "Application Window",
    accessorFn: row => `${row.start_date_simple} - ${row.end_date_simple}`,
    footer: 'Application Window'
  },
  {
    header: "Manager",
    accessorKey: "manager_name",
    footer: "Manager"
  },
  {
    header: "Department",
    accessorKey: "dept",
    footer: "Department"
  },
  {
    header: "Country",
    accessorKey: "country",
    footer: "Country"
  },
  {
    header: "Skill Match",
    accessorKey: "skillmatch",
    footer: "skillmatch"
  },
]



function tablelist() {

  // const [data, setData] = React.useState(()=>[]) 
  const navigate = useNavigate();
  // const user =140001;
  // const skills = ['Account Management', 'Budgeting','Database Administration', 'Problem Management', 'Problem Solving','Configuration Tracking', 'People and Performance Management', 'Communication']

  // window.sessionStorage.setItem("user",user);
  // window.sessionStorage.setItem("skills",JSON.stringify(skills));

  const { currentUser } = useContext(AccessContext);
  const skills = currentUser.staff_skills;

  const [data, setData] = React.useState(() => [])
  const [modal, setModal] = React.useState(false);
  const [filtering, setFiltering] = React.useState("")
  const [sorting, setSorting] = React.useState([])
  const [roledata, setRoledata] = React.useState(false)

  const toggleModal = (props, visible) => {
    // console.log(props.role_name,visible,modal);
    // window.sessionStorage.setItem("roledata",JSON.stringify(props));
    // setModal(!modal);
    console.log("try navigating")
    navigate("/listings/" + props.id)
  }

  const toggleListings = () => {
    setRoledata(!roledata);
  }


const dateNow = new Date();
const dateCheck = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), 0, 0, 0, 0);

  useEffect(() => {
    // Fetch data asynchronously
    var handler = "";
    roledata ? handler = ENDPOINTS.listings : handler = ENDPOINTS.openListings;
    console.log("handler", handler);
    axios.get(handler)
      .then((response) => {
        // Update the state with the fetched data
        let expiredListings = [];
        let validListings = [];
        let allListings = [];

        var fetchedListings = response.data.role_listings.reverse();
        for (var item of fetchedListings) {
          item.start_date_simple = new Date(item.start_date).toDateString().split(" ").splice(1).join(" ");
          item.end_date_simple = new Date(item.end_date).toDateString().split(" ").splice(1).join(" ");
          const skillsMatched = skills.filter(skillName => item.role_skills.includes(skillName));
          item.skillmatch = ((skillsMatched.length / item.role_skills.length) * 100).toFixed(0) + "%";
          if (dateCheck >= new Date(item.end_date)) {
            console.log("expired");
            expiredListings.push(item);
            item.effect = "greyed";
            item.style = { backgroundColor: "grey"};
          }else {
            console.log("valid");
            validListings.push(item);
          }
        }

        roledata ? allListings = validListings.concat(expiredListings) : allListings = fetchedListings;
        setData(allListings);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [roledata]); //FETCHDATA

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
        <InputGroup style={{ width: "40%" }}>
          <InputGroup.Text>Search for a role here:</InputGroup.Text>
          <Form.Control type="text"
            value={filtering}
            placeholder="Search for a role!"
            onChange={(e) => setFiltering(e.target.value)}
          ></Form.Control>
        </InputGroup>
        <Form.Check 
        type="switch"
        id="custom-switch"
        label="Show Expired Listings"
        onChange={()=>{toggleListings()}}
        />
        <div style={{overflowY:'scroll'}}>
        <Table className="text-center" hover style={{overflowY:'scroll'}}>
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
              <tr key={row.id} className={row.original.effect} style={row.original.style} onClick={() => {
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
            {/* <tr><td>nigg</td></tr> */}
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
        </Table>
        </div>
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
          {/* <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span> */}
        </div>
        {/* <div>{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
      </div>
    </div>
  )
}

export default tablelist;

