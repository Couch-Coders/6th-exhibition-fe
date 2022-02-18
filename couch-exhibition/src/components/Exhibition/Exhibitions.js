import React, { useState, useEffect } from 'react';
import axiosInstance from '../../APIs';
import { Link } from 'react-router-dom';
import ExhibitionCard from './ExhibitionCard';
import { Row, Col } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

function Exhibitions(){
    const [exhibitionList, setExhibitionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const fetchExhibitions = async() => {
            try{
                setError(null);
                setExhibitionList([]);
                setLoading(true);
                const res = await axiosInstance.get('/exhibitions');
                setExhibitionList(res.data);
            }catch(err){
                console.log(err);
            }
            setLoading(false);
        };
        fetchExhibitions();
    }, []);

    if(loading) return <div> loading... </div>;
    if(error) return <div> error! </div>;
    if(!exhibitionList) return null
    else
        return(
        <div className='card-wrapper'>
            {/* 좌우 버튼 클릭에 scroll 이동 기능 추가 */}
            <LeftCircleOutlined style={{ fontSize: '30px', marginRight: '20px' }}/>
            <Row style={{display: 'flex', flexDirection: 'row', overflowX: 'scroll', overflowY: 'hidden'}}>
            {
                exhibitionList.map((res, idx) => {
                    return <Link to = {`/exhibitions/${res.id}`} key = {idx}><Col span = {8}>
                        <ExhibitionCard 
                    exhibition = {res}/> </Col></Link>
                })
            }
            </Row>
            <RightCircleOutlined style={{ fontSize: '30px', marginLeft: '20px' }}/>
        </div>
        )
}

export default Exhibitions;