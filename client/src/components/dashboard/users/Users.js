import React, {  useEffect } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import {fetchUsers, fetchSingleUser, deleteUser} from "../../../store/usersSlice";
import {useDispatch, useSelector} from "react-redux";

/**
 * Components
 */
import UsersModal from "./UsersModal";
import "./users.css";

// Then, use it in a component.
export default function Users() {
    const dispatch = useDispatch();
    const {users, USER_HEADERS}  = useSelector (state => state.users ) ;
    
  useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

  /**
   *
   * @param {value} value true or false.
   * @param {id} id get id if want to edit specific users.
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
    dispatch(deleteUser(id))
    // deletePost(process.env.REACT_APP_API_URL + "/api/users/" + id)
    //   .then((res) => {
    //     for( let i = 0; i < res.data.length; i++ ) {
    //       res.data[i].image = `<img id="previewImage_${i}" height="20" width="20" alt="" src="${res.data[i].image}">`
    //     }
    //     // setUsers(res.data);
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
          <UsersModal/>
        </Col>
      </Row>
      <Table bordered>
        <thead>
          <tr>
            {USER_HEADERS.map((hearder) => (
              <th key={hearder.prop}>{hearder.title}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{users.length && users.map((user, index) => (
              <tr key={index}>{Object.keys(user).map((key) => {
                  if (
                    key === "title" ||
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
