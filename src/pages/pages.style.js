import styled from 'styled-components';
import { Button, Input } from 'antd';

export const Wrapper = styled.div`
    align-self: center;
`
export const FlexDiv = styled.div`
    display: flex;
`

export const Title = styled.div`
    font-weight: 700;
    font-family: Roboto;
    font-style: normal;
    font-size: 18px;
    text-align: left;
    margin: 60px 0 25px;
`
export const DetailTitle = styled.div`
    font-weight: 700;
    font-family: Roboto;
    font-style: normal;
    font-size: 14px;
    line-height: 16.41px;
    text-align: left;
    width: 45px;
`
export const DetailContent = styled.div`
    font-weight: 400;
    font-family: Roboto;
    font-style: normal;
    font-size: 13px;
    line-height: 15.23px;
    margin-left: 20px;
    margin-bottom: 20px;
    text-align: left;
`
export const Division = styled.div`
    height: 0px;
    border: 1px solid #D9D9D9;
`

export const WriteReview = styled(Input.TextArea)`
    height: 75px;
    border: 1px solid #D9D9D9;
    border-radius: 2px;
    margin: 30px 10px 30px 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    font-size: 14px;
    padding: 5px 12px;
`

export const SubmitBtn = styled(Button)`
    width: 60px;
    height: 35px;
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
    border-radius: 2px;
    font-family: Roboto;
    font-weight: 400;
    font-style: normal;
    line-height: 22px;
    font-size: 14px;
    margin-left: 10px;
`

export const ControlBtn = styled(Button)`
    width: 42px;
    height: 24px;
    border: 1px solid #D9D9D9;
    font-family: Roboto;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    padding: 1px;
`

export const Container = styled.div`
    margin: 60px 0 ;
`

export const MyPageSubTitle = styled.div`
    font-family: Roboto;
    font-weight: 700;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
`