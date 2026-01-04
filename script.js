// Navigation between main sections (single page)
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

function activateSection(id){
  navItems.forEach(b => b.classList.toggle('active', b.dataset.section === id));
  sections.forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navItems.forEach(btn => {
  btn.addEventListener('click', () => activateSection(btn.dataset.section));
});

// Collapsible groups
document.querySelectorAll('.nav-group-btn').forEach(gbtn => {
  gbtn.addEventListener('click', () => {
    const groupId = gbtn.dataset.group;
    const panel = document.getElementById(groupId);
    const expanded = gbtn.getAttribute('aria-expanded') === 'true';
    gbtn.setAttribute('aria-expanded', String(!expanded));
    panel.classList.toggle('collapsed', expanded);
    const chev = gbtn.querySelector('.chev');
    if(chev) chev.textContent = expanded ? '▸' : '▾';
  });
});

// Tabs within a section
document.querySelectorAll('.tabs').forEach(tabBar => {
  const tabs = tabBar.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const parentSection = tabBar.parentElement;
      parentSection.querySelectorAll('.tabpane').forEach(p => {
        p.classList.toggle('active', p.id === target);
      });
    });
  });
});

// Show/hide toggles
document.querySelectorAll('[data-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.toggle;
    const target = document.getElementById(targetId);
    const isHidden = target.classList.contains('hidden');
    target.classList.toggle('hidden', !isHidden);
    btn.textContent = isHidden ? 'Hide answers' : 'Show answers';
  });
});

// Default section
activateSection('intro');

