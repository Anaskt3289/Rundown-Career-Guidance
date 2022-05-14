import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from 'react-redux'
import { changeType } from '../../Redux/AptitudeType/aptittudeTypeSlice'
import { useNavigate } from 'react-router-dom'

import './Styles/AssessmentType.css'

function AssessmentType() {
  const aptitudeType = useSelector(state => state.aptitudeType.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const rows = [
    { No: 1, Assessment: 'Interest', Progress: 'Pending' },
    { No: 2, Assessment: 'Personality', Progress: 'Pending' },
    { No: 3, Assessment: 'Numerical Reasoning', Progress: 'Pending' }
  ]
  return (
    <div>
      <Container maxWidth="md" >
        <TableContainer component={Paper} className='container'>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Assessment</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.No}
                  </TableCell>
                  <TableCell>{row.Assessment}</TableCell>
                  <TableCell>{row.Progress}</TableCell>
                  <TableCell><Button variant="contained" className='startBtn' sx={{ mt: 3, mb: 3 }} style={{ backgroundColor: "#000000" }}
                    onClick={() => {
                      dispatch(changeType({
                        aptitudeType: row.Assessment
                      }))
                      navigate('/assessment')
                    }
                    }>Start</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}

export default AssessmentType
