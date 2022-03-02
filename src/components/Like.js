import { HeartOutlined, HeartFilled } from '@ant-design/icons';

function Like(props){
const { 
    likeCount, 
    style, 
    exhibitionId, 
    addLike, 
    removeLike, 
    isLike 
} = props;

return(
    <div className='like-container' style = {style}>
    {
    likeCount} {isLike? <HeartFilled style={{ color: '#FF7875'}}  onClick={() => removeLike(exhibitionId)}/> : 
    <HeartOutlined style={{ color: '#FF7875' }} onClick={() => addLike(exhibitionId)}/>
    }
    </div>
    )
}

export default Like