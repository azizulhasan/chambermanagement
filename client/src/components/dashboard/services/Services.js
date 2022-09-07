import React, { useState, useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
/**
 * Hooks
 */
import { getData, deletePost, STORY_HEADERS } from "./ServicesHooks";

/**
 * Components
 */
import ServicesModal from "./ServicesModal";
import "./services.css";

// Then, use it in a component.
export default function Services() {
  const [services, setServices] = useState([]);
  const [updateBtn, setUpdateBtn] = useState({ display: false, id: "" });
  const [lgShow, setLgShow] = useState(false);
  /**
   * This method is called when services data is posted or updated by modal.
   * @param {data} data
   */
  const setServicesData = (data) => {
    setServices(data);
  };
  /**
   *
   * @param {value} value true or false.
   * @param {id} id get id if want to edit specific services.
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
  const deleteServices = (id) => {
    alert("Are you sure? It will be permanently deleted.");
    deletePost(process.env.REACT_APP_API_URL + "/api/services/" + id)
      .then((res) => {
        for( let i = 0; i < res.data.length; i++ ) {
          res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
        }
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    /**
     * Get data from and display to table.
     */
    getData(process.env.REACT_APP_API_URL + "/api/services").then((res) => {
      for( let i = 0; i < res.data.length; i++ ) {
        res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
      }
      setServices(res.data);
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
          <ServicesModal
            updateBtn={updateBtn}
            modalShow={modalShow}
            lgShow={lgShow}
            setServicesData={setServicesData}
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
          {services.length &&
            services.map((services, index) => (
              <tr key={index}>
                {Object.keys(services).map((key) => {
                  if (
                    key === "title" ||
                    key === "image"
                    
                  ) {
                    return (
                      <td
                        key={key}
                        dangerouslySetInnerHTML={{ __html: services[key] }}
                      ></td>
                    );
                  }
                })}
                <td>
                  <Button
                    className="mr-2"
                    bsPrefix="azh_btn azh_btn_edit"
                    onClick={(e) => modalShow(true, services[index]["_id"])}
                  >
                    Edit
                  </Button>
                  <Button
                    bsPrefix="azh_btn azh_btn_edit"
                    onClick={(e) => deleteServices(services[index]["_id"])}
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
