
import styled from 'styled-components'
export const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
padding: 10px;
`;
export const OutContainer = styled.div`
width:100%;
max-height: 100%;
display: flex;
align-content: center;
flex-direction: column;
justify-content: flex-start;
/* margin-top: 3rem; */
padding-top: 20px;
padding-bottom: 20px;

`
export const JoinContainer = styled.div`
display: flex;
max-width: 50%;
flex-direction: column;
align-items: center;
padding: 20px;
`

export const ImageContainer = styled.div`
    width: 120px;
    height: 120px;
    justify-self: center;
    border-radius: 100%;
    background-color: #0e6a3c;
    padding: 20px;
    @media screen and (max-width: 900px){
        width: 100px;
    height: 100px;
    padding: 20px;
}
    @media screen and (max-width: 480px){
        width: 80px;
    height: 80px;
    padding: 15px;
}
    
`;
export const Image = styled.img`
height: 100%;
width: 100%;

`

export const TextWrapper = styled.div`
text-align: center;
display: flex;
flex-direction: column;
`
export const H1 = styled.h3`
font-size: 30px;
font-weight: 300;
padding: 5px;
@media screen and (max-width: 767px){
    font-size: 22px;
}
`;

export const Text = styled.p`
margin-top: 5px;
font-size: 18px;
@media screen and (max-width: 767px){
    font-size: 16px;
}
`;
export const Welcome = styled.div`
width: 100%;
text-align: center;
color:#1f1f1f;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

export const ButtonWrapper = styled.div`
display: flex;
width: 100%;
`;

export const ButtonAction = styled.button`
background-color:#0d203b ;
font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
`