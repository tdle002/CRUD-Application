import { VStack } from "@chakra-ui/react"
import React from "react";
import EmployeeTable from "./components/EmployeeTable.jsx";
import { useQuery } from "@tanstack/react-query";
import {baseUrl} from "../../constant/global-variable.js";
import InputEmployee from "./components/InputEmployee.jsx";
import { Button } from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";

const App = () => {

    async function fetchEmployeeDetails(params){
      // pass the URL so it's a GET request
      const res = await fetch(baseUrl);
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.error);
      }
      return data;
    };

 
  const { isPending, isError, data, error} = useQuery ({
    
  queryKey: ["employee_details"],
    queryFn: fetchEmployeeDetails,

  });

  if(isPending) return "Loading";

  if(isError) return error.message;

  console.log("data from postgres db: ", data);

  return(
    <VStack gap="6" align= "flex-start">
      <InputEmployee>
           <Dialog.Trigger asChild>
             <Button variant="outline">Add</Button>
           </Dialog.Trigger>
      </InputEmployee>
      <EmployeeTable data={data}/>
    </VStack>
  )
};

export default App;