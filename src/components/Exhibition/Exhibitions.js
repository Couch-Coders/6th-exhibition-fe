import React, { useState, useEffect } from 'react';
import { getTopTen } from '../../APIs/ExhibitionAPI';
import { Link } from 'react-router-dom';
import ExhibitionCard from './ExhibitionCard';
import { Row, Col } from 'antd';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';

function Exhibitions(){
    const [exhibitionList, setExhibitionList] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(async ()=> {
        const exhibitions = await getTopTen();
        setLoading(true);
        if (exhibitions){
            console.log(exhibitions);
            setExhibitionList(exhibitions.data);
        }
        setLoading(false);
    }, []);

    if(loading) return <div> loading... </div>;
    if(!exhibitionList) return null
    else
    {
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

}

export default Exhibitions;