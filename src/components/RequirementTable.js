import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import { FiFileText, FiX, FiInfo, FiDownloadCloud } from "react-icons/fi";
import { deleteReq } from "../actions/customer";
import { useDispatch } from "react-redux";
import * as api from "../api";

const RequirementTable = ({
  cust,
  requirements,
  setRequirements,
  setRequirementsResident,
}) => {
  const frontId = `${cust.customer_frontid}`;
  const replaceFrontId = frontId.replace(/\\|\//g, " ");
  const splitFrontId = replaceFrontId.split(" ");

  const backId = `${cust.customer_backid}`;
  const replaceBackId = backId.replace(/\\|\//g, " ");
  const splitBackId = replaceBackId.split(" ");

  const deleteReqReservation = (id) => {
    const newReq = requirements.filter((req) => req.id !== id);
    const confirm = window.confirm(
      "Are you sure you want to delete this file?"
    );
    if (confirm) {
      dispatch(deleteReq(id));
      setRequirements(newReq);
    }
  };

  const reqFiles =
    requirements.length > 0 &&
    requirements.map((req) => {
      const files = `${req.files}`;
      const replaceFiles = files.replace(/\\|\//g, " ");
      const splitFiles = replaceFiles.split(" ");

      return (
        <TableRow>
          <TableCell>
            <FiFileText /> {splitFiles[4]}
          </TableCell>
          <TableCell>
            <a href={`${api.BASE_URL}/download_files/${req.id}/`}>
              <IconButton size="small">
                <FiDownloadCloud />
              </IconButton>
            </a>
          </TableCell>
          <TableCell>
            <IconButton
              size="small"
              onClick={() => deleteReqReservation(req.id)}
            >
              <FiX />
            </IconButton>
          </TableCell>
        </TableRow>
      );
    });

  const dispatch = useDispatch();
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <FiFileText />{" "}
                {cust.customer_frontid ? (
                  splitFrontId[4]
                ) : (
                  <span>No Front Id Uploaded</span>
                )}
              </TableCell>
              <TableCell>
                <a href={cust.customer_frontid} target="_blank">
                  <IconButton size="small">
                    <FiInfo />
                  </IconButton>
                </a>
              </TableCell>
              <TableCell>
                {/* <IconButton size="small">
                  <FiX />
                </IconButton> */}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <FiFileText />{" "}
                {cust.customer_backid ? (
                  splitBackId[4]
                ) : (
                  <span>No Back Id Uploaded</span>
                )}
              </TableCell>
              <TableCell>
                <a href={cust.customer_backid} target="_blank">
                  <IconButton size="small">
                    <FiInfo />
                  </IconButton>
                </a>
              </TableCell>
              <TableCell>
                {/* <IconButton size="small">
                  <FiX />
                </IconButton> */}
              </TableCell>
            </TableRow>
            {reqFiles}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RequirementTable;
