import React, { useEffect, useState } from 'react';
import "antd/es/table/style/css";
import { Table, Button, Space, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { getMyReviews, getTopLikes } from '../APIs/MemberAPI';
import { deleteReview } from '../APIs/ReviewAPI';
import { getExhibition, deleteLike } from '../APIs/ExhibitionAPI';
import { MyPageSubTitle, Container, FlexDiv } from '../pages/pages.style';
import { useNavigate } from 'react-router-dom';

function changeDate(date){
  let year = date.substr(0,4);
  let month = date.substr(4,2);
  let day = date.substr(6,2);
  return year+'.'+month+'.'+day;
}

function DashBoard () {
  const navigate = useNavigate();
  const [reviewList, setReviewList] = useState([]);
  const [likeList, setLikeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    setError(null);
    setLoading(true);
    setReviewList([]);
    setLikeList([]);
    getMyReData();
    getLiData();
    setLoading(false);
  },[]);
  
  async function getLiData() {
    try{
      const res = await getTopLikes();
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

  async function getMyReData() {
    try{
      const res = await getMyReviews();
      const myReviews = res.data.content;
      const finalRes = await Promise.all(myReviews.map(async (review, idx) => {
        const tmp = await getExhibition(review.exhibitionId);
          let date = changeDate(tmp.data.startDate.toString()) + '~' + changeDate(tmp.data.endDate.toString());  
          return { ...review, exhibitionTitle: tmp.data.title, date: date,
          number: idx+1,
          key: idx
          }
      }))
      setReviewList(finalRes);
    }catch(err){
      console.log(err);
      setError(err);
    }
  }

  const likeColumns = [
    {
      key:'1',
      title:'??????',
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
      title:'????????? ??????',
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
      title:'????????????',
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
                onDeleteLike(record);
            }}
            >
              ??????
          </Button>
          </Space>
        );
      }
    },
  ];

  const reviewColumns = [
    {
      key:'1',
      title:'??????',
      dataIndex:'number',
      onCell: (record, rowIndex)=>{
        return{
          onClick: event => {
            navigate(`/exhibitions/${record.exhibitionId}`)
          }
        }
      }
    },
    {
      key:'2',
      title:'????????? ??????',
      dataIndex:'exhibitionTitle',
      onCell: (record, rowIndex)=>{
        return{
          onClick: event => {
            navigate(`/exhibitions/${record.exhibitionId}`)
          }
        }
      }
    },
    {
      key:'3',
      title:'????????????',
      dataIndex:'date',      
      onCell: (record, rowIndex)=>{
        return{
          onClick: event => {
            navigate(`/exhibitions/${record.exhibitionId}`)
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
                onDeleteReview(record);
            }}
            >
              ??????
          </Button>
          </Space>
        );
      }
    },
  ];

  const { Option } = Select;
  async function onDeleteLike(record) {
    //?????? ?????? ?????? ??????
    console.log(record);
    try{
      const res = await deleteLike(record.exhibition.id);
      console.log(res);
    }catch(err){
      console.log(err);
    }
    getLiData();

  };

  async function onDeleteReview (record){
    //?????? ?????? ?????? ??????
    console.log(record);
    try{
      const res = await deleteReview(record.exhibitionId, record.reviewId);
      console.log(res);
    }catch(err){
      console.log(err);
    }
    getMyReData();

  };

  function likeFilterChanged(value) {
    console.log(value);
  }

  function reviewFilterChanged(value){
    console.log(value);
  }

  if(loading) return <div> loading... </div>;
  if(error) return <div> error! </div>;
  else{
    return (
      <>
      <Container>
        <FlexDiv style={{ justifyContent: 'space-between' }}>
        <MyPageSubTitle>?????? ????????? ?????? ??????</MyPageSubTitle>
        <a key="list-loadmore-more" onClick={() => navigate('/mypage/likes')}>????????? <RightOutlined/> </a>
        </FlexDiv>
      
        {/* <Select defaultValue={'due'} onChange={likeFilterChanged} style={{ width: '140px' }} >
        <Option value="due">
        ????????? ?????????
        </Option>
        <Option value="recent">
        ?????????
        </Option>
        <Option value="likes">
        ????????????
        </Option>
        </Select> */}
        
        <Table
          size="small"
          columns={likeColumns}
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
  
        {/* data load ?????? ??????, ?????? ???????????? ??????(?????? ??????) ?????? */}
  
      <Container>
        <FlexDiv style={{ justifyContent: 'space-between' }}>
        <MyPageSubTitle>?????? ????????? ??????</MyPageSubTitle>
        <a key="list-loadmore-more" onClick={() => navigate('/mypage/reviews')} >????????? <RightOutlined/> </a>
        </FlexDiv>
  
        {/* <Select defaultValue={'due'} onChange={reviewFilterChanged} style={{ width: '140px' }} >
        <Option value="due">
        ????????? ?????????
        </Option>
        <Option value="recent">
        ?????????
        </Option>
        <Option value="likes">
        ????????????
        </Option>
        </Select> */}

        <Table
          size="small"
          columns={reviewColumns}
          dataSource={reviewList}
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
      </>
    );
  }

};

export default DashBoard;