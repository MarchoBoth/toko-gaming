import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/headers/light';
import Footer from '../components/footers/FiveColumnWithInputForm.js';
import AnimationRevealPage from 'helpers/AnimationRevealPage.js';
import tw from 'twin.macro';
import { useOrderContext } from '../context/order_context';

const Orders = () => {
  const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-4 py-8 lg:py-12`;
  const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;

  const { id } = useParams();
  const { orders, getOrdersByUserId } = useOrderContext();

  useEffect(() => {
    getOrdersByUserId();
  }, []);

  return (
    <AnimationRevealPage>
      <Header />

      <Container>
        <Content>
          <h1 className="text-3xl font-semibold text-center mb-6">
            Your Orders
          </h1>

          {Array.isArray(orders) && orders.length > 0 ? (
            <div className="space-y-8">
              {orders.map(
                (order) =>
                  order && (
                    <div
                      key={order?.id || Math.random()}
                      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out"
                    >
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Order ID: {order?.id}
                      </h2>
                      <p className="text-gray-600">
                        Status:{' '}
                        <span
                          className={`font-semibold ${
                            order?.status === 'PENDING'
                              ? 'text-yellow-500'
                              : 'text-green-500'
                          }`}
                        >
                          {order?.status}
                        </span>
                      </p>
                      <p className="text-gray-600">Address: {order?.address}</p>
                      <p className="text-gray-600">City: {order?.city}</p>
                      <p className="text-gray-600">
                        Postal Code: {order?.postalCode}
                      </p>
                      <p className="text-gray-600">Country: {order?.country}</p>
                      <p className="text-gray-500 text-sm">
                        Order Created At:{' '}
                        {new Date(order?.createdAt || '').toLocaleString()}
                      </p>

                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          Items:
                        </h3>
                        {Array.isArray(order?.items) &&
                        order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-4 mb-4"
                            >
                              <img
                                src={`https://pkdlvjkjcznmtmivzkqc.supabase.co/storage/v1/object/public/images/${item.product?.images?.[0]}`}
                                alt={item.product?.name || 'Product Image'}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div>
                                <p className="font-semibold">
                                  {item.product?.name || 'N/A'}
                                </p>
                                <p>Quantity: {item.quantity || 0}</p>
                                <p>
                                  Price: Rp{' '}
                                  {item.product?.price?.toLocaleString(
                                    'id-ID'
                                  ) || 'N/A'}
                                </p>
                                <div className="flex items-center gap-2">
                                  <span>Color: </span>
                                  <div
                                    className="relative w-6 h-6 rounded-full border-2 border-gray-300"
                                    style={{
                                      backgroundColor:
                                        item.color?.color || '#fff',
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No items found for this order.</p>
                        )}
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            <p>No orders available.</p>
          )}
        </Content>
      </Container>

      <Footer background="bg-white" />
    </AnimationRevealPage>
  );
};

export default Orders;
