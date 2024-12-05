import React, { useEffect, useState } from 'react';
import Header from '../components/headers/light';
import Footer from '../components/footers/FiveColumnWithInputForm.js';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import tw from 'twin.macro';
import { useOrderContext } from '../context/order_context';
const Orders = () => {
  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;

  // Your code here
  // Panggil fungsi dan state dari order context
  const { orders, getOrdersByUserId } = useOrderContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrdersByUserId();
  }, []);

  return (
    <AnimationRevealPage>
      <Header className="mb-8" />

      <Container>
        <Content>{/* Your Code Here */}</Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Orders;
