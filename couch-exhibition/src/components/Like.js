import { HeartOutlined, HeartFilled } from '@ant-design/icons';

function Like(props){

const { likeCount, like, style } = props;
return(
    <div className='like-container' style = {style}>
    {
    likeCount} {like? <HeartFilled style={{ color: '#FF7875'}}/> : <HeartOutlined style={{ color: '#FF7875' }}/>
    }
    </div>
    )
}

export default Like