const axios = require('axios');
const { Course } = require('../models');
const { getISOCurrentDateStamp } = require('./dateTime');
const { getCalendlyToken, decryptToken } = require('./encryption');
const { formatName } = require('./format');

const getCalendlyHeaders = (token) => ({
  authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const getCalendlyMeetings = async ({
  uri,
  courseId,
  accountKey,
  minStartTime = getISOCurrentDateStamp(),
}) => {
  //  get & decrypt accountKey (users password)
  const password = decryptToken(accountKey, process.env.JWT_SECRET);
  // use account key to get & decrypt calendly token
  const decryptedToken = await getCalendlyToken({ courseId, password });

  const { data: { collection } } = await axios.get(
    'https://api.calendly.com/scheduled_events',
    {
      headers: getCalendlyHeaders(decryptedToken),
      params: {
        user: uri,
        // count: 10,
        min_start_time: minStartTime,
      },
    },
  );

  // object we'll use to link email's to existing students on the roster { email:_id, email:_id }
  const studentEmailIdObject = await Course
    .findById(courseId)
    .populate('students')
    .then((data) => {
      const emailIdObject = {};
      data.students
        .forEach(({ _id, email }) => {
          emailIdObject[email] = _id;
        });
      return emailIdObject;
    });

  // console.log(studentEmailIdObject);

  const stillActive = collection.filter(({ status }) => status !== 'canceled');

  const populatedMeetings = await Promise
    .all(stillActive
      .map(async (event) => {
        const { data: { collection: array } } = await axios
          .get(`${event.uri}/invitees`, { headers: getCalendlyHeaders(decryptedToken) });
        const student = array[0];

        return {
          _id: event.uri,
          eventName: event.name,
          startTime: event.start_time,
          endTime: event.end_time,
          status: event.status,
          cancelUrl: student.cancel_url,
          email: student.email,
          firstName: formatName(student.name.split(' ')[0]) || '(first)',
          lastName: formatName(student.name.split(' ')[1]) || '(last)',
          questionsAndAnswers: student.questions_and_answers,
          rescheduleUrl: student.reschedule_url,
          rescheduled: student.rescheduled,
          recurringMeeting: false,
          studentId: studentEmailIdObject[student.email] || null,
          timeZoneName: student.timezone,
          updatedAt: student.updated_at,
          createdAt: event.created_at,
        };
      }));

  return populatedMeetings;
};

module.exports = {
  getCalendlyHeaders,
  getCalendlyMeetings,
};
