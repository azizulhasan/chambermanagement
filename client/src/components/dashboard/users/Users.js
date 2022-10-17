import React, {  useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import {fetchUsers, fetchSingleUser, deleteUser} from "../../../store/usersSlice";
import {useDispatch, useSelector} from "react-redux";

/**
 * Components
 */
import UsersModal from "./UsersModal";
import "./users.css";


export default function Users() {
    const dispatch = useDispatch();
    const {users, USER_HEADERS}  = useSelector (state => state.users ) ;
    
  useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);


  /**
   *
   * @param {id} id get the specific id which want to be deleted.
   */
  const deleteData = (id) => {
    let result = window.confirm("Are you sure? It will be permanently deleted.");
    if( ! result){
      return;
    }
    dispatch(deleteUser(id))
  };


  return (
    <React.Fragment>
      <Row className="mb-4 p-2">
        <Col
          xs={12}
          lg={12}
          className="d-flex flex-col justify-content-start align-items-start"
        >
          <UsersModal/>
        </Col>
      </Row>
      <Table bordered>
        <thead>
          <tr>
            {USER_HEADERS.length && USER_HEADERS.map((hearder) => (
              <th key={hearder.prop}>{hearder.title}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{users.length && users.map((user, index) => (
              <tr key={index}>{Object.keys(user).map((key) => {
                  if (
                    key === "name" ||
                    key === "email" ||
                    key === "phone" ||
                    key === "image" 
                  ) {
                    return <td key={key} dangerouslySetInnerHTML={{ __html: user[key] }}></td>
                  }else{
                    return null
                  }
                })}
                <td>
                  <Button
                    className="mr-2"
                    bsPrefix="azh_btn azh_btn_edit"
                    onClick={(e) => dispatch(fetchSingleUser(users[index]["_id"]))}
                  ><i className="fas fa-edit"></i></Button>
                  <Button
                    bsPrefix="azh_btn azh_btn_edit"
                    onClick={(e) => deleteData(users[index]["_id"])}><i className="fas fa-trash-alt"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
}