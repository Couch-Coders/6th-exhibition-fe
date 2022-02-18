import 'antd/es/carousel/style/css'
import { Carousel, Input, Select } from 'antd'
import { Title } from './pages.style'
import Exhibitions from '../components/Exhibition/Exhibitions';

const { Search } = Input;
const { Option } = Select;

function Main() {
    
    function onSearch(value){
        console.log(value);
    }

    const contentStyle = {
        height: '274px',
        color: '#ffffff',
        display: 'block',
        margin: '0 auto',
        background: '#854ECA',
      };

    const filterStyle = { 
        width: '98px', 
        height: '32px',
        float: 'left',
        margin: '0 5px'
    };

    return (
        <>  <Carousel autoplay effect='fade'>
            <div >                
                <img style={contentStyle} src='202202_[1]_2880x1880.png' alt='ex1'/>
            </div>
            <div >                
                <img style={contentStyle} src='202202_[2]_2880x1880.png' alt='ex2'/>
            </div>
            <div >                
                <img  style={contentStyle} src='202201_1920x1080.png' alt='ex3'/>
            </div>
            <div >                
                <img style={contentStyle} src='202201_2880x1880.png' alt='ex4'/>
            </div>
            </Carousel>
            <div className="ranks-container">
                <Title>TOP 10 전시회</Title>
                <Exhibitions/>
            </div>

            <div className="search-container">
                <Title> 전시 찾아보기 </Title>
                <div className='search-filter'>
                <Select style={filterStyle}></Select>
                <Select style={filterStyle}></Select>
                <Select style={filterStyle} defaultValue={'진행중'}>
                    <Option key={'inProgress'}>진행중</Option>
                    <Option key={'preProgress'}>진행예정</Option>
                </Select>

                {/* 
                https://ant.design/components/select/
                select로 검색 기능 추가
                */}
                <Search       
                placeholder="검색어를 입력하세요"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                style={{ width: '365px', height: '32px', float: 'right'}}
                />
                
                </div>
                
                <div>search result list</div>
            </div>
        </>
    )
}

export default Main