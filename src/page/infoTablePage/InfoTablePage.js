import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, phone, number, where, dept) {
  return { name, phone, number, where, dept };
}
const rows = [
  createData(
    "김김김",
    "010 - 5555 - 5555",
    "02 - 760 - 1111",
    "k@hansung.ac.kr",
    "컴공"
  ),
  createData("이이", "비공개", "02 - 760 - 1111", "k@hansung.ac.kr", "컴공"),
  createData(
    "박박박",
    "010 - 1111 - 1111",
    "02 - 760 - 1111",
    "k@hansung.ac.kr",
    "컴공"
  ),
  createData("홍홍홍", "비공개", "02 - 760 - 1111", "k@hansung.ac.kr", "기계"),
  createData("장장장", "비공개", "02 - 760 - 1111", "k@hansung.ac.kr", "융합"),
];
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>교수님 성함</StyledTableCell>
            <StyledTableCell align="right">연구실 전화번호</StyledTableCell>
            <StyledTableCell align="right">연구실 위치</StyledTableCell>
            <StyledTableCell align="right">이메일</StyledTableCell>
            <StyledTableCell align="right">관련 학과/트랙</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.number}</StyledTableCell>
              <StyledTableCell align="right">{row.where}</StyledTableCell>
              <StyledTableCell align="right">{row.dept}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
