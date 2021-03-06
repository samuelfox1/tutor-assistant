const router = require('express').Router();
const tutorRoutes = require('./tutor');
const sendGridRoutes = require('./sendGrid');
const studentRoutes = require('./student');
const meetingRoutes = require('./meeting');
const emailTemplateRoutes = require('./emailTemplate');
const courseRoutes = require('./course');
const calendlyRoutes = require('./calendly');

router.use('/calendly', calendlyRoutes);
router.use('/course', courseRoutes);
router.use('/email-template', emailTemplateRoutes);
router.use('/meeting', meetingRoutes);
router.use('/sendgrid', sendGridRoutes);
router.use('/student', studentRoutes);
router.use('/tutor', tutorRoutes);

module.exports = router;
