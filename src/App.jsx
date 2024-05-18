import React, { useState } from "react";
import universitiesData from "./universities_by_country.json";
import Select from "react-select";
import AutoResizeTextarea from "./AutoResizeText";

function App() {
  const results_url =
    "https://script.google.com/macros/s/AKfycbyDzgbZvK_LHnUNWfJIjs2E1g747ZhAAsu6pwRvCMKSWB2rJC0BN8LyLYAIoIuNETxjiQ/exec";

  // CSS CLASS NAMES
  const number_class = "text-base text-gray-500 mr-2 font-bold";
  const input_label = "block mb-2 text-sm font-medium text-white";
  const input_class =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  // State to store the selected answer for the internship issue
  const [q7Answer, setQ7Answer] = useState(null);
  const [q8Answer, setQ8Answer] = useState(null);
  const [q9Answer, setQ9Answer] = useState(null);
  const [q12Answer, setQ12Answer] = useState(null);

  const countryOptions = Object.keys(universitiesData).map((key) => ({
    value: key,
    label: key,
  }));

  const universityOptions = selectedCountry
    ? universitiesData[selectedCountry.value].map((university) => ({
        value: university,
        label: university,
      }))
    : [];

  const yes_or_no = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const q9Options = [
    { value: "Very likely", label: "Very likely" },
    { value: "Somewhat likely", label: "Somewhat likely" },
    {
      value: "Neither likely nor unlikely",
      label: "Neither likely nor unlikely",
    },
    { value: "Somewhat unlikely", label: "Somewhat unlikely" },
    { value: "Very unlikely", label: "Very unlikely" },
  ];

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedUniversity(null); // Reset university selection when country changes
  };

  const handleUniversityChange = (selectedOption) => {
    setSelectedUniversity(selectedOption);
  };

  // Handle change for the yes/no question
  const handleQ7Change = (selectedOption) => {
    setQ7Answer(selectedOption);
  };

  const handleQ8Change = (selectedOption) => {
    setQ8Answer(selectedOption);
  };

  const handleQ9Change = (selectedOption) => {
    setQ9Answer(selectedOption);
  };

  const handleQ12Change = (selectedOption) => {
    setQ12Answer(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = e.target;

    let country = selectedCountry.value;
    let university = selectedUniversity.value;

    let formattedSurveyData = {
      name: data.full_name.value,
      email: data.email.value,
      country: country,
      university: university,
      course: data.q5.value,
      industry: data.q6.value,
      Question_7: q7Answer.value,
      Question_8: q8Answer.value,
      Question_9: q9Answer.value,
      Question_10: data.q10.value,
      Question_11: data.q11.value,
      Question_12: q12Answer.value,
    };

    console.log(formattedSurveyData);

    // Using Axios to send POST request to Google Apps Script
    fetch(results_url, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formattedSurveyData),
    })
      .then(() => {
        console.log("Data submitted successfully");
        // Handle further actions after successful submission, like showing a message
      })
      .catch((error) => {
        console.error("Failed to submit data:", error);
        // Handle errors here if the submission failed
      });
  };

  return (
    <div className="h-full w-full bg-blue-100 p-36">
      <div className="mx-auto w-1/2 bg-gray-800 rounded-xl">
        <div className="p-8 bg-teal-900 rounded-t-xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-200">
            Student Survey
          </h1>
        </div>

        <form className="p-16" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-12">
            <div className="mb-16">
              <label htmlFor="full_name" className={input_label}>
                <span className={number_class}>1.</span> Full Name{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                className={input_class}
                required
              />
            </div>
            <div className="mb-16">
              <label htmlFor="email" className={input_label}>
                <span className={number_class}>2.</span> Your email{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={input_class}
                placeholder="name@email.com"
                required
              />
            </div>
          </div>
          {/* SELECTING COUNTRY AND UNIVERSITIES */}

          <div className="grid grid-cols-2 gap-24">
            <div className="mb-16 col-span-2">
              <label htmlFor="country" className={input_label}>
                <span className={number_class}>3.</span> Which country are you
                located in <span className="text-red-500">*</span>
              </label>
              <Select
                name="country"
                type="text"
                id="country"
                className=""
                options={countryOptions}
                onChange={handleCountryChange}
                value={selectedCountry}
                placeholder="Select a country"
                isClearable
                isSearchable
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-16">
              <label htmlFor="university" className={input_label}>
                <span className={number_class}>4.</span> What is your
                university? <span className="text-red-500">*</span>
              </label>
              <Select
                type="text"
                id="university"
                options={universityOptions}
                onChange={handleUniversityChange}
                value={selectedUniversity}
                placeholder="Select a university"
                isClearable
                isSearchable
                isDisabled={!selectedCountry}
                required
              />
            </div>
            <div className="mb-16">
              <label htmlFor="q5" className={input_label}>
                <span className={number_class}>5.</span>What is your course?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="q5"
                id="q5"
                required
                className={input_class}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-16 col-span-2">
              <label htmlFor="q6" className={input_label}>
                <span className={number_class}>6.</span>What industry do you
                want to work in post graduation?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="q6"
                name="q6"
                className={input_class}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-16 col-span-2">
              <label htmlFor="q7" className={input_label}>
                <span className={number_class}>7.</span>Do you face issues with
                getting internships? (Not enough space for interns, Under
                qualified). <span className="text-red-500">*</span>
              </label>
              <Select
                type="text"
                id="q7"
                options={yes_or_no}
                onChange={handleQ7Change}
                value={q7Answer}
                placeholder="Yes or No"
                isClearable
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="mb-16 col-span-2">
              <label htmlFor="q8" className={input_label}>
                <span className={number_class}>8.</span>Do you agree with this
                statement? "Students are being rejected to internships due to a
                lack of experience"<span className="text-red-500">*</span>
              </label>
              <Select
                type="text"
                id="q8"
                options={yes_or_no}
                onChange={handleQ8Change}
                value={q8Answer}
                placeholder="Yes or No"
                isClearable
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-16 col-span-2">
              <label htmlFor="q9" className={input_label}>
                <span className={number_class}>9.</span>How likely are you to
                utilize a free service that provides real world work simulations
                partnered up with multinational institutions within your
                preferred field? (completion certification will have a small
                charge associated with it).
                <span className="text-red-500">*</span>
              </label>
              <Select
                type="text"
                id="q9"
                options={q9Options}
                onChange={handleQ9Change}
                value={q9Answer}
                placeholder="Select an option"
                isClearable
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-16 col-span-2">
              <label htmlFor="q10" className={input_label}>
                <span className={number_class}>10.</span>What additional
                features would you find valuable in this service that can help
                you with your career path?{" "}
                <span className="text-red-500">*</span>
              </label>
              <AutoResizeTextarea name="q10" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-16 col-span-2">
              <label htmlFor="q11" className={input_label}>
                <span className={number_class}>11.</span>How much would you pay
                for the certifications to add to your resume? (note:
                Certifications are acquired after the free simulation at a price
                and are recognized by that partner company).{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <span className="text-gray-500 text-xs mr-2">USD</span>
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="number"
                  id="q11"
                  name="q11"
                  className="block p-3 w-full z-20 ps-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-16 col-span-2">
              <label htmlFor="q11" className={input_label}>
                <span className={number_class}>12.</span>Would you like to get
                waitlisted for a service like this? (You will be contacted via
                your provided email)<span className="text-red-500">*</span>
              </label>
              <Select
                type="text"
                id="q12"
                options={yes_or_no}
                onChange={handleQ12Change}
                value={q12Answer}
                placeholder="Yes or No"
                isClearable
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
