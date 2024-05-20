import styled from "styled-components"

const Container = styled.article`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    background-color: #fff;
    width: 80%;
    flex-direction: column;
    padding: 1.5rem;
    box-sizing: border-box;
    text-align: left;
    margin: 0 auto 2rem;
    border-radius: 5px;

    @media (min-width: 720px) {
        flex-direction: row;
    }
`

const Wrapper = styled.div<{ $cta?: boolean }>`
    width: 100%;
    flex: 1;
    flex: ${props => props.$cta && 0}
`

const Title = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: normal;
`
const Amount = styled.p`
    margin: 0;
    font-size: 2.5rem;
    font-weight: bold;
`

const Description = styled.p`
    margin: 0;
`

const Button = styled.button`
    border-color: #00bc77;
    background-color: #00bc77;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    cursor: pointer;
    font-size: 1.1rem;
    line-height: normal;

    @media (min-width: 720px) {
        width: 200px;
    }
`

const formatPrice = (price: number) => {

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  })

  // Format the number and return as string
  return formatter.format(price)
}

interface AccountDetailProps {
  title: string,
  amount: number,
  description: string
}

const AccountDetail = ({ title, amount, description }: AccountDetailProps) => {
  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <Amount>{formatPrice(amount)}</Amount>
        <Description>{description}</Description>
      </Wrapper>
      <Wrapper $cta={true}>
        <Button>View transactions</Button>
      </Wrapper>
    </Container>
  )
}

export default AccountDetail