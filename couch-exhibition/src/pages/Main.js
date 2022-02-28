import 'antd/es/carousel/style/css'
import { Carousel, Input, Select } from 'antd'
import { Title } from './pages.style'
import Exhibitions from '../components/Exhibition/Exhibitions';
import ResultList from '../components/Exhibition/ResultList';
import { city, area } from '../common/addressLists';
import { searchExhibitions } from '../APIs/ExhibitionAPI';
import { useState } from 'react';

const { Search } = Input;
const { Option } = Select;

function Main() {
    const [cities, setCities] = useState(area[city[0]]);
    const [areas, setAreas] = useState(area[city[0]][0])
    const [params, setParams] = useState({
        city: '서울시',
        area: '강남구',
        progress: true,
        keyword: '',
        sort: 'startDate,desc'
    })
    const [loading, setLoading] = useState(false);
    const [searchRes, setSearchRes] = useState([]);

    const hanleCitiesChange = value => {
        setParams({...params, city: value, area: area[value][0]})
        setCities(area[value]);
        setAreas(area[value][0]);
    }

    const onAreasChange = value => {
        setParams({...params, area: value})
        setAreas(value);
    }

    const periodChange = value =>{
        setParams({... params, progress: value})
    }

    async function onSearch(value){
        setParams({...params, keyword: value})
        setLoading(true);
        try{
            const results = await searchExhibitions(params.city, params.area, params.progress, value, params.sort);
            console.log(results);
            if(results){
                setSearchRes(results.data);
            }
        }catch(err){
            console.log(err);
        }
        setLoading(false);
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
            <div>                
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
                <Select style={filterStyle} defaultValue={city[0]} onChange={hanleCitiesChange}>
                    {
                        city.map(cityName => (
                            <Option key={cityName}>{cityName}</Option>
                        ))
                    }
                </Select>
                <Select style={filterStyle} value={areas} onChange={onAreasChange}>
                    {
                        cities.map(areaName => (
                            <Option key={areaName}>{areaName}</Option>
                        ))
                    }
                </Select>
                <Select style={filterStyle} defaultValue={'진행중'} onChange={periodChange}>
                    <Option key={ true }>진행중</Option>
                    <Option key={ false }>진행예정</Option>
                </Select>

                <Search       
                placeholder="검색어를 입력하세요"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                style={{ width: '365px', height: '32px', float: 'right'}}
                />
                
                </div>
                {
                    loading? <div> loading... </div>:<ResultList results = {searchRes} />
                }
                
            </div>
        </>
    )
}

export default Main