import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "antd/es/table/style/css";
import { Form } from 'antd';
import { getMyReviews } from '../APIs/MemberAPI';
import { updateReview, deleteReview } from '../APIs/ReviewAPI';
import { getExhibition } from '../APIs/ExhibitionAPI';
import { Container, Division, ControlBtn } from '../pages/pages.style';

function changeDate(date){
    let year = date.substr(0,4);
    let month = date.substr(4,2);
    let day = date.substr(6,2);
    return year+'.'+month+'.'+day;
  }

function formatDate(date){
    let year = date[0];
    let month = date[1];
    let day = date[2];
    if(month<10 && day<10){
        return year+'.0'+month+'.0'+day;
    }else if(month>=10 && day<10){
        return year+'.'+month+'.0'+day;
    }else if(month<10 && day>=10){
        return year+'.0'+month+'.'+day;
    }else
    return year+'.'+month+'.'+day;
    }

export default function MyReviews(){
    const [reviewList, setReviewList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        setError(null);
        setLoading(true);
        setReviewList([]);
        getData();
        setLoading(false);
    }, [])

    async function getData() {
        try{
            const res = await getMyReviews();
            const myReviews = res.data.content;
            const finalRes = await Promise.all(myReviews.map(async (review, idx) => {
              const tmp = await getExhibition(review.exhibitionId);
                let date = changeDate(tmp.data.startDate.toString()) + '~' + changeDate(tmp.data.endDate.toString());  
                return { ...review, exhibition: tmp.data, date: date,
                key: idx
                }
            }))
            setReviewList(finalRes);
          }catch(err){
            console.log(err);
            setError(err);
          }
    }

    async function editReview(value){
        try{
            const res = await updateReview(value.exhibitionId,value,value.reviewId);
            console.log(res);
            if(res.status === 200){
                getData();
            }
        }catch(err){
            console.log(err);
        }
    }

    async function removeReview(reviewId, exhibitionId){
        try{
            const res = await deleteReview(exhibitionId, reviewId);
            console.log(res);
            if(res.status === 200) {
                getData();
            }
        }catch(err){
            console.log(err);
        }
    }
    if(loading) return <div> loading... </div>;
    if(error) return <div> error! </div>;
    else{
        return(
            <Container>
            <div className='title' style={{ fontFamily: 'Work Sans', fontStyle: 'normal', fontWeight: '700', fontSize: '28px', lineHeight: '32.84px', letterSpacing: '-2%', textAlign: 'left' }}>내가 작성한 후기</div>
                    <Division style={{marginTop: '13px', marginBottom: '50px' }} />
            {
                reviewList.map(review => {
                    return (<div key={review.key}>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <Link to = {`/exhibitions/${review.exhibition.id}`}>
                    <div style={{textAlign: 'left'}}>
                    <div style = {{fontFamily: 'Roboto', fontStyle: 'normal', fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.85)'}}>{review.exhibition.title}</div>
                    <div style = {{fontFamily: 'Roboto', fontStyle: 'normal', fontSize: '12px', lineHeight: '20px', color: '#8C8C8C'}}>{review.exhibition.place}</div>
                    <div style={{fontFamily: 'Roboto', fontStyle: 'normal', fontSize: '12px', lineHeight: '20px', color: '#1F1F1F'}}>{review.date}</div>
                    </div>
                    </Link>
                    <Form onFinish={editReview} style = {{display: 'flex'}}>
                    <Form.Item name={'content'} initialValue={review.content}>
                    <textarea style={{width: '412px', height: '74px'}} />
                    </Form.Item>
                    <Form.Item hidden={true} name={'reviewId'} initialValue={review.reviewId}/>
                    <Form.Item hidden={true} name={'exhibitionId'} initialValue={review.exhibitionId}/>
                    <div style={{ marginLeft: '25px' }}>
                    <div style={{fontFamily: 'Roboto', fontStyle: 'normal', fontSize: '12px', lineHeight:'22px', color: 'rgba(0, 0, 0, 0.45)'}}>
                    {formatDate(review.modifiedDateTime)}
                    </div>
                    <div className='control-container' style={{ whiteSpace: 'nowrap' }}>
                        <ControlBtn htmlType='submit'>수정</ControlBtn><ControlBtn onClick={() => removeReview(review.reviewId, review.exhibition.id)}>삭제</ControlBtn>
                    </div>
                    </div>
                    </Form>
                    </div> <Division style={{margin: '32px 0'}}/>
                    </div>)
                })
            }
          </Container>
        )
    }
}