/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import { Form, Columns, Icon } from 'react-bulma-components';
import {
  string, number, oneOfType, bool, array,
} from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateModel } from '../../../utils';
import ListItem from '../../Forms/ListItem';
import { UPDATE_MEETING_DETAIL } from '../../../store/courses/actions';

const MeetingListItemDetail = ({
  _id, property, value, type,
}) => {
  const { allCourses, selectedCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const [allowedToEdit, setAllowedToEdit] = useState(true);
  const [itemToEdit, setItemToEdit] = useState('');
  const [input, setInput] = useState(`${value}`);
  const [displayedEditIcon, setDisplayedEditIcon] = useState('');
  const [displayPropertyName, setDisplayProperyName] = useState(property);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let model = 'meeting';
    let body = { _id, [property]: input };

    //  if modification is time related, adjust for time route
    const timeProperties = ['startTime', 'duration'];
    if (timeProperties.includes(property)) {
      const { startTime, duration } = allCourses[selectedCourse].meetings[_id];
      model = `meeting/time/${_id}`;
      body = {
        startTime: property === 'startTime' ? input : startTime,
        duration: property === 'duration' ? input : duration,
      };
    }

    try {
      const response = await updateModel({ model, body });

      const meeting = { ...response, type };
      dispatch({
        type: UPDATE_MEETING_DETAIL,
        payload: meeting,
      });

      setItemToEdit('');
    } catch (error) {
      setInput(value);
    }
  };

  useEffect(() => {
    if (property === 'startTime') setDisplayProperyName(property.substring(0, 5));
    if (property === 'endTime') setDisplayProperyName(property.substring(0, 3));

    if (!property || !itemToEdit) return;
    const element = document.querySelector(`input[name=${property}]`)
      || document.querySelector(`textarea[name=${property}]`);

    element.focus();
  }, [itemToEdit, property]);

  useEffect(() => {
    const doNotEditType = ['calendly'];
    const doNotEditProperty = ['endTime'];
    if (doNotEditType.includes(type)) setAllowedToEdit(false);
    if (doNotEditProperty.includes(property)) setAllowedToEdit(false);
  }, [type, property]);

  useEffect(() => {
    const toggleEdit = () => setItemToEdit(itemToEdit !== property ? property : '');

    if (!allowedToEdit) return setDisplayedEditIcon((
      <Icon className='mx-1 mt-5'>
        <i className='fas fa-pen icon-small has-text-grey-lighter' />
      </Icon>));
    return setDisplayedEditIcon((
      <Icon className='mx-1 mt-5' onClick={toggleEdit}>
        <i className={`icon-small has-text-primary
            ${itemToEdit === property
        ? 'far fa-times-circle'
        : 'fas fa-pen'}`}
        />
      </Icon>));
  }, [allowedToEdit, itemToEdit, property]);

  return (
    <li className='pl-3 overflow-auto'>
      <form name='MeetingItemForm' onSubmit={handleSubmit}>
        <Form.Field kind='addons' className=''>
          <Form.Control fullwidth className='border-bottom-light'>
            <Form.Label
              className='mb-0 mt-3 has-text-primary'
              size='small'
            >
              {displayPropertyName}
            </Form.Label>

            <ListItem
              value={value}
              property={property}
              input={input}
              setInput={setInput}
              itemToEdit={itemToEdit}
              handleSubmit={handleSubmit}
              allowedToEdit={allowedToEdit}
            />
          </Form.Control>

          <Form.Control>
            {displayedEditIcon}
          </Form.Control>

        </Form.Field>
      </form>
    </li>
  );
};
export default MeetingListItemDetail;

MeetingListItemDetail.propTypes = {
  _id: string.isRequired,
  property: string.isRequired,
  type: string.isRequired,
  value: oneOfType([number, string, bool, array]).isRequired,
};
