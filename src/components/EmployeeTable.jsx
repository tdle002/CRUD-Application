import React from "react";
import { For, HStack, Table, Stack } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {useMutation} from "@tanstack/react-query";
import { queryClient } from "../../../frontend/utils/queryClient";
import {baseUrl} from "../../../constant/global-variable";
import {toast} from "react-hot-toast";
import InputEmployee from "./InputEmployee.jsx";
import {Dialog} from "@chakra-ui/react";

const EmployeeTable = ({data}) => {

    if(!data.length){
        return <h1>No employee data available!</h1>
    }

    const mutation = useMutation({
        mutationFn: async(id)=> {
            console.log("mutation function: ", id);

            const response = await fetch(baseUrl + '/' + id,{
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                }
            });
            const data = await response.json();
            if(!response.ok){
                throw new Error(data.error);
            }
            return data;
        },
        onError: (error) => {
            console.log(error.message);
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success("Employee details deleted!");
            //invalidate the query and pass query key
            queryClient.invalidateQueries({queryKey: ["employee_details"]});
        },
    })
    return (
            <Stack gap="10">  
                  <Table.Root size="md" variant="outline">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeader>ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Email</Table.ColumnHeader>
                        <Table.ColumnHeader>Age</Table.ColumnHeader>
                        <Table.ColumnHeader>Role</Table.ColumnHeader>
                        <Table.ColumnHeader>Salary</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {data.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell>{item.id}</Table.Cell>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.email}</Table.Cell>
                          <Table.Cell>{item.age}</Table.Cell>
                          <Table.Cell>{item.role}</Table.Cell>
                          <Table.Cell>{item.salary}</Table.Cell>
                          <Table.Cell>
                            <HStack gap="3">
                              <MdDelete size={20} className="icon" onClick = {() => mutation.mutate(item.id)}/>
                                      
                                      <InputEmployee data={item} type="update">
                                           <Dialog.Trigger asChild>
                                              <FaEdit size={20} className="icon"/>
                                           </Dialog.Trigger>
                                      </InputEmployee>
                            </HStack>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
            </Stack>
    )
};

// const items = [
//   { id: 1, name: "Toan", email: "tdle002@gmail.com", age: 21, role: "Developer", salary: 90000},
//   { id: 2, name: "Tanya", email: "tan@gmail.com", age: 26, role: "Manager", salary: 89000},
//   { id: 3, name: "Toothy", email: "tlio0@gmail.com", age: 19, role: "Developer", salary: 65000},
//   { id: 4, name: "Kevin", email: "kh001@gmail.com", age: 28, role: "Manager", salary: 34000},
//   { id: 5, name: "Jandon", email: "jll02@gmail.com", age: 22, role: "Developer", salary: 76000},
// ];

export default EmployeeTable;