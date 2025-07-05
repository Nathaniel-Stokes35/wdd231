const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const navbtn = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
const allbtn = document.querySelector('#all-btn');
const csebtn = document.querySelector('#cse-btn'); 
const wddbtn = document.querySelector('#wdd-btn');
const daybtn = document.querySelector('#day-btn');
const compCont = document.querySelector('#comp-container');
const yearCont = document.querySelector('#curr-year');
const modCont = document.querySelector('#last-mod');

const today = new Date();
const hour = new Date().getHours();
const isDayTime = hour >= 7 && hour < 19; 

const modRaw = document.lastModified;
const modDate = new Date(modRaw);

const options = { year: 'numeric', month: 'long', day: 'numeric' };
const modified_date = modDate.toLocaleDateString(undefined, options);

let activeSubjects = new Set(); 

document.body.classList.add(isDayTime ? 'day' : 'night'); // Between 7AM and 7PM is "day"

yearCont.innerHTML = today.getFullYear();
modCont.innerHTML = `Last Modified: ${modified_date}`;

function updateCompletedCredits(coursesCount) {
    const creditsBox = document.querySelector('#course-credits');
    const totalCompletedCredits = coursesCount
    .filter(course => course.completed)
    .reduce((sum, course) => sum + course.credits, 0);

    if (coursesCount.length === 0) {
        creditsBox.innerHTML = `No Courses Selected`
    } else {
        creditsBox.innerHTML = `Total number of completed credits: ${totalCompletedCredits}`;
    }
}

function toggleSubject(subject) {
    if (activeSubjects.has(subject)) {
        activeSubjects.delete(subject);
    } else {
        activeSubjects.add(subject);
    }

    if (activeSubjects.size === 0) {
        clearCourses();
    } else {
        const filtered = courses.filter(course => activeSubjects.has(course.subject));
        renderCourses(filtered);
        updateCompletedCredits(filtered);
    }
}

function toggleButtonState() {
    const wddStatus = document.querySelector('#wdd-btn .status');
    const cseStatus = document.querySelector('#cse-btn .status');

    if (activeSubjects.has('WDD')) {
        wddbtn.classList.add('active');
        wddStatus.textContent = 'On';
    } else {
        wddbtn.classList.remove('active');
        wddStatus.textContent = 'Off';
    }

    if (activeSubjects.has('CSE')) {
        csebtn.classList.add('active');
        cseStatus.textContent = 'On';
    } else {
        csebtn.classList.remove('active');
        cseStatus.textContent = 'Off';
    }
}

function renderCourses(courseArray) {
    compCont.innerHTML = ''; 
    courseArray.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course-card');
        if (course.completed) courseDiv.classList.add('completed');
        
        courseDiv.innerHTML = `
        <h4>${course.subject} ${course.number} - ${course.title} ${course.completed ? '&#10004;' : ''}</h4>
        <p>Credits: ${course.credits}</p>
        <p>${course.description}</p>
        `;
        compCont.appendChild(courseDiv);
    });
    compCont.classList.add('show');
    updateCompletedCredits(courseArray);
    toggleButtonState();
}

function clearCourses() {
    compCont.innerHTML = '';
    compCont.classList.remove('show');
    updateCompletedCredits([]);
}

navbtn.addEventListener('click', () => {
    navbtn.classList.toggle('show');
    navLinks.classList.toggle('show');
});

allbtn.addEventListener('click', () => {
    if (activeSubjects.size === 0 || activeSubjects.size < 2) {
        activeSubjects = new Set(['WDD', 'CSE']);
        const filtered = courses.filter(course => activeSubjects.has(course.subject));
        renderCourses(filtered);
        updateCompletedCredits(filtered);
    } else {
        activeSubjects.clear();
        clearCourses();
        updateCompletedCredits([]);
        toggleButtonState();
    }
});

wddbtn.addEventListener('click', () => {
    toggleSubject('WDD') 
    toggleButtonState();
});
csebtn.addEventListener('click', () => {
    toggleSubject('CSE')
    toggleButtonState();
});

daybtn.addEventListener('click', () => {
    document.body.classList.toggle('day');
    document.body.classList.toggle('night');
});