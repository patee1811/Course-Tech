const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // Calendar move buttons
    function renderCalendar(year, month) {
        const calendarEl = document.getElementById("calendar");
        calendarEl.innerHTML = "";
    
        const header = document.createElement("div");
        header.className = "calendar-header";
        header.innerHTML = `
          <button id="prev-month" class="arrow btn btn-outline-secondary">
            <i class="fas fa-chevron-left"></i>
          </button>
          <span id="month-title">${monthNames[month]} ${year}</span>
          <button id="next-month" class="arrow btn btn-outline-secondary">
            <i class="fas fa-chevron-right"></i>
          </button>
        `;
        calendarEl.appendChild(header);
    
        const table = document.createElement("table");
        table.className = "calendar-table";
    
        const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        dayNames.forEach(day => {
          const th = document.createElement("th");
          th.innerText = day;
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        const tbody = document.createElement("tbody");
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();
    
        const now = new Date();
        let currentDate = (now.getFullYear() === year && now.getMonth() === month)
                            ? now.getDate()
                            : null;
    
        let date = 1;
        for (let i = 0; i < 6; i++) {
          const row = document.createElement("tr");
          for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j < firstDay) {
              cell.innerText = "";
            } else if (date > totalDays) {
              cell.innerText = "";
            } else {
              cell.innerText = date;
              if (currentDate !== null && date === currentDate) {
                cell.innerHTML = `<div class="cell-content"><span class="highlight-day">${date}</span></div>`;
            } else {
                cell.innerHTML = `<div class="cell-content">${date}</div>`;
            }        
              date++;
            }
            row.appendChild(cell);
          }
          tbody.appendChild(row);
          if (date > totalDays) break;
        }
    
        table.appendChild(tbody);
        calendarEl.appendChild(table);
    }

    document.addEventListener("click", function(e) {
        if (e.target.closest("#prev-month")) {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentYear, currentMonth);
    } else if (e.target.closest("#next-month")) {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    }
  });
    renderCalendar(currentYear, currentMonth);
    function updateCalendar() {
        const now = new Date();
        renderCalendar(now.getFullYear(), now.getMonth());
    }
    updateCalendar(); 
    setInterval(updateCalendar, 60000);

// Mini Chart
const sparkData = [5, 9, 6, 18, 10, 25, 17, 30];
document.querySelectorAll('.sparkline').forEach(canvas => {
  const ctx = canvas.getContext('2d');
  const [r, g, b] = canvas.dataset.color.split(',').map(Number);
  const sparkData = JSON.parse(canvas.dataset.data);
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0,    `rgba(${r},${g},${b},0.5)`);
  grad.addColorStop(0.25, `rgba(${r},${g},${b},0.15)`);
  grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: sparkData.map((_,i)=>i),
      datasets: [{
        data: sparkData,
        borderColor: `rgba(${r},${g},${b},0.5)`,
        backgroundColor: grad,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6, 
        pointHitRadius: 10,        
        pointBackgroundColor: `rgba(${r},${g},${b},1)`,
      }]
    },
  options: {
    responsive: false,
    maintainAspectRatio: false,
    interaction: {
        mode: 'nearest',    
        intersect: false     
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        position: 'nearest',      
        xAlign: 'right',          
        yAlign: 'center',         
        caretSize: 0,             
        caretPadding: 6,
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 6,
        callbacks: {
          label: ctx => `${ctx.parsed.y}`, 
        }
      }
    }
  }
});
});
})(jQuery);

/* navbar currentpagename logic */
function updateCurrentPageName() {
  let currentPage = window.location.pathname
                         .split("/")
                         .pop()
                         .toLowerCase()
                         .split("?")[0];
  console.log("Detected page:", currentPage);
  const pageNames = {
    "index.html": "Home",
    "about.html": "About",
    "courses.html": "Course",
    "coursesdetail.html": "Course",
    "coursecontent.html": "Course",
    "createcourse.html": "Create Course",
    "certificate.html": "Certificate",
    "mycourse.html": "My Courses",
    "quizlesson.html": "Course",
    "contact.html": "Contact",
    "team.html": "Team",
    "testimonial.html": "Testimonial",
    "404.html": "Not Found",
    "studentdashboard.html": "Dashboard",
    "teacherdashboard.html": "Dashboard",
    "studentmanagement.html": "Student Management",
    "userview.html": "User View",
    "videolesson.html": "Course",
    "accountbalance.html": "Account Balance",
    "profile.html": "Profile",
    "settings.html": "Settings",
    "forum.html": "Forum",
    "forumthread.html": "Forum Thread",
    "ranking.html": "Ranking",
  };
  const pageName = pageNames[currentPage] || "Home";
  const el = document.getElementById("currentPageName");
  if (el) el.textContent = pageName;
}

document.addEventListener("DOMContentLoaded", updateCurrentPageName);