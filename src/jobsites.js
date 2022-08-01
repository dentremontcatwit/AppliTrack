renderTheme();
import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvbph3Qpz8w_ZERUZQ-Oh5YEyZI-ulCWQ",
  authDomain: "applitrack.firebaseapp.com",
  projectId: "applitrack",
  storageBucket: "applitrack.appspot.com",
  messagingSenderId: "396436130687",
  appId: "1:396436130687:web:dca8e5f220ecb9a044284a",
  measurementId: "G-EZDMF0Q14Y",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

var userSettings = {};

//Job Site Info
const AIA = {
  logo: "images/aia.png",
  title: "American Institute of Architects",
  desc: "",
  link: "https://www.aia.org/career-center",
  industries: ["Architecture"],
};

const Angel = {
  logo: "images/angellist.png",
  title: "Angel List",
  desc: "",
  link: "https://angel.co/jobs",
  industries: ["Engineering","Computer Science","Digital Design","Product","Operations","Sales","Marketing",
               "Management"],
};

const Architects = {
  logo: "images/BSA.png",
  title: "Boston Society of Architects",
  desc: "",
  link: "https://www.architects.org/jobs",
  industries: ["Architecture"],
};

const ASID = {
  logo: "images/ASID.png",
  title: "American Society of Interior Designers",
  desc: "",
  link: "https://www.asid.org/",
  industries: ["Architecture","Interior Design",],
};

const Behance = {
  logo: "images/behance.png",
  title: "Behance",
  desc: "Jobs for designers. The JobList from creative platform Behance showcases opportunities within " +  
        "some of the top global brands, including Google, Facebook, EA, Sony, Adobe, Apple, Microsoft " + 
        "and others. You can search via company or category to help refine and narrow your results.",
  link: "https://www.behance.net/joblist?tracking_source=nav20",
  industries: ["Everything"],
};

const Biopharmguy = {
  logo: "images/BPG.png",
  title: "BioPharmGuy",
  desc: "",
  link: "https://biopharmguy.com/career-by-location.php",
  industries: ["BioTech","Biology","Chemisty"],
};

const BostonStartups = {
  logo: "images/BSG.png",
  title: "Boston Startups Guide",
  desc: "",
  link: "https://bostonstartupsguide.com/boston-startup-jobs/",
  industries: ["Engineering","Computer Science"],
};

const BIB = {
  logo: "images/BIB.png",
  title: "Built in Boston",
  desc: "",
  link: "https://www.builtinboston.com/",
  industries: ["Data Science","Digital Design", "Engineering", "Computer Science","Finance","Human Resources",
               "Legal","Marketing","Operations","Product","Management","Sales"],
};

const CollegeRecruiter = {
  logo: "images/CollegeRecruiter.png",
  title: "College Recruiter",
  desc: "",
  link: "https://collegerecruiter.com/",
  industries: [],
};

const Coroflot = {
  logo: "images/Coroflot.png",
  title: "Coroflot",
  desc: "",
  link: "https://www.coroflot.com/design-jobs",
  industries: ["Digital Design","Engineering","Design"],
};

const DesignJobs = {
  logo: "images/AIGA.png",
  title: "AIGA Design Jobs",
  desc: "",
  link: "https://designjobs.aiga.org/",
  industries: ["Digital Design","Design"],
};

const Dice = {
  logo: "images/Dice.png",
  title: "Dice",
  desc: "",
  link: "https://www.dice.com/",
  industries: ["Computer Science","Data Science", "Management",],
};

const EngineerJobs = {
  logo: "images/Engineerjobs.png",
  title: "Engineer Jobs",
  desc: "",
  link: "https://www.engineerjobs.com/",
  industries: ["Computer Science","Engineering"],
};

const GlassDoor = {
  logo: "images/Glassdoor.png",
  title: "Glassdoor",
  desc: "",
  link: "https://www.glassdoor.com/",
  industries: ["Everything"],
};

const Greentown = {
  logo: "images/Greentown.png",
  title: "Greentown Labs",
  desc: "",
  link: "https://greentownlabs.com/",
  industries: ["Engineering","Business","Data Science","Digital Design","Marketing","Operations",
               "Sales","Computer Science"],
};

const HackerRank = {
  logo: "images/HackerRank.png",
  title: "Hacker Rank",
  desc: "",
  link: "https://www.hackerrank.com/",
  industries: ["Data Science","Computer Science"],
};

