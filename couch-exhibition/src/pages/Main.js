import 'antd/es/carousel/style/css'
import { Carousel } from 'antd'

function Main() {

    const contentStyle = {
        width: '100%',
        height: '100%',
        color: '#ffffff',
        textAlign: 'center',
        background: '#854ECA',
      };
    return (
        <>  <Carousel size="medium" autoplay>
            <div>                
                <img style={contentStyle} src='202202_[1]_2880x1880.png'/>
            </div>
            <div>                
                <img style={contentStyle} src='202202_[2]_2880x1880.png'/>
            </div>
            <div>                
                <img style={contentStyle} src='202201_1920x1080.png'/>
            </div>
            <div>                
                <img style={contentStyle} src='202201_2880x1880.png'/>
            </div>
            </Carousel>
            <div className="ranks">
                <div className="title">
                    Top 10 exhibitions
                </div>

                slider
            </div>

            <div className="search">
                <div className="title">
                    Search Exhibitions
                </div>
                search input / search filter
                search result list
            </div>
        </>
    )
}

export default Main