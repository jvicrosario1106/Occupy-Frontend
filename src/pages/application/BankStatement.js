import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Typography from "@material-ui/core/Typography";
const BankStatement = ({ setImage, images, error, setError }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 10000000,
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles, rejectedFiles) => {
      setImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div>
      {" "}
      <div
        {...getRootProps()}
        style={{
          border: "3px dashed rgba(108, 92, 231,0.3)",
          padding: "50px",
          cursor: "pointer",
          color: "rgba(45, 52, 54,0.6)",
          margin: "10px 0px ",
          wWidth: "500px",
          backgroundColor: isDragActive
            ? "rgba(108, 92, 231,0.03)"
            : "rgba(108, 92, 231,0.1)",
        }}
      >
        <input name="images" required {...getInputProps()} />

        <Typography variant="subtitle1" align="center">
          {isDragActive
            ? "Dragging Image Files"
            : "DRAG and DROP your Bank passbook ( Bank Statement )"}
        </Typography>
        <Typography variant="subtitle1" align="center">
          You have ({images && images.length}) File to be uploaded.
        </Typography>
      </div>
    </div>
  );
};

export default BankStatement;
