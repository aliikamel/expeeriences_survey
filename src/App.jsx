import React, { useState } from "react";
import universitiesData from "./universities_by_country.json";
import universitySubjects from "./course_names.json";
import Select from "react-select";
import AutoResizeTextarea from "./AutoResizeText";

function App() {
  const results_url =
    "https://script.google.com/macros/s/AKfycbw32AdREjE5lPz11ozW-nEkGYHXGp5b2DTfixnfaTsUQySW4_K9y_1uWTMvBzNT2J3iHQ/exec";

  // CSS CLASS NAMES
  const number_class = "text-base text-gray-500 mr-2 font-bold";
  const input_label = "block mb-2 text-sm font-medium text-white";
  const input_class =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedLocationToWork, setSelectedLocationToWork] = useState(null);
  const [loading, setLoading] = useState(false);
  // State to store the selected answer for the internship issue
  const [q9Answer, setQ9Answer] = useState(null);
  const [q10Answer, setQ10Answer] = useState(null);
  const [q11Answer, setQ11Answer] = useState(null);
  const [q14Answer, setQ14Answer] = useState(null);

  let survey_submitted = localStorage.getItem("completedSurvey") || false;

  const [completedSurvey, setCompletedSurvey] = useState(survey_submitted);
  const [completedSurveyError, setCompletedSurveyError] = useState(null);
  console.log(Object.keys(universitiesData).length);
  const countryOptions = Object.keys(universitiesData)
    .sort()
    .map((key) => ({
      value: key,
      label: key,
    }))
    .sort();

  let locationToWorkOptions = Object.keys(universitiesData)
    .sort()
    .map((key) => ({
      value: key,
      label: key,
    }));

  locationToWorkOptions.unshift({ value: "Remote", label: "Remote" });

  let universities_list = selectedCountry
    ? universitiesData[selectedCountry.value].sort()
    : [];

  const universityOptions = selectedCountry
    ? universities_list.map((university) => ({
        value: university,
        label: university,
      }))
    : [];

  universitySubjects.sort();
  let universityCourseOptions = universitySubjects.map((course) => ({
    value: course,
    label: course,
  }));

  universityCourseOptions.push({ value: "Other", label: "Other" });

  let schoolCurriculumOptions = [
    { value: "British", label: "British National Curriculum" },
    { value: "IB", label: "International Baccalaureate (IB)" },
    { value: "U.S", label: "U.S. Curriculum" },
    { value: "Other", label: "Other" },
  ];

  const yes_or_no = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const education = [
    { value: "University", label: "Higher Level Education/University" },
    { value: "School", label: "School" },
  ];

  const q11Options = [
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

  const handleEducationChange = (selectedOption) => {
    setSelectedEducation(selectedOption);
    setSelectedUniversity(null);
    setSelectedProgram(null);
  };

  const handleUniversityChange = (selectedOption) => {
    setSelectedUniversity(selectedOption);
  };

  const handleProgramChange = (selectedOption) => {
    setSelectedProgram(selectedOption);
  };

  const handleLocationToWorkChange = (selectedOption) => {
    setSelectedLocationToWork(selectedOption);
  };

  // Handle change for the yes/no question
  const handleQ9Change = (selectedOption) => {
    setQ9Answer(selectedOption);
  };

  const handleQ10Change = (selectedOption) => {
    setQ10Answer(selectedOption);
  };

  const handleQ11Change = (selectedOption) => {
    setQ11Answer(selectedOption);
  };

  const handleQ14Change = (selectedOption) => {
    setQ14Answer(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = e.target;
    setLoading(true);

    let country = selectedCountry.value;
    let education = selectedEducation.value;

    let educational_institute =
      education === "University" ? selectedUniversity.value : data.q5.value;

    let formattedSurveyData = {
      name: data.full_name.value,
      email: data.email.value,
      country: country,
      education: education,
      educational_institute: educational_institute,
      program: selectedProgram.value,
      industry: data.q7.value,
      location: selectedLocationToWork.value,
      Question_9: q9Answer.value,
      Question_10: q10Answer.value,
      Question_11: q11Answer.value,
      Question_12: data.q12.value,
      Question_13: data.q13.value,
      Question_14: q14Answer.value,
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
        console.log("form submitted");
        localStorage.setItem("completedSurvey", true);
        setCompletedSurvey(true);
        // Handle further actions after successful submission, like showing a message
      })
      .catch((error) => {
        console.error("Failed to submit data:", error);
        localStorage.setItem("completedSurvey", true);
        setCompletedSurvey(true);
        setCompletedSurveyError(true);
        // Handle errors here if the submission failed
      });
  };

  return completedSurvey ? (
    completedSurveyError ? (
      <div className="h-screen w-full bg-blue-100 p-36">
        <div className="mx-auto w-1/2 bg-gray-800 rounded-xl">
          <div className="p-24 bg-teal-900 rounded-xl">
            <h1 className="text-3xl text-center font-bold leading-tight tracking-tight text-gray-200">
              Thank you for your submission!
            </h1>
            <h3 className="text-red-300 text-center p-2">
              However there was an error. Please click the below link as an
              alternative for the survey, Thank you!
            </h3>
            <div className="flex items-center justify-center p-4">
              <a
                className="text-gray-300 mx-auto underline"
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=hfFpVS_SE06YUM5bGrzS6EEjjLJV9upEqE4Hxv7tbDNUQUo1VEIzQ0tUOTBCN0Q3SUxLVTNHN0I0NC4u"
              >
                Click Here
              </a>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="h-screen w-full bg-blue-100 p-12 pt-24 xl:p-36">
        <div className="mx-auto w-full xl:w-1/2 bg-gray-800 rounded-xl">
          <div className="p-12 xl:p-24 bg-teal-900 rounded-xl">
            <h1 className="text-2xl xl:text-3xl text-center font-bold leading-tight tracking-tight text-gray-200">
              Thank you for your submission!
            </h1>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="h-full w-full bg-blue-100 xl:p-36 p-6 pt-12">
      <div className="mx-auto xl:w-1/2 bg-gray-800 rounded-xl">
        <div className="p-8 bg-teal-900 rounded-t-xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-200">
            Student Survey
          </h1>
        </div>

        <form className="p-4 xl:p-16 flex flex-col" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 xl:gap-12">
            <div className="mb-4 xl:mb-16 col-span-2 xl:col-span-1">
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
            <div className="mb-4 xl:mb-16 col-span-2 xl:col-span-1">
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

          <div className="grid grid-cols-2 xl:gap-24">
            <div className="mb-4 xl:mb-16 col-span-2">
              <label htmlFor="country" className={input_label}>
                <span className={number_class}>3.</span> Which country are you
                located in?{" "}
                <span className="text-gray-300">{"(where you study)"} </span>
                <span className="text-red-500">*</span>
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

          <div className="grid grid-cols-2 xl:gap-24">
            <div className="mb-4 xl:mb-16 col-span-2">
              <label htmlFor="country" className={input_label}>
                <span className={number_class}>4.</span> What level of education
                are you currently pursuing?{" "}
                <span className="text-red-500">*</span>
              </label>
              <Select
                name="country"
                type="text"
                id="country"
                className=""
                options={education}
                onChange={handleEducationChange}
                value={selectedEducation}
                placeholder="Select an option"
                isClearable
                isSearchable
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 xl:gap-12">
            {selectedEducation && selectedEducation.value === "University" && (
              <>
                <div className="mb-4 xl:mb-16 col-span-2 xl:col-span-1 transition-all duration-300 ease-in-out">
                  <label htmlFor="university" className={input_label}>
                    <span className={number_class}>5.</span> Which university do
                    you study at? <span className="text-red-500">*</span>
                  </label>
                  <Select
                    type="text"
                    id="university"
                    options={universityOptions}
                    onChange={handleUniversityChange}
                    value={selectedUniversity}
                    placeholder={
                      selectedCountry
                        ? "Select a university"
                        : "Select a country first"
                    }
                    isClearable
                    isSearchable
                    isDisabled={!selectedCountry}
                    required
                  />
                </div>
                <div className="mb-4 xl:mb-16 col-span-2 xl:col-span-1">
                  <label htmlFor="program" className={input_label}>
                    <span className={number_class}>6.</span>What is your
                    program? <span className="text-red-500">*</span>
                  </label>
                  <Select
                    type="text"
                    id="program"
                    options={universityCourseOptions}
                    onChange={handleProgramChange}
                    value={selectedProgram}
                    placeholder="Select a Course, or other if not available"
                    isClearable
                    isSearchable
                    required
                  />
                </div>
              </>
            )}
            {selectedEducation && selectedEducation.value === "School" && (
              <>
                <div className="mb-4 xl:mb-16 col-span-2 xl:col-span-1 transition-all duration-300 ease-in-out">
                  <label htmlFor="university" className={input_label}>
                    <span className={number_class}>5.</span> Which school do you
                    study at? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="q5"
                    id="q5"
                    required
                    className={input_class}
                  />
                </div>
                <div className="mb-4 xl:mb-16 col-span-2 xl:col-span-1">
                  <label htmlFor="program" className={input_label}>
                    <span className={number_class}>6.</span>What is your
                    curriculum? <span className="text-red-500">*</span>
                  </label>
                  <Select
                    type="text"
                    id="program"
                    options={schoolCurriculumOptions}
                    onChange={handleProgramChange}
                    value={selectedProgram}
                    placeholder="Select a Curriculum, or other if not available"
                    isClearable
                    isSearchable
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-4 xl:mb-16 col-span-2">
              <label htmlFor="q6" className={input_label}>
                <span className={number_class}>7.</span>What industry do you
                want to work in post-graduation?{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="q7"
                name="q7"
                className={input_class}
                required
              />
            </div>
          </div>

          <div className="mb-4 xl:mb-16 col-span-2 xl:col-span-1">
            <label htmlFor="location" className={input_label}>
              <span className={number_class}>8.</span>Where do you want to
              pursue a career? <span className="text-red-500">*</span>
            </label>
            <Select
              type="text"
              id="location"
              options={locationToWorkOptions}
              onChange={handleLocationToWorkChange}
              value={selectedLocationToWork}
              placeholder="Select a Country, or Remote"
              isClearable
              isSearchable
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-4 xl:mb-16 col-span-2">
              <label htmlFor="q9" className={input_label}>
                <span className={number_class}>9.</span>Do you face issues with
                getting internships?{" "}
                <span className="text-gray-300">
                  (Not enough space for interns, Under qualified).
                </span>
                <span className="text-red-500">*</span>
              </label>
              <Select
                type="text"
                id="q9"
                options={yes_or_no}
                onChange={handleQ9Change}
                value={q9Answer}
                placeholder="Yes or No"
                isClearable
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="mb-4 xl:mb-16 col-span-2">
              <label htmlFor="q10" className={input_label}>
                <span className={number_class}>10.</span>Do you agree with this
                statement?{" "}
                <span className="text-gray-300 italic">
                  "Students are being rejected to internships due to a lack of
                  experience"
                </span>{" "}
                <span className="text-red-500">*</span>
              </label>
              <Select
                type="text"
                id="q10"
                options={yes_or_no}
                onChange={handleQ10Change}
                value={q10Answer}
                placeholder="Yes or No"
                isClearable
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-4 xl:mb-16 col-span-2">
              <label htmlFor="q11" className={input_label}>
                <span className={number_class}>11.</span>How likely are you to
                utilize a free service that provides real world work simulations
                partnered up with multinational institutions within your
                preferred field?{" "}
                <span className="text-gray-300">
                  (completion certification will have a small charge associated
                  with it).
                </span>
                <span className="text-red-500">*</span>
              </label>
              <Select
                type="text"
                id="q11"
                options={q11Options}
                onChange={handleQ11Change}
                value={q11Answer}
                placeholder="Select an option"
                isClearable
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-4 xl:mb-16 col-span-2">
              <label htmlFor="q12" className={input_label}>
                <span className={number_class}>12.</span>What additional
                features would you find valuable in this service that can help
                you with your career path?{" "}
                <span className="text-red-500">*</span>
              </label>
              <AutoResizeTextarea name="q12" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-4 xl:mb-16 col-span-2">
              <label htmlFor="q13" className={input_label}>
                <span className={number_class}>13.</span>How much would you pay
                for the certifications to add to your resume?{" ($0-100)"}
                <br />{" "}
                <span className="text-gray-300">
                  (note: Certifications are acquired after the free simulation
                  at a price and are recognized by that partner company).
                </span>{" "}
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
                  id="q13"
                  name="q13"
                  className="block p-3 w-full z-20 ps-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                  min={0}
                  max={100}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mb-4 xl:mb-16 col-span-2">
              <label htmlFor="q11" className={input_label}>
                <span className={number_class}>14.</span>Would you like to get
                waitlisted for a service like this?{" "}
                <span className="text-gray-300">
                  (You will be contacted via your provided email).
                </span>{" "}
                <span className="text-red-500">*</span>
              </label>
              <Select
                type="text"
                id="q14"
                options={yes_or_no}
                onChange={handleQ14Change}
                value={q14Answer}
                placeholder="Yes or No"
                isClearable
                required
              />
            </div>
          </div>

          {loading ? (
            <button
              disabled
              className="inline-flex mx-auto text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-xl w-full py-2 xl:px-32 xl:py-4 text-center"
            >
              <svg
                aria-hidden="true"
                className="mx-auto w-8 h-8 text-gray-200 animate-spin dark:text-gray-50 fill-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </button>
          ) : (
            <button
              type="submit"
              className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-xl w-full py-2 xl:px-32 xl:py-4 text-center"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
