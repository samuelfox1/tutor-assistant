/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Icon } from 'react-bulma-components';
import { string, func } from 'prop-types';
import { LevelSide } from '../../../../BulmaHelpers';

const DefaultCourseLayout = ({
  courseName,
  courseId,
  courseToEdit,
  handleEditNameClick,
  setCourseToDelete,
}) => (
  <>
    <LevelSide align='left'>
      {courseName}
    </LevelSide>
    <LevelSide align='right'>
      <Button.Group>
        <Button
          size='small'
          color='primary'
          onClick={() => handleEditNameClick(courseName, courseId)}
        >
          edit name
        </Button>
        <Button
          className='tag px-1'
          size='small'
          color='danger'
          onClick={() => setCourseToDelete(courseId)}
        >
          delete
        </Button>
      </Button.Group>
    </LevelSide>
  </>
);
export default DefaultCourseLayout;

DefaultCourseLayout.propTypes = {
  courseName: string.isRequired,
  courseId: string.isRequired,
  courseToEdit: string.isRequired,
  setCourseToDelete: func.isRequired,
  handleEditNameClick: func.isRequired,
};
