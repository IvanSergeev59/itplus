
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  getGridSingleSelectOperators
} from '@mui/x-data-grid';
import SyncIcon from '@mui/icons-material/Sync';
const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl}  />
  </GridToolbarContainer>
);
const SUBMIT_FILTER_STROKE_TIME = 500;

const dat = [
  { field: 'name', headerName: 'Потребитель тепла', width: 200},
  { field: 'date', headerName: 'Date',   type: 'date', width: 200},
  { field: 'consumption', headerName: 'Потребление',  editable: true, type: 'number', width: 200},
  {
    field: 'weather',
    headerName: 'Температура окр.воздуха',
    
    editable: true,
    type: 'number',
    width: 200
  },
  {
    field: 'price',
    headerName: 'Цена на кирпич',
    editable: true,
    filter: false,
    type: 'number',
    width: 200
  },
];




function InputNumberInterval(props) {
  const { item, applyValue, focusElementRef = null } = props;

  const filterTimeout = React.useRef();
  const [filterValueState, setFilterValueState] = React.useState(item.value ?? '');
  const [applying, setIsApplying] = React.useState(false);

  React.useEffect(() => {
    return () => {
      clearTimeout(filterTimeout.current);
    };
  }, []);

  React.useEffect(() => {
    const itemValue = item.value ?? [undefined, undefined];
    setFilterValueState(itemValue);
  }, [item.value]);

  const updateFilterValue = (lowerBound, upperBound) => {
    clearTimeout(filterTimeout.current);
    setFilterValueState([lowerBound, upperBound]);

    setIsApplying(true);
    filterTimeout.current = setTimeout(() => {
      setIsApplying(false);
      applyValue({ ...item, value: [lowerBound, upperBound] });
    }, SUBMIT_FILTER_STROKE_TIME);
  };

  const handleUpperFilterChange = (event) => {
    const newUpperBound = event.target.value;
    updateFilterValue(filterValueState[0], newUpperBound);
  };
  const handleLowerFilterChange = (event) => {
    const newLowerBound = event.target.value;
    updateFilterValue(newLowerBound, filterValueState[1]);
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'end',
        height: 48,
        width: 300,
        pl: '30px',
      }}
    >
      <TextField
        name="lower-bound-input"
        placeholder="From"
        label="From"
        variant="standard"
        value={filterValueState[0]}
        onChange={handleLowerFilterChange}
        type="date"
        inputRef={focusElementRef}
        sx={{ mr: 2 }}
      />
      <TextField
        name="upper-bound-input"
        placeholder="To"
        label="To"
        variant="standard"
        value={filterValueState[1]}
        onChange={handleUpperFilterChange}
        type="date"
        InputProps={applying ? { endAdornment: <SyncIcon /> } : {}}
      />
    </Box>
  );
}

InputNumberInterval.propTypes = {
  applyValue: PropTypes.func.isRequired,
  // focusElementRef: PropTypes.oneOfType([
  //   PropTypes.func,
  //   PropTypes.shape({
  //     current: PropTypes.any.isRequired,
  //   }),
  // ]),
  item: PropTypes.shape({
    /**
     * The column from which we want to filter the rows.
     */
    columnField: PropTypes.any,
    /**
     * Must be unique.
     * Only useful when the model contains several items.
     */
    id: PropTypes.any,
    /**
     * The name of the operator we want to apply.
     */
    operatorValue: PropTypes.any,
    /**
     * The filtering value.
     * The operator filtering function will decide for each row if the row values is correct compared to this value.
     */
    value: PropTypes.any,
  }).isRequired,
};

const quantityOnlyOperators = [
  {
    
    label: 'Between',
    value: 'between',
    getApplyFilterFn: (filterItem) => {
      if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
        return null;
      }
      if (filterItem.value[0] == null || filterItem.value[1] == null) {
        return null;
      }

      return ({ value }) => {
        return (
          value !== null && 
          filterItem.value[0] <= value &&
          value <= filterItem.value[1]
        );
      };
    },
    InputComponent: InputNumberInterval,
  },
];

export default function Table(props) {
  const {data, names, changeData} = props;
  let newData = []
  data.map(item => item.map(it=> newData.push(it)))  
  const columns = React.useMemo(    
    () =>
    dat.map((col) => { 
      if (col.field !== 'name') {
        return col;
      }       
        return {
          ...col,
          filterOperators: getGridSingleSelectOperators(),
          valueOptions: names
        };
      }),
    [dat],
  );
  
  
 
  const [filterModel, setFilterModel] = React.useState({
    items: [
      {
        id: 1,
        columnField: 'date',
        operatorValue: 'between',
      }
    ],
  });

  if (columns.length > 0) {
    const quantityColumn = columns.find((col) => col.field === 'date');
    const newQuantityColumn = {
      ...quantityColumn,
      filterOperators: quantityOnlyOperators,
    };

    const quantityColIndex = columns.findIndex((col) => col.field === 'date');
    columns[quantityColIndex] = newQuantityColumn;
  }

  return (
    <div style={{ height: '90vh', width: '90%', margin: '0 auto' }}>
      <DataGrid           
        disableColumnMenu={true}
        components={{
          Toolbar: CustomToolbar,
        }}
        onCellEditCommit={(event) => changeData(event)}
        rows={newData}
        columns={[...columns, { field: 'consumption', filterable: false }, { field: 'weather', filterable: false }, { field: 'price', filterable: false }]}
        filterModel={filterModel}
        onFilterModelChange={(model) => setFilterModel(model)}
      />
    </div>
  );
}
