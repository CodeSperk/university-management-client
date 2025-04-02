import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TQueryParams } from "../../../types";
import { useState } from "react";

export type TTableData = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth" >

const AcademicSemesters = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined)
  const { data: semesterData, isLoading, isFetching} = useGetSemestersQuery(params);

  console.log(isFetching, isFetching);


  const tableData = semesterData?.data?.map(({_id, name, year, startMonth, endMonth}) => ({
    key: _id,
    name,
    year,
    startMonth,
    endMonth
  }));

  const uniqueYear: string[] = []
    tableData?.forEach(item => {
    if(!uniqueYear.includes(item.year)){
      uniqueYear.push(item.year)
    };
  });
  
   
  const columns: TableColumnsType<TTableData> = [
  {
    title: 'Name',
    key: "name",
    dataIndex: 'name',
    showSorterTooltip: { target: 'full-header' },
    filters: [
      {
        text: 'Autumn',
        value: 'Autumn',
      },
      {
        text: 'Summer',
        value: 'Summer',
      },
      {
        text: 'Fall',
        value: 'Fall',
      },
    ],
  },

  {
    title: 'Year',
    key:"year",
    dataIndex: 'year',
    filters: uniqueYear.sort().reverse().map((item) => ({
      text: item,
      value: item
    }))
  },
  {
    title: 'Start Month',
    key: "startMonth",
    dataIndex: 'startMonth',
  },
  {
    title: 'End Month',
    key: "endMonth",
    dataIndex: 'endMonth',
  },
  {
    title: "Action",
    key: "x",
    render:() => {
      return (
        <div><Button>Update</Button></div>
      )
    }
  }
];

const data = tableData;

const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
  console.log(filters.name, extra);
  if(extra.action === "filter"){
    const queryParams : TQueryParams[] = [];

    filters.name?.forEach((item) => queryParams.push({name: "name", value: item})
  );

    filters.year?.forEach(item => queryParams.push({name: "year", value: item })
  );

  setParams(queryParams);
  }
};

//optional to display custom loading
if(isLoading){
  return <p>Loading....</p>
}

  return (
    <div>
      <h1>Academic Semesters</h1>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{ target: 'sorter-icon' }}
  />
    </div>
  );
};

export default AcademicSemesters;
