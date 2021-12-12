import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FcBullish } from "react-icons/fc";
import { FcCancel, FcApproval, FcFinePrint } from "react-icons/fc";
import { useHistory } from "react-router-dom";
//Marital Reports
import EmpStats from "../components/admin/report/EmpStats";
import MaritalAliyah from "../components/admin/report/MaritalAliyah";
import MaritalElyana from "../components/admin/report/MaritalElyana";
import MaritalNatania from "../components/admin/report/MaritalNatania";

import Monthly from "../components/admin/report/Monthly";
import Yearly from "../components/admin/report/Yearly";

//Sex and Age ( Male )

import A2029 from "../components/admin/report/sexage/male/A2029";
import A3040 from "../components/admin/report/sexage/male/A3040";
import A4150 from "../components/admin/report/sexage/male/A4150";
import A5160 from "../components/admin/report/sexage/male/A5160";
import A60 from "../components/admin/report/sexage/male/A60";

//Sex and Age ( Female )

import FA2029 from "../components/admin/report/sexage/female/FA2029";
import FA3040 from "../components/admin/report/sexage/female/FA3040";
import FA4150 from "../components/admin/report/sexage/female/FA4150";
import FA5160 from "../components/admin/report/sexage/female/FA5160";
import FA60 from "../components/admin/report/sexage/female/FA60";

import * as api from "../api";
import EmploymentStatus from "../components/admin/report/EmploymentStatus";

//Salary
import S2040 from "../components/admin/report/salary/S2040";
import S4060 from "../components/admin/report/salary/S4060";
import S6080 from "../components/admin/report/salary/S6080";
import S80100 from "../components/admin/report/salary/S80100";
import S100 from "../components/admin/report/salary/S100";

import SalaryRange from "../components/admin/report/SalaryRange";
import AverageSalary from "../components/admin/report/AverageSalary";

import Title from "./Title";
import ProjectType from "../components/admin/report/ProjectType";
import Payment from "../components/admin/report/Payment";
import About from "../components/admin/report/About";
import Purpose from "../components/admin/report/Purpose";

import moment from "moment";
import Resident from "../components/admin/report/Resident";
import Reserved from "../components/admin/report/Reserved";

import EmpAliyah from "../components/admin/report/EmpAliyah";
import EmpElyana from "../components/admin/report/EmpElyana";
import EmpNatania from "../components/admin/report/EmpNatania";

import MaterialTable from "material-table";
import Tabular from "../components/admin/report/Tabular";

