import styled from 'styled-components';

export const StyledFooter = styled.footer`
     min-height: 100px;
      background: linear-gradient(0deg, #271b17, #795548);
      position: relative;
      padding: 12px 0;
      box-sizing: border-box;
      text-align: center;
      color: #eee;

  &:after {
    content: "";
    height: 8px;
    width: 100%;
    position: absolute;
    background: forestgreen;
    top: 0;
    left: 0;
  }
`

export const FooterGround = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;

    img {
      max-height: 50px;
      transform: skew(45deg, -28deg);
      top: -11px;
      margin-top: -24px;
    }
`
