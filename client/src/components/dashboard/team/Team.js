import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
/**
 * Hooks
 */
import { getData, deletePost, STORY_HEADERS } from "./TeamHooks";

/**
 * Components
 */
import TeamModal from "./TeamModal";
import "./team.css";

// Then, use it in a component.
export default function Team() {
  const [teams, setTeam] = useState([]);
  const [updateBtn, setUpdateBtn] = useState({ display: false, id: "" });
  const [lgShow, setLgShow] = useState(false);
  /**
   * This method is called when team data is posted or updated by modal.
   * @param {data} data
   */
  const setTeamData = (data) => {
    setTeam(data);
  };
  /**
   *
   * @param {value} value true or false.
   * @param {id} id get id if want to edit specific team.
   */
  const modalShow = (value, id = null) => {
    setLgShow(value);
    if (id !== null) {
      setUpdateBtn({ display: true, id: id });
    } else {
      setUpdateBtn({ display: false, id: "" });
    }
  };
  /**
   *
   * @param {id} id get the specific id which want to be deleted.
   */
  const deleteTeam = (id) => {
    if( !window.confirm("Are you sure? It will be permanently deleted.")){
      return;
    }
    deletePost(process.env.REACT_APP_API_URL + "/api/team/" + id)
      .then((res) => {
        for( let i = 0; i < res.data.length; i++ ) {
          res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
        }
        setTeam(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/team").then((res) => {
      for( let i = 0; i < res.data.length; i++ ) {
        res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
        res.data[i].services = JSON.parse(res.data[i].services)
      }
      setTeam(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <Row className="mb-4 p-2">
        <Col
          xs={12}
          lg={12}
          className="d-flex flex-col justify-content-start align-items-start"
        >
          <TeamModal
            updateBtn={updateBtn}
            modalShow={modalShow}
            lgShow={lgShow}
            setTeamData={setTeamData}
          />
        </Col>
      </Row>
      <Table bordered>
        <thead>
          <tr>
            {STORY_HEADERS.map((hearder) => (
              <th key={hearder.prop}>{hearder.title}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {teams.length &&
            teams.map((team, index) => (
              <tr key={index}>
                {Object.keys(team).map((key) => {
                  if (
                    key === "name" ||
                    key === "speciality" ||
                    key === "image"
                    
                  ) {
                    return (
                      <td
                        key={key}
                        dangerouslySetInnerHTML={{ __html: team[key] }}
                      ></td>
                    );
                  }
                })}
                <td>
                  <Button
                    className="mr-2"
                    data-id={teams[index]["_id"]}
                    bsPrefix="azh_btn azh_btn_edit "
                    onClick={(e) => modalShow(true, teams[index]["_id"])}
                  >
                    Edit
                  </Button>
                  <Button
                    bsPrefix="azh_btn azh_btn_edit"
                    onClick={(e) => deleteTeam(teams[index]["_id"])}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
}