const useStyles = makeStyles((theme) => ({
  grid1: {
    marginTop: 10,
  },
  grid2: {
    marginTop: 3,
  },
  paper1: {
    padding: 6,
    margin: "0px 0px 10px 0px",
  },
  paper2: {
    padding: 7,

    margin: "0px 0px 10px 0px",
  },
  paper3: {
    padding: 5,

    margin: "0px 0px 10px 0px",
  },
  paper4: {
    padding: 6,
  },
  paper5: {
    padding: 6,
    marginTop: 10,
  },
  paper6: {
    padding: 1,
  },
  paper7: {
    padding: 6,
  },

  hoverStyle: {
    color: "black",
    marginRight: 10,
    cursor: "pointer",
    "&:hover": { color: "gray" },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AdminReport = () => {
  const classes = useStyles();
  const roleTypes = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();

  const [companySales, setCompanySales] = useState("MONTHLY");
  const [sexAge, setSexAge] = useState("MALE");
  const [marital, setMarital] = useState("NATANIA");
  const [salaryRange, setSalaryRange] = useState("2040");
  const [male, setMale] = useState("2029");
  const [female, setFemale] = useState("2029");
  const [number, setNumber] = useState("EMP");
  const [inquiries, setInquiries] = useState("INQUIRY");
  const [paid, setPaid] = useState("RESIDENT");
  const [emp, setEmp] = useState("NATANIA");

  const [report, setReport] = useState(null);

  // Generated years
  const DateYear = new Date();
  const currentYear = DateYear.getFullYear();
  const currentMonth = DateYear.getMonth();

  const [years, setYear] = useState(currentYear);
  const [interest, setInterest] = useState(currentYear);
  const [resident, setResident] = useState(currentYear);
  const [reserved, setReserved] = useState(currentYear);

  var generateYear = 2021;
  var arrayYear = new Array();

  for (var i = generateYear; i <= 2050; i++) {
    arrayYear.push(generateYear);
    generateYear++;
  }

  const loadReport = async () => {
    const res = await api.baseUrl.get("admin_reports/");
    setReport(res.data);
  };

  useEffect(() => {
    loadReport();

    if (
      roleTypes.role === "Agent" ||
      roleTypes.role === "Client" ||
      roleTypes.role === "Staff" ||
      roleTypes.role === "Manager"
    ) {
      history.push("/home");
    }
  }, []);

  // Inquiry
  const year = report
    ? report.count_iq.filter(
        (y) => new Date(y.month).getFullYear() === parseInt(years)
      )
    : [];

  // Monthly Sales
  const yearMonthSales =
    report && report.mon_sales
      ? report.mon_sales.filter(
          (y) => new Date(y.month).getFullYear() === parseInt(interest)
        )
      : [];

  // Inquiry Count
  const getCount = report
    ? year.map((c) => {
        return c.count;
      })
    : [];

  // Sales Sum ( Without Forecast )
  const yearMonthSumActual = report ? yearMonthSales.map((y) => y.actual) : [];
  const yearMonthSumPredicted = report
    ? yearMonthSales.map((y) => y.predicted)
    : [];

  const month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "Aug";
  month[8] = "Sept";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

  // Inquiry get Month
  const getMonth = report
    ? year.map((m) => {
        return month[new Date(m.month).getMonth()];
      })
    : [];

  // Sales get month ( Without Forecast )
  const getMonthSales = report
    ? yearMonthSales.map((m) => {
        return month[new Date(m.month).getMonth()];
      })
    : [];

  const yearSales =
    report && report.year_sales
      ? report.year_sales.map((ys) => new Date(ys.year).getFullYear())
      : [];

  const getYearSales = report ? report.year_sales.map((ys) => ys.sum) : [];

  // MA for Resident
  const getResidentmonth =
    report && report.count_resident.length > 0
      ? report.count_resident.filter(
          (rm) => new Date(rm.month).getFullYear() === parseInt(resident)
        )
      : [];

  const getResidentAllMonth =
    report && getResidentmonth.length > 0
      ? getResidentmonth.map((rm) => {
          return month[new Date(rm.month).getMonth()];
        })
      : [];

  const getResidentcount =
    report && getResidentmonth.length > 0
      ? getResidentmonth.map((rm) => rm.resident)
      : [];

  const getResidentsum =
    report && getResidentmonth.length > 0
      ? getResidentmonth.map((rm) => rm.sum)
      : [];
  console.log(getResidentsum);

  // MA for Reserved
  const getReservedmonth =
    report && report.count_reserved.length > 0
      ? report.count_reserved.filter(
          (rm) => new Date(rm.month).getFullYear() === parseInt(reserved)
        )
      : [];

  const getReservedAllMonth =
    report && getReservedmonth.length > 0
      ? getReservedmonth.map((rm) => {
          return month[new Date(rm.month).getMonth()];
        })
      : [];

  const getReservedcount =
    report && getReservedmonth.length > 0
      ? getReservedmonth.map((rm) => rm.reserved)
      : [];

  const getReservedsum =
    report && getReservedmonth.length > 0
      ? getReservedmonth.map((rm) => rm.sum)
      : [];

  console.log(report);

  return (
    <div>
      <Title title={"Admin Report"} />
      <Container>
        {/* First Grid Container */}
        {report ? (
          <div>
            <Grid container spacing={2} className={classes.grid1}>
              <Grid item>
                <Paper className={classes.paper1}>
                  <div style={{ display: "flex" }}>
                    <FcBullish size={30} style={{ marginRight: 5 }} />
                    <Typography variant="h6">Reports</Typography>
                  </div>
                  <Typography
                    variant="body1"
                    style={{ marginLeft: 35, opacity: 0.6 }}
                  >
                    Sales Analysis and Customer Segmentation
                  </Typography>
                </Paper>
                <Paper className={classes.paper2}>
                  <div style={{ display: "flex" }}>
                    <Typography variant="body1" style={{ flexGrow: 1 }}>
                      Project Type Interest
                    </Typography>

                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          sexAge === "MALE"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration: sexAge === "MALE" ? "underline" : null,
                      }}
                      onClick={() => setSexAge("MALE")}
                    >
                      MALE
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          sexAge === "FEMALE"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          sexAge === "FEMALE" ? "underline" : null,
                      }}
                      onClick={() => setSexAge("FEMALE")}
                    >
                      FEMALE
                    </Typography>
                  </div>
                  <Typography variant="caption" style={{ opacity: 0.6 }}>
                    Customer Segmentation ( Based on Sex and Age )
                  </Typography>

                  {/* MALE SECTION */}
                  {sexAge === "MALE" && (
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                      {" "}
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            male === "2029"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration: male === "2029" ? "underline" : null,
                        }}
                        onClick={() => setMale("2029")}
                      >
                        20-29 /
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            male === "3040"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration: male === "3040" ? "underline" : null,
                        }}
                        onClick={() => setMale("3040")}
                      >
                        30-40 /
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            male === "4150"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration: male === "4150" ? "underline" : null,
                        }}
                        onClick={() => setMale("4150")}
                      >
                        41-50 /
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            male === "5160"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration: male === "5160" ? "underline" : null,
                        }}
                        onClick={() => setMale("5160")}
                      >
                        51-60 /
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            male === "60"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration: male === "60" ? "underline" : null,
                        }}
                        onClick={() => setMale("60")}
                      >
                        {`${"60 above"}`}
                      </Typography>
                      <Typography>
                        {male === "2029" && report && <A2029 report={report} />}
                        {male === "3040" && report && <A3040 report={report} />}
                        {male === "4150" && report && <A4150 report={report} />}
                        {male === "5160" && report && <A5160 report={report} />}
                        {male === "60" && report && <A60 report={report} />}
                      </Typography>
                    </div>
                  )}

                  {/* Female */}
                  {sexAge === "FEMALE" && (
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                      {" "}
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            female === "2029"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration:
                            female === "2029" ? "underline" : null,
                        }}
                        onClick={() => setFemale("2029")}
                      >
                        20-29 /
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            female === "3040"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration:
                            female === "3040" ? "underline" : null,
                        }}
                        onClick={() => setFemale("3040")}
                      >
                        30-40 /
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            female === "4150"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration:
                            female === "4150" ? "underline" : null,
                        }}
                        onClick={() => setFemale("4150")}
                      >
                        41-50 /
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            female === "5160"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration:
                            female === "5160" ? "underline" : null,
                        }}
                        onClick={() => setFemale("5160")}
                      >
                        51-60 /
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.hoverStyle}
                        style={{
                          color:
                            female === "60"
                              ? "rgba(0,0,0,1.0)"
                              : "rgba(0,0,0,0.6)",
                          textDecoration: female === "60" ? "underline" : null,
                        }}
                        onClick={() => setFemale("60")}
                      >
                        {`${"60 above"}`}
                      </Typography>
                      <Typography>
                        {female === "2029" && report && (
                          <FA2029 report={report} />
                        )}
                        {female === "3040" && report && (
                          <FA3040 report={report} />
                        )}
                        {female === "4150" && report && (
                          <FA4150 report={report} />
                        )}
                        {female === "5160" && report && (
                          <FA5160 report={report} />
                        )}
                        {female === "60" && report && <FA60 report={report} />}
                      </Typography>
                    </div>
                  )}
                </Paper>
                <Paper className={classes.paper2}>
                  <div style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <Typography variant="body1" style={{ flexGrow: 1 }}>
                        Project Type Interest
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="caption" style={{ opacity: 0.6 }}>
                    Customer Segmentation ( Monthly Salary Range)
                  </Typography>

                  <div style={{ textAlign: "center", marginTop: 10 }}>
                    {" "}
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          salaryRange === "2040"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          salaryRange === "2040" ? "underline" : null,
                      }}
                      onClick={() => setSalaryRange("2040")}
                    >
                      20-40k /
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          salaryRange === "4060"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          salaryRange === "4060" ? "underline" : null,
                      }}
                      onClick={() => setSalaryRange("4060")}
                    >
                      40-60k /
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          salaryRange === "6080"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          salaryRange === "6080" ? "underline" : null,
                      }}
                      onClick={() => setSalaryRange("6080")}
                    >
                      60k-80k /
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          salaryRange === "80100"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          salaryRange === "80100" ? "underline" : null,
                      }}
                      onClick={() => setSalaryRange("80100")}
                    >
                      80-100k /
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          salaryRange === "100"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          salaryRange === "100" ? "underline" : null,
                      }}
                      onClick={() => setSalaryRange("100")}
                    >
                      {`>${"100k"}`}
                    </Typography>
                  </div>

                  {salaryRange === "2040" && report && (
                    <S2040 report={report} />
                  )}
                  {salaryRange === "4060" && report && (
                    <S4060 report={report} />
                  )}
                  {salaryRange === "6080" && report && (
                    <S6080 report={report} />
                  )}
                  {salaryRange === "80100" && report && (
                    <S80100 report={report} />
                  )}
                  {salaryRange === "100" && report && <S100 report={report} />}
                </Paper>
                <Paper className={classes.paper2}>
                  <div style={{ display: "flex" }}>
                    <Typography variant="body1" style={{ flexGrow: 1 }}>
                      Marital Status
                    </Typography>

                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          marital === "NATANIA"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          marital === "NATANIA" ? "underline" : null,
                      }}
                      onClick={() => setMarital("NATANIA")}
                    >
                      NATANIA
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          marital === "ELYANA"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          marital === "ELYANA" ? "underline" : null,
                      }}
                      onClick={() => setMarital("ELYANA")}
                    >
                      ELYANA
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          marital === "ALIYAH"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          marital === "ALIYAH" ? "underline" : null,
                      }}
                      onClick={() => setMarital("ALIYAH")}
                    >
                      ALIYAH
                    </Typography>
                  </div>
                  <Typography variant="caption" style={{ opacity: 0.6 }}>
                    Customer Segmentation
                  </Typography>

                  {marital === "NATANIA" && report && (
                    <MaritalNatania report={report} />
                  )}
                  {marital === "ELYANA" && report && (
                    <MaritalElyana report={report} />
                  )}
                  {marital === "ALIYAH" && report && (
                    <MaritalAliyah report={report} />
                  )}
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper3}>
                  <div style={{ display: "flex" }}>
                    <Typography
                      variant="body1"
                      style={{ marginRight: 50, flexGrow: 1 }}
                    >
                      # of Customer
                    </Typography>

                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          number === "EMP"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration: number === "EMP" ? "underline" : null,
                      }}
                      onClick={() => setNumber("EMP")}
                    >
                      EMP TYPE
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          number === "PT"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration: number === "PT" ? "underline" : null,
                      }}
                      onClick={() => setNumber("PT")}
                    >
                      PROJECT TYPES
                    </Typography>
                  </div>

                  {number === "EMP" && (
                    <div>
                      <Typography variant="caption" style={{ opacity: 0.6 }}>
                        Based on Employment Type
                      </Typography>
                      <EmploymentStatus report={report} />
                    </div>
                  )}

                  {number === "PT" && report && (
                    <div>
                      <Typography variant="caption" style={{ opacity: 0.6 }}>
                        Based on Project Types
                      </Typography>
                      <ProjectType report={report} />
                    </div>
                  )}
                </Paper>
                <Paper className={classes.paper3}>
                  <div style={{ display: "flex" }}>
                    <Typography variant="body1" style={{ flexGrow: 1 }}>
                      Inquiry Reports
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          inquiries === "INQUIRY"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          inquiries === "INQUIRY" ? "underline" : null,
                      }}
                      onClick={() => setInquiries("INQUIRY")}
                    >
                      INQUIRY
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          inquiries === "ABOUT"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          inquiries === "ABOUT" ? "underline" : null,
                      }}
                      onClick={() => setInquiries("ABOUT")}
                    >
                      ABOUT
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          inquiries === "PURPOSE"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          inquiries === "PURPOSE" ? "underline" : null,
                      }}
                      onClick={() => setInquiries("PURPOSE")}
                    >
                      PURPOSE
                    </Typography>
                  </div>

                  {inquiries === "INQUIRY" && (
                    <div style={{ marginTop: 20 }}>
                      <Typography align="right">
                        <select
                          name=""
                          id=""
                          value={years}
                          onChange={(e) => setYear(e.target.value)}
                          style={{ opacity: 0.6 }}
                        >
                          {arrayYear.length > 0 &&
                            arrayYear.map((year) => (
                              <option value={year}>
                                {" "}
                                {`Inquiries of ${year}`}{" "}
                              </option>
                            ))}
                        </select>
                      </Typography>

                      <Payment getCount={getCount} getMonth={getMonth} />
                    </div>
                  )}

                  {inquiries === "ABOUT" && <About report={report} />}
                  {inquiries === "PURPOSE" && <Purpose report={report} />}
                </Paper>
                <Paper className={classes.paper3}>
                  <div style={{ display: "flex" }}>
                    <Typography variant="body1" style={{ flexGrow: 1 }}>
                      Employment Type
                    </Typography>

                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          emp === "NATANIA"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration: emp === "NATANIA" ? "underline" : null,
                      }}
                      onClick={() => setEmp("NATANIA")}
                    >
                      NATANIA
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          emp === "ELYANA"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration: emp === "ELYANA" ? "underline" : null,
                      }}
                      onClick={() => setEmp("ELYANA")}
                    >
                      ELYANA
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          emp === "ALIYAH"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration: emp === "ALIYAH" ? "underline" : null,
                      }}
                      onClick={() => setEmp("ALIYAH")}
                    >
                      ALIYAH
                    </Typography>
                  </div>
                  <Typography variant="caption" style={{ opacity: 0.6 }}>
                    Customer Segmentation
                  </Typography>
                  {emp === "NATANIA" && report && (
                    <EmpNatania report={report} />
                  )}
                  {emp === "ALIYAH" && report && <EmpAliyah report={report} />}
                  {emp === "ELYANA" && report && <EmpElyana report={report} />}
                </Paper>
              </Grid>
              <Grid item>
                {/* Second Grid Container */}
                <Grid container spacing={3} style={{ width: "100%" }}>
                  <Grid item>
                    <Paper className={classes.paper4}>
                      <Typography align="center">
                        {report && report.approved}
                      </Typography>
                      <div style={{ display: "flex" }}>
                        <FcApproval size={25} style={{ marginRight: 5 }} />
                        <Typography align="center" style={{ opacity: 0.6 }}>
                          Approved
                        </Typography>
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper className={classes.paper4}>
                      <Typography align="center">
                        {report && report.progress}
                      </Typography>
                      <div style={{ display: "flex" }}>
                        <FcFinePrint size={25} style={{ marginRight: 5 }} />
                        <Typography align="center" style={{ opacity: 0.6 }}>
                          Progress
                        </Typography>
                      </div>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper className={classes.paper4}>
                      <Typography align="center">
                        {report && report.rejected}
                      </Typography>
                      <div style={{ display: "flex" }}>
                        <FcCancel size={25} style={{ marginRight: 5 }} />
                        <Typography align="center" style={{ opacity: 0.6 }}>
                          Rejected
                        </Typography>
                      </div>
                    </Paper>
                  </Grid>
                </Grid>

                <Paper className={classes.paper5}>
                  <div style={{ display: "flex" }}>
                    <Typography variant="body1" style={{ flexGrow: 1 }}>
                      Company Sales
                    </Typography>

                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          companySales === "MONTHLY"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          companySales === "MONTHLY" ? "underline" : null,
                      }}
                      onClick={() => setCompanySales("MONTHLY")}
                    >
                      MONTHLY
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          companySales === "YEARLY"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          companySales === "YEARLY" ? "underline" : null,
                      }}
                      onClick={() => setCompanySales("YEARLY")}
                    >
                      YEARLY
                    </Typography>
                  </div>
                  <Typography variant="caption" style={{ opacity: 0.6 }}>
                    Sales Analysis
                  </Typography>
                  {companySales === "MONTHLY" && (
                    <Typography align="right">
                      <select
                        name=""
                        id=""
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        style={{ opacity: 0.6 }}
                      >
                        {arrayYear.length > 0 &&
                          arrayYear.map((year) => (
                            <option value={year}> {`Sales of ${year}`} </option>
                          ))}
                      </select>
                    </Typography>
                  )}

                  {companySales === "MONTHLY" && (
                    <Monthly
                      yearMonthSumActual={yearMonthSumActual}
                      yearMonthSumPredicted={yearMonthSumPredicted}
                      getMonthSales={getMonthSales}
                    />
                  )}
                  {companySales === "YEARLY" && (
                    <Yearly yearSales={yearSales} getYearSales={getYearSales} />
                  )}
                </Paper>
                <Paper className={classes.paper5}>
                  <div style={{ display: "flex" }}>
                    <Typography variant="body1" style={{ flexGrow: 1 }}>
                      Monthly Amortization (Paid)
                    </Typography>

                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          paid === "RESIDENT"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          paid === "RESIDENT" ? "underline" : null,
                      }}
                      onClick={() => setPaid("RESIDENT")}
                    >
                      RESIDENT
                    </Typography>
                    <Typography
                      variant="caption"
                      className={classes.hoverStyle}
                      style={{
                        color:
                          paid === "RESERVED"
                            ? "rgba(0,0,0,1.0)"
                            : "rgba(0,0,0,0.6)",
                        textDecoration:
                          paid === "RESERVED" ? "underline" : null,
                      }}
                      onClick={() => setPaid("RESERVED")}
                    >
                      RESERVED
                    </Typography>
                  </div>
                  <Typography variant="caption" style={{ opacity: 0.6 }}>
                    Sales Analysis
                  </Typography>

                  {paid === "RESIDENT" && (
                    <Typography align="right">
                      <select
                        name=""
                        id=""
                        value={resident}
                        onChange={(e) => setResident(e.target.value)}
                        style={{ opacity: 0.6 }}
                      >
                        {arrayYear.length > 0 &&
                          arrayYear.map((year) => (
                            <option value={year}>
                              {" "}
                              {`Resident of ${year}`}{" "}
                            </option>
                          ))}
                      </select>
                    </Typography>
                  )}
                  {paid === "RESIDENT" && (
                    <Resident
                      getResidentAllMonth={getResidentAllMonth}
                      getResidentcount={getResidentcount}
                      getResidentsum={getResidentsum}
                    />
                  )}

                  {paid === "RESERVED" && (
                    <Typography align="right">
                      <select
                        name=""
                        id=""
                        value={reserved}
                        onChange={(e) => setReserved(e.target.value)}
                        style={{ opacity: 0.6 }}
                      >
                        {arrayYear.length > 0 &&
                          arrayYear.map((year) => (
                            <option value={year}>
                              {" "}
                              {`Reserved of ${year}`}{" "}
                            </option>
                          ))}
                      </select>
                    </Typography>
                  )}
                  {paid === "RESERVED" && (
                    <Reserved
                      getReservedAllMonth={getReservedAllMonth}
                      getReservedsum={getReservedsum}
                      getReservedcount={getReservedcount}
                    />
                  )}
                </Paper>

                {/* Third Grid Container */}
                <Grid container spacing={3} className={classes.grid2}>
                  {/* <Grid item>
                  <Paper className={classes.paper6}>
                    <Typography align="center" variant="body1" style={{}}>
                      Deal This Year
                    </Typography>
                    <Typography align="center" variant="body1" style={{}}>
                      Deal This Year
                    </Typography>
                  </Paper>
                </Grid> */}
                  <Grid item>
                    <Paper className={classes.paper7}>
                      <Typography variant="body1" style={{}}>
                        Recent Payments (3)
                      </Typography>
                      <Typography variant="caption" style={{ opacity: 0.6 }}>
                        Customer Proof of Payments
                      </Typography>

                      {report.latest_payments.length > 0 &&
                        report.latest_payments.map((payment) => (
                          <Grid container spacing={1} style={{ marginTop: 10 }}>
                            <Grid item>
                              <img
                                src={payment.image_receipt}
                                style={{ width: 76 }}
                              />
                            </Grid>

                            <Grid item>
                              <Typography variant="caption">
                                Paid By: {payment.customer_payment.email}
                              </Typography>

                              <Grid item>
                                <Typography variant="caption">
                                  {moment(payment.date_added).fromNow()}
                                </Typography>
                              </Grid>
                              {/* <Grid item>
                                {payment.status === "Read" ? (
                                  <Typography
                                    variant="caption"
                                    style={{
                                      backgroundColor: "rgba(46, 204, 113,1.0)",
                                      color: "white",
                                      padding: 2,
                                    }}
                                  >
                                    Verified
                                  </Typography>
                                ) : (
                                  <Typography
                                    variant="caption"
                                    style={{
                                      backgroundColor: "rgba(235, 77, 75,0.9)",
                                      color: "white",
                                      padding: 2,
                                    }}
                                  >
                                    Unverified
                                  </Typography>
                                )}
                              </Grid> */}
                            </Grid>
                            <Grid item>
                              {payment.status === "Read" ? (
                                <Typography
                                  variant="caption"
                                  style={{
                                    backgroundColor: "rgba(46, 204, 113,1.0)",
                                    color: "white",
                                    padding: 2,
                                  }}
                                >
                                  Verified
                                </Typography>
                              ) : (
                                <Typography
                                  variant="caption"
                                  style={{
                                    backgroundColor: "rgba(235, 77, 75,0.9)",
                                    color: "white",
                                    padding: 2,
                                  }}
                                >
                                  Unverified
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                        ))}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <div style={{ margin: "16px 0px" }}>
              {/* <Paper style={{ display: "flex", marginBottom: 10, padding: 10 }}>
                <Typography>
                  <select
                    name=""
                    id=""
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    style={{
                      opacity: 0.6,
                      padding: 10,
                      marginRight: 10,
                      fontSize: 16,
                    }}
                  >
                    {month.length > 0 &&
                      month.map((mon) => (
                        <option value={mon}> {`Month of ${mon}`} </option>
                      ))}
                  </select>
                </Typography>
                <Typography>
                  <select
                    name=""
                    id=""
                    // value={dueyear}
                    // onChange={(e) => setInterest(e.target.value)}
                    style={{ opacity: 0.6, padding: 10, fontSize: 16 }}
                  >
                    {arrayYear.length > 0 &&
                      arrayYear.map((year) => (
                        <option value={year}>
                          {" "}
                          {`Due Date for Year ${year}`}{" "}
                        </option>
                      ))}
                  </select>
                </Typography>
              </Paper> */}
              <Tabular />
            </div>
          </div>
        ) : (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Container>
    </div>
  );
};

export default AdminReport;
