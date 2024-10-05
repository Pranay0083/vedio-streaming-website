const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Course = require('../models/Course');

class PaymentService {
    async createCheckoutSession(userId, courseId) {
        try {
            const course = await Course.findById(courseId);
            if (!course) {
                throw new Error('Course not found');
            }
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                customer_email: userId.email,
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: course.title,
                            },
                            unit_amount: course.price * 100, // Stripe expects amount in cents
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/courses/${courseId}?success=true`,
                cancel_url: `${process.env.FRONTEND_URL}/courses/${courseId}?canceled=true`,
                metadata: {
                    courseId: courseId,
                    userId: userId._id.toString(),
                },
            });
            await Payment.create({
                user: userId._id,
                course: courseId,
                amount: course.price,
                status: 'pending',
                paymentMethod: 'stripe',
                transactionId: session.id,
            });
            return session;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
    }
    async handleWebhook(event) {
        try {
            switch (event.type) {
                case 'checkout.session.completed':
                    const session = event.data.object;
                    await this.fulfillOrder(session);
                    break;
            }
        } catch (error) {
            console.error('Error handling webhook:', error);
            throw error;
        }
    }
    async fulfillOrder(session) {
        // Update the payment record
        const payment = await Payment.findOneAndUpdate(
            { transactionId: session.id },
            {
                status: 'completed',
                paymentMethod: session.payment_method_types[0],
            },
            { new: true }
        );

        if (!payment) {
            throw new Error('Payment not found');
        }

        // Enroll the user in the course
        // This might involve creating an Enrollment record or updating the User's courses
        // Implement according to your enrollment logic
    }

    async getPaymentHistory(userId) {
        return Payment.find({ user: userId }).populate('course');
    }
}

module.exports = new PaymentService();