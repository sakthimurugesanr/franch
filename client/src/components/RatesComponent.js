// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const RateEditor = () => {
//   const [rates, setRates] = useState({});
//   const [selectedRegion, setSelectedRegion] = useState('');
//   const [formValues, setFormValues] = useState({ amount250: '', amount1000: '', additional500: '' });

//   useEffect(() => {
//     // Fetch the current rates from the server when the component loads
//     axios.get('http://localhost:5000/rates')
//       .then(response => setRates(response.data))
//       .catch(error => console.error('Error fetching rates:', error));
//   }, []);

//   const handleRegionChange = (event) => {
//     const region = event.target.value;
//     setSelectedRegion(region);
//     setFormValues(rates[region] || { amount250: '', amount1000: '', additional500: '' });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormValues({ ...formValues, [name]: value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (selectedRegion) {
//       const updatedRates = { ...rates, [selectedRegion]: formValues };
//       setRates(updatedRates);

//       // Send the updated rates to the server
//       axios.put('http://localhost:5000/rates', updatedRates)
//         .then(() => alert('Rates updated successfully'))
//         .catch(error => console.error('Error updating rates:', error));
//     } else {
//       alert('Please select a region');
//     }
//   };

//   return (
//     <div className="main-content">
//     <h2>Edit Rates</h2>
//     <form onSubmit={handleSubmit} className="form">
//       <div className="form-group">
//         <label>Select Region:</label>
//         <select value={selectedRegion} onChange={handleRegionChange} className="input-select">
//           <option value="">--Select Region--</option>
//           {Object.keys(rates).map((region) => (
//             <option key={region} value={region}>{region}</option>
//           ))}
//         </select>
//       </div>
//       <div className="form-group">
//         <label>Amount for 250g:</label>
//         <input
//           type="number"
//           name="amount250"
//           value={formValues.amount250}
//           onChange={handleInputChange}
//           className="input-field"
//         />
//       </div>
//       <div className="form-group">
//         <label>Amount for 1000g:</label>
//         <input
//           type="number"
//           name="amount1000"
//           value={formValues.amount1000}
//           onChange={handleInputChange}
//           className="input-field"
//         />
//       </div>
//       <div className="form-group">
//         <label>Amount for additional 500g:</label>
//         <input
//           type="number"
//           name="additional500"
//           value={formValues.additional500}
//           onChange={handleInputChange}
//           className="input-field"
//         />
//       </div>
//     </form>
//       <button type="submit" className="submit-button">Update Rates</button>
//   </div>
//   );
// };

// export default RateEditor;
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // const RateEditor = () => {
// //   const [rates, setRates] = useState({});
// //   const [selectedRegion, setSelectedRegion] = useState('');
// //   const [formValues, setFormValues] = useState({ amount250: '', amount1000: '', additional500: '' });

// //   useEffect(() => {
// //     // Fetch the current rates from the server when the component loads
// //     axios.get('http://localhost:5000/rates')
// //       .then(response => setRates(response.data))
// //       .catch(error => console.error('Error fetching rates:', error));
// //   }, []);

// //   const handleRegionChange = (event) => {
// //     const region = event.target.value;
// //     setSelectedRegion(region);
// //     setFormValues(rates[region] || { amount250: '', amount1000: '', additional500: '' });
// //   };

