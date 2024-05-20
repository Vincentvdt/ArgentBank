import styled from "styled-components"
import { MainContainer, srOnly } from "../../App"
import FeatureCard from "../../components/FeatureCard"

import banner from "../../assets/bank-tree.jpeg"
import catIcon from "../../assets/icon-chat.png"
import moneyIcon from "../../assets/icon-money.png"
import securityIcon from "../../assets/icon-security.png"


const HeroBanner = styled.div`
    background-image: url(${banner});
    background-position: 0 -50px;
    background-size: cover;
    background-repeat: no-repeat;
    height: 300px;
    position: relative;


    @media (min-width: 920px) {
        height: 400px;
        background-position: 0 33%;
    }
`
const HeroContent = styled.section`
    position: relative;
    top: 2rem;
    width: 200px;
    background: white;
    padding: 2rem;
    text-align: left;
    margin: 0 auto;

    @media (min-width: 920px) {
        position: absolute;
        top: 50px;
        right: 50px;
        width: 300px;
        margin: 2rem;
    }
`


const HeroTitleSrOnly = styled.h2`
    ${srOnly}
`
const HeroSubtitle = styled.p`
    font-weight: bold;
    font-size: 1rem;
    margin: 0;

    @media (min-width: 920px) {
        font-size: 1.5rem;
    }
`
const HeroText = styled.p`
    margin-bottom: 0;
    font-size: 0.9rem;

    @media (min-width: 920px) {
        font-size: 1.2rem;
    }
`

const FeaturesSection = styled.section`
    display: flex;
    flex-direction: column;

    @media (min-width: 920px) {
        flex-direction: row;
    }
`
const FeatureTitle = styled.h2`${srOnly}`


const Home = () => {
  return (
    <MainContainer>
      <HeroBanner>
        <HeroContent>
          <HeroTitleSrOnly>Promoted Content</HeroTitleSrOnly>
          <HeroSubtitle>No fees.</HeroSubtitle>
          <HeroSubtitle>No minimum deposit.</HeroSubtitle>
          <HeroSubtitle>High interest rates.</HeroSubtitle>
          <HeroText>Open a savings account with Argent Bank today!</HeroText>
        </HeroContent>
      </HeroBanner>
      <FeaturesSection>
        <FeatureTitle>Features</FeatureTitle>
        <FeatureCard image={catIcon}
                     title="You are our #1 priority"
                     description="Need to talk to a representative? You can get in touch through our
                24/7 chat or through a phone call in less than 5 minutes." />
        <FeatureCard image={moneyIcon}
                     title="More savings means higher rates"
                     description="The more you save with us, the higher your interest rate will be!" />
        <FeatureCard image={securityIcon}
                     title="Security you can trust"
                     description="We use top of the line encryption to make sure your data and money
                is always safe." />
      </FeaturesSection>
    </MainContainer>
  )
}

export default Home