import React from 'react';
import { Select, Checkbox, Button } from '@vkontakte/vkui';
import { Filter } from '../types';

interface CustomSelectOptionInterface {
  value: string;
  label: string;
}

interface FilterFormProps {
  filters: Filter;
  onChange: (newFilters: Filter) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ filters, onChange }) => {
  const handleFilterChange = (name: string, value: string | boolean) => {
    onChange({ ...filters, [name]: value });
  };

  const privacyOptions: CustomSelectOptionInterface[] = [
    { value: 'Все', label: 'Все' },
    { value: 'Закрытая', label: 'Закрытая' },
    { value: 'Открытая', label: 'Открытая' },
  ];

  const colorOptions: CustomSelectOptionInterface[] = [
    { value: 'any', label: 'Любой' },
    { value: 'red', label: 'Красный' },
    { value: 'green', label: 'Зеленый' },
    { value: 'blue', label: 'Синий' },
    { value: 'purple', label: 'Фиолетовый' },
    { value: 'white', label: 'Белый' },
    { value: 'orange', label: 'Оранжевый' },
    { value: 'yellow', label: 'Желтый'}
  ];

  const handleButtonReset = () => {
    onChange({
      privacy: 'Все',
      color: 'any',
      friends: false,
    });
  }

  return (
    <div>
      <Select
        value={filters.privacy}
        onChange={(e) => handleFilterChange('privacy', e.target.value)}
        placeholder="Настройки приватности"
        options={privacyOptions}
      />
      <Select
        value={filters.color}
        onChange={(e) => handleFilterChange('color', e.target.value)}
        placeholder="Настройки цвета"
        options={colorOptions}
      />
      <Checkbox
        checked={filters.friends}
        onChange={(e) => handleFilterChange('friends', e.target.checked)}
      >
        Друзья
      </Checkbox>
      <Button onClick={handleButtonReset}>Сбросить</Button>
    </div>
  );
};

export default FilterForm;
