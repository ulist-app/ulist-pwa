import styled from 'styled-components'
import { CategoryCardProps } from './CategoryCard'

const borderSize = '4px'
const borderColorSize = '16px'

export const CategoryCardStyle = styled.div<CategoryCardProps>`
  align-items: center;
  border: solid ${borderSize};
  cursor: pointer;
  display: flex;
  margin: 16px;
  padding: 16px;
  position: relative;
  height: 120px;
  width: 200px;
  
  &:after {
    content: '';
    border: solid ${borderColorSize} ${({ category }) => category.color};
    bottom: -${borderSize};
    height: calc(100% - calc(${borderColorSize}) * 2);
    position: absolute;
    right: 0;
    top: 0;
  }
`
