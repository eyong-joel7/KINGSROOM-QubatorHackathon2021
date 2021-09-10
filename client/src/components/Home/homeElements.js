
import styled from 'styled-components'
export const Container = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
width:100%;
height: 100%;
padding: 10px;
`;

export const JoinContainer = styled.div`
display: flex;
max-width: 50%;
flex-direction: column;
align-items: center;
padding: 20px;
`

export const ImageContainer = styled.div`
width: 100%;
height: 100%;
justify-self: center;
`;
export const Image = styled.img`
height: 200px;
width: 100%
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
    font-size: 42px;
}
`;

export const Text = styled.p`
margin-top: 5px;
font-size: 18px;
@media screen and (max-width: 767px){
    font-size: 16px;
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