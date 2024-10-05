const Course = require('../models/Course');
const Payment = require('../models/Payment');

// this will be working soon

exports.createPaymentSession = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Payment.create({
      user: req.user.id,
      course: courseId,
      amount: course.price,
      status: 'pending',
      // paymentMethod: 'Razorpay',  // to be intregate
    });

  } catch (error) {
    next(error);
  }
};
