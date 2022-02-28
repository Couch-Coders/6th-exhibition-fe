import { Card, Tag } from 'antd';
import Like from '../Like';
import { getLikes } from '../../APIs/MemberAPI';
import { deleteLike, postLike } from '../../APIs/ExhibitionAPI';
import { MemberContext } from '../../modules/AuthProvider';
import { useContext, useEffect, useState } from 'react';

function changeDate(date){

    let year = date.substr(0,4);
    let month = date.substr(4,2);
    let day = date.substr(6,2);
    return year+'.'+month+'.'+day;
}

function ExhibitionCard(props) {
    const {
        id,
        title,
        likeCnt,
        place,
        startDate,
        endDate,
        rank,
        posterUrl
    } = props.exhibition;
    const { member } = useContext(MemberContext);
    const [likes, setLikes] = useState([]);
    const [isLike, setIsLike] = useState(false);
    useEffect(()=> {
        if(member) {
            getLiList();
        }
    },[]);
    const getLiList = async() =>{
        try{
            const res = await getLikes();
            setLikes(res.data.content);
            let tmp = res.data.content.find(like => like.exhibition.id == id);
            console.log(tmp);
            if(tmp) setIsLike(true);
            else setIsLike(false);
        }catch(err){
            console.log(err);
        }
    }

    async function removeLike(value){
        console.log(value);
        if(member){
            try{
                const res = await deleteLike(id);
                console.log(res);
                if(res.status === 200){
                    getLiList();
                }
            }catch(err){
                console.log(err);
            }
        }else{
            return false;
        }
    }

    async function addLike(value){
        console.log(value);
        if(member){
            try{
                const res = await postLike(id);
                console.log(res);
                if(res.status === 200){
                    getLiList();
                }
            }catch(err){
                console.log(err);
            }
        }else{
            return false;
        }
    }
    
    return(
        <Card
        style={{ width: '240px', height: '270px', position: 'relative', margin: '15px', display: 'flex', flexDirection: 'column', border: '1px solid #F0F0F0', borderRadius: '2px', paddingLeft: '10px'}}
        cover={
            <img alt={title} src={posterUrl} style={{ height: '150px' }}/>
        }
        >
            <div className="title" style={{ textAlign: 'initial', margin: '20px 0 5px 0', fontFamily: 'Roboto', fontStyle: 'normal', fontSize: '16px', fontWeight: 'normal', lineHeight: '24px' }}> {title} </div>
            <div className="likes" style={{ fontSize: '10px', position: 'absolute', right: '10px' }}>
            <Like likeCount = {likeCnt} exhibitionId = {id} isLike={isLike} addLike={addLike} removeLike={removeLike}/>
            </div>
            <div className="desc" style={{ textAlign: 'initial', fontFamily: 'Roboto', fontStyle: 'normal', fontSize: '12px', fontWeight: '400', fontStyle: 'normal', lineHeight: '20px'}}>
                <div className='place' style={{ margin: '5px 0',  color: '#8C8C8C' }}>{place}</div>
                <div className='date' style={{ color: '#1F1F1F' }}>{changeDate(startDate.toString())} ~ {changeDate(endDate.toString())}</div></div>
            <div className='rank'><Tag color={'purple'}>{rank}</Tag></div>
        </Card>
    )
}

export default ExhibitionCard