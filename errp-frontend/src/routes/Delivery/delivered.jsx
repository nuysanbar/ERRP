import { filter } from 'lodash';
import {formatDate} from "../purchases"
import { useState } from 'react';
import { useLoaderData,Link,redirect } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../Admin/components/label';
import Iconify from '../Admin/components/iconify';
import Scrollbar from '../Admin/components/scrollbar';
import axios from 'axios'

import { UserListHead, UserListToolbar } from '../Admin/sections/@dashboard/user';
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
const access_token=window.localStorage.getItem('access_token')
const TABLE_HEAD = [
  { id: 'brand', label: 'brand', alignRight: false },
  { id: 'retailer', label: 'retailer', alignRight: false },
  { id: 'source', label: 'source', alignRight: false },
  { id: 'destination', label: 'destination', alignRight: false },
  { id: 'prime', label: 'prime', alignRight: false },
  { id: 'date', label: 'date', alignRight: false },
  { id: '' },
];
export async function loader(){
  // generalized apiurl is more efficient 
    const apiUrl=`http://localhost:3500/delivery/getHistory`
    const res = await axios.get(apiUrl,{
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      })
    console.log(res.data)
    return res.data
}
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.retailer.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function Delivered() {
  const orders=useLoaderData()
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('retailer');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [current,setCurrent]=useState(null)
  const [currentRole,setCurrentRole]=useState(null)
  const ORDERSLIST=orders.map((order)=>{
    return {
        orderId:order.orderId,
        name:order.brand,
        retailer:order.retailer.firstname+" "+order.retailer.lastname,
        source:`${order.retailer.subcity}, ${order.retailer.city}`,
        destination:`${order.costumer.subcity}, ${order.costumer.city}`,
        prime:order.prime,
        date:order.date
    }
  })

  const handleOpenMenu = (event) => {
    console.log(event.currentTarget.id)
    setCurrent(event.currentTarget.id)
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ORDERSLIST.length) : 0;

  const filteredUsers = applySortFilter(ORDERSLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Container>
        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={ORDERSLIST.length}
                  onRequestSort={handleRequestSort}
                  options={{
                    selectableRows: false // <===== will turn off checkboxes in rows
                  }}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {orderId,name,retailer,source,destination,prime,date}=row;
                    return (
                      <TableRow hover key={orderId} tabIndex={-1} role="checkbox" component={Link}
                      to={`/delivery/history/${orderId}`}  style={{textDecoration:"none"}}>
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{retailer}</TableCell>
                        <TableCell align="left">{source}</TableCell>
                        <TableCell align="left">{destination}</TableCell>
                        <TableCell align="left">{prime}</TableCell>
                        <TableCell align="left">{formatDate(date)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={ORDERSLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