const InteriorDesign = {
  logo: "images/IIDA.png",
  title: "International Interior Design Association",
  desc: "",
  link: "https://iida-jobs.careerwebsite.com/",
  industries: ["Interior Design"],
};

const Indeed = {
  logo: "images/Indeed.png",
  title: "Indeed",
  desc: "",
  link: "https://www.indeed.com/",
  industries: ["Everything"],
};

const Interships = {
  logo: "images/Chegg.png",
  title: "Chegg Internships",
  desc: "",
  link: "https://www.internships.com/",
  industries: ["Everything"],
};

const Krop = {
  logo: "images/Krop.png",
  title: "Krop",
  desc: "",
  link: "https://www.krop.com/creative-jobs/",
  industries: ["Management","Digital Design","Computer Science"],
};

const LinkedIn = {
  logo: "images/linkedin.png",
  title: "LinkedIn",
  desc: "",
  link: "https://www.linkedin.com/",
  industries: ["Everything"],
};

const NSF = {
  logo: "images/NSF.png",
  title: "National Science Foundation",
  desc: "",
  link: "https://nsf.gov/",
  industries: ["Biology","Computer Science","Engineering","Human Resources"],
};

const SimplyHired = {
  logo: "images/SimplyHired.png",
  title: "Simply Hired.",
  desc: "",
  link: "https://www.simplyhired.com/",
  industries: ["Everything"],
};

const TechReview = {
  logo: "images/MIT.png",
  title: "MIT Technology Review",
  desc: "",
  link: "https://www.technologyreview.com/open-positions/",
  industries: ["Computer Science","Data Science","Digital Design","Engineering"],
};

const USAJobs = {
  logo: "images/USA.png",
  title: "USA Jobs",
  desc: "",
  link: "https://www.usajobs.gov/",
  industries: ["Everything"],
};

const VentureLoop = {
    logo: "images/Venture.png",
    title: "Venture Loop",
    desc: "",
    link: "https://www.ventureloop.com/ventureloop/home.php",
    industries: ["Finance","Data Science","Computer Science","Engineering","Business","Human Resources",
                 "Operations"],
  };
  
  const VentureFizz = {
    logo: "images/VentureFizz.png",
    title: "Venture Fizz",
    desc: "",
    link: "https://venturefizz.com/jobs",
    industries: ["Engineering","Computer Science","Digital Design","Marketing","Sales","Human Resources",
                 "Management","Data Science"],
  };
  
  
const WayUp = {
  logo: "images/Wayup.png",
  title: "Way Up",
  desc: "",
  link: "https://www.wayup.com/",
  industries: ["Everything"],
};

const sites = [AIA, Angel, Architects, ASID, Behance, Biopharmguy, BostonStartups, BIB, CollegeRecruiter, 
               Coroflot, DesignJobs, Dice, EngineerJobs, GlassDoor, Greentown, HackerRank, InteriorDesign, 
               Indeed, Interships, Krop, LinkedIn, NSF, SimplyHired, TechReview, USAJobs, VentureFizz, 
               VentureLoop, WayUp];

const industryTags = ["Architecture","Engineering","Computer Science", "Digital Design", "Product","Operations",
                      "Sales","Marketing","Management","Interior Design","Everything","BioTech","Biology","Chemisty",
                      "Data Science", "Finance","Human Resources", "Legal", "Economics","Psychology","Business",
                      "HealthCare", "Education", "Language", "Design"];

const verifyEmail = document.querySelector("#verifyemail");
var isEmailVerified;
verifyEmail.style.display = "none";
var globalApplications;
onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = await getDoc(doc(db, "users", user.uid));
      var applications = userRef.data();
      userSettings = applications["userSettings"];
      delete applications["userSettings"];
      CreateJobSiteTable(); //Create List of Job Sites
      if (!user.emailVerified) {
        verifyEmail.style.display = "block";
        isEmailVerified = false;
      } else {
        verifyEmail.style.display = "none";
        isEmailVerified = true;
      }
    } else {
      window.location.href = "index.html";
    }
  });

  //Switch styles of objects to dark theme
