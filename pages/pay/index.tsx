import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import styles from './pay.module.css';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Pay = () => {
  const router = useRouter();
  const { success, canceled } = router.query;

  React.useEffect(() => {
    if (success !== undefined || canceled !== undefined) {
      if (success) {
        console.log('Order placed! You will receive an email confirmation.');
      }

      if (canceled) {
        console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
      }
    }
  }, [success, canceled]);

  return (
    <form action="/api/checkout_sessions" method="POST" className={styles.form}>
      <section className={styles.section}>
        <button type="submit" role="link" className={styles.button}>
          Checkout
        </button>
      </section>
    </form>
  );
};

export default Pay;
