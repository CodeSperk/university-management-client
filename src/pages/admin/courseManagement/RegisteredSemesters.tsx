import { useState } from "react";
import { useGetRegisteredSemestersQuery, useUpdateRegisteredSemesterMutation} from "../../../redux/features/admin/courseManagement.api";
import {
  TAcademicSemester,
  TQueryParams,
  TSemesterRegistration,
} from "../../../types";
import {
  Button,
  Dropdown,
  Pagination,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import moment from "moment";

export type TTableData = Pick<
  TSemesterRegistration,
  "academicSemester" | "status" | "startDate" | "endDate"
> & { key: string };

const items = [
    {
        key: "ONGOING",
        label: "Ongoing"
    },
    {
        key: "UPCOMMING",
        label: "Upcomming"
    },
    {
        key: "ENDED",
        label: "Ended"
    },
]

const RegisteredSemesters = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const [semesterId, setSemesterId] = useState("")

  const { data: registeredSemesters, isFetching } =
    useGetRegisteredSemestersQuery([
      { name: "limit", value: 4 },
      { name: "page", value: page },
      { name: "sort", value: "year" },
      ...params,
    ]);
    const [updateRegesteredSemester] = useUpdateRegisteredSemesterMutation();

  const tableData = registeredSemesters?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      academicSemester,
      status,
      startDate: moment(startDate).format("MMMM"),
      endDate: moment(endDate).format("MMMM"),
    })
  );

  const handleStatusUpdate = (data: any) => {
    const updateData = {
        id: semesterId,
        data: {
            "status" : data.key,
        },
    }
    updateRegesteredSemester(updateData);
  }

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  }



  const columns: TableColumnsType<TTableData> = [
    {
      title: "Semester Name",
      key: "academicSemester",
      dataIndex: "academicSemester",
      render: (academicSemester: TAcademicSemester) =>
        `${academicSemester.name} (${academicSemester.year})`,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "ENDED") {
          color = "red";
        }
        if (item === "UPCOMMING") {
          color = "yellow";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      setParams(queryParams);
    }
  };

  return (
    <div>
      <h1>Registered Semesters</h1>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={registeredSemesters?.meta?.limit}
        total={registeredSemesters?.meta?.total}
        style={{ justifyContent: "center", margin: "2rem" }}
      />
    </div>
  );
};

export default RegisteredSemesters;
