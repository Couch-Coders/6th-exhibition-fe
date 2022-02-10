import React from 'react';
import "antd/es/table/style/css"
import { Table, Button, Space, Menu, Dropdown } from 'antd';

import { useState } from 'react';

const DashBoard = () => {
  const [dataSource, setDataSource] = useState([
    {
      id: '1',
      exhibition: '살바도르달리 전시전',
      session:'2021.12.12 ~ 2021.12.12',
      
    },
    {
      id: '2',
      exhibition: '살바도르달리 전시전',
      session: '2021.12.12 ~ 2021.12.12',
    },
    {
      id: '3',
      exhibition: '살바도르달리 전시전',
      session: '2021.12.12 ~ 2021.12.12',
    }
  ])
  const columns =[
    {
      key:'1',
      title:'번호',
      dataIndex:'id'
    },
    {
      key:'2',
      title:'전시회 제목',
      dataIndex:'exhibition'
    },
    {
      key:'3',
      title:'전시기간',
      dataIndex:'session'
    },
    {
      key:'4',
      title:'',
      render: (record) => {
        return (
          <Space size="middle">
            <Button type='primary' danger
              onClick={() => {
                onDeleteLike(record);
            }}
            >
              삭제
          </Button>
          </Space>


        );
      }
    },
  ];

  const menu = (
    <Menu onClick={() => {
      ;
  }}>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          마감일 임박순
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          최신순
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          좋아요순
        </a>
      </Menu.Item>
    </Menu>
  );

  const onDeleteLike = (record) => {
    //삭제 요청 보내는 걸로 수정
      setDataSource((pre)=> {
        return pre.filter ((exhibition) => exhibition.id !== record.id);
      });

  };
  return (
    <>
      <header>
      <h4>좋아요 누른 전시회</h4>
      <Dropdown overlay={menu} placement="bottomRight" columns>
      <Button>bottomRiht</Button>
      </Dropdown>
      <a key="list-loadmore-more">더보기</a>
      </header>

      data load 하는 부분, 필터 적용하는 부분(요청 링크) 수정
        <Table
        size="small"
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination={{
            total: 1000,
            pageSize: 1000,
            hideOnSinglePage: true
          }}
          >
        </Table>
    </>
  );
};

export default DashBoard;