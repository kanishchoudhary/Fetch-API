import { useEffect, useState } from "react";
import { Table } from "antd";

function TableData() {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        getTableData();
    }, [])

    async function getTableData() {
        const url = "https://gist.githubusercontent.com/Nourbouch/ce692d6627522f4c58882aa52c09508c/raw/f3630735f5c196ae6191da42b5d5061a953d779e/employees.json";
        let data = await fetch(url);
        data = await data.json();
        setTableData(data.employees);
    }

    const colmuns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age'
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position'
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department'
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary'
        }
    ]

    return (
        <div>
            <h1>Table Data</h1>
            <Table
                dataSource={tableData}
                columns={colmuns}
                pagination={{
                    //pageSize: 5,
                    pageSizeOptions: ['5', '10', '15', '20'],
                    showSizeChanger: true
                }}
            />
        </div>
    )
}

export default TableData