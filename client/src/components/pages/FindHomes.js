// API CALL
// get '/api/agents' (onMount) => agents
// get '/api/agents/:id' (onAgent Select) => buyers for a given agent
// get '/api/buyers/:id' (onBUyer Select) => properties for a given buyer

import axios from 'axios';
import {useState, useEffect} from 'react'
import { Form } from 'react-bootstrap';

const FindHomes = () => {

  const [agents, setAgents] = useState(null)
  const [buyers, setBuyers] = useState(null)
  const [properties, setProperties] = useState(null)

  useEffect(()=>{
    getAgents()
  },[])
  
  const getAgents = async()=>{
    try{
      let res = await axios.get('/api/agents')
      setAgents(res.data)
    } catch(err){
       alert('err in getAgents')
    }
  }

  const getBuyers = async(e)=>{
    let id = e.target.value
    try{
      let res = await axios.get(`/api/agents/${id}`)
      setBuyers(res.data)
    } catch(err){
      alert('err in getBuyers')
    }
  }

  const getProperties = async(e)=>{
    let id = e.target.value
    try{
      let res = await axios.get(`/api/buyers/${id}`)
      setProperties(res.data)
    } catch(err){
      alert('err in getBuyers')
    }
  }

  const renderAgentSelect = () => {
    return (
      <Form.Select label='Select'  onChange={getBuyers} aria-label="Select Agent">
        <option value="" disabled selected hidden>Please Choose...</option>
        {agents.map((agent) => (
          <option value={agent.id}>{agent.first_name}</option>
        ))}
      </Form.Select>
    );
  };

  const renderBuyerSelect = () => {
    return (
      <Form.Select label='Select'  onChange={getProperties} aria-label="Select Buyer">
        <option value="" disabled selected hidden>Please Choose...</option>
        {buyers.map((buyer) => (
          <option value={buyer.id}>{buyer.first_name}</option>
        ))}
      </Form.Select>
    );
  };

  const renderProperties = ()=>{
    if(!properties){
      return <p>properties undefined this mean you haven't select a buyer</p>
    }
    if(properties.length === 0){
      return <p>no properties match desired cities and price range for selected buyer</p>
    }
    return properties.map((p)=>{
      return(
        <div key={p.id} style={{border:'1px solid', margin:'10px'}}>
          <p>Price: {p.price}</p>
          <p>city: {p.city}</p>
          <p>square footage: {p.sq_ft}</p>
        </div>
      )
    })
  }

  return (
    <div>
      <h1>FindHomes</h1>
       {agents && renderAgentSelect()}
       {buyers && renderBuyerSelect()}
       {renderProperties()}
    </div>
  );
};
export default FindHomes;
