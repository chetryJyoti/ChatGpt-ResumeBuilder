import React, { useState } from "react";
import Loading from "./Loading";

const Home = () => {
  const [fullName, setFullName] = useState("");

  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [Github, setGithub] = useState("");

  const [currentPosition, setCurrentPosition] = useState("");
  const [currentLength, setCurrentLength] = useState(1);
  const [currentTechnologies, setCurrentTechnologies] = useState("");
  const [headshot, setHeadshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);
  //👇🏻 updates the state with user's input
  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);

  //👇🏻 removes a selected item from the list
  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };
  //👇🏻 updates an item within the list
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      headshot,
    });
    setLoading(true);
  };
  //👇🏻 Renders the Loading component you submit the form
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <h1>Resume Builder</h1>
      <p>Generate a resume with ChatGPT in few seconds</p>
      <form
        onSubmit={handleFormSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        {/* profile section */}
        <h3>Basic Details:</h3>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <br></br>
          <input
            type="text"
            required
            name="fullName"
            id="fullName"
            className="currentInput"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="photo">Profile Picture:</label>
          <br></br>
          <input
            type="file"
            name="photo"
            required
            id="photo"
            className="currentInput"
            accept="image/x-png,image/jpeg"
            onChange={(e) => setHeadshot(e.target.files[0])}
          />
        </div>

        <div className="nestedContainer">
          <div>
            <label htmlFor="phoneNo">Phone Number:</label>
            <input
              type="text"
              inputMode="numeric"
              required
              name="phoneNo"
              maxLength="10"
              className="currentInput"
              value={phoneNo}
              onChange={(e) => {
                const input = e.target.value;
                // Remove any non-numeric characters
                const numericInput = input.replace(/\D/g, "");
                // Limit the input to 10 digits
                const truncatedInput = numericInput.slice(0, 10);
                setPhoneNo(truncatedInput);
              }}
              pattern="[0-9]*"
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              name="email"
              className="currentInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="linkedin">LinkedIn URL:</label>
            <input
              type="text"
              required
              name="linkedin"
              className="currentInput"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              onPaste={(e) => {
                // Prevent pasting of non-URL values
                e.preventDefault();
                const pastedValue = e.clipboardData.getData("text/plain");
                const urlPattern =
                  /^(?:(?:https?):\/\/)?(?:www\.)?linkedin\.com\/[A-Za-z0-9_-]+$/;
                if (urlPattern.test(pastedValue)) {
                  setLinkedin(pastedValue);
                }
              }}
            />
          </div>
        </div>
        {/* experience section */}
        <h3>Experience:</h3>
        <div className="nestedContainer">
          <div>
            <label htmlFor="currentPosition">Current Position:</label>
            <input
              type="text"
              required
              name="currentPosition"
              className="currentInput"
              value={currentPosition}
              onChange={(e) => setCurrentPosition(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentLength">For how long? (year):</label>
            <input
              type="number"
              required
              name="currentLength"
              className="currentInput"
              value={currentLength}
              onChange={(e) => setCurrentLength(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="currentTechnologies">Technologies used:</label>
            <input
              type="text"
              required
              name="currentTechnologies"
              className="currentInput"
              value={currentTechnologies}
              onChange={(e) => setCurrentTechnologies(e.target.value)}
            />
          </div>
        </div>

        {companyInfo.map((company, index) => (
          <div className="nestedContainer" key={index}>
            <div className="companies">
              <label htmlFor="name">Company Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="companies">
              <label htmlFor="position">Position Held</label>
              <input
                type="text"
                name="position"
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>

            <div className="btn__group">
              {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                <button id="addBtn" onClick={handleAddCompany}>
                  Add
                </button>
              )}
              {companyInfo.length > 1 && (
                <button
                  id="deleteBtn"
                  onClick={() => handleRemoveCompany(index)}
                >
                  Del
                </button>
              )}
            </div>
          </div>
        ))}

        <button>CREATE RESUME</button>
      </form>
    </div>
  );
};

export default Home;