// //   const handleInputChange = (event) => {
// //     const { name, value } = event.target;
// //     setFormValues({ ...formValues, [name]: value });
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     if (selectedRegion) {
// //       const updatedRates = { ...rates, [selectedRegion]: formValues };
// //       setRates(updatedRates);

// //       // Send the updated rates to the server
// //       axios.put('http://localhost:5000/rates', updatedRates)
// //         .then(() => alert('Rates updated successfully'))
// //         .catch(error => console.error('Error updating rates:', error));
// //     } else {
// //       alert('Please select a region');
// //     }
// //   };

// //   return (
// //     <div className="main-content">
// //       <h2>Edit Rates</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label>Select Region:</label>
// //           <select value={selectedRegion} onChange={handleRegionChange}>
// //             <option value="">--Select Region--</option>
// //             {Object.keys(rates).map((region) => (
// //               <option key={region} value={region}>{region}</option>
// //             ))}
// //           </select>
// //         </div>
// //         <div>
// //           <label>Amount for 250g:</label>
// //           <input
// //             type="number"
// //             name="amount250"
// //             value={formValues.amount250}
// //             onChange={handleInputChange}
// //           />
// //         </div>
// //         <div>
// //           <label>Amount for 1000g:</label>
// //           <input
// //             type="number"
// //             name="amount1000"
// //             value={formValues.amount1000}
// //             onChange={handleInputChange}
// //           />
// //         </div>
// //         <div>
// //           <label>Amount for additional 500g:</label>
// //           <input
// //             type="number"
// //             name="additional500"
// //             value={formValues.additional500}
// //             onChange={handleInputChange}
// //           />
// //         </div>
// //         <button type="submit">Update Rates</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default RateEditor;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RateEditor = () => {
  // const [rates, setRates] = useState({});
  // const [selectedRegion, setSelectedRegion] = useState('');
  // const [formValues, setFormValues] = useState({ amount250: '', amount1000: '', additional500: '' });

  // useEffect(() => {
  //   // Fetch the current rates from the server when the component loads
  //   axios.get('http://localhost:5000/rates')
  //     .then(response => setRates(response.data))
  //     .catch(error => console.error('Error fetching rates:', error));
  // }, []);

  // const handleRegionChange = (event) => {
  //   const region = event.target.value;
  //   setSelectedRegion(region);
  //   setFormValues(rates[region] || { amount250: '', amount1000: '', additional500: '' });
  // };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (selectedRegion) {
  //     const updatedRates = { ...rates, [selectedRegion]: formValues };
  //     setRates(updatedRates);

  //     // Send the updated rates to the server
  //     axios.put('http://localhost:5000/rates', updatedRates)
  //       .then(() => alert('Rates updated successfully'))
  //       .catch(error => console.error('Error updating rates:', error));
  //   } else {
  //     alert('Please select a region');
  //   }
  // };

  const [rates, setRates] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('');
  const [formValues, setFormValues] = useState({ amount250: '', amount1000: '', additional500: '' });

  useEffect(() => {
    // Fetch the current rates from the server when the component loads
    axios.get('http://localhost:5000/rates')
      .then(response => setRates(response.data))
      .catch(error => console.error('Error fetching rates:', error));
  }, []);

  const handleRegionChange = (event) => {
    const region = event.target.value;
    setSelectedRegion(region);
    setFormValues(rates[region] || { amount250: '', amount1000: '', additional500: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedRegion) {
      const updatedRates = { ...rates, [selectedRegion]: formValues };
      setRates(updatedRates);

      // Send the updated rates to the server
      axios.put('http://localhost:5000/rates', updatedRates)
        .then(() => alert('Rates updated successfully'))
        .catch(error => console.error('Error updating rates:', error));
    } else {
      alert('Please select a region');
    }
  };

  return (
    <div 
    className="rate-editor-main"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", // Ensures full viewport height for vertical centering
      backgroundColor: "var(--bg-color)"
    }}
  >
    <div className="rate-editor-content" style={{
      width: "100%",
      maxWidth: "500px", // Set a max-width for the form container
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}>
      <h2 className="rate-editor-title" style={{ marginBottom: "20px" }}>Edit Rates</h2>
      <form onSubmit={handleSubmit} className="rate-editor-form" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="rate-editor-form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label className="rate-editor-label">Select Region:</label>
          <select 
            value={selectedRegion} 
            onChange={handleRegionChange} 
            className="rate-editor-input-select"
            style={{
              width: "100%",
              height: "40px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "var(--bg-color)",
              color: "var(--color-text)",
              boxSizing: "border-box", // Include padding and border in the element's total width and height
            }}
          >
            <option value="">--Select Region--</option>
            {Object.keys(rates).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="rate-editor-form-group">
          <label className="rate-editor-label">Amount for 250g:</label>
          <input
            type="number"
            name="amount250"
            value={formValues.amount250}
            onChange={handleInputChange}
            className="rate-editor-input-field"
            style={{
              width: "100%",
              height: "40px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "var(--bg-color)",
              color: "var(--color-text)",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div className="rate-editor-form-group">
          <label className="rate-editor-label">Amount for 1000g:</label>
          <input
            type="number"
            name="amount1000"
            value={formValues.amount1000}
            onChange={handleInputChange}
            className="rate-editor-input-field"
            style={{
              width: "100%",
              height: "40px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "var(--bg-color)",
              color: "var(--color-text)",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div className="rate-editor-form-group">
          <label className="rate-editor-label">Amount for additional 500g:</label>
          <input
            type="number"
            name="additional500"
            value={formValues.additional500}
            onChange={handleInputChange}
            className="rate-editor-input-field"
            style={{
              width: "100%",
              height: "40px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "var(--bg-color)",
              color: "var(--color-text)",
              boxSizing: "border-box",
            }}
          />
        </div>
        <button 
          type="submit" 
          className="rate-editor-submit-button"
          style={{
            width: "100%",
            height: "40px",
            padding: "8px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "var(--header-bg-color)",
            color: "var(--color-text-btn)",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--active-color)'} // Hover effect
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--header-bg-color)'} // Reset on hover out
        >
          Update Rates
        </button>
      </form>
    </div>
  </div>
  
  );
};

export default RateEditor;
