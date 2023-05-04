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
    backgroundColor: "hsl(227, 49%, 31%)",
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

function createData(dept, choose, num1, num2, num3) {
  return { dept, choose, num1, num2, num3 };
}

const rows = [
  createData(
    "공통",
    "모두 만족",
    "취득학점 총계 130학점(15학번 이전은 140학점) 이상",
    "비교과포인트 : 800pt이상",
    "전체학년을 통산한 성적평점평균이 2.0 이상"
  ),
  createData(
    "AI응용학과",
    "1개 이상의 조건을 만족",
    " 토익 700점 이상 혹은 이와 상응하는 공인 영어성적",
    " 논문 : 국내외 학술대회 발표 또는 학술지 게재",
    "교내외 공모전 입상"
  ),
  createData(
    "융합보안학과",
    "",
    "토익 600점 이상 혹은 이와 상응하는 공인 영어성적",
    "국내외 학술대회 발표 또는 학술지 게재 또는 교내외 공모전 참여",
    ""
  ),
  createData(
    "컴퓨터공학부",
    "택 1",
    "졸업작품 전시회 출품",
    "졸업 논문",
    "자격증/공모전 입상"
  ),
  createData(
    "전자트랙/정보시스템트랙",
    "1개 이상의 조건을 만족",
    "전자종합설계프로젝트 작품 출품",
    "정보시스템종합설계프로젝트 작품 출품",
    "교외 공모전 입상"
  ),
  createData(
    "스마트경영공학부",
    "1개 이상의 조건을 만족",
    "트랙에서 인정하는 자격증 취득 또는 교외 공모전 입상",
    "전국 규모의 학회가 주최하는 학술대회에서 논문을 구두로 발표하거나, 연구재단 등재후보지 수준 이상의 학술지에 논문을 게재",
    "트랙에서 인정하는 졸업 논문(작품, 프로젝트 포함)을 제출"
  ),
  createData(
    "글로벌패션산업학부",
    "2개의 조건을 모두 충족",
    "토익 600점 이상 혹은 이와 상응하는 공인 영어성적 또는 패션 관련 자격증",
    "개인 포트폴리오",
    ""
  ),
  createData(
    "도서관정보문화트랙",
    "1개의 조건을 충족",
    "졸업시험",
    "졸업시험 대체 자격증",
    ""
  ),
  createData("역사문화큐레이션/콘텐츠 트랙", "택 1", "논문", "콘텐츠", ""),
];

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  return (
    <div className="p-2 ml-5">
      <strong>졸업요건</strong>
      <br /> <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>학과</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
              <StyledTableCell align="left">조건1</StyledTableCell>
              <StyledTableCell align="left">조건2</StyledTableCell>
              <StyledTableCell align="left">조건3</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.dept}>
                <StyledTableCell component="th" scope="row">
                  {row.dept}
                </StyledTableCell>
                <StyledTableCell align="left">{row.choose}</StyledTableCell>
                <StyledTableCell align="left">{row.num1}</StyledTableCell>
                <StyledTableCell align="left">{row.num2}</StyledTableCell>
                <StyledTableCell align="left">{row.num3}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
