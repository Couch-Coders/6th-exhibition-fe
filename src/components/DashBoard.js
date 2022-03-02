import React, { useEffect, useState } from 'react';
import "antd/es/table/style/css";
import { Table, Button, Space, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { getMyReviews, getLikes } from '../APIs/MemberAPI';
import { getExhibition } from '../APIs/ExhibitionAPI';
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
    setReviewList([]);
    setLikeList([]);
    setLoading(true);
    getMyReData();
    getLiData();
    setLoading(false);
  },[]);
  
  async function getLiData() {
    try{
      const res = await getLikes();
      const myLikes = res.data.content;
      const finalRes = myLikes.map((like,idx) => {
        let date = changeDate(like.exhibition.startDate.toString()) + '~' + changeDate(like.exhibition.endDate.toString())
        return { number: idx+1, key: idx, exhibitionTitle: like.exhibition.title, date: date }
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

  const columns = [
    {
      key:'1',
      title:'번호',
      dataIndex:'number'
    },
    {
      key:'2',
      title:'전시회 제목',
      dataIndex:'exhibitionTitle'
    },
    {
      key:'3',
      title:'전시기간',
      dataIndex:'date'
    },
    {
      key:'4',
      title:'etc',
      render: (record) => {
        return (
          <Space size="middle">
            <Button type='primary' danger
              onClick={() => {
                // onDeleteLike(record);
            }}
            >
              삭제
          </Button>
          </Space>


        );
      }
    },
  ];

  const { Option } = Select;
  // const onDeleteLike = (record) => {
  //   //삭제 요청 보내는 걸로 수정
  //     setDataSource((pre)=> {
  //       return pre.filter ((exhibition) => exhibition.id !== record.id);
  //     });

  // };

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
      {/* 양쪽 다 상위 3개만 가져오기 */}
      <Container>
        <FlexDiv style={{ justifyContent: 'space-between' }}>
        <MyPageSubTitle>내가 좋아요 누른 전시</MyPageSubTitle>
        <a key="list-loadmore-more" onClick={() => navigate('/mypage/likes')}>더보기 <RightOutlined/> </a>
        </FlexDiv>
      
        {/* <Select defaultValue={'due'} onChange={likeFilterChanged} style={{ width: '140px' }} >
        <Option value="due">
        마감일 임박순
        </Option>
        <Option value="recent">
        최신순
        </Option>
        <Option value="likes">
        좋아요순
        </Option>
        </Select> */}
        
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
            >
          </Table>
      </Container>
  
        {/* data load 하는 부분, 필터 적용하는 부분(요청 함수) 수정 */}
  
      <Container>
        <FlexDiv style={{ justifyContent: 'space-between' }}>
        <MyPageSubTitle>내가 작성한 후기</MyPageSubTitle>
        <a key="list-loadmore-more" onClick={() => navigate('/mypage/reviews')} >더보기 <RightOutlined/> </a>
        </FlexDiv>
  
        {/* <Select defaultValue={'due'} onChange={reviewFilterChanged} style={{ width: '140px' }} >
        <Option value="due">
        마감일 임박순
        </Option>
        <Option value="recent">
        최신순
        </Option>
        <Option value="likes">
        좋아요순
        </Option>
        </Select> */}

        <Table
          size="small"
          columns={columns}
          dataSource={reviewList}
          bordered
          pagination={{
              total: 3,
              pageSize: 3,
              hideOnSinglePage: true
            }}
          onRow = {(record, rowIdx)=>{
            return{
              onClick: event => {
                navigate(`/exhibitions/${record.exhibitionId}`)
              }
            }
          }}
            >
        </Table>
      </Container>
      </>
    );
  }

};

export default DashBoard;