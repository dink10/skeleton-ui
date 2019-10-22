/* eslint global-require: 0 */
import styled from 'styled-components'

export const PageWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 20px;

  background: url('${require('../../assest/img/defaultBg.jpg')}') no-repeat;
  background-position: center;
  background-size: cover;

  > h1 {
    color: white;
  }
`
