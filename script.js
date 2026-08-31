/* =========================================
   INFINITY ACADEMY
   K. ABILAN
   Faculty of Engineering (Undergraduate)
   Mathematics Tutor
========================================= */


/* STUDENTS */

let students = [
    {
        id: "IA001",
        name: "Student One",
        grade: "Grade 10",
        phone: "0771234567"
    },

    {
        id: "IA002",
        name: "Student Two",
        grade: "Grade 10",
        phone: "0772345678"
    },

    {
        id: "IA003",
        name: "Student Three",
        grade: "Grade 11",
        phone: "0773456789"
    }
];


/* RESULTS */

let results = [

    {
        student: "Student One",
        grade: "Grade 10",
        test: "Unit Test 01",
        part1: 75,
        part2: 80
    },

    {
        student: "Student Two",
        grade: "Grade 10",
        test: "Unit Test 01",
        part1: 60,
        part2: 70
    },

    {
        student: "Student Three",
        grade: "Grade 11",
        test: "Model Paper 01",
        part1: 85,
        part2: 90
    }

];


/* FEEDBACK */

let feedback = [

    {
        name: "Student One",
        rating: 5,
        text: "The explanations were very easy to understand."
    },

    {
        name: "Student Two",
        rating: 4,
        text: "The class was very useful. I need more past-paper practice."
    },

    {
        name: "Student Three",
        rating: 5,
        text: "Difficult questions were explained clearly."
    },

    {
        name: "Student Four",
        rating: 4,
        text: "I enjoyed today's Mathematics lesson."
    }

];


/* ANNOUNCEMENTS */

let announcements = [

    {
        title: "Assignment Reminder",
        text: "Please complete and submit your Mathematics assignment before Sunday.",
        date: "31 August 2026"
    },

    {
        title: "O/L Mathematics Practice",
        text: "New examination practice questions will be discussed in the next class.",
        date: "30 August 2026"
    }

];


/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(pageId, button = null) {

    document.querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active-page");
        });


    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }


    document.querySelectorAll(".nav-item")
        .forEach(item => {
            item.classList.remove("active");
        });


    if (button) {
        button.classList.add("active");
    }


    const titles = {

        dashboard: "Dashboard",

        students: "Students",

        results: "Results",

        attendance: "Attendance",

        feedback: "Student Feedback",

        announcements: "Announcements"

    };


    document.getElementById("pageTitle").innerText =
        titles[pageId] || "Infinity Academy";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   STUDENTS
========================================= */

function renderStudents() {

    const table =
        document.getElementById("studentsTable");

    table.innerHTML = "";


    students.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.id}</td>

            <td>
                <strong>${student.name}</strong>
            </td>

            <td>${student.grade}</td>

            <td>${student.phone || "-"}</td>

            <td>

                <button
                    onclick="deleteStudent('${student.id}')"
                    style="
                    border:none;
                    background:#fee2e2;
                    color:#dc2626;
                    padding:7px 10px;
                    border-radius:6px;
                    cursor:pointer;
                    "
                >
                    Delete
                </button>

            </td>

        `;


        table.appendChild(row);

    });


    document.getElementById("totalStudents")
        .innerText = students.length;

}


/* SEARCH */

function searchStudents() {

    const search =
        document.getElementById("studentSearch")
        .value
        .toLowerCase();


    const rows =
        document.querySelectorAll("#studentsTable tr");


    rows.forEach(row => {

        row.style.display =
            row.innerText
            .toLowerCase()
            .includes(search)
                ? ""
                : "none";

    });

}


/* ADD STUDENT */

function openStudentModal() {

    document
        .getElementById("studentModal")
        .classList.add("show");

}


function addStudent(event) {

    event.preventDefault();


    const name =
        document.getElementById("newStudentName").value;

    const grade =
        document.getElementById("newStudentGrade").value;

    const phone =
        document.getElementById("newStudentPhone").value;


    const newId =
        "IA" +
        String(students.length + 1)
        .padStart(3, "0");


    students.push({

        id: newId,

        name: name,

        grade: grade,

        phone: phone

    });


    renderStudents();

    closeModal("studentModal");

    event.target.reset();


    alert(
        "Student added successfully to Infinity Academy."
    );

}


/* DELETE STUDENT */

function deleteStudent(id) {

    if (
        confirm(
            "Are you sure you want to delete this student?"
        )
    ) {

        students =
            students.filter(
                student => student.id !== id
            );


        renderStudents();

    }

}


/* =========================================
   RESULTS
========================================= */


/* CALCULATE GRADE */

function calculateGrade(mark) {

    if (mark >= 75) {
        return "A";
    }

    if (mark >= 65) {
        return "B";
    }

    if (mark >= 55) {
        return "C";
    }

    if (mark >= 35) {
        return "S";
    }

    return "W";

}


/* RENDER RESULTS */

function renderResults() {

    const table =
        document.getElementById("resultsTable");


    table.innerHTML = "";


    results.forEach(result => {

        const total =
            (Number(result.part1) +
             Number(result.part2)) / 2;


        const grade =
            calculateGrade(total);


        const gradeClass =
            grade.toLowerCase();


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${result.student}</strong>
            </td>

            <td>${result.grade}</td>

            <td>${result.test}</td>

            <td>${result.part1}</td>

            <td>${result.part2}</td>

            <td>
                <strong>${total.toFixed(1)}</strong>
            </td>

            <td class="grade-${gradeClass}">
                ${grade}
            </td>

        `;


        table.appendChild(row);

    });


    calculateAverage();

    renderRecentResults();

}


/* ADD RESULT */

