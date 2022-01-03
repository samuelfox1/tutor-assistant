import {
  bool, func, number, oneOfType, string,
} from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Icon } from 'react-bulma-components';
import { TimeZoneSelector } from '.';
import { getLocalDateString, convertStrToBool } from '../../utils';
import { LevelSide } from '../BulmaHelpers';
import { GraduationDate, MeetingDateFull } from '../DateTime';
import './style.css';

const ListItem = ({
  property, value, type, input, setInput,
  itemToEdit, handleSubmit,
}) => {
  const [element, setElement] = useState('');

  const handleInputChange = ({ target }) => {
    let newValue = target.value;
    if (newValue === 'true' || newValue === 'false') newValue = convertStrToBool(newValue);
    setInput(newValue);
  };

  const inputHasBeenModified = () => `${value}`.trim() !== `${input}`.trim();

  const getFormInputType = (propertyName) => {
    switch (propertyName) {
    case 'timeZoneName':
      return (
        <TimeZoneSelector
          name={property}
          value={input}
          className='li-input mr-2 my-2'
          onChange={handleInputChange}
        />
      );

    default:
      return (
        <input
          type='input'
          name={property}
          value={input}
          className='li-input mr-2 my-2'
          onChange={handleInputChange}
        />
      );
    }
  };

  useEffect(() => {
    const formatBooleanSpan = (boolean) => <span className={`has-text-${boolean ? 'success' : 'danger'}`}>{`${boolean}`}</span>;
    let isMounted = true;
    switch (property) {
    case 'scheduleLink':
      return isMounted && setElement(
        <a
          href={value}
          className='break'
          target='_blank'
          rel='noreferrer'
        >
          {value}
        </a>,
      );

    case 'createdAt':
      return isMounted && setElement(<span>{getLocalDateString(value)}</span>);

    case 'endTime':
      return isMounted && setElement(<MeetingDateFull iso8601={value} />);

    case 'fullTimeCourse':
      return isMounted && setElement(formatBooleanSpan(value));

    case 'githubUsername':
      return isMounted && setElement(
        <a
          href={`https://github.com/${value}`}
          className='break'
          target='_blank'
          rel='noreferrer'
        >
          {`https://github.com/${value}`}
        </a>,
      );

    case 'graduationDate':
      return isMounted && setElement(<GraduationDate iso8601={value} />);

    case 'meetingLink':
      return isMounted && setElement(
        <a
          href={value}
          className='break'
          target='_blank'
          rel='noreferrer'
        >
          {value}
        </a>,
      );

    case 'reassignment':
      return isMounted && setElement(formatBooleanSpan(value));

    case 'recurringMeeting':
      return isMounted && setElement(formatBooleanSpan(value));

    case 'startTime':
      return isMounted && setElement(<MeetingDateFull iso8601={value} />);

    default:
      if (isMounted) return setElement(<span>{`${value}`}</span>);
    }
    return () => { isMounted = false; };
  }, [property, value]);

  return (
    <LevelSide>
      {
        itemToEdit === property
        && type !== 'calenly'
          ? (
            <>
              {getFormInputType(property)}
              {inputHasBeenModified()
                && (
                  <Icon className='save-icon mr-1' onClick={handleSubmit}>
                    <i className='far fa-save hover has-text-success' />
                  </Icon>
                )}
            </>
          )
          : <span>{element}</span>
      }
    </LevelSide>

  );
};
export default ListItem;

ListItem.propTypes = {
  input: string.isRequired,
  setInput: func.isRequired,
  property: string.isRequired,
  type: string,
  value: oneOfType([string, number, bool]).isRequired,
  itemToEdit: string.isRequired,
  handleSubmit: func.isRequired,
};

ListItem.defaultProps = {
  type: '',
};
