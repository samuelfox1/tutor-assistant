import React, { useContext, useEffect, useState } from 'react';
import { Columns } from 'react-bulma-components';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CALENDLY_MEETINGS } from '../../store/calendly/actions';
import { ADD_MEETING_MODAL, SET_OPEN_MODAL } from '../../store/view/actions';
import { formatCalendlyMeetings, readModel } from '../../utils';
import { DashboardContext, MEETINGS_SECTION } from '../../views/Dashboard/DashboardProvider';
import SectionContainer from '../Section/Container';
import SectionHeading from '../Section/Heading';
import MeetingsList from './MeetingsList';
import MeetingsListFilter from './MeetingsListFilter';
import { MeetingsContext } from './MeetingsProvider';

const MeetingsSection = () => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const { toggleDisplayedSection } = useContext(DashboardContext);
  const {
    filterBy, setFilterBy,
    isActive, sectionName, filterOptions,
  } = useContext(MeetingsContext);
  const [calendlyCount, setCalendlyCount] = useState(0);

  const toggleSection = () => toggleDisplayedSection(MEETINGS_SECTION);
  const getMeetingCount = () => {
    let count = 0;
    if (allCourses && selectedCourse) count += allCourses[selectedCourse].meetingCount;
    if (calendlyCount) count += calendlyCount;
    return count > 0 ? count : '~';
  };

  useEffect(() => {
    let isMounted = true;
    if (!selectedCourse || !allCourses) return '';
    const getCalendlyMeetings = async () => {
      const { calendlyMeetings: meetings } = await readModel({ model: 'calendly/meetings', _id: selectedCourse });
      if (!isMounted) return;
      dispatch({
        type: SET_CALENDLY_MEETINGS,
        payload: formatCalendlyMeetings(meetings),
      });
      setCalendlyCount(meetings.length);
    };
    if (allCourses[selectedCourse].calendly.data) getCalendlyMeetings();

    return () => { isMounted = false; };
  }, [selectedCourse, allCourses, dispatch]);

  const heading = (
    <SectionHeading
      sectionName={sectionName}
      count={getMeetingCount()}
    />
  );

  return (
    <SectionContainer
      heading={heading}
      active={isActive}
      toggleDisplayedSection={toggleSection}
      sectionName={sectionName}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      filterOptions={filterOptions}
      addListItemClick={() => dispatch({ type: SET_OPEN_MODAL, payload: ADD_MEETING_MODAL })}
    >
      { isActive && (
        <>
          <Columns className='is-mobile ml-5 mt-2'>
            <p className='mr-3'>sort</p>
            <MeetingsListFilter />
          </Columns>

          <MeetingsList
            filterBy={filterBy}
          />
        </>
      )}
    </SectionContainer>
  );
};
export default MeetingsSection;
