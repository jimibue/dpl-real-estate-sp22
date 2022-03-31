const dummyAgentProperties = [
    {
      property_id: 1,
      price: 123423,
      beds: 1,
      baths: 1,
      sq_ft: 1200,
      city: "SLC",
      zip: 84101,
      first_name: "AGENT 1",
      last_name: "YO",
      agent_id: 1,
      email: "AGENT1@GMAIL.COM",
    },
    {
      property_id: 2,
      price: 323423,
      beds: 3,
      baths: 3,
      sq_ft: 1200,
      city: "SLC",
      zip: 84103,
      first_name: "AGENT 1",
      last_name: "YO",
      agent_id: 1,
      email: "AGENT1@GMAIL.COM",
    },
    {
        property_id: 5,
        price: 323423,
        beds: 3,
        baths: 4,
        sq_ft: 13200,
        city: "SLC",
        zip: 84103,
        first_name: "AGENT 1",
        last_name: "YO",
        agent_id: 1,
        email: "AGENT1@GMAIL.COM",
      },
    {
      property_id: 3,
      price: 123423,
      beds: 1,
      baths: 1,
      sq_ft: 1200,
      city: "SLC",
      zip: 84101,
      first_name: "AGENT 2",
      last_name: "YO",
      agent_id: 2,
      email: "AGENT2@GMAIL.COM",
    },
    {
      property_id: 4,
      price: 323423,
      beds: 3,
      baths: 3,
      sq_ft: 1200,
      city: "SLC",
      zip: 84104,
      first_name: "AGENT 2",
      last_name: "YO",
      agent_id: 2,
      email: "AGENT2@GMAIL.COM",
    },
  ];

  // i want this function to go from array of objects
//   {
//     property_id: 4,
//     price: 323423,
//     beds: 3,
//     baths: 3,
//     sq_ft: 1200,
//     city: "SLC",
//     zip: 84104,
//     first_name: "AGENT 2",
//     last_name: "YO",
//     agent_id: 2,
//     email: "AGENT2@GMAIL.COM",
//   },
// ]; =>
// [
//     {
//         name: "Agent 1",
//         email: "ag1@test.com",
//         properties: [
//           {
//             price: 123456,
//             beds: 1,
//             baths: 3,
//             sq_ft: 1234,
//             street: "123 street",
//             city: "slc",
//             zip: 84019,
//           },
//           {
//             price: 223456,
//             beds: 13,
//             baths: 33,
//             sq_ft: 13234,
//             street: "123 street",
//             city: "slc",
//             zip: 84019,
//           },
//         ],
//       },
// ]
  const normalizeData = (dummyAgentProperties)=>{
     // grab all unique agents
     //grabbing all agent ids
     let agents = dummyAgentProperties.map(ap => ap.agent_id)
     let uniqueIds = [... new Set(agents)]
     let x = uniqueIds.map(uid=>{
         // properties that belong to agent
          let properties = dummyAgentProperties.filter(ap=> uid == ap.agent_id)
          // get agent name from first property
          let {first_name, last_name, email} = properties[0]
          return {name: `${first_name} ${last_name}` , email:email,properties:properties}
      })
     console.log(x)
  }

  normalizeData(dummyAgentProperties)