// --- 10 Questions (local quiz) ---
const QUIZ_BANK = {
  "s211": [
    {
      "q": "Define abstraction in one sentence.",
      "a": "Removing irrelevant detail to focus on the essential features of a problem/model."
    },
    {
      "q": "Give one example of abstraction in software.",
      "a": "Using a function via what it does without needing to know how it works internally."
    },
    {
      "q": "Why is abstraction useful?",
      "a": "It reduces complexity so you can focus on core requirements."
    },
    {
      "q": "What is an abstract model?",
      "a": "A simplified representation of a real system focusing on key features."
    },
    {
      "q": "In an abstract model, what are the three common parts?",
      "a": "Inputs, process and outputs."
    },
    {
      "q": "What is data abstraction?",
      "a": "Hiding how data is stored/implemented so it can be used via an interface."
    },
    {
      "q": "What is procedural abstraction?",
      "a": "Using a procedure by its name/parameters without knowing internal details."
    },
    {
      "q": "What can happen if you remove too much detail?",
      "a": "The model becomes inaccurate."
    },
    {
      "q": "Abstraction vs reality: difference?",
      "a": "Abstraction is simplified; reality includes all details."
    },
    {
      "q": "Goal of abstraction in design?",
      "a": "Manage complexity."
    }
  ],
  "s212": [
    {
      "q": "What is a precondition?",
      "a": "A condition that must be true before a solution/algorithm runs correctly."
    },
    {
      "q": "Why consider edge cases?",
      "a": "To handle unusual/invalid inputs and avoid errors."
    },
    {
      "q": "What is an edge case?",
      "a": "An input at the extreme end of valid range or an unusual case."
    },
    {
      "q": "Why plan data types early?",
      "a": "To choose suitable operations and avoid type-related bugs."
    },
    {
      "q": "What is meant by reusability?",
      "a": "Components can be used again in other programs."
    },
    {
      "q": "Give one benefit of reusable components.",
      "a": "Saves development time."
    },
    {
      "q": "Inputs vs outputs: difference?",
      "a": "Inputs are data in; outputs are results out."
    },
    {
      "q": "Give one input for a login system.",
      "a": "Password."
    },
    {
      "q": "Give one output for a booking system.",
      "a": "Booking reference."
    },
    {
      "q": "Name one thing to plan before coding.",
      "a": "Inputs."
    }
  ],
  "s213": [
    {
      "q": "What does it mean to think procedurally?",
      "a": "Breaking a task into a sequence of ordered steps to form an algorithm."
    },
    {
      "q": "What is decomposition?",
      "a": "Splitting a problem into smaller sub-problems."
    },
    {
      "q": "What is a subroutine?",
      "a": "A smaller routine that solves part of a larger problem."
    },
    {
      "q": "Why is step order important?",
      "a": "Later steps may depend on earlier results."
    },
    {
      "q": "Algorithm vs program: one difference.",
      "a": "Algorithm is language-agnostic steps; program is coded implementation."
    },
    {
      "q": "What is pseudocode used for?",
      "a": "Planning logic without worrying about syntax."
    },
    {
      "q": "What is a flowchart used for?",
      "a": "Representing an algorithm visually."
    },
    {
      "q": "What is top-down design?",
      "a": "Start with whole problem then break into modules."
    },
    {
      "q": "One benefit of modular decomposition.",
      "a": "Easier testing."
    },
    {
      "q": "What is meant by a procedure?",
      "a": "A named set of steps."
    }
  ],
  "s214": [
    {
      "q": "Define AND in Boolean logic.",
      "a": "True only if both inputs are true."
    },
    {
      "q": "Define OR in Boolean logic.",
      "a": "True if at least one input is true."
    },
    {
      "q": "Define NOT in Boolean logic.",
      "a": "Inverts a Boolean value."
    },
    {
      "q": "Write a condition for x between 10 and 20 inclusive.",
      "a": "x >= 10 AND x <= 20"
    },
    {
      "q": "Why avoid overlapping conditions?",
      "a": "So only one branch runs for a case."
    },
    {
      "q": "What is a truth table used for?",
      "a": "Showing outputs for all combinations of Boolean inputs."
    },
    {
      "q": "What is a boundary value?",
      "a": "A value at the edge of a range."
    },
    {
      "q": "Why test boundary values?",
      "a": "They often reveal errors."
    },
    {
      "q": "What is short-circuit evaluation?",
      "a": "Stopping evaluation once the result is known."
    },
    {
      "q": "Give one way to check correctness of logic.",
      "a": "Tracing with test cases."
    }
  ],
  "s215": [
    {
      "q": "Define concurrency.",
      "a": "Multiple tasks making progress in overlapping time."
    },
    {
      "q": "Concurrency vs parallelism?",
      "a": "Concurrency overlaps; parallelism runs simultaneously on multiple cores."
    },
    {
      "q": "What is a race condition?",
      "a": "Outcome depends on timing due to shared data access without control."
    },
    {
      "q": "How can you prevent race conditions? (one)",
      "a": "Use a lock."
    },
    {
      "q": "What is a critical section?",
      "a": "Code that accesses shared resources and must be protected."
    },
    {
      "q": "What is deadlock?",
      "a": "Tasks stuck waiting for each other’s resources forever."
    },
    {
      "q": "What is a mutex?",
      "a": "A lock that allows only one task into a critical section."
    },
    {
      "q": "One risk of concurrency.",
      "a": "Harder debugging."
    },
    {
      "q": "Why use concurrency? (one)",
      "a": "Improves responsiveness."
    },
    {
      "q": "Give one real-world example of concurrency.",
      "a": "Handling multiple web requests."
    }
  ],
  "s221": [
    {
      "q": "Define scope.",
      "a": "Where a variable can be accessed/used in a program."
    },
    {
      "q": "Global vs local: one difference.",
      "a": "Global is accessible across the program; local only within a function/block."
    },
    {
      "q": "What is a parameter?",
      "a": "A value passed into a subroutine."
    },
    {
      "q": "What is an argument?",
      "a": "The actual value supplied when calling a subroutine."
    },
    {
      "q": "What is a return value?",
      "a": "A value a function sends back to the caller."
    },
    {
      "q": "One benefit of subroutines.",
      "a": "Code reuse."
    },
    {
      "q": "What is defensive programming?",
      "a": "Writing code to handle invalid input safely."
    },
    {
      "q": "Give one example of input validation.",
      "a": "Check range."
    },
    {
      "q": "What is unit testing?",
      "a": "Testing individual components in isolation."
    },
    {
      "q": "What is modular programming?",
      "a": "Splitting a program into small modules/functions."
    }
  ],
  "s222": [
    {
      "q": "What is a heuristic?",
      "a": "A rule of thumb that finds a good-enough solution faster than exhaustive search."
    },
    {
      "q": "One drawback of heuristics?",
      "a": "It may not find the optimal solution."
    },
    {
      "q": "What is backtracking?",
      "a": "Try a path; if it fails, undo and try another."
    },
    {
      "q": "What is simulation?",
      "a": "Imitating a real process with a model."
    },
    {
      "q": "Why use simulation? (one)",
      "a": "To test safely without real-world risk/cost."
    },
    {
      "q": "What is data mining?",
      "a": "Finding patterns in large datasets."
    },
    {
      "q": "What is meant by trade-off?",
      "a": "Balancing competing factors like speed vs accuracy."
    },
    {
      "q": "Give one method used in game AI.",
      "a": "Heuristic search."
    },
    {
      "q": "What does computable mean?",
      "a": "Solvable by an algorithm in finite time."
    },
    {
      "q": "What is visualisation used for?",
      "a": "Presenting data graphically to aid understanding."
    }
  ],
  "s231": [
    {
      "q": "What does Big-O notation describe?",
      "a": "How time/space requirements grow as input size increases."
    },
    {
      "q": "In Big-O, what does n represent?",
      "a": "The input size (e.g., number of items)."
    },
    {
      "q": "Which is more efficient for large n: O(n log n) or O(n²)?",
      "a": "O(n log n)."
    },
    {
      "q": "Give one example of a constant time operation.",
      "a": "Accessing an array element by index (O(1))."
    },
    {
      "q": "What is space complexity?",
      "a": "How memory usage grows with input size."
    },
    {
      "q": "Name one trade-off when choosing algorithms.",
      "a": "Speed vs memory."
    },
    {
      "q": "Why can Big-O ignore hardware speed?",
      "a": "It compares growth rates, not absolute time."
    },
    {
      "q": "Which typically scales better: bubble sort or merge sort?",
      "a": "Merge sort."
    },
    {
      "q": "Why might an O(n²) algorithm still be used?",
      "a": "Small inputs / simplicity."
    },
    {
      "q": "What is time complexity?",
      "a": "How execution time grows with input size."
    }
  ],
  "s232": [
    {
      "q": "What does LIFO stand for?",
      "a": "Last In, First Out."
    },
    {
      "q": "What does FIFO stand for?",
      "a": "First In, First Out."
    },
    {
      "q": "Which structure uses push and pop?",
      "a": "A stack."
    },
    {
      "q": "Which structure uses enqueue and dequeue?",
      "a": "A queue."
    },
    {
      "q": "DFS typically uses what structure?",
      "a": "A stack (often via recursion)."
    },
    {
      "q": "BFS uses what structure?",
      "a": "A queue."
    },
    {
      "q": "What does BFS guarantee in an unweighted graph?",
      "a": "Shortest path in terms of number of edges."
    },
    {
      "q": "DFS explores which direction first?",
      "a": "As far down a branch as possible."
    },
    {
      "q": "Which can use more memory on wide graphs: BFS or DFS?",
      "a": "BFS."
    },
    {
      "q": "What is traversal?",
      "a": "Visiting each node in a structure systematically."
    }
  ],
  "s233": [
    {
      "q": "Name the four sorts required here.",
      "a": "Bubble, insertion, merge, quick."
    },
    {
      "q": "Which sort swaps neighbouring items repeatedly?",
      "a": "Bubble sort."
    },
    {
      "q": "Which sort builds a sorted portion by inserting items?",
      "a": "Insertion sort."
    },
    {
      "q": "Which sort is divide and conquer and always O(n log n)?",
      "a": "Merge sort."
    },
    {
      "q": "Quick sort average time complexity?",
      "a": "O(n log n)."
    },
    {
      "q": "Quick sort worst-case time complexity?",
      "a": "O(n²)."
    },
    {
      "q": "Bubble sort time complexity?",
      "a": "O(n²)."
    },
    {
      "q": "Why is insertion sort good for nearly sorted lists?",
      "a": "It makes few shifts so can approach O(n)."
    },
    {
      "q": "Which sort uses extra memory to merge lists?",
      "a": "Merge sort."
    },
    {
      "q": "What is a stable sort?",
      "a": "Equal items keep their relative order."
    }
  ],
  "s234": [
    {
      "q": "Which search checks each item one by one?",
      "a": "Linear search."
    },
    {
      "q": "Linear search time complexity?",
      "a": "O(n)."
    },
    {
      "q": "Binary search time complexity?",
      "a": "O(log n)."
    },
    {
      "q": "What must be true to use binary search?",
      "a": "Data must be sorted."
    },
    {
      "q": "What value is checked each step in binary search?",
      "a": "The middle element."
    },
    {
      "q": "Why is binary search faster than linear search on large lists?",
      "a": "It halves the search space each step."
    },
    {
      "q": "Can binary search be used on an unsorted list?",
      "a": "No."
    },
    {
      "q": "What is a worst-case for linear search?",
      "a": "Target is last item or not present."
    },
    {
      "q": "What is the first step of linear search?",
      "a": "Compare the first element to the target."
    },
    {
      "q": "Binary search requires what kind of access?",
      "a": "Random access to the middle (typically arrays)."
    }
  ],
  "s235": [
    {
      "q": "What does Dijkstra’s algorithm find?",
      "a": "Shortest paths from a start node (non-negative weights)."
    },
    {
      "q": "Why must Dijkstra weights be non-negative?",
      "a": "Negative weights can break the greedy choice and give wrong results."
    },
    {
      "q": "What does A* add to Dijkstra?",
      "a": "A heuristic estimate to guide the search."
    },
    {
      "q": "Give an example heuristic for maps.",
      "a": "Straight-line distance to the goal."
    },
    {
      "q": "What is a weighted graph?",
      "a": "A graph whose edges have costs/weights."
    },
    {
      "q": "What does Dijkstra expand each step?",
      "a": "The unvisited node with the smallest tentative distance."
    },
    {
      "q": "Why is A* often faster?",
      "a": "It focuses exploration toward the goal using a heuristic."
    },
    {
      "q": "What is a node (vertex)?",
      "a": "A point in a graph."
    },
    {
      "q": "What is an edge?",
      "a": "A connection between two nodes."
    },
    {
      "q": "When would you prefer Dijkstra over A*?",
      "a": "When you need guaranteed shortest paths without relying on a heuristic."
    }
  ]
};



