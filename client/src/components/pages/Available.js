import axios from "axios";
import { useState, useEffect } from "react";
import { ListGroup, Table } from "react-bootstrap";

const Available = (props) => {
  const [agentsProperties, setAgentsProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const normalizeData = (rawAgentProperties)=>{
    // grab all unique agents
    //grabbing all agent ids
    let agents = rawAgentProperties.map(ap => ap.agent_id)
    let uniqueIds = [... new Set(agents)]
    let agentsPropertiesData = uniqueIds.map(uid=>{
        // properties that belong to agent
         let properties = rawAgentProperties.filter(ap=> uid == ap.agent_id)
         // get agent name from first property
         let {first_name, last_name, email} = properties[0]
         return {name: `${first_name} ${last_name}` , email:email,properties:properties}
     })
    return agentsPropertiesData
 }
  
  const renderRows = (properties) => {
    return properties.map((p) => {
      return (
        <tr>
          <td>{p.price}</td>
          <td>{p.beds}</td>
          <td>{p.baths}</td>
          <td>{p.sq_ft}</td>
          <td>{p.street}</td>
          <td>{p.city}</td>
          <td>{p.zip}</td>
        </tr>
      );
    });
  };
  const renderData = () => {
    return agentsProperties.map((agent) => {
      return (
        <ListGroup.Item>
          <div>
            <h1>{agent.name}</h1>
            <p>{agent.email}</p>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Price</th>
                <th>Beds</th>
                <th>Baths</th>
                <th>SQ_FT</th>
                <th>Street!</th>
                <th>City</th>
                <th>Zip</th>
              </tr>
            </thead>
            <tbody>{renderRows(agent.properties)}</tbody>
          </Table>
        </ListGroup.Item>
      );
    });
  };

  useEffect(() => {
    getAgentsProperties();
  }, []);

  const getAgentsProperties = async () => {
    try {
      let res = await axios.get("/api/properties");
      //normalize data
      let normalizedAgentsProperties = normalizeData(res.data)
      setAgentsProperties(normalizedAgentsProperties);
      setLoading(false);
    } catch (error) {
      alert('alert error occured properties')
      console.log('error occurred')
      setLoading(false);
    }
  };

  if (loading) return <p>spinner here</p>;
  return (
    <div>
      <h1>Available</h1>
      <ListGroup>{renderData()}</ListGroup>
    </div>
  );
};

export default Available;
