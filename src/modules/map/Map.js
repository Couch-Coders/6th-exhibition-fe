import { useEffect } from "react";
import KakaoMapScript from "./KakaoMapScript";

export default function Map(props){
    const { lat, lng } = props;
    useEffect(()=> {
        KakaoMapScript(lng,lat);
    }, []);

    return (
        <div id='map'
        style = {{
            width: '385px',
            height: '220px'
        }}></div>
    )
}