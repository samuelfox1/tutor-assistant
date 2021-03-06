const { getISOFutureHour, getISOPastHour } = require('../utils/dateTime');

module.exports = [
  {
    firstName: 'Moe',
    lastName: 'B',
    email: 'moJito@email.com',
    githubUsername: 'samuelfox1',
    timeZoneName: 'America/Los_Angeles',
    meetingLink: 'https://zoom.us/j/96314583232?pwd=K1ZsMGpjWEk1MDdQUStKNFlSd3VDZz09',
    classId: 'DOG123',
    graduationDate: getISOFutureHour(1000),
    meetingsPerWeek: 1,
    fullTimeCourse: true,
    reassignment: false,
    notes: 'loves to learn',
    createdAt: getISOPastHour(24),
  },
  {
    firstName: 'Miley',
    lastName: 'K',
    email: 'mlee@email.com',
    githubUsername: 'mlee',
    timeZoneName: 'America/Chicago',
    meetingLink: 'https://zoom.us/j/96314583232?pwd=K1ZsMGpjWEk1MDdQUStKNFlSd3VDZz09',
    classId: 'ABC123',
    graduationDate: getISOFutureHour(500),
    meetingsPerWeek: 2,
    fullTimeCourse: true,
    reassignment: false,
    notes: 'just started school',
    createdAt: getISOPastHour(48),
  },
  {
    firstName: 'Rocky',
    lastName: 'Fox',
    email: 'kel@email.com',
    githubUsername: 'kel',
    timeZoneName: 'America/New_York',
    meetingLink: 'https://zoom.us/j/96314583232?pwd=K1ZsMGpjWEk1MDdQUStKNFlSd3VDZz09',
    classId: 'ABC123',
    graduationDate: getISOFutureHour(500),
    meetingsPerWeek: 2,
    fullTimeCourse: true,
    reassignment: false,
    notes: 'super wiz',
    createdAt: getISOPastHour(1),
  },
];
