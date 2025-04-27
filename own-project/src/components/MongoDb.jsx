// import React, { useEffect } from 'react'

// useEffect( () => {
//     fetch('https://mongodb-atlas-0atl.onrender.com')
//     .then(response => response.json())
//     .then(data => console.log(data))
// })

// function MongoDb() {
//   return (
//     <div>
//       <p>This is my mongodb Component.</p>
//     </div>
//   )
// }

// export default MongoDb;


import { useState, useEffect } from "react";

function MongoDb() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://mongodb-atlas-0atl.onrender.com/students")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
            })
            .catch((err) => console.error("Error fetching students:", err));
    }, []);
    return (<>


        {data.map((students) => (
            <div key={students._id}>
                <h4>{students.name}</h4>
                <p>{students.rollNumber}</p>
                <p>{students.year}</p>
                <p>{students.coursesEnrolled}</p>
            </div>
        ))}

    </>)
}

export default MongoDb;