import ExhibitionCard from "./ExhibitionCard";
import { Link } from "react-router-dom";

function ResultList(props){
    const {
        results
     } = props;
    if(results.length == 0) return <div> 검색 결과가 없습니다. </div>
    else
    return(
        <div style={{display: 'inline-flex', flexFlow: 'wrap'}}>
            {
                    results.map((res, idx) => {
                        return <Link to = {`/exhibitions/${res.id}`} key = {idx}>
                            <ExhibitionCard exhibition = {res}/> </Link>
                    })
            }
        </div>
    )
}

export default ResultList;
