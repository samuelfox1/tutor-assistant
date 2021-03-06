import { func, string } from 'prop-types';
import React from 'react';
import { Form } from 'react-bulma-components';
import { useSelector } from 'react-redux';

const StudentSelector = ({ className, studentId, onChange }) => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);

  if (!selectedCourse) return '';

  return (
    <Form.Control className={className}>
      <Form.Label className='mb-0'>select a student</Form.Label>
      <Form.Select
        color='info'
        name='studentId'
        value={studentId}
        placeholder='student'
        onChange={onChange}
      >
        <option value=''>-</option>
        {
          Object
            .entries(allCourses[selectedCourse].students)
            .map(([key, { firstName, lastName }]) => (
              <option key={key} value={key}>
                {`${firstName} ${lastName}`}
              </option>
            ))
        }
      </Form.Select>
    </Form.Control>
  );
};

export default StudentSelector;

StudentSelector.propTypes = {
  studentId: string.isRequired,
  onChange: func.isRequired,
  className: string,
};

StudentSelector.defaultProps = {
  className: '',
};
