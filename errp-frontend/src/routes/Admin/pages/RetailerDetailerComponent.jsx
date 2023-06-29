import { filter } from 'lodash';
import { useState } from 'react';
import Map from "../../brands/simpleMap"
import { useLoaderData,Link,redirect,NavLink } from 'react-router-dom';
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
import {Form } from "react-router-dom"
import Scrollbar from '../../Admin/components/scrollbar';
import axios from 'axios'
// sections
import { UserListHead, UserListToolbar } from '../../Admin/sections/@dashboard/user';
// mock
// import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
const access_token=window.localStorage.getItem('access_token')
const TABLE_HEAD = [
  { id: 'name', label: 'brand name', alignRight: false },
  { id: 'price', label: 'price', alignRight: false },
  { id: 'usedornew', label: 'used or new', alignRight: false },
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
    return filter(array, (_user) => _user.brandName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
export async function addLicenseAction({request,params}){
  const formData = await request.formData();
  const apiUrl=`http://localhost:3500/admin/addLicense/${params.id}`
  const res=await axios.put(apiUrl,formData,{
      headers:{
          "Authorization":"Bearer "+access_token
      }
  })
  const response=res.data
  console.log(response)
  return redirect(`/admin/retailers/${params.id}/license`);
}
export async function profileEditAction2({request,params}){
  const formData = await request.formData();
  const access_token=window.localStorage.getItem('access_token')
  const apiUrl=`http://localhost:3500/admin2/update/${params.id}`
  const response=await axios.post(apiUrl,formData ,{
      headers:{
          "Authorization":"Bearer "+access_token
      }
    })
    console.log(response.data)
    return redirect('../')
}
export function License(){
    const response=useLoaderData()
    return (
        <div>
          <div>
          <img src={`http://localhost:3500/delivery/${response.license}`} alt="license" style={{width:"600px",height:"700px",display:"block",margin:"10px auto",borderRadius:"20px"}}/>  
          </div>
             <Form   method="put" encType="multipart/form-data" style={{width:"600px",display:"block",margin:"0 auto"}} >
                <label htmlFor="license">update license :</label>
                <input type="file" name="license" required/><br />  
                <Button type="submit" variant="contained" style={{backgroundColor:"var(--bl)",width:"100px",textAlign:"center",margin:"10px"}}>submit</Button>
            </Form>
        </div>
    )
}
export function UpdateStatus(){
    const response=useLoaderData()
    const [suspended,setSuspended]=useState(response.suspended)
    var role
    if(response.roles==3011){
        role="deliverers"
    }else if(response.roles==5508){
      role="retailers"
    }else{
      role="customers"
    }
    const toggleSuspend=async(username,suspended,setSuspended)=>{
      setSuspended(!suspended)
      const apiUrl=`http://localhost:3500/admin/changeStatus/${username}/toggleSuspend`
      const res = await axios.get(apiUrl,{
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        })
      console.log(res.data)
      return res.data
    }
    return (
        <div>
            <div style={{display:"inline-block",width:"400px"}}>
              <img src={`http://localhost:3500/${response.imgUrl}`} alt="profile pic" style={{width:"400px",height:"500px",height:"500px",marginTop:"30px",borderRadius:"20px"}} />
            </div>
            <div style={{display:"inline-block",width:"400px",marginLeft:"30px",verticalAlign:"top"}}>
              
              <h4>Name : {response.firstname} {response.lastname}</h4>
              <h4>PHONE NO : +251{response.phoneNum}</h4>
              <h4>ADDRESS : {response.subcity}, {response.city}</h4>
              <h4>STATUS : {suspended? <span style={{color:"red"}}>pending</span>:<span style={{color:"green"}}>active</span> }</h4>
              <Map markers={[{address: response.firstname, lat:parseFloat(response.lat), lng:parseFloat(response.lon)}]}/> 
            </div>
            <div style={{width:"400px",margin:"0 auto"}}>
              <NavLink to={`/admin/${role}/${response.username}/edit`} style={{padding:"0 30px",fontWeight:"bold"}}>edit</NavLink>
              {suspended &&<Button variant='outlined' style={{color:"red",borderColor:"var(--bl)"}} onClick={()=>toggleSuspend(response.username,suspended,setSuspended)}>REMOVE PENDING STATUS</Button>}
              {!suspended &&<Button variant='contained'style={{backgroundColor:"var(--bl)"}}  onClick={()=>toggleSuspend(response.username,suspended,setSuspended)}>sUSPEND TEMPORARLY</Button>}
            </div>
        </div>
    )
}
export  function RetailersProduct() {
  const products=useLoaderData()
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('brandName');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const PRODUCTSLIST=products.map((product)=>{
    return {
      barcode:product.barcode,
      brandName:product.brandName,
      price:product.price,
      usedOrNew:product.usedOrNew
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PRODUCTSLIST.length) : 0;

  const filteredUsers = applySortFilter(PRODUCTSLIST, getComparator(order, orderBy), filterName);

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
                  rowCount={PRODUCTSLIST.length}
                  onRequestSort={handleRequestSort}
                  options={{
                    selectableRows: false // <===== will turn off checkboxes in rows
                  }}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {barcode,brandName,price,usedOrNew}=row;
                    // const selectedUser = selected.indexOf(name) !== -1; 
                    return (
                      <TableRow hover key={barcode} tabIndex={-1} component={"a"}
                      href={`/admin/products/${barcode}/status`} style={{textDecoration:"none"}}>
                        <TableCell padding="checkbox">
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {brandName}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{price}</TableCell>
                        <TableCell align="left">{usedOrNew}</TableCell>
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
            count={PRODUCTSLIST.length}
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