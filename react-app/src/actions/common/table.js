export const TABLE_SORT = 'TABLE_SORT';


export const sortTablbe  = (clickedColumn, data, column) => ({
    type: TABLE_SORT, 
    clickedColumn,
    data,
    column
});
