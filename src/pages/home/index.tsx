import React, { useContext, Context } from "react";
import { UserContext } from "../../contexts";
import axios from "axios";

export const Home = () => {

  const callSampleAPI = () => {
    // axios.get
    // axios.post
    // axios.put
    // axios.delete
    axios.get('').then(response => response.data)
  }
  
  const userName = React.useContext(UserContext);
  return (
    // <UserContext.Consumer>
    //   {(value) => (
    //     <h2>User Name : {value}</h2>
    //   )}
    // </UserContext.Consumer>

    <h2>User Name : {userName}</h2>
  );
};
