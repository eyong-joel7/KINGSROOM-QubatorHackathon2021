
import styled from 'styled-components'
export const Container = styled.div`
display: flex;
align-items: center;
/* justify-content: space-evenly; */
width:100%;
height: 100%;
padding: 10px;
margin-top: 30px;
max-width: 80%;
@media screen and (max-width: 480px){
 flex-direction: column;
 max-width: 100%;
}
`;

export const JoinContainer = styled.div`
display: flex;
max-width: 50%;
flex-direction: column;
align-items: center;
padding: 0 10px;

@media screen and (max-width: 767px){
    max-width: 100%;
}
`

export const ImageContainer = styled.div`
width: 100%;
height: 100%;
justify-self: center;
text-align: center;
display: ${({isMobile})=> isMobile ? 'none': 'block'};
`;
export const Image = styled.img`
height: 200px;
width: 100%;
@media screen and (max-width: 767px){
    height: 100px;
    width:100px;
}
`

export const TextWrapper = styled.div`
text-align: center;
display: flex;
flex-direction: column;
`
export const H1 = styled.h1`
font-size: 62px;
font-weight: bold;
padding: 5px;
@media screen and (max-width: 767px){
    font-size: 48px;
}
`;

export const Text = styled.p`
margin-top: 10px;
font-size: 22px;
text-align: center;
align-self: center;
font-weight: 300;
color: #1f1f1f;
/* padding:5px; */
max-width: 90%;
@media screen and (max-width: 767px){
    font-size: 18px;
}
`;

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