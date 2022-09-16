import React, {  useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import {fetchServices, fetchSingleService, deleteService} from "../../../store/serviceSlice";
import {useDispatch, useSelector} from "react-redux";

/**
 * Components
 */
import ServicesModal from "./ServicesModal";
import "./services.css";

// Then, use it in a component.
export default function Services() {
    const dispatch = useDispatch();
    const {services, SERVICE_HEADERS}  = useSelector (state => state.services ) ;
    
  useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

  /**
   *
   * @param {value} value true or false.
   * @param {id} id get id if want to edit specific services.
   */
  // const isModalActive = (value, id = null) => {
  //   setLgShow(value);
  //   if (id !== null) {
  //     setUpdateBtn({ display: true, id: id });
  //   } else {
  //     setUpdateBtn({ display: false, id: "" });
  //   }
  // };
  /**
   *
   * @param {id} id get the specific id which want to be deleted.
   */
  const deleteData = (id) => {
    let result = window.confirm("Are you sure? It will be permanently deleted.");
    if( ! result){
      return;
    }
    dispatch(deleteService(id))
    // deletePost(process.env.REACT_APP_API_URL + "/api/services/" + id)
    //   .then((res) => {
    //     for( let i = 0; i < res.data.length; i++ ) {
    //       res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
    //     }
    //     // setServices(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };


  return (
    <React.Fragment>
      <Row className="mb-4 p-2">
        <Col
          xs={12}
          lg={12}
          className="d-flex flex-col justify-content-start align-items-start"
        >
          <ServicesModal/>
        </Col>
      </Row>
      <Table bordered>
        <thead>
          <tr>
            {SERVICE_HEADERS.map((hearder) => (
              <th key={hearder.prop}>{hearder.title}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{services.length && services.map((service, index) => (
              <tr key={index}>{Object.keys(service).map((key) => {
                  if (
                    key === "title" ||
                    key === "image"
                  ) {
                    return <td key={key} dangerouslySetInnerHTML={{ __html: service[key] }}></td>
                  }
                })}
                <td>
                  <Button
                    className="mr-2"
                    bsPrefix="azh_btn azh_btn_edit"
                    onClick={(e) => dispatch(fetchSingleService(services[index]["_id"]))}
                  >Edit</Button>
                  <Button
                    bsPrefix="azh_btn azh_btn_edit"
                    onClick={(e) => deleteData(services[index]["_id"])}>Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
}
