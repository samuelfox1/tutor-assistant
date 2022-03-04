import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { DashboardContext, STUDENTS_SECTION } from '../../../views/Dashboard/DashboardProvider';

export const StudentsContext = createContext({});

// eslint-disable-next-line react/prop-types
const StudentsProvider = ({ children }) => {
  const { activeComponent } = useContext(DashboardContext);
  const [filterOptions, setFilterOptions] = useState(['first name', 'last name', 'graduation date']);
  const [filterBy, setFilterBy] = useState(filterOptions[0]);

  const value = useMemo(() => (
    {
      filterBy,
      setFilterBy,
      filterOptions,
      setFilterOptions,
      sectionName: 'Students',
      isActive: activeComponent === STUDENTS_SECTION,
    }
  ), [activeComponent, filterBy, filterOptions]);

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
