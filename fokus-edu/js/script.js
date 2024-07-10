(function() {
    "use strict";
  
    /**
     * Mobile nav toggle
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  
    function mobileNavToogle() {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  
    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
  
    });
  
    /**
     * Toggle mobile nav dropdowns
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
      navmenu.addEventListener('click', function(e) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      });
    });
  
  
  
    /**
     * Scroll top button
     */
    let scrollTop = document.querySelector('.scroll-top');
  
    function toggleScrollTop() {
      if (scrollTop) {
        window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
      }
    }
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  

  
  })();


  
/**
   * resume generator
   */

document.addEventListener('DOMContentLoaded', function() {
    loadFormData();
  
    document.getElementById('resume-form').addEventListener('submit', function(event) {
        event.preventDefault();
        generateResume();
    });
  });
  
  function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const profile = document.getElementById('profile').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const projects = document.getElementById('projects').value;
    const certifications = document.getElementById('certifications').value;
    const languages = document.getElementById('languages').value;
    const references = document.getElementById('references').value;
    const photo = document.getElementById('photo').files[0];
  
    let photoURL = '';
    if (photo) {
        const reader = new FileReader();
        reader.onloadend = function() {
            photoURL = reader.result;
            displayResume(photoURL);
        };
        reader.readAsDataURL(photo);
    } else {
        displayResume(photoURL);
    }
  
    function displayResume(photoURL) {
        const resume = `
            <div class="resume-content">
                ${photoURL ? `<img src="${photoURL}" alt="Profile Picture">` : ''}
                <h2>${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <h3>Profile Summary</h3>
                <p>${profile}</p>
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Experience</h3>
                <p>${experience}</p>
                <h3>Skills</h3>
                <p>${skills}</p>
                <h3>Projects</h3>
                <p>${projects}</p>
                <h3>Certifications</h3>
                <p>${certifications}</p>
                <h3>Languages</h3>
                <p>${languages}</p>
                <h3>References</h3>
                <p>${references}</p>
            </div>
        `;
    
        document.getElementById('resume').innerHTML = resume;
  
        saveFormData();
    }
  }
  
  function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const profile = document.getElementById('profile').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const projects = document.getElementById('projects').value;
    const certifications = document.getElementById('certifications').value;
    const languages = document.getElementById('languages').value;
    const references = document.getElementById('references').value;
    const photo = document.getElementById('photo').files[0];
  
    const headers = [
        { title: 'Profile Summary', value: profile },
        { title: 'Education', value: education },
        { title: 'Experience', value: experience },
        { title: 'Skills', value: skills },
        { title: 'Projects', value: projects },
        { title: 'Certifications', value: certifications },
        { title: 'Languages', value: languages },
        { title: 'References', value: references }
    ];
  
    // Function to add text with bold header
    function addSection(doc, y, title, text) {
        doc.setFont('helvetica', 'bold');
        doc.text(title, 20, y);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(text, 170);
        doc.text(lines, 20, y + 10);
        return y + 10 + lines.length * 10;
    }
  
    let y = 20;
  
    if (photo) {
        const reader = new FileReader();
        reader.onloadend = function() {
            const imgData = reader.result;
            doc.addImage(imgData, 'JPEG', 20, y, 50, 50);
            y += 60;
            addTextContent();
        };
        reader.readAsDataURL(photo);
    } else {
        addTextContent();
    }
  
    function addTextContent() {
        y = addSection(doc, y, 'Name:', name);
        y = addSection(doc, y, 'Email:', email);
        y = addSection(doc, y, 'Phone:', phone);
  
        headers.forEach(header => {
            if (header.value) {
                y = addSection(doc, y, header.title + ':', header.value);
            }
        });
  
        doc.save('resume.pdf');
    }
  }
  
  function saveFormData() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        profile: document.getElementById('profile').value,
        education: document.getElementById('education').value,
        experience: document.getElementById('experience').value,
        skills: document.getElementById('skills').value,
        projects: document.getElementById('projects').value,
        certifications: document.getElementById('certifications').value,
        languages: document.getElementById('languages').value,
        references: document.getElementById('references').value
    };
  
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
  }
  
  function loadFormData() {
    const formData = JSON.parse(localStorage.getItem('resumeFormData'));
    if (formData) {
        document.getElementById('name').value = formData.name;
        document.getElementById('email').value = formData.email;
        document.getElementById('phone').value = formData.phone;
        document.getElementById('profile').value = formData.profile;
        document.getElementById('education').value = formData.education;
        document.getElementById('experience').value = formData.experience;
        document.getElementById('skills').value = formData.skills;
        document.getElementById('projects').value = formData.projects;
        document.getElementById('certifications').value = formData.certifications;
        document.getElementById('languages').value = formData.languages;
        document.getElementById('references').value = formData.references;
    }
  }