import React from 'react'
// import { Text } from 'rebass'
import styled from 'styled-components'
// import { RowFixed } from '../Row'
import { ChevronDown, ChevronUp } from 'react-feather'
//
// export const FilterWrapper = styled(RowFixed)`
//   padding: 8px;
//   // background-color: ${({ theme }) => theme.bg2};
//   // color: ${({ theme }) => theme.text1};
//   border-radius: 8px;
//   user-select: none;
//   & > * {
//     user-select: none;
//   }
//   :hover {
//     cursor: pointer;
//   }
// `

export const FilterWrapper = styled.div`
  padding: 8px 8px;
  width: 32px;
  margin-left: 20px;
  :hover {
    cursor: pointer;
  }
`

export default function SortButton({
  toggleSortOrder,
  ascending
}: {
  toggleSortOrder: () => void
  ascending: boolean
}) {
  return (
    <FilterWrapper onClick={toggleSortOrder}>
      {/*<Text fontSize={14} fontWeight={500}>*/}
      {/*{ascending ? '↑' : '↓'}*/}
      {/*</Text>*/}

      {ascending ? (
        <ChevronUp style={{ width: '16px', height: '16px' }} />
      ) : (
        <ChevronDown style={{ width: '16px', height: '16px' }} />
      )}
    </FilterWrapper>
  )
}
