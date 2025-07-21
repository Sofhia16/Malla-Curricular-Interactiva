let courses = JSON.parse(localStorage.getItem('courses')) || [];

// Crear select de semestres
const semesterSelect = document.getElementById('semesterSelect');
for (let i = 1; i <= 10; i++) {
  const option = document.createElement('option');
  option.value = i;
  option.textContent = `Semestre ${i}`;
  semesterSelect.appendChild(option);
}

function saveCourses() {
  localStorage.setItem('courses', JSON.stringify(courses));
}

function renderTables() {
  const container = document.getElementById('tablesContainer');
  container.innerHTML = '';

  for (let sem = 1; sem <= 10; sem++) {
    const semCourses = courses.filter(c => c.semester == sem);
    if (semCourses.length === 0) continue;

    const tableDiv = document.createElement('div');
    tableDiv.className = "mb-8 bg-pink-100 p-4 rounded shadow";

    const title = document.createElement('h3');
    title.className = "text-2xl mb-2";
    title.innerText = `💖 Semestre ${sem}`;
    tableDiv.appendChild(title);

    const table = document.createElement('table');
    table.className = "w-full text-left border border-pink-300";
    table.innerHTML = `
      <thead>
  <tr>
    <th class="border p-2">Nombre</th>
    <th class="border p-2">Créditos</th>
    <th class="border p-2">Prerrequisitos</th>
    <th class="border p-2">Nota definitiva</th>
    <th class="border p-2">Acciones</th>
  </tr>
</thead>

      <tbody>
  ${semCourses.map(course => `
    <tr>
      <td class="border p-2"><input type="text" value="${course.name}" data-index="${courses.indexOf(course)}" data-field="name" class="border p-1 w-full rounded"></td>
      <td class="border p-2"><input type="number" value="${course.credits}" data-index="${courses.indexOf(course)}" data-field="credits" class="border p-1 w-16 rounded"></td>
      <td class="border p-2">
        <select data-index="${courses.indexOf(course)}" data-field="relation" class="border p-1 rounded w-full">
          <option value="">Sin prerrequisito</option>
          ${courses.map(c => `<option value="${c.name}" ${c.name === course.relation ? 'selected' : ''}>${c.name}</option>`).join('')}
        </select>
      </td>
      <td class="border p-2">
        <input type="number" step="0.1" min="0" max="5" 
  value="${course.grade || ''}" 
  data-index="${courses.indexOf(course)}" 
  data-field="grade" 
  class="border p-1 w-20 rounded text-center bg-white" />
</td>
      <td class="border p-2"><button data-index="${courses.indexOf(course)}" class="deleteCourse bg-red-500 text-white px-2 py-1 rounded">Eliminar</button></td>
    </tr>
  `).join('')}
</tbody>

    `;
    tableDiv.appendChild(table);

    // Total créditos
    const totalCredits = semCourses.reduce((sum, c) => sum + parseInt(c.credits || 0), 0);
    const creditsDiv = document.createElement('div');
    creditsDiv.className = "mt-2 font-semibold";
    creditsDiv.innerText = `Total de créditos: ${totalCredits}`;
    tableDiv.appendChild(creditsDiv);

    container.appendChild(tableDiv);
  }

  document.querySelectorAll('.deleteCourse').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      courses.splice(idx, 1);
      saveCourses();
      renderTables();
    });
  });

  document.querySelectorAll('select[data-field="relation"]').forEach(select => {
    select.addEventListener('change', (e) => {
      const idx = e.target.getAttribute('data-index');
      courses[idx].relation = e.target.value;
      saveCourses();
    });
  });

  document.querySelectorAll('input[data-field]').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = e.target.getAttribute('data-index');
      const field = e.target.getAttribute('data-field');
      courses[idx][field] = e.target.value;
      saveCourses();
    });
  });
}

document.getElementById('addCourse').addEventListener('click', () => {
  const semester = document.getElementById('semesterSelect').value;
  courses.push({ name: 'Nueva asignatura', credits: 0, relation: '', semester: semester, grade: '' });
  saveCourses();
  renderTables();
});
// Asegurar que cada curso tenga la propiedad "grade"
const fixCoursesGrades = () => {
  let courses = JSON.parse(localStorage.getItem('courses')) || [];
  let updated = false;

  courses = courses.map(course => {
    if (!('grade' in course)) {
      course.grade = ''; // vacío al inicio
      updated = true;
    }
    return course;
  });

  if (updated) {
    localStorage.setItem('courses', JSON.stringify(courses));
  }
};

// Ejecutar al inicio
fixCoursesGrades();

renderTables();
