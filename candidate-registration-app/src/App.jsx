import { useState, useEffect, } from "react";
import "./App.css";

function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [entries, setEntries] = useState([]);
  // const [isValidate, setIsValidate] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem("candidates");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(profilePic);
    } else {
      setPreview(null);
    }
  }, [profilePic]);

  const validate = () => {
  const isValid =
    fullName.trim() !== '' &&
    email.includes('@') &&
    /^\d{10}$/.test(phone) &&
    gender !== '' &&
    skills.length >= 2 &&
    profilePic !== null;

  // setIsValidate(isValid);
  return isValid;
};


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()){
      alert('Fill Correct data');
      return;
    }

    const newEntry = {
      id: Date.now(),
      fullName,
      email,
      phone,
      gender,
      skills,
      profilePic: preview,
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("candidates", JSON.stringify(updatedEntries));

    setFullName("");
    setEmail("");
    setPhone("");
    setGender("");
    setSkills([]);
    setProfilePic(null);
    setPreview(null);
    
  };

  const handleSkillChange = (skill) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleDelete = (id) => {
    const filtered = entries.filter((entry) => entry.id !== id);
    setEntries(filtered);
    localStorage.setItem("candidates", JSON.stringify(filtered));
  };

  return (
    <div className="App">
      <h2>Candidate Registration</h2>
      <form onSubmit={handleSubmit} style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', padding: '10px' }}>
        <input style={{padding: '10px', margin: '10px'}}
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        

        <input style={{padding: '10px', margin: '10px'}}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        

        <input style={{padding: '10px', margin: '10px'}}
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        

        <div style={{padding: '10px', margin: '10px'}}>
          Gender:
          <label>
            <input style={{padding: '10px', margin: '10px'}}
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input style={{padding: '10px', margin: '10px'}}
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
        </div>
        

        <div style={{padding: '10px', margin: '10px'}}>
          Skills:
          {["JavaScript", "React", "CSS", "DSA"].map((s) => (
            <label key={s}>
              <input style={{padding: '10px', margin: '10px'}}
                type="checkbox"
                checked={skills.includes(s)}
                onChange={() => handleSkillChange(s)}
              />
              {s}
            </label>
          ))}
        </div>
       

        <div style={{padding: '10px', margin: '10px'}}>
          Profile Picture:
          <input style={{padding: '10px', margin: '10px'}}
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        

        {preview && (
          <img src={preview} alt="Preview" width="100" height="100" />
        )}

        <button type="submit">Submit</button>
      </form>

      <h3>Registered Candidates</h3>
      <div style={{display: 'flex', gap: '10px'}}>
         {entries.map((entry) => (
        <div
          key={entry.id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <img
            src={entry.profilePic}
            alt={entry.fullName}
            width="100"
            height="100"
          />
          <p>
            <strong>Name:</strong> {entry.fullName}
          </p>
          <p>
            <strong>Email:</strong> {entry.email}
          </p>
          <p>
            <strong>Phone:</strong> {entry.phone}
          </p>
          <p>
            <strong>Gender:</strong> {entry.gender}
          </p>
          <p>
            <strong>Skills:</strong> {entry.skills.join(", ")}
          </p>
          <button onClick={() => handleDelete(entry.id)}>Delete</button>
        </div>
      ))}
      </div>
     
    </div>
  );
}

export default App;
