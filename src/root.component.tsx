import React from "react";
import Encounters from "./encouters";

export default function Root(props: RootProps) {
  return <Encounters patientUuid={props.patientUuid} />;
}

type RootProps = {
  patientUuid?: string;
};
