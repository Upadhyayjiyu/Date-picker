const dateInput = document.getElementById("dateInput");
const datepicker = document.getElementById("datepicker");

let currentDate = new Date();
let selectedDate = null;

// Show calendar
dateInput.addEventListener("click", () => {
  datepicker.style.display = "block";
  renderCalendar(currentDate);
});

// Render calendar function
function renderCalendar(date) {
  datepicker.innerHTML = "";

  const month = date.getMonth();
  const year = date.getFullYear();

  // Header
  const header = document.createElement("div");
  header.classList.add("dp-header");
  header.innerHTML = `<h3 style="margin-bottom:1rem;">${date.toLocaleString("default",{month:"long"})} ${year}</h3>`;
  datepicker.appendChild(header);

  // Table
  const table = document.createElement("table");

  // Weekdays
  const weekdays = ["Su","Mo","Tu","We","Th","Fr","Sa"];
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  weekdays.forEach(day=>{
    const th=document.createElement("th");
    th.textContent=day;
    trHead.appendChild(th);
  });
  thead.appendChild(trHead);
  table.appendChild(thead);

  // Dates
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month+1, 0).getDate();
  const tbody = document.createElement("tbody");
  let row = document.createElement("tr");

  for(let i=0;i<firstDay;i++){
    row.appendChild(document.createElement("td"));
  }

  for(let d=1; d<=lastDate; d++){
    const cell=document.createElement("td");
    cell.textContent=d;

    const cellDate=new Date(year, month, d);
    if(selectedDate && cellDate.toDateString()===selectedDate.toDateString()){
      cell.classList.add("selected");
    }

    cell.addEventListener("click",()=>{
      selectedDate=cellDate;
      dateInput.value=cellDate.toISOString().split("T")[0];
      datepicker.style.display="none";
    });

    row.appendChild(cell);
    if((firstDay+d)%7===0){
      tbody.appendChild(row);
      row=document.createElement("tr");
    }
  }

  tbody.appendChild(row);
  table.appendChild(tbody);
  datepicker.appendChild(table);
}
