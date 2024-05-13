import React, { useState, useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Typography,
  Box,
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface Company {
  name: string;
  type: string;
}

interface CompaniesTableProps {
  companies: Company[];
}

const CompaniesTable: React.FC<CompaniesTableProps> = ({ companies }) => {
  const allTypes = ['Страховая компания', 'Микрофинансовая организация', 'Брокерская компания', 'Банк'];
  const [selectedTypes, setSelectedTypes] = useState<string[]>(allTypes);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleFilterChange = (event: SelectChangeEvent<typeof selectedTypes>) => {
    const value = event.target.value;
    setSelectedTypes(typeof value === 'string' ? value.split(',') : value);
  };

  const cleanString = (str: string) => {
    return str.replace(/[^а-яА-Яa-zA-Z]/g, '').toLowerCase();
  };

  const filteredAndSortedCompanies = useMemo(() => {
    const filteredByType = companies.filter(company => selectedTypes.includes(company.type));
    const filteredByNameAndType = filteredByType.filter(company =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredByNameAndType.sort((a, b) => {
      const nameA = cleanString(a.name);
      const nameB = cleanString(b.name);
      if (nameA < nameB) return sortDirection === 'asc' ? -1 : 1;
      if (nameA > nameB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [companies, selectedTypes, searchTerm, sortDirection]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Box display="flex" justifyContent="flex-end" width="100%" mt={2} marginBottom="16px">
        <TextField
          label="Поиск по названию компании"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
      </Box>
      <FormControl variant="outlined" sx={{ minWidth: '240px', width: '700px', margin: '16px 0' }}>
        <InputLabel id="filter-label">Фильтр по отрасли</InputLabel>
        <Select
          labelId="filter-label"
          id="filter-select"
          multiple
          value={selectedTypes}
          onChange={handleFilterChange}
          input={<OutlinedInput label="Фильтр по отрасли" />}
          renderValue={(selected) => selected.join(', ')}
        >
          {allTypes.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={selectedTypes.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper} sx={{ width: '1550px', border: '1px solid black', overflowX: 'auto' }}>
        <Table sx={{ minWidth: '1550px', border: '1px solid black' }}>
          <TableHead sx={{ backgroundColor: '#f2f2f2' }}>
            <TableRow>
              <TableCell sx={{ border: '1px solid black', width: '50%' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Название компании
                  <button onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}>
                    {sortDirection === 'asc' ? '▲' : '▼'}
                  </button>
                </Typography>
              </TableCell>
              <TableCell sx={{ border: '1px solid black', width: '50%' }}>
                <Typography variant="subtitle1" fontWeight="bold">Отрасль</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedCompanies.map((company, index) => (
              <TableRow key={index}>
                <TableCell sx={{ border: '1px solid black' }}>{company.name}</TableCell>
                <TableCell sx={{ border: '1px solid black' }}>{company.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CompaniesTable;
