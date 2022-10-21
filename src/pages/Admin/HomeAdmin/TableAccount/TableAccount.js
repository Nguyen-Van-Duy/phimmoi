import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
// import { Button, Table } from 'antd';
import axios from 'axios';
import apiConfig, { success } from '../../../../API/configApi';
// import { format } from 'timeago.js';
import './TableAccount.css'

const columns = [
    {
      title: 'user_name',
      dataIndex: 'user_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
    },
    {
      title: 'Address',
      dataIndex: 'hometown',
    },
    {
      title: 'Action',
      dataIndex: 'hometown',
    },
  ];
  
  export default function TableAccount() {

    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState([]);

  // const start = () => {
  //   setLoading(true);
  //   // ajax request after empty completing
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  // };

  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  // const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    const fetchData = async () => {
      const dataListUser = await axios.get(
        apiConfig.urlConnect + "account/user-detail"
      );
      console.log(dataListUser);
      setAccount(dataListUser.data)
    }
    fetchData()
  }, [])

  const handleDate = (time) => {
    const date = new Date(time)
    const day = time.slice(0, 10)
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    return day + ' ' + h + ":" + m + ":" + s
}

const handleDelete = async (id) => {
  console.log(id);
  const resultDelete = await axios.delete(apiConfig.urlConnect + "account/delete-account/" + id.key)
  if(resultDelete.data.length > 0) {
      const newData = account.filter(item=>item._id !== id)
      setAccount(newData)
      success("Delete successfully!")
  }
}

    return (
      <div>
      {/* <div style={{ marginBottom: 16 }}>
        <Button type="danger" onClick={start} disabled={!hasSelected} loading={loading}>
          Delete
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={account} /> */}
      <table className="table-admin__account"style={{width: "100%", backgroundColor: '#fff !important'}}>
        <thead>
          <tr>
          {columns.map((item, id) => <th key={id}>{item.title}</th>)}
          </tr>
        </thead>
        <tbody>
            {account.map((item, id) => <tr key={id}>
              <td>{item.user_name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{handleDate(item.createdAt)}</td>
              <td>{item.hometown}</td>
              <td style={{color: 'red', cursor: 'pointer'}} onClick={()=>handleDelete(item)}>Delete</td>
              </tr>)}
        </tbody>
      </table>
    </div>
    )
  }
  