import React from 'react';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro';
import Header from 'components/headers/light.js';
import Footer from 'components/footers/FiveColumnWithInputForm.js';
import MainFeature1 from 'components/features/TwoColWithButton.js';
import Features from 'components/features/ThreeColSimple.js';
import TeamCardGrid from 'components/cards/ProfileThreeColGrid.js';

import SupportIconImage from 'images/support-icon.svg';
import ShieldIconImage from 'images/shield-icon.svg';
import CustomerLoveIconImage from 'images/simple-icon.svg';

// Update styled components to use light theme colors
const Container = tw.div`relative`;
const ContentWrapper = tw.div`max-w-screen-xl bg-gray-900 mx-auto py-20 lg:py-24`;
const Subheading = tw.span`uppercase tracking-wider text-sm text-primary-500`;
const Heading = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center`;
const Description = tw.p`mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 max-w-screen-md mx-auto`;

const Card = styled.div`
  ${tw`flex flex-col items-center text-center h-full mx-4 px-4 py-8 rounded transition-transform duration-300 hover:scale-105`}
`;

const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 focus:shadow-outline focus:outline-none transition duration-300`;

export default () => {
  return (
    <AnimationRevealPage>
      <Container>
        <Header />
        <ContentWrapper>
          {/* <MainFeature1
            subheading={<Subheading>About Treact</Subheading>}
            heading="We are a modern design agency."
            buttonRounded={false}
            primaryButtonText="See Portfolio"
            primaryButtonStyle={PrimaryButton}
            imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
          />

          <MainFeature1
            subheading={<Subheading>Our Vision</Subheading>}
            heading="We aim to disrupt the design space."
            buttonRounded={false}
            primaryButtonText="Contact Us"
            primaryButtonStyle={PrimaryButton}
            imageSrc="https://images.unsplash.com/3/doctype-hi-res.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=768&q=80"
            textOnLeft={false}
          />

          <Features
            subheading={<Subheading>Our Values</Subheading>}
            heading="We follow these."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            cards={[
              {
                imageSrc: SupportIconImage,
                title: '24/7 Support',
                description:
                  'Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport',
                cardStyle: Card,
              },
              {
                imageSrc: ShieldIconImage,
                title: 'Strong Teams',
                description:
                  'Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport',
                cardStyle: Card,
              },
              {
                imageSrc: CustomerLoveIconImage,
                title: 'Customer Satisfaction',
                description:
                  'Lorem ipsum donor amet siti ceali placeholder text alipiscing elit sed do eiusmod temport',
                cardStyle: Card,
              },
            ]}
            linkText=""
          /> */}

          <TeamCardGrid
            subheading={<Subheading>Our Team</Subheading>}
            cardStyle={Card}
          />
        </ContentWrapper>
        <Footer />
      </Container>
    </AnimationRevealPage>
  );
};
