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
      <div>
        <h6>About</h6>
      </div>
      <div className="page1">
        <img src="" alt="image1" />
        <p>text</p>
        <button onClick={toggleTwo}>Next</button>
      </div>
      <div className="page2" style={{ display: "none" }}>
        <img src="" alt="img2" />
        <p>text</p>
        <button onClick={toggleOne}>Previous</button>
        <button onClick={toggleThree}>Next</button>
      </div>
      <div className="page3" style={{ display: "none" }}>
        <img src="" alt="img3" />
        <p>text</p>
        <button onClick={toggleTwo}>Previous</button>
        <button onClick={toggleFour}>Next</button>
      </div>
      <div className="page4" style={{ display: "none" }}>
        <img src="" alt="img4" />
        <p>text</p>
        <button onClick={toggleThree}>Previous</button>
        <button onClick={toggleDone}>Done</button>
      </div>
    </div>
  );
};

export default About;
