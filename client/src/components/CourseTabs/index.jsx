import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Tabs } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SELECTED_COURSE } from '../../store/courses/actions';
import { ADD_COURSE_MODAL, SET_OPEN_MODAL } from '../../store/view/actions';
import './style.css';

const { Tab } = Tabs;

const CourseTabs = ({ className }) => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [courseTabs, setCourseTabs] = useState(null);

  useEffect(() => {
    if (!allCourses) return;

    const setSelectedCourse = ({ _id }) => {
      dispatch({
        payload: { _id },
        type: SET_SELECTED_COURSE,
      });
    };

    const arr = Object.entries(allCourses).map(([key, { name, _id }], idx) => {
      if (!selectedCourse && idx === 0) setSelectedCourse({ _id });

      return (
        <Tab
          key={key}
          id={key}
          className='rounded'
          active={selectedCourse === _id}
          onClick={() => setSelectedCourse({ _id })}
        >
          <strong className={selectedCourse !== _id ? 'has-text-grey-lighter' : ''}>
            {name}
          </strong>
        </Tab>
      );
    });

    setCourseTabs(arr);
  }, [allCourses, selectedCourse, dispatch]);

  return (
    <Tabs
      align='left'
      type='boxed'
      id='course-tabs'
      className={className}
    >
      {courseTabs}
      <Tab onClick={() => dispatch({ type: SET_OPEN_MODAL, payload: ADD_COURSE_MODAL })}>
        <strong className='has-text-grey-lighter'>Add Course</strong>
      </Tab>
    </Tabs>
  );
};
export default CourseTabs;

CourseTabs.propTypes = {
  className: string,
};

CourseTabs.defaultProps = {
  className: '',
};
