import React from "react";
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceBody from "../components/InvoiceBody";
import { Stack, Typography } from "@mui/material";
import CustomerDetails from "../components/CustomerDetails";
import { useQuery } from "react-query";
import axios from "axios";
import DoctorDetails from "../components/DoctorDetails";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const { prescriptionId } = useParams();
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
          `http://apicodepiepline-env.eba-ecpienbe.us-east-1.elasticbeanstalk.com/api/Doctor/${data?.DoctorId}`,
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
      <Stack p={4} maxWidth={900} mx="auto" gap={4}>
        <InvoiceHeader />
        {notFound ? (
          <>
            <Typography>The Prescription was not found</Typography>
          </>
        ) : (
          <>
            <Stack direction="row">
              <CustomerDetails prescriptionId={1} />
              {doctorData && <DoctorDetails {...doctorData} />}
            </Stack>
            <InvoiceBody data={medicines} />
          </>
        )}
      </Stack>
    </>
  );
};

export default Invoice;
