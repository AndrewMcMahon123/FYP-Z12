import { useState } from 'react';
import { Button, Modal, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

export default function BasicModal({ text }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Parse the CSV data into an array of objects
  const data = text.split('\n').map((row) => {
    const [date, distance, value] = row.split(',');
    return { date, distance, value };
  });

  return (
    <div className="d-flex flex-row align-items-center mb-4">
      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
      <div className="form-outline flex-fill mb-0">
        <Button className="btn btn-primary btn-block" onClick={handleOpen} style={{ textTransform: 'none' }}>
          View Results
        </Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2 }} align="center">
              User Generated Results
            </Typography>
                <Table style={{fontSize: "26px"}}>
                    <TableBody style={{fontSize: "26px"}}>
                        {data.map((row) => (
                            <TableRow key={row.date}>
                                <TableCell style={{fontSize: "16px"}}>{row.date}</TableCell>
                                <TableCell style={{fontSize: "16px"}}>{row.distance}</TableCell>
                                <TableCell style={{fontSize: "16px"}}>{row.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Modal>
        </div>
    </div>
    );
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '500px', // Set a fixed height for the modal container
  overflowY: 'scroll', // Add the scrollable property
};
