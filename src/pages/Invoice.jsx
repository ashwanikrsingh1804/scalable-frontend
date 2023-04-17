import React from "react";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceBody from "../components/InvoiceBody";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CustomerDetails from "../components/CustomerDetails";
import { useQuery } from "react-query";
import axios from "axios";
import DoctorDetails from "../components/DoctorDetails";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

const Invoice = ({ prescriptionId, email, name }) => {
  const { data, isLoading } = useQuery(
    ["prescriptionData", prescriptionId],
    () =>
      axios
        .get(
          `https://zp819166nj.execute-api.us-east-1.amazonaws.com/Prescription/${prescriptionId}`,
        )
        .then((response) => response.data[0]),
  );

  const { data: medicineData } = useQuery(
    ["medicinePrescribed", prescriptionId],
    () =>
      axios
        .get(
          `https://gqwne3p555.execute-api.us-east-1.amazonaws.com/Medicine-Prescribed/${prescriptionId}`,
        )
        .then((response) => response.data),
  );

  const { data: doctorData } = useQuery(
    ["doctorData", data?.DoctorId],
    () =>
      axios
        .get(
          //`https://o97v5r6uy4.execute-api.us-east-1.amazonaws.com/api/Doctor/${data?.DoctorId}`,
          `https://o97v5r6uy4.execute-api.us-east-1.amazonaws.com/${data?.DoctorId}`,
        )
        .then((resp) => resp.data),
    { enabled: Boolean(data) },
  );

  const { data: allMedicine } = useQuery(["allMedicine"], () =>
    axios
      .get(
        `https://nnk9yvhtcj.execute-api.us-east-1.amazonaws.com/dev/medicine`,
      )
      .then((resp) => resp.data),
  );

  if (!(allMedicine && medicineData)) return <></>;

  const notFound = !data && !isLoading;

  const medicines = medicineData.map((medicine) => {
    return allMedicine.find((med) => med.ID === medicine.Id);
  });

  return (
    <>
      {notFound ? (
        <>
          <Typography>The Prescription was not found</Typography>
        </>
      ) : (
        <>
          <Stack direction="row">
            <CustomerDetails name={data?.PatientName} />
            {doctorData && <DoctorDetails {...doctorData} />}
          </Stack>
          <InvoiceBody data={medicines} email={email} name={name} />
        </>
      )}
    </>
  );
};

const InvoicePage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { data, isError } = useQuery(["getCustomer"], () =>
    axios
      .get(
        `https://opfhi0k7o6.execute-api.us-east-1.amazonaws.com/api/get/${customerId}`,
      )
      .then((resp) => {
        return resp.data[0];
      }),
  );
  if (isError) {
    return <Typography>something went wrong</Typography>;
  }
  return (
    <Stack p={4} maxWidth={900} mx="auto" gap={4}>
      {/* <Box> */}
      <IconButton sx={{ alignSelf: "start" }} onClick={() => navigate(-1)}>
        <ArrowBack />
      </IconButton>
      {/* </Box> */}
      <InvoiceHeader number={customerId} />
      {data && <Invoice {...data} />}
    </Stack>
  );
};

export default InvoicePage;
