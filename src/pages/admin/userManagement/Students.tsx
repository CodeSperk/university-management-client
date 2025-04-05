import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { TQueryParams, Tstudent } from "../../../types";
import { useState } from "react";
import { useGetStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

export type TTableData = Pick<Tstudent, "id" | "fullName" | "email" | "contactNo" >

const Students = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);

  const { data: studentData, isFetching} = useGetStudentsQuery([
    {name: "limit", value: 2},
    {name: "page", value: page},
    {name: "sort", value: "id"},
     ...params
    ]);
  const tableData = studentData?.data?.map(({_id, id, fullName, email, contactNo }) => ({
    key: _id,
    id,
    fullName,
    email,
    contactNo
  }));


  const columns: TableColumnsType<TTableData> = [
  {
    title: 'Student ID',
    key: "id",
    dataIndex: 'id',
  },
  {
    title: 'Name',
    key:"fullName",
    dataIndex: 'fullName',
  },
  {
    title: 'Email',
    key: "email",
    dataIndex: 'email',
  },
  {
    title: 'Contact No.',
    key: "contactNo",
    dataIndex: 'contactNo',
  },
  {
    title: "Action",
    key: "x",
    render:(item) => {
      return (
        <Space>
        <Link to={`/admin/students/${item.key}`}>
        <Button>Details</Button>
        </Link>
        <Button>Update</Button>
        <Button>Block</Button>
        </Space>
      )
    },
    width: "1%"
  }
];


const onChange: TableProps<TTableData>['onChange'] = (_pagination, _filters, _sorter, extra) => {
  if(extra.action === "filter"){
    const queryParams : TQueryParams[] = [];


  setParams(queryParams);
  }
};

  return (
    <div>
      <h1>Students</h1>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: 'sorter-icon' }}
  />
    <Pagination 
      current={page} 
      onChange={(value) => setPage(value)}
      pageSize={studentData?.meta?.limit}
      total={studentData?.meta?.total} 
      style={{justifyContent: "center", margin: "2rem"}}/>
    </div>
  );
};

export default Students;
