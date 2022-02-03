import { func } from 'prop-types';
import React from 'react';
import {
  Box, Button, Icon, Level,
} from 'react-bulma-components';
import { LevelSide } from '../../BulmaHelpers';
import DropDownIcon from '../../DropDownIcon';

const SectionContainer = ({
  // eslint-disable-next-line react/prop-types
  children, heading, addListItemClick, active, handleToggle,
}) => (
  <Box className={`has-background-white py-1 px-3 mb-3 ${active ? 'border-primary' : ''}`}>
    <Level renderAs='div' className='is-mobile my-2'>
      <LevelSide>
        {heading}
      </LevelSide>
      <LevelSide>
        <Button
          color='primary mr-5'
          className='tag'
          onClick={addListItemClick}
        >
          <Icon>
            <i className='fas fa-plus' />
          </Icon>
        </Button>
        <DropDownIcon
          onClick={handleToggle}
          active={active}
        />
      </LevelSide>
    </Level>

    {children}

  </Box>

);
export default SectionContainer;

SectionContainer.propTypes = {
  addListItemClick: func.isRequired,
};