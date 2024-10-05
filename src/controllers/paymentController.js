// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/Course');
const Payment = require('../models/Payment');

exports.createPaymentSession = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: 'usd',
    //         product_data: {
    //           name: course.title,
    //         },
    //         unit_amount: course.price * 100, // Stripe expects amount in cents
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: 'payment',
    //   success_url: `${process.env.FRONTEND_URL}/courses/${courseId}?success=true`,
    //   cancel_url: `${process.env.FRONTEND_URL}/courses/${courseId}?canceled=true`,
    // });

    await Payment.create({
      user: req.user.id,
      course: courseId,
      amount: course.price,
      status: 'pending',
      paymentMethod: 'stripe',
    //   transactionId: session.id,
    });

    // res.json({ id: session.id });
  } catch (error) {
    next(error);
  }
};
