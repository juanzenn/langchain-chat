export function getCourseContent() {
  const title = "JavaScript for Beginners";
  const description =
    "Learn the basics of JavaScript with this interactive tutorial.";

  const assignmentsNumber = Math.floor(Math.random() * 5) + 1;
  const assignments = Array.from({ length: assignmentsNumber }, (_, i) =>
    createAssignment(i + 1)
  );

  return {
    title,
    description,
    startDate: new Date(2023, 8, 1),
    endDate: new Date(2023, 8, 30),
    assignments,
    user: {
      name: "Juan Andres",
      email: "juan@mtba.com",
    },
  };
}

function createAssignment(index: number) {
  const title = "Assignment " + index;
  const description = "Create a simple programm using JavaScript.";
  const dueDate = getRandomDate();
  const points = 10;

  return {
    title,
    description,
    dueDate,
    points,
  };
}

function getRandomDate() {
  const start = new Date(2023, 8, 1);
  const end = new Date(2023, 8, 30);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
