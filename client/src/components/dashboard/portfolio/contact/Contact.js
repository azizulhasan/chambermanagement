import React, { useState, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableHeader,
} from "react-bs-datatable";
/**
 * Hooks
 */
import { STORY_HEADERS, getData} from "./ContactHooks";

/**
 * Components
 */
import ContactModal from "./ContactModal";

// Then, use it in a component.
export default function Contact() {
  const [updateBton, setUpdateBtn] = useState({ display: false, id: "" });
  const [totalContact, setTotalContact] = useState([]) 

  const setContactData = (data) => {
    setTotalContact(data.contacts)
    setUpdateBtn({ display: true, id: data._id });
  };
  useEffect(() => {
      /**
       * Get data from and display to table.
       */
      getData(process.env.REACT_APP_API_URL + "/api/contact").then(res=>{
        if(res.data.length){
          setTotalContact(res.data[0].contacts)
        }
        
        if (res.data.length > 0) {
          setTimeout(()=> setUpdateBtn({ display: true, id: res.data[0]._id }), 100)
        }
      })
  }, []);

  return (
    <DatatableWrapper
      body={totalContact}
      headers={STORY_HEADERS}
      paginationOptionsProps={{
        initialState: {
          rowsPerPage: 10,
          options: [5, 10, 15, 20],
        },
      }}
    >
      <Row className="mb-4 p-2">
        <Col
          xs={12}
          lg={2}
          className="d-flex flex-col justify-content-end align-items-start"
        >
          <ContactModal updateBton={updateBton} setContactData={setContactData} />
        </Col>
        <Col
          xs={12}
          lg={10}
          className="d-flex flex-col justify-content-end align-items-end"
        >
          <Filter />
        </Col>
      </Row>
      <Table>
        <TableHeader tableHeaders={STORY_HEADERS} />
        <TableBody />
      </Table>
      <Row className="mb-2 p-2">
        <Col
          xs={12}
          sm={6}
          lg={4}
          className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
        >
          <PaginationOptions />
        </Col>
        <Col
          xs={12}
          sm={6}
          lg={8}
          className="d-flex flex-col justify-content-end align-items-end mb-2"
        >
          <Pagination />
        </Col>
      </Row>
    </DatatableWrapper>
  );
}
