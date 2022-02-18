import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../APIs';
import Like from '../components/Like';
import { DetailTitle, DetailContent } from './pages.style';
import { Link } from 'react-router-dom';

function changeDate(date){
    let year = date.substr(0,4);
    let month = date.substr(4,2);
    let day = date.substr(6,2);
    return year+'.'+month+'.'+day;
}

function Exhibition() {
    const { id } = useParams();
    const [exhibition, setExhibition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const getExhibition = async() => {
            try{
                setError(null);
                setExhibition(null);
                setLoading(true);
                const res = await axiosInstance.get(`/exhibitions/${id}`);
                setExhibition(res.data);
            }catch(err){
                console.log(err);
            }
            setLoading(false);
        };
        getExhibition();
    },[]);

    if(loading) return <div> loading... </div>;
    if(error) return <div> error! </div>;
    if(!exhibition) return null;
    else{

        const { 
            title,
            likeCount,
            posterUrl,
            place,
            latitude,
            longitude,
            startDate,
            endDate,
            contactLink,
            ticketPrice,
            reservationLink
        
        } = exhibition;

        return(
        <div className='detail-wrapper'>
            <div className='title' style={{ fontFamily: 'Work Sans', fontStyle: 'normal', fontWeight: '700', fontSize: '34px', lineHeight: '39.88px', letterSpacing: '-2%', textAlign: 'left' }}>{title}</div>
            <Like likeCount = {likeCount} like = {false} style={{ textAlign: 'right' }} />
            <img alt={title} src={posterUrl} style={{ display: 'block', margin: 'auto', padding: '30px', width: '480px' }}/>
            <div style={{display: 'flex'}}>
            <DetailTitle>장소</DetailTitle><DetailContent>{place}</DetailContent>
            </div>
            <div style = {{display: 'flex'}}>
            <DetailTitle>기간</DetailTitle><DetailContent>{changeDate(startDate)} ~ {changeDate(endDate)}</DetailContent>
            </div>
            <div style = {{display: 'flex'}}>
            <DetailTitle>가격</DetailTitle><DetailContent>{ticketPrice}</DetailContent>
            </div>
            <div style = {{display: 'flex'}}>
            <DetailTitle>대관처</DetailTitle><DetailContent><Link to = {contactLink}>{contactLink}</Link></DetailContent>
            </div>
            <div style = {{display: 'flex'}}>
            <DetailTitle>예매</DetailTitle><DetailContent><Link to = {reservationLink}>{reservationLink}</Link></DetailContent>
            </div>
            <div style = {{display: 'flex'}}>
            <DetailTitle>위치</DetailTitle><DetailContent>{latitude} {longitude}</DetailContent>
            </div>
        {/* 지도 API 연동 */}
        </div>
    )
    }

}

export default Exhibition