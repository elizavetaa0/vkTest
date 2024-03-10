import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupList from './components/GroupList';
import FilterForm from './components/FilterForm';
import '@vkontakte/vkui/dist/vkui.css';
import { Filter, Group } from './types';
import { mockGroups } from './components/mockgroups';

const App: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filters, setFilters] = useState<Filter>({
    privacy: 'Все',
    color: 'Любой',
    friends: false,
  });
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);

  const [originalGroups, setOriginalGroups] = useState<Group[]>([]);

  useEffect(() => {
    setGroups(mockGroups);
    setOriginalGroups(mockGroups);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, originalGroups]);

  const applyFilters = () => {
    let updatedGroups = [...originalGroups];

    if (filters.privacy !== 'Все') {
      updatedGroups = updatedGroups.filter((group) =>
        filters.privacy === 'Закрытая' ? group.closed : !group.closed
      );
    }

    if (filters.color !== 'Любой') {
      updatedGroups = updatedGroups.filter(
        (group) => group.avatar_color === filters.color
      );
    }

    if (filters.friends) {
      updatedGroups = updatedGroups.filter((group) => group.friends !== undefined);
    }

    setFilteredGroups(updatedGroups);
  };

  const handleFilterChange = (newFilters: Filter) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="app">
      <h1>Список сообществ</h1>
      <FilterForm filters={filters} onChange={handleFilterChange} />
      <GroupList groups={filteredGroups.length > 0 ? filteredGroups : groups} />
    </div>
  );
};

export default App;