function openResultModal() {

    document
        .getElementById("resultModal")
        .classList.add("show");

}


function addResult(event) {

    event.preventDefault();


    const student =
        document.getElementById("resultStudent").value;

    const grade =
        document.getElementById("resultGrade").value;

    const test =
        document.getElementById("testName").value;

    const part1 =
        Number(
            document.getElementById("part1").value
        );

    const part2 =
        Number(
            document.getElementById("part2").value
        );


    results.push({

        student: student,

        grade: grade,

        test: test,

        part1: part1,

        part2: part2

    });


    renderResults();

    closeModal("resultModal");

    event.target.reset();


    alert(
        "Result saved successfully."
    );

}


/* AVERAGE */

function calculateAverage() {

    if (results.length === 0) {

        document.getElementById("classAverage")
            .innerText = "0%";

        return;
    }


    let totalMarks = 0;


    results.forEach(result => {

        totalMarks +=
            (
                Number(result.part1) +
                Number(result.part2)
            ) / 2;

    });


    const average =
        totalMarks / results.length;


    document.getElementById("classAverage")
        .innerText =
        average.toFixed(1) + "%";

}


/* RECENT RESULTS */

function renderRecentResults() {

    const table =
        document.getElementById("recentResults");


    table.innerHTML = "";


    results
        .slice(-5)
        .reverse()
        .forEach(result => {

            const total =
                (
                    Number(result.part1) +
                    Number(result.part2)
                ) / 2;


            const grade =
                calculateGrade(total);


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${result.student}</td>

                <td>${result.grade}</td>

                <td>${result.test}</td>

                <td>${total.toFixed(1)}</td>

                <td class="grade-${grade.toLowerCase()}">
                    ${grade}
                </td>

            `;


            table.appendChild(row);

        });

}


/* =========================================
   FEEDBACK
========================================= */

function renderFeedback() {

    const container =
        document.getElementById("feedbackGrid");


    const recent =
        document.getElementById("recentFeedback");


    container.innerHTML = "";

    recent.innerHTML = "";


    feedback.forEach(item => {

        const stars =
            "★".repeat(item.rating) +
            "☆".repeat(5 - item.rating);


        const card =
            document.createElement("div");


        card.className =
            "feedback-card";


        card.innerHTML = `

            <div class="feedback-top">

                <span class="feedback-name">
                    ${item.name}
                </span>

                <span class="stars">
                    ${stars}
                </span>

            </div>

            <p class="feedback-text">
                "${item.text}"
            </p>

            <small>
                K. ABILAN • Mathematics Tutor
            </small>

        `;


        container.appendChild(card);

    });


    feedback
        .slice(-3)
        .reverse()
        .forEach(item => {

            const stars =
                "★".repeat(item.rating);


            const div =
                document.createElement("div");


            div.className =
                "feedback-card";


            div.style.marginBottom =
                "12px";


            div.innerHTML = `

                <div class="feedback-top">

                    <span class="feedback-name">
                        ${item.name}
                    </span>

                    <span class="stars">
                        ${stars}
                    </span>

                </div>

                <p class="feedback-text">
                    "${item.text}"
                </p>

            `;


            recent.appendChild(div);

        });


    calculateRating();

}


/* RATING */

function calculateRating() {

    if (feedback.length === 0) {

        document.getElementById("averageRating")
            .innerText = "0 / 5";

        return;

    }


    const total =
        feedback.reduce(
            (sum, item) => sum + item.rating,
            0
        );


    const average =
        total / feedback.length;


    document.getElementById("averageRating")
        .innerText =
        average.toFixed(1) + " / 5";

}


/* =========================================
   ATTENDANCE
========================================= */

function renderAttendance() {

    const table =
        document.getElementById("attendanceTable");


    table.innerHTML = "";


    students.forEach((student, index) => {

        const present =
            25 + index;


        const absent =
            index;


        const total =
            present + absent;


        const percentage =
            ((present / total) * 100)
            .toFixed(0);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${student.name}</strong>
            </td>

            <td>${student.grade}</td>

            <td>${present}</td>

            <td>${absent}</td>

            <td>
                <strong>${percentage}%</strong>
            </td>

        `;


        table.appendChild(row);

    });

}


/* =========================================
   ANNOUNCEMENTS
========================================= */

function renderAnnouncements() {

    const container =
        document.getElementById("announcementList");


    container.innerHTML = "";


    announcements
        .slice()
        .reverse()
        .forEach(item => {

            const div =
                document.createElement("div");


            div.className =
                "announcement";


            div.innerHTML = `

                <h3>
                    📢 ${item.title}
                </h3>

                <p>
                    ${item.text}
                </p>

                <small>
                    ${item.date} • K. ABILAN
                </small>

            `;


            container.appendChild(div);

        });

}


/* ADD ANNOUNCEMENT */

function addAnnouncement() {

    const title =
        prompt("Announcement title:");


    if (!title) {
        return;
    }


    const text =
        prompt("Announcement message:");


    if (!text) {
        return;
    }


    announcements.push({

        title: title,

        text: text,

        date: new Date()
            .toLocaleDateString()

    });


    renderAnnouncements();

}


/* =========================================
   MODALS
========================================= */

function closeModal(id) {

    document
        .getElementById(id)
        .classList.remove("show");

}


/* Close modal by clicking outside */

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            function(event) {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove("show");

                }

            }
        );

    });


/* =========================================
   INITIALIZE
========================================= */

function initializeApp() {

    renderStudents();

    renderResults();

    renderFeedback();

    renderAttendance();

    renderAnnouncements();

}


initializeApp();
