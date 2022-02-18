import { Card, Tag } from 'antd';
import Like from '../Like';

function changeDate(date){
    let year = date.substr(0,4);
    let month = date.substr(4,2);
    let day = date.substr(6,2);
    return year+'.'+month+'.'+day;
}

function ExhibitionCard(props) {
    const {
        title,
        likeCount,
        place,
        startDate,
        endDate,
        rank,
        posterUrl
    } = props.exhibition;

    return(
        <Card
        style={{ width: '240px', height: '270px', position: 'relative', margin: '0 15px', display: 'flex', flexDirection: 'column', border: '1px solid #F0F0F0', borderRadius: '2px', paddingLeft: '10px'}}
        cover={
            <img alt={title} src={posterUrl} style={{ height: '150px' }}/>
        }
        >
            <div className="title" style={{ textAlign: 'initial', margin: '20px 0 5px 0', fontFamily: 'Roboto', fontStyle: 'normal', fontSize: '16px', fontWeight: 'normal', lineHeight: '24px' }}> {title} </div>
            <div className="likes" style={{ fontSize: '10px', position: 'absolute', right: '10px' }}>
            <Like likeCount = {likeCount} like = {false}/>
            </div>
            <div className="desc" style={{ textAlign: 'initial', fontFamily: 'Roboto', fontStyle: 'normal', fontSize: '12px', fontWeight: '400', fontStyle: 'normal', lineHeight: '20px'}}>
                <div className='place' style={{ margin: '5px 0',  color: '#8C8C8C' }}>{place}</div>
                <div className='date' style={{ color: '#1F1F1F' }}>{changeDate(startDate)} ~ {changeDate(endDate)}</div></div>
            <div className='rank'><Tag color={'purple'}>{rank}</Tag></div>
        </Card>
    )
}

export default ExhibitionCard