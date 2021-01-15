import React, { useRef } from 'react'
// import { BookOpen, Code, Info, MessageCircle, PieChart } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useActiveWeb3React } from '../../hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ExternalLink } from '../../theme'
import { ButtonPrimary } from '../Button'
// import telegram from '../../assets/swap_images/telegram.svg'
import { ReactComponent as Telegram } from '../../assets/swap_images/telegram.svg'
import { ReactComponent as Twitter } from '../../assets/swap_images/twitter.svg'
import { ReactComponent as Weibo } from '../../assets/swap_images/weibo.svg'
// import { ReactComponent as Zhihu } from '../../assets/swap_images/zhihu.svg'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    // stroke: ${({ theme }) => theme.text1};
    stroke:rgba(255,255,255,.5);
  }
  :hover path{
    stroke:rgba(0,0,0,.5);
  }
  
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 32px;
  // background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    // background-color: ${({ theme }) => theme.bg4};
    background-color: #fff;
  }

  svg {
    margin-top: 2px;
  }
  :hover svg path,
  :focus svg path{
    stroke:rgba(0,0,0,.5);
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 8.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -17.25rem;
  `};
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

const TelegramIcon = styled(Telegram)`
  width: 14px;
  height: 14px;
  margin-right: 8px;
  vertical-align: middle;
  path {
    // stroke: ${({ theme }) => theme.text1};
    stroke:${({ theme }) => theme.text2};
  }
  :hover path{
    stroke:${({ theme }) => theme.text1};
  }
`
const TwitterIcon = styled(Twitter)`
  width: 14px;
  height: 14px;
  margin-right: 8px;
  vertical-align: middle;
  path {
    // stroke: ${({ theme }) => theme.text1};
    stroke:${({ theme }) => theme.text2};
  }
  :hover path{
    stroke:${({ theme }) => theme.text1};
  }
`
const WeiboIcon = styled(Weibo)`
  width: 14px;
  height: 14px;
  margin-right: 8px;
  vertical-align: middle;
  path {
    // stroke: ${({ theme }) => theme.text1};
    stroke:${({ theme }) => theme.text2};
  }
  :hover path{
    stroke:${({ theme }) => theme.text1};
  }
`
// const ZhihuIcon = styled(Zhihu)`
//   width: 14px;
//   height: 14px;
//   margin-right: 8px;
//   vertical-align: middle;
//   path {
//     // stroke: ${({ theme }) => theme.text1};
//     stroke:${({ theme }) => theme.text2};
//   }
//   :hover path{
//     stroke:${({ theme }) => theme.text1};
//   }
// `

// const CODE_LINK = 'https://github.com/Uniswap/uniswap-interface'

export default function Menu() {
  const { account } = useActiveWeb3React()

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)
  const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          {/*<MenuItem id="link" href="https://uniswap.org/">*/}
          {/*  <Info size={14} />*/}
          {/*  About*/}
          {/*</MenuItem>*/}
          {/*<MenuItem id="link" href="https://uniswap.org/docs/v2">*/}
          {/*  <BookOpen size={14} />*/}
          {/*  Docs*/}
          {/*</MenuItem>*/}
          {/*<MenuItem id="link" href={CODE_LINK}>*/}
          {/*  <Code size={14} />*/}
          {/*  Code*/}
          {/*</MenuItem>*/}
          {/*<MenuItem id="link" href="https://discord.gg/EwFs3Pp">*/}
          {/*  <MessageCircle size={14} />*/}
          {/*  Discord*/}
          {/*</MenuItem>*/}
          {/*<MenuItem id="link" href="https://uniswap.info/">*/}
          {/*  <PieChart size={14} />*/}
          {/*  Analytics*/}
          {/*</MenuItem>*/}
          <MenuItem id="link" href="https://t.me/ArkSwap_Official">
            <TelegramIcon />
            telegram
          </MenuItem>
          <MenuItem id="link" href="https://twitter.com/ArkSwap">
            <TwitterIcon />
            twitter
          </MenuItem>
          <MenuItem id="link" href="https://weibo.com/u/7545714429">
            <WeiboIcon />
            weibo
          </MenuItem>
          {/*<MenuItem id="link" href="https://www.zhihu.com/people/arkswap">*/}
          {/*  <ZhihuIcon />*/}
          {/*  知乎*/}
          {/*</MenuItem>*/}
          {account && (
            <ButtonPrimary onClick={openClaimModal} padding="8px 16px" width="100%" borderRadius="12px" mt="0.5rem">
              Claim ARK
            </ButtonPrimary>
          )}
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
