import "../styles/About.css";

const About = ({ toggleDone }) => {
  const toggleOne = () => {
    document.querySelector(".page1").style.display = "block";
    document.querySelector(".page2").style.display = "none";
    document.querySelector(".page3").style.display = "none";
    document.querySelector(".page4").style.display = "none";
  };

  const toggleTwo = () => {
    document.querySelector(".page1").style.display = "none";
    document.querySelector(".page2").style.display = "block";
    document.querySelector(".page3").style.display = "none";
    document.querySelector(".page4").style.display = "none";
  };

  const toggleThree = () => {
    document.querySelector(".page1").style.display = "none";
    document.querySelector(".page2").style.display = "none";
    document.querySelector(".page3").style.display = "block";
    document.querySelector(".page4").style.display = "none";
  };

  const toggleFour = () => {
    document.querySelector(".page1").style.display = "none";
    document.querySelector(".page2").style.display = "none";
    document.querySelector(".page3").style.display = "none";
    document.querySelector(".page4").style.display = "block";
  };

  return (
    <div className="about">
      <h1>About</h1>
      <div className="page1">
        <h2>Page 1</h2>
        <button onClick={toggleTwo}>Next</button>
      </div>
      <div className="page2" style={{ display: "none" }}>
        <h2>Page 2</h2>
        <button onClick={toggleOne}>Previous</button>
        <button onClick={toggleThree}>Next</button>
      </div>
      <div className="page3" style={{ display: "none" }}>
        <h2>Page 3</h2>
        <button onClick={toggleTwo}>Previous</button>
        <button onClick={toggleFour}>Next</button>
      </div>
      <div className="page4" style={{ display: "none" }}>
        <h2>Page 4</h2>
        <button onClick={toggleThree}>Previous</button>
        <button onClick={toggleDone}>Done</button>
      </div>
    </div>
  );
};

export default About;
