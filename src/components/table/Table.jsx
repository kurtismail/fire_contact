import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { TbEdit } from "react-icons/tb";
import { AiTwotoneDelete } from "react-icons/ai";
import { delData, readData, setData } from "../../utils/firebase";

const TableComponent = ({ data, setContact }) => {
  const [table, setTable] = useState([]);
  console.log("table", Object.entries(table));

  useEffect(() => {
    return () => {
      readData(setTable);
    };
  }, [data]);

  const eventEdit = (e) => {
    setData(data, e.target.id, setContact);
  };

  const eventDel = (e) => {
    delData(e.target.id);
  };

  return (
    <Container className="mt-3">
      <div className=" d-block w-100 text-center mb-3 fs-4 bg-dark text-light rounded-3">
        CONTACTS
      </div>
      <Table
        striped
        bordered
        hover
        variant="dark"
        responsive="sm"
        size="sm"
        className="w-90 text-center"
      >
        <thead>
          <tr>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(table).map((i) => {
            const { name, phone, gender, id } = i[1];
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{gender}</td>
                <td>
                  <AiTwotoneDelete
                    color="red"
                    type="button"
                    id={id}
                    onClick={eventDel}
                  />
                </td>
                <td>
                  <TbEdit
                    color="orange"
                    type="button"
                    id={id}
                    onClick={eventEdit}
                  />
                </td>
              </tr>
            );
          })}

          {/* {table === [] && (
                <tr>
                  <td colSpan={5}>Loading...</td>
                </tr>
              )} */}
          {/* {table &&
            Object.entries(table).map((i) => {
              const { gender, id, name, phone } = i[1];
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>{gender}</td>
                  <td>
                    <AiTwotoneDelete
                      color="red"
                      type="button"
                      id={id}
                      onClick={eventDel}
                    />
                  </td>
                  <td>
                    <TbEdit
                      color="orange"
                      type="button"
                      id={id}
                      onClick={eventEdit}
                    />
                  </td>
                </tr>
              );
            })}*/}
        </tbody>
      </Table>
    </Container>
  );
};

export default TableComponent;
