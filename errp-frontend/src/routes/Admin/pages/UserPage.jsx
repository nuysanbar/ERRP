import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
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
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import axios from 'axios'
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
const access_token=window.localStorage.getItem('access_token')
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'address', label: 'address', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

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
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const assignRole=(value)=>{
  var result;
  if(value=="2001"){
    result='consumer'
  }else if(value=="5508"){
    result="retailer"
  }else if(value=="3011"){
    result="delivery ppl"
  }else{
    result="admin"
  }
  return result
}
export default function UserPage() {
  const users=useLoaderData()
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [current,setCurrent]=useState(null)
  const [currentRole,setCurrentRole]=useState(null)
  const USERLIST=users.map((user)=>{
    return {
      "username":user.username,
      "name":`${user.firstname} ${user.lastname}`,
      "id":user._id,
      "role":assignRole(user.roles),
      "address":`${user.subcity}, ${user.city}`,
      "status":user.suspended,
      "avatarUrl":`http://localhost:3500/${user.imgUrl}`
    }
  })

  const handleOpenMenu = (event,role) => {
    console.log(event.currentTarget.id)
    console.log(role)
    setCurrent(event.currentTarget.id)
    setCurrentRole(role)
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
  const handleDeleteUser=async()=>{
    const apiUrl=`http://localhost:3500/admin/deleteMember/${current}/${currentRole}`
    const response=await axios.delete(apiUrl ,{
        headers:{
            "Authorization":"Bearer "+access_token
        }
    })
    console.log(response.data)
    return redirect("/admin")
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

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
                  rowCount={USERLIST.length}
                  onRequestSort={handleRequestSort}
                  options={{
                    selectableRows: false // <===== will turn off checkboxes in rows
                  }}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {username,name,id,avatarUrl,role,status,address}=row;
                    const selectedUser = selected.indexOf(name) !== -1; 
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser} component={Link}
                      to={`/admin/customers/${username}`} style={{textDecoration:"none"}}>
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{address}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">
                            {status? <span style={{color:"red"}}>pending</span>: <span style={{color:"green"}}>active</span>}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" id={username} onClick={(event)=>handleOpenMenu(event,role)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
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
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
      
        <MenuItem 
         component={Link}
         to={`/admin/users/edit/${current}`} >
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          edit
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleDeleteUser}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