function renderTheme() {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
      let [key, value] = el.split("=");
      cookie[key.trim()] = value;
    });
    if (cookie["theme"] == "night") {
      document.getElementById("nightbutton").style.display = "none";
      document.getElementById("lightbutton").style.display = "flex";
      document.getElementById("html").style.backgroundColor = "#243B53";
      document.getElementById("appTitle").style.color = "#BCCCDC";
      document.getElementById("newAppTitle").style.color = "#BCCCDC";
      document.getElementById("settingsTitle").style.color = "#BCCCDC";
      document.querySelector("nav").style.backgroundColor = "#102A43";
      var cardContents = document.querySelectorAll(".card-content");
      for (var i = 0; i < cardContents.length; i++) {
        cardContents[i].style.backgroundColor = "#334E68";
      }
      var cardFooters = document.querySelectorAll(".card-footer-item");
      for (var i = 0; i < cardFooters.length; i++) {
        cardFooters[i].style.backgroundColor = "#102A43";
        cardFooters[i];
      }
      var pTexts = document.querySelectorAll("p");
      for (var i = 0; i < pTexts.length; i++) {
        pTexts[i].style.color = "#BCCCDC";
      }
      var topButtons = document.querySelectorAll(".topbutton");
      for (var i = 0; i < topButtons.length; i++) {
        topButtons[i].style.backgroundColor = "#334E68";
      }
      var spanTexts = document.querySelectorAll("span");
      for (var i = 0; i < spanTexts.length; i++) {
        spanTexts[i].style.color = "#BCCCDC";
      }
      var modalBgs = document.querySelectorAll(".modal-content");
      for (var i = 0; i < modalBgs.length; i++) {
        modalBgs[i].style.backgroundColor = "#243B53";
      }
      var labelTexts = document.querySelectorAll("label");
      for (var i = 0; i < labelTexts.length; i++) {
        labelTexts[i].style.color = "#BCCCDC";
      }
      var h5Texts = document.querySelectorAll("h5");
      for (var i = 0; i < h5Texts.length; i++) {
        h5Texts[i].style.color = "#BCCCDC";
      }
      var modalHeaders = document.querySelectorAll("#viewModalHeader");
      for (var i = 0; i < modalHeaders.length; i++) {
        modalHeaders[i].style.backgroundColor = "#102A43";
        modalHeaders[i].style.color = "#BCCCDC";
      }
      var tableHeaders = document.querySelectorAll("tr");
      for (var i = 0; i < tableHeaders.length; i++) {
        tableHeaders[i].style.backgroundColor = "#102A43";
        tableHeaders[i].style.color = "#BCCCDC";
      }
      var tableText = document.querySelectorAll("td");
      for (var i = 0; i < tableText.length; i++) {
        tableText[i].style.color = "#BCCCDC";
      }
      var tableTextHeaders = document.querySelectorAll("th");
      for (var i = 0; i < tableTextHeaders.length; i++) {
        tableTextHeaders[i].style.color = "#BCCCDC";
      }
    } else {
      document.getElementById("nightbutton").style.display = "flex";
      document.getElementById("lightbutton").style.display = "none";
    }
  }

const siteTable = document.querySelector("#sitestable");

function CreateJobSiteTable() {
    var tableBody = document.createElement("tbody");
    for(var i = 0; i < sites.length; i++) {
      var tRow = document.createElement("tr");
      tRow.setAttribute("id", "sitetablerow");
      tRow.setAttribute("class","clickable");
      //Site Link
      var siteLink = sites[i].link;
      tRow.setAttribute("onclick","window.open('"+siteLink+"','_blank')");

      //Site Logo
      var siteLogo = document.createElement("td");
      siteLogo.setAttribute("id","siteLogoTD");
      var imageFigure = document.createElement("figure");
      var siteImg = document.createElement("img");
      siteImg.setAttribute("src", sites[i].logo);
      siteImg.setAttribute("width","500");
      siteImg.setAttribute("height","500");
      imageFigure.appendChild(siteImg);
      siteLogo.appendChild(imageFigure);

      //Site Name
      var siteName = document.createElement("td");
      siteName.setAttribute("id","siteNameTD");
      siteName.textContent = sites[i].title;

      //Site Description
      var siteDesc = document.createElement("td");
      siteDesc.textContent = sites[i].desc;
      
      tRow.appendChild(siteLogo);
      tRow.appendChild(siteName);
      tRow.appendChild(siteDesc);

      tableBody.appendChild(tRow);
    }

    siteTable.appendChild(tableBody);

    renderTheme();
}



function logout() {
    signOut(auth);
    window.location.href = "index.html";
  }
  
  function setNightMode() {
    document.cookie = "theme=night";
    renderTheme();
  }
  
  function setLightMode() {
    document.cookie = "theme=light";
    location.reload();
  }

export {
    logout,
    setLightMode,
    setNightMode,
  };