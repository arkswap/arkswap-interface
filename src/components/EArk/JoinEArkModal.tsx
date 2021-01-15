import React, { useState } from 'react'
import Modal from '../Modal'
import { AutoColumn, ColumnCenter } from '../Column'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { RowBetween } from '../Row'
import { TYPE, ExternalLink, CloseIcon, CustomLightSpinner, UniTokenAnimated } from '../../theme'
import { ButtonPrimary, ButtonSecondary } from '../Button'
import tokenLogo from '../../assets/images/token-logo.png'
import Circle from '../../assets/images/blue-loader.svg'
import { Text } from 'rebass'
import AddressInputPanel from '../AddressInputPanel'
import useENS from '../../hooks/useENS'
import { useActiveWeb3React } from '../../hooks'
import Confetti from '../Confetti'
import { useIsTransactionPending } from '../../state/transactions/hooks'
import { getEtherscanLink, shortenAddress } from '../../utils'
import { Link } from 'react-router-dom'
import { useNArk } from '../../hooks/useNArk'
import { ARKSWAP_ADDRESS } from '../../constants'
import { useUniContract } from '../../hooks/useContract'
import { useJoinCallback } from '../../hooks/joinArk'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ConfirmOrLoadingWrapper = styled.div<{ activeBG: boolean }>`
  width: 100%;
  padding: 24px;
  position: relative;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 60px 0;
`

const ResponsiveButtonSecondary = styled(ButtonSecondary)`
  border-radius: 100px;
  padding: 16px;
  width: 180px;
`

export default function JoinEArkModal({
  isOpen,
  address,
  onDismiss
}: {
  isOpen: boolean
  address: string
  onDismiss: () => void
}) {
  const { chainId, account } = useActiveWeb3React()

  // state for smart contract input
  const [typed, setTyped] = useState(address)

  function handleRecipientType(val: string) {
    setTyped(val)
  }

  // monitor for third party recipient of claim
  const { address: parsedAddress } = useENS(typed)
  const { t } = useTranslation()
  const ark = useNArk()

  // used for UI loading states
  const [attempting, setAttempting] = useState<boolean>(false)

  // monitor the status of the claim from contracts and txns
  const { joinCallback } = useJoinCallback(typed)

  const [hash, setHash] = useState<string | undefined>()

  // monitor the status of the claim from contracts and txns
  const claimPending = useIsTransactionPending(hash ?? '')
  const claimConfirmed = hash && !claimPending
  const cirContract = useUniContract()

  // use the hash to monitor this txn

  function onJoin() {
    if (!cirContract) return
    setAttempting(true)
    cirContract.approve(ARKSWAP_ADDRESS, '2000000000000000000').then(() => {
      setAttempting(true)
      joinCallback()
        .then(hash => {
          setHash(hash)
        })
        // reset modal and log error
        .catch(error => {
          setAttempting(false)
          console.log(error)
        })
    })
  }

  function wrappedOnDismiss() {
    setAttempting(false)
    setHash(undefined)
    setTyped('')
    onDismiss()
  }

  return (
    <Modal isOpen={isOpen} onDismiss={wrappedOnDismiss} maxHeight={90}>
      <Confetti start={Boolean(isOpen && claimConfirmed && attempting)} />
      {!attempting && (
        <ContentWrapper gap="lg">
          <TYPE.subHeader fontSize={19} style={{ marginTop: 30 }} textAlign="center" fontWeight={600}>
            {t('joinEArk')}
          </TYPE.subHeader>
          <AutoColumn gap="md" style={{ padding: '1rem', paddingTop: '0' }} justify="flex-start">
            <TYPE.main color={'#30D683'} fontWeight={500}>
              {t('theAddress')}
            </TYPE.main>
            <AddressInputPanel value={typed} onChange={handleRecipientType} />
            {parsedAddress && !ark && <TYPE.error error={true}>YInvalid inviter address</TYPE.error>}
            {/*{((parsedAddress ) || typed === account) && (*/}
            {/*  <TYPE.error error={true}>Invalid inviter address</TYPE.error>*/}
            {/*)}*/}
            <RowBetween>
              <ResponsiveButtonSecondary as={Link} padding="8px 16px" to="/create/ETH">
                {t('cancel')}
              </ResponsiveButtonSecondary>
              <ButtonPrimary
                disabled={typed === account || !ark}
                padding="16px 16px"
                width="180px"
                borderRadius="100px"
                onClick={onJoin}
              >
                {t('confirm')}
              </ButtonPrimary>
            </RowBetween>
          </AutoColumn>
        </ContentWrapper>
      )}
      {(attempting || claimConfirmed) && (
        <ConfirmOrLoadingWrapper activeBG={true}>
          <RowBetween>
            <div />
            <CloseIcon onClick={wrappedOnDismiss} style={{ zIndex: 99 }} stroke="black" />
          </RowBetween>
          <ConfirmedIcon>
            {!claimConfirmed ? (
              <CustomLightSpinner src={Circle} alt="loader" size={'90px'} />
            ) : (
              <UniTokenAnimated width="72px" src={tokenLogo} />
            )}
          </ConfirmedIcon>
          <AutoColumn gap="100px" justify={'center'}>
            <AutoColumn gap="12px" justify={'center'}>
              <TYPE.largeHeader fontWeight={600} color="black">
                {claimConfirmed ? t('createdSuccessfully') : t('creating')}
              </TYPE.largeHeader>
              {!claimConfirmed && (
                <Text fontSize={36} color={'#30D683'} fontWeight={800}>
                  {shortenAddress(typed)}
                </Text>
              )}
              {parsedAddress && (
                <TYPE.largeHeader fontWeight={600} color="black">
                  for {shortenAddress(parsedAddress)}
                </TYPE.largeHeader>
              )}
            </AutoColumn>
            {claimConfirmed && (
              <>
                <TYPE.subHeader fontWeight={500} color="black">
                  <span role="img" aria-label="party-hat">
                    🎉{' '}
                  </span>
                  Congratulations!
                  <span role="img" aria-label="party-hat">
                    🎉
                  </span>
                </TYPE.subHeader>
              </>
            )}
            {attempting && !hash && (
              <TYPE.subHeader color="black">Confirm this transaction in your wallet</TYPE.subHeader>
            )}
            {attempting && hash && !claimConfirmed && chainId && hash && (
              <ExternalLink href={getEtherscanLink(chainId, hash, 'transaction')} style={{ zIndex: 99 }}>
                View transaction on Etherscan
              </ExternalLink>
            )}
          </AutoColumn>
        </ConfirmOrLoadingWrapper>
      )}
    </Modal>
  )
}
