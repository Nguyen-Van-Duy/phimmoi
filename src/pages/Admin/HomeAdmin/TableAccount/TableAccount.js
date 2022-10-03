import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Button, Table } from 'antd';
import axios from 'axios';
import apiConfig from '../../../../API/configApi';

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
  ];
  
  export default function TableAccount() {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState([]);

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

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

    return (
      <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="danger" onClick={start} disabled={!hasSelected} loading={loading}>
          Delete
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={account} />
    </div>
    )
  }
  