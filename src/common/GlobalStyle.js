import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 14px;
        background:#F4F6F7;
        text-align: center;

    }
    .ant-btn-primary {
        border-color: RGB(65, 195, 190);
        background: RGB(65, 195, 190);
    }
    
    .ant-btn-primary:hover {
        border-color: #edef6e;
        background: RGB(65, 195, 190);
        color: #edef6e;
    }

    .slick-prev::before{
        color: RGB(65, 195, 190);
    }
    
    .slick-next::before{
        color: RGB(65, 195, 190);
    }
`;