const SCORE_KEY = "h446_ai_testme_scores_v1";

function loadScores(){
  try{ return JSON.parse(localStorage.getItem(SCORE_KEY) || "{}"); }
  catch(e){ return {}; }
}
function saveScores(scores){
  localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
}
function getSectionScore(scores, sectionId){
  return scores[sectionId] || {correct:0, attempts:0};
}
function setSectionScore(scores, sectionId, correct, attempts){
  scores[sectionId] = {correct, attempts};
  saveScores(scores);
}
function normaliseAnswer(s){
  return (s||"").toString().trim().toLowerCase().replace(/\s+/g," ");
}
function pickQuestion(sectionId){
  const bank = QUIZ_BANK[sectionId] || [];
  if(bank.length === 0) return null;
  return bank[Math.floor(Math.random() * bank.length)];
}
function updateScoreUI(sectionId){
  const scores = loadScores();
  const s = getSectionScore(scores, sectionId);
  document.querySelectorAll(`[data-score="${sectionId}"]`).forEach(el => {
    el.textContent = `Score: ${s.correct} / ${s.attempts}`;
  });
  const count = (QUIZ_BANK[sectionId] || []).length;
  document.querySelectorAll(`[data-count="${sectionId}"]`).forEach(el => {
    el.textContent = `Questions: ${count}`;
  });
}
function softMark(userAnswer, markAnswer){
  const user = normaliseAnswer(userAnswer);
  const mark = normaliseAnswer(markAnswer);
  if(!user) return {ok:false, reason:"Type an answer first."};

  const fragments = mark.split(/;|,|\(|\)|\/| or /i)
    .map(s => normaliseAnswer(s).replace(/^(any one)\.?/,"").trim())
    .filter(Boolean);

  const ok = user === mark || fragments.some(f => user.includes(f));
  return {ok, reason: ok ? "Likely correct ✅ (still check wording for marks)." : "Not quite ❌ — reveal and compare mark points."};
}
function initQuiz(el){
  const sectionId = el.dataset.quiz;
  const qEl = el.querySelector('[data-q]');
  const input = el.querySelector('[data-a]');
  const feedback = el.querySelector('[data-feedback]');
  const answerBox = el.querySelector('[data-answer]');
  const btnCheck = el.querySelector('[data-check]');
  const btnReveal = el.querySelector('[data-reveal]');
  const btnNext = el.querySelector('[data-next]');

  let current = pickQuestion(sectionId);

  function render(){
    updateScoreUI(sectionId);
    if(!current){
      qEl.textContent = "No questions set for this section yet.";
      input.disabled = true;
      btnCheck.disabled = true;
      btnReveal.disabled = true;
      btnNext.disabled = true;
      return;
    }
    qEl.textContent = current.q;
    input.value = "";
    feedback.textContent = "";
    answerBox.classList.add('hidden');
    answerBox.textContent = current.a;
  }

  btnNext.addEventListener('click', () => {
    current = pickQuestion(sectionId);
    render();
    input.focus();
  });

  btnReveal.addEventListener('click', () => {
    answerBox.classList.remove('hidden');
    feedback.textContent = "Compare your answer to the mark-point answer above.";
  });

  btnCheck.addEventListener('click', () => {
    const result = softMark(input.value, current.a);
    feedback.textContent = result.reason;

    if(result.reason === "Type an answer first.") return;

    const scores = loadScores();
    const s = getSectionScore(scores, sectionId);
    const attempts = s.attempts + 1;
    const correct = s.correct + (result.ok ? 1 : 0);
    setSectionScore(scores, sectionId, correct, attempts);
    updateScoreUI(sectionId);
  });

  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){ btnCheck.click(); }
  });

  render();
}

document.querySelectorAll('[data-reset]').forEach(btn => {
  btn.addEventListener('click', () => {
    const sectionId = btn.getAttribute('data-reset');
    const scores = loadScores();
    setSectionScore(scores, sectionId, 0, 0);
    updateScoreUI(sectionId);
  });
});

document.querySelectorAll('.quiz[data-quiz]').forEach(initQuiz);
Object.keys(QUIZ_BANK).forEach(updateScoreUI);

