import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/DepartmentHelper.jsx'
import axios from 'axios'
import { DepartmentButtons } from '../../utils/DepartmentHelper.jsx'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilterDepartments] = useState([])
  //fuction data from db
  const onDepartmentDelete =async (id) => {
    const data =  departments.filter(dep => dep._id !== id)
    setDepartments(data)
  }

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({

            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: <DepartmentButtons Id={dep._id} onDepartmentDelete = {onDepartmentDelete}/>,

          })
          );
          setDepartments(data);
          setFilterDepartments(data)
        }
      } catch (error) {
        if (error.response && error.response.data.success) {
          alert(error.response.data.error)
        }
      }
      finally {
        setDepLoading(false);
      }
    }
    fetchDepartment();
  }, [])

  const filterDepartments= (e) => {
    const records = departments.filter((dep) => 
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilterDepartments(records)

  }

  return (
    <>{depLoading ? (<div>loading...</div> ) : (
      <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Department</h3>
        </div>
        <div className='flex justify-between item-center'>
          <input type="text" className="px-4 py-0.5 border" placeholder='Search By Dep Nmae' 
          onChange={filterDepartments}
          />
          <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-red-500 rounded text-white'> Add New Department</Link>
        </div>
        <div className='mt-5'>
          <DataTable
            columns={columns} data={filteredDepartments} pagination/>
        </div>
      </div>
    ) 
  }
  </>
  )
}

export default DepartmentList