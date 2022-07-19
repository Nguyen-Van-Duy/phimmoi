import React from 'react'
import { DatePicker, Space, Input } from 'antd';
import "./History.css"

function History() {
    const onChange = (date, dateString) => {
        console.log(date, dateString);
      };
  return (
    <div className='profile'>
        <h2 className='profile_title'>Update Movie</h2>
        <Space direction="vertical" className='history__container'>
            <div className='history__filter'>
                <DatePicker onChange={onChange} picker="month" />
                <DatePicker onChange={onChange} picker="year" />
                
                <Input placeholder="input with clear icon" allowClear onChange={onChange} />
            </div>
        </Space>
    </div>
  )
}

export default History