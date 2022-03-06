import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "antd/es/table/style/css";
import { Table, Space, Button } from 'antd';
import { getLikes } from '../APIs/MemberAPI';
import { deleteLike } from '../APIs/ExhibitionAPI';
import { Container, Division } from '../pages/pages.style';

function changeDate(date){
    let year = date.substr(0,4);
    let month = date.substr(4,2);
    let day = date.substr(6,2);
    return year+'.'+month+'.'+day;
  }

export default function MyLikes(){
    const navigate = useNavigate();
    const [likeList, setLikeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        setError(null);
        setLoading(true);
        setLikeList([]);
        getData();
        setLoading(false);
    }, [])

    async function getData() {
        try{
          const res = await getLikes();
          const myLikes = res.data.content;
          const finalRes = myLikes.map((like,idx) => {
            let date = changeDate(like.exhibition.startDate.toString()) + '~' + changeDate(like.exhibition.endDate.toString())
            return { ...like, number: idx+1, key: idx, exhibitionTitle: like.exhibition.title, date: date }
          })
          setLikeList(finalRes);
        }catch(err){
          console.log(err);
          setError(err);
        }
    }

      const columns = [
        {
          key:'1',
          title:'번호',
          dataIndex:'number',
          onCell: (record, rowIndex)=>{
            return{
              onClick: event => {
                navigate(`/exhibitions/${record.exhibition.id}`)
              }
            }
          }
        },
        {
          key:'2',
          title:'전시회 제목',
          dataIndex:'exhibitionTitle',
          onCell: (record, rowIndex)=>{
            return{
              onClick: event => {
                navigate(`/exhibitions/${record.exhibition.id}`)
              }
            }
          }
        },
        {
          key:'3',
          title:'전시기간',
          dataIndex:'date',
          onCell: (record, rowIndex)=>{
            return{
              onClick: event => {
                navigate(`/exhibitions/${record.exhibition.id}`)
              }
            }
          }
        },
        {
          key:'4',
          title:'',
          render: (record) => {
            return (
              <Space size="middle">
                <Button style={{ width: '42px', height: '24px', radius: '2px', background: '#F0F0F0', border: '1px solid #D9D9D9', boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.016)', fontFamily: 'Roboto', fontStyle: 'normal', lineHeight: '22px', color: 'rgba(0, 0, 0, 0.85)', padding: 0 }}
                  onClick={() => { 
                    onDelete(record);
                }}
                >
                  삭제
              </Button>
              </Space>
            );
          }
        },
      ];

      async function onDelete(record) {
        //삭제 전에 확인 모달
        console.log(record);
        try{
          const res = await deleteLike(record.exhibition.id);
          console.log(res);
        }catch(err){
          console.log(err);
        }
        getData();
      };

    if(loading) return <div> loading... </div>;
    if(error) return <div> error! </div>;
    else{
    return (
        <Container>
        <div className='title' style={{ fontFamily: 'Work Sans', fontStyle: 'normal', fontWeight: '700', fontSize: '28px', lineHeight: '32.84px', letterSpacing: '-2%', textAlign: 'left' }}>내가 좋아요 누른 전시</div>
                <Division style={{marginTop: '13px', marginBottom: '50px' }} />
        <Table
          size="small"
          columns={columns}
          dataSource={likeList}
          bordered
          pagination={{
              total: 3,
              pageSize: 3,
              hideOnSinglePage: true
            }}
          loading={loading}
            >
          </Table>
      </Container>
    )  
    }

}