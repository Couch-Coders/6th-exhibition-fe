import React, { useState, useEffect } from 'react';
import { getTopTen } from '../../APIs/ExhibitionAPI';
import { Link } from 'react-router-dom';
import ExhibitionCard from './ExhibitionCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Exhibitions(){
    const [exhibitionList, setExhibitionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const settings = {
        className: "center",
        infinite: true,
        swipeToSlide: true,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 3
    }
    
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
               <Slider {...settings}>
                {
                    exhibitionList.map((res, idx) => {
                        return <div><Link to = {`/exhibitions/${res.id}`} key = {idx}>
                            <ExhibitionCard 
                        exhibition = {res}/> </Link></div>
                    })
                }
               </Slider>
            )
    }

}

export default Exhibitions;