import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro'; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from 'components/misc/Headings.js';
import { PrimaryButton as PrimaryButtonBase } from 'components/misc/Buttons.js';
import StatsIllustrationSrc from 'images/ourstory.jpg'; // Replace with a techy image
import { ReactComponent as SvgDotPattern } from 'images/dot-pattern.svg'; // Can replace this with a circuit pattern SVG

// Styled Components with tech-themed design adjustments
const Container = tw.div`relative bg-gray-900 text-gray-200`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded-lg bg-cover bg-no-repeat bg-center h-full shadow-lg`,
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(
  SubheadingBase
)`text-center md:text-left text-blue-500 font-semibold`;
const Heading = styled(SectionHeading)`
  ${tw`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`}
  span {
    ${tw`text-blue-400`}
  }
`;

const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-400`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-6`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4`;
const Value = tw.div`font-extrabold text-lg sm:text-xl lg:text-2xl text-blue-400 tracking-wide`;
const Key = tw.div`font-medium text-gray-400 uppercase`;

const PrimaryButton = styled(PrimaryButtonBase)`
  ${tw`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`}
  ${tw`bg-blue-500 hover:bg-blue-600 text-gray-900`}
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 153, 255, 0.6);
  }
`;

const DecoratorBlob = styled(SvgDotPattern)((props) => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-blue-500 -z-10`,
]);

export default ({
  subheading = 'Our Performance',
  heading = (
    <>
      We've been doing this <wbr /> since <span>2020.</span>
    </>
  ),
  description = 'Serving our clients with high-quality tech products and support since 2020. From assembling PCs to technical assistance, we’re always here to deliver the best.',
  primaryButtonText = 'Discover More',
  primaryButtonUrl = 'https://timerse.com',
  imageSrc = StatsIllustrationSrc,
  imageCss = null,
  imageContainerCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  imageInsideDiv = true,
  statistics = null,
  textOnLeft = false,
}) => {
  const defaultStatistics = [
    {
      key: 'Happy Clients',
      value: '500+',
    },
    {
      key: 'Completed Projects',
      value: '1200+',
    },
    {
      key: 'Awards Won',
      value: '15+',
    },
  ];

  if (!statistics) statistics = defaultStatistics;

  return (
    <Container>
      <TwoColumn css={!imageInsideDiv && tw`md:items-center`}>
        <ImageColumn css={imageContainerCss}>
          {imageInsideDiv ? (
            <Image imageSrc={imageSrc} css={imageCss} />
          ) : (
            <img src={imageSrc} css={imageCss} alt="" />
          )}
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <Statistics>
              {statistics.map((statistic, index) => (
                <Statistic key={index}>
                  <Value>{statistic.value}</Value>
                  <Key>{statistic.key}</Key>
                </Statistic>
              ))}
            </Statistics>
            <PrimaryButton as="a" href={primaryButtonUrl}>
              {primaryButtonText}
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
