import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types";

export type TTableData = Pick<
  TAcademicFaculty,
  "name" | "createdAt" | "updatedAt"
>;

const AcademicFaculties = () => {
    const { data, isFetching } = useGetAcademicFacultiesQuery(undefined);

    const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Created",
      key: "createdAt",
      dataIndex: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: "Updated",
      key: "updatedAt",
      dataIndex: "updatedAt",
      sorter: (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return <Button>Update</Button>;
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <h1 style={{ marginBottom: "36px" }}>Academic Faculties</h1>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={data?.data?.map((item) => ({
          ...item,
          key: item.name || item.createdAt,
        }))}
        onChange={onChange}
      />
    </div>
  );
};

export default AcademicFaculties;
