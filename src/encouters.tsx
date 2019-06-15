import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

function Encounters(props: EncounterParcelProps) {
  const [encounters, setEncounters] = useState([]);
  useEffect(() => {
    window
      .fetch(
        `/openmrs/ws/rest/v1/encounter/?patient=${props.patientUuid}&v=full`
      )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw Error(
            `Cannot fetch encounters for ${props.patientUuid} - server responded with '${resp.status}'`
          );
        }
      })
      .then(encounters => {
        setEncounters(encounters.results);
      });
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Encounter Type</th>
            <th>Encounter Datetime</th>
            <th>Encounter Location</th>
          </tr>
        </thead>
        <tbody>
          {encounters.map((encounter, index) => {
            return (
              <tr key={index}>
                <td>{encounter.encounterType.display}</td>
                <td>
                  {dayjs(encounter.encounterDatetime).format("YYYY-MM-DD")}
                </td>
                <td>{encounter.location.display}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type EncounterParcelProps = {
  patientUuid: string;
};
export default Encounters;
