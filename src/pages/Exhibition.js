import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from 'antd';
import { getExhibition, postLike, deleteLike } from '../APIs/ExhibitionAPI';
import { getExhibitionReviews, createReview, updateReview, deleteReview } from '../APIs/ReviewAPI';
import { getLikes } from '../APIs/MemberAPI';
import Like from '../components/Like';
import { Wrapper, FlexDiv, DetailTitle, DetailContent, Division, WriteReview, SubmitBtn, ControlBtn } from './pages.style';
import Map from '../modules/map/Map';
import { MemberContext } from '../modules/AuthProvider';


function changeDate(date){
    let year = date.substr(0,4);
    let month = date.substr(4,2);
    let day = date.substr(6,2);
    return year+'.'+month+'.'+day;
}

function formatDate(date){
    console.log(date);
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

function Exhibition() {
    const { id } = useParams();
    const [exhibition, setExhibition] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { member } = useContext(MemberContext);
    const [review] = Form.useForm();
    const [editId, setEditId] = useState(-1);
    const [likes, setLikes] = useState([]);
    const [isLike, setIsLike] = useState(false);

    useEffect(()=> {
        setError(null);
        setReviews([]);
        setExhibition(null);
        setLoading(true);
        getExData();
        getReData();
        if(member){
            getLiList();
        }
        setLoading(false);
    },[]);

    const getLiList = async() => {
        try{
            const res = await getLikes();
            setLikes(res.data.content);
            let tmp = res.data.content.find(like => like.exhibition.id == id);
            if(tmp) setIsLike(true);
            else setIsLike(false);
        }catch(err){
            console.log(err);
        }
    }

    const getExData = async() => {
        try{
            const res = await getExhibition(id);
            setExhibition(res.data);
        }catch(err){
            console.log(err);
            setError(err);
        }
    }

    const getReData = async() => {
        try{
            const res = await getExhibitionReviews(id);
            setReviews(res.data.content);
        }catch(err){
            console.log(err);
            setError(err);
        }
    }

    if(loading) return <div> loading... </div>;
    if(error) return <div> error! </div>;
    if(!exhibition) return null;
    else{
        const { 
            title,
            likeCnt,
            posterUrl,
            place,
            placeAddr,
            latitude,
            longitude,
            startDate,
            endDate,
            contactLink,
            ticketPrice,
            reservationLink
        } = exhibition;

        async function postReview(value){
            console.log(value);
            if(!member){
                alert('로그인 한 유저만 후기를 작성할 수 있습니다.');
                return false;
                // 로그인 창을 모듈화 안 했더니 다시 보여주는 부분을 넣기가 애매하네.
            }
            else if(value.content === undefined || value.content.length < 30){
                alert('후기는 30자 이상 입력해 주세요.');
                return false;
            }
            else{
                if(value.content.length >= 30 && member){
                try{
                    const res = await createReview(id, value);
                    console.log(res);
                    if(res.status === 200){
                        getReData();
                        review.resetFields();
                    }
                }catch(err){
                    console.log(err);
                }
            }
        } 
    }

        function editReview(reviewId){
            setEditId(reviewId);
        }

        async function patchReview(value){
            // 삭제 전에 확인 받는 모달 띄우기
            try{
                const res = await updateReview(id,value,editId);
                console.log(res);
                if(res.status === 200){
                    setEditId(-1);
                    getReData();
                }
            }catch(err){
                console.log(err);
            }
        }

        async function removeReview(reviewId){
            try{
                const res = await deleteReview(id, reviewId);
                console.log(res);
                if(res.status === 200) {
                    getReData();
                }
            }catch(err){
                console.log(err);
            }
        }

        async function removeLike(){
            if(member){
                try{
                    const res = await deleteLike(id);
                    console.log(res);
                    if(res.status === 200){
                        getLiList();
                        getExData();
                    }
                }catch(err){
                    console.log(err);
                }
            }else{
                return false;
            }
        }
    
        async function addLike(){
            if(member){
                try{
                    const res = await postLike(id);
                    console.log(res);
                    if(res.status === 200){
                        getLiList();
                        getExData();
                    }
                }catch(err){
                    console.log(err);
                }
            }else{
                alert('로그인 한 유저만 좋아요를 할 수 있습니다.');
                return false;
            }
        }

        return(
        <Wrapper>
            <FlexDiv style={{alignItems: 'center', justifyContent: 'space-between'}}>
            <div className='title' style={{ fontFamily: 'Work Sans', fontStyle: 'normal', fontWeight: '700', fontSize: '34px', lineHeight: '39.88px', letterSpacing: '-2%', textAlign: 'left' }}>{title}</div>
            <Like likeCount = {likeCnt} exhibitionId={ id } style={{ textAlign: 'right', whiteSpace:'nowrap' }} addLike={addLike} removeLike={removeLike} isLike={isLike}/>
            </FlexDiv>
            <img alt={title} src={posterUrl} style={{ display: 'block', margin: 'auto', padding: '30px', width: '480px' }}/>
            <FlexDiv>
                <DetailTitle>장소</DetailTitle><DetailContent>{place}</DetailContent>
            </FlexDiv>
            <FlexDiv>
                <DetailTitle>기간</DetailTitle><DetailContent>{changeDate(startDate.toString())} ~ {changeDate(endDate.toString())}</DetailContent>
            </FlexDiv>
            <FlexDiv>
                <DetailTitle>가격</DetailTitle><DetailContent>{ticketPrice}</DetailContent>
            </FlexDiv>
            <FlexDiv>
                <DetailTitle>대관처</DetailTitle><DetailContent><a href = {contactLink} target={'_blank'}>{contactLink}</a></DetailContent>
            </FlexDiv>
            <FlexDiv>
                <DetailTitle>예매</DetailTitle><DetailContent><a href = {reservationLink} target={'_blank'}>{reservationLink}</a></DetailContent>
            </FlexDiv>
            <FlexDiv>
                <DetailTitle>위치</DetailTitle><DetailContent> <Map lat = {latitude} lng = {longitude} /></DetailContent>
            </FlexDiv>
            <Division />
            <Form name='review-form' form={review} onFinish={postReview} layout='inline'>
            <FlexDiv style={{ alignItems: 'center' }}>
            <Form.Item name={'content'} style = {{ width: '100%' }}><WriteReview showCount placeholder='후기를 입력하세요'/>
            </Form.Item>
            <Form.Item>
            <SubmitBtn type='primary' htmlType='submit'>등록</SubmitBtn>
            </Form.Item>
            </FlexDiv>
            </Form>

        <div className='sub-title' style={{ fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: '400', fontSize: '14px', lineHeight: '22px', textAlign: 'left', marginBottom: '20px'}}>후기({reviews.length})</div>
        {
            reviews.map(review => {
                return (
                    <div className='review-wrapper' key={review.reviewId} style={{ marginBottom: '40px' }}>
                        <FlexDiv style={{ justifyContent: 'space-between',  fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: '400', fontSize: '12px', lineHeight: '22px', color: 'rgba(0, 0, 0, 0.45)' }}>    
                        <div className='writer'>{review.nickname}</div>
                        <div className='date'>{formatDate(review.modifiedDateTime)}</div>
                        </FlexDiv>

                            {
                                member? member.nickname === review.nickname ? editId !== review.reviewId ?                             
                                <FlexDiv style={{ justifyContent: 'space-between' }}>
                                <div className='review-content' style={{ fontFamily: 'Roboto', lineHeight: '22px', textAlign: 'left', whiteSpace: 'pre' }}>
                                {review.content}
                                </div>
                                <div className='control-container' style={{ whiteSpace: 'nowrap' }}>
                                    <ControlBtn onClick={() => editReview(review.reviewId)}>수정</ControlBtn><ControlBtn onClick={() => removeReview(review.reviewId)}>삭제</ControlBtn>
                                </div>
                                </FlexDiv>
                                :
                                <Form name='edit-form' onFinish={patchReview} layout='inline' >
                                <FlexDiv style={{ alignItems: 'center' }}>
                                <Form.Item name={'content'} style = {{ width: '100%', marginRight: '5px' }} initialValue={review.content}>< Input.TextArea />
                                </Form.Item>
                                <Form.Item>
                                <div className='control-container' style={{ whiteSpace: 'nowrap' }}>
                                    <ControlBtn htmlType='submit'>확인</ControlBtn><ControlBtn onClick={() => setEditId(-1)}>취소</ControlBtn>
                                </div>
                                </Form.Item>
                                </FlexDiv>
                                </Form>:                                 
                                <div className='review-content' style={{ fontFamily: 'Roboto', lineHeight: '22px', textAlign: 'left' }}>
                                    {review.content}
                                </div>:                            
                                <div className='review-content' style={{ fontFamily: 'Roboto', lineHeight: '22px', textAlign: 'left' }}>
                                    {review.content}
                                </div>
                            }

                    </div>
                )
            })
        }
        </Wrapper>
    )
    }

}

export default Exhibition