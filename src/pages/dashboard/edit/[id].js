//import { useRouter } from 'next/router';
import FormProduct from '@components/FormProduct';
//import { useState, useEffect } from 'react';
import endPoints from '@services/api';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export default function Edit({ product }) {
  //const router = useRouter();
  //const [product, setProduct] = useState({});

  // useEffect(() => {
  //   const { id } = router.query;
  //   if (!router.isReady) return;
  //   async function getProduct() {
  //     const response = await axios.get(endPoints.products.getProduct(id));
  //     setProduct(response.data);
  //   }
  //   getProduct();
  // }, [router?.isReady]);

  return <FormProduct product={product} />;
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    try {
      const { id } = context.query;
      const { data: product } = await axios.get(endPoints.products.getProduct(id));
      return {
        props: {
          session: session,
          product: product,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: '/dashboard/products',
          permanent: false,
        },
      };
    }
  }
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
};
