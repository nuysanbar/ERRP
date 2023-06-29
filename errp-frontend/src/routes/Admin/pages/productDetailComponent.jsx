import { filter } from 'lodash';
import { useState,useEffect } from 'react';
import { TiTick } from 'react-icons/ti';

import { useLoaderData,NavLink } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Button from '@mui/material/Button';
import Scrollbar from '../../Admin/components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../Admin/sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
const access_token=window.localStorage.getItem('access_token')
const TABLE_HEAD = [
  { id: 'name', label: 'name', alignRight: false },
  { id: 'address', label: 'address', alignRight: false },
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

export function ProductStatus(){
    const product=useLoaderData()
    const details=product.details.split(",")
    const [imageUrl,setImageUrl]=useState(null)
    useEffect(()=>setImageUrl(`http://localhost:3500/products/${product.imgUrl[0]}`),[])
    return (
        <div className="specificStores">
        <div>
        <div className='imageContainer'>
        <div  className="smallerImage">
            { product.imgUrl.map((img)=>{
                return <img src={`http://localhost:3500/products/${img}`} alt={product.modelName} onMouseOver={(e)=>setImageUrl(e.target.src)} key={`http://localhost:3500/products/${img}`}/>
            })}
        </div>
            {imageUrl && <div className='largerImage'>
                <img src={imageUrl} alt={product.modelName} />
            </div>}
        </div>
        <div className='productInformation'>
            <p className='brandName'>{product.brandName}</p>
            {details.map((detail)=>{
                return <p key={detail} className='detail'><span><TiTick/></span>{detail}</p>
            })}
            <NavLink>edit</NavLink>
        </div>
        </div>
        </div>
    )
}
export  function ProductRetailers() {
  const retailers=useLoaderData()
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const RETAILERSLIST=retailers.map((retailer)=>{
    return {
      username:retailer.username,
      name:`${retailer.firstname} ${retailer.lastname}`,
      address:`${retailer.subcity} ${retailer.city}`
    }
  })
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - RETAILERSLIST.length) : 0;

  const filteredUsers = applySortFilter(RETAILERSLIST, getComparator(order, orderBy), filterName);

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
                  rowCount={RETAILERSLIST.length}
                  onRequestSort={handleRequestSort}
                  options={{
                    selectableRows: false // <===== will turn off checkboxes in rows
                  }}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {username,name,address}=row;
                    return (
                      <TableRow hover key={username} tabIndex={-1} component={"a"}
                      href={`/admin/retailers/${username}`} style={{textDecoration:"none"}}>
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{address}</TableCell>
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
            count={RETAILERSLIST.length}
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