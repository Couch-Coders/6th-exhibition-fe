import DashBoard from "../components/DashBoard"

function MyPage(){
    return(
        <div className="container">
            <div className="header">
            My Page
            member info / member delete
            </div>
            <div className="body">
            <DashBoard/>
            </div>

            my likes list
            filter
            my reviews list
            filter
        </div>
    )
}

export default MyPage