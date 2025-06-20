Time Tracker App
A productivity web app to track time spent on tasks, with a timer and entry management. Built with React + TypeScript.
Features
•	Add time entries (task name + hours worked)
•	Timer (start/stop to track active time)
•	Edit/Delete existing entries
•	Total hours worked calculation
•	Basic input validation
________________________________________
 Setup & Run
Prerequisites
•	Node.js
•	npm
Installation
1.	Clone the repo:
git clone https://github.com/Green-service/timer_repo.git
2.	Install dependencies:
npm install
3.	Run the app:
npm run dev
4.	Open http://localhost:8080 in your browser.
Deployment
Deployed via Netlify (https://timertracker.netlify.app/)
________________________________________
Assumptions & Trade-offs
•	State Management: Used React context instead of Redux for simplicity.
•	UI: Focused on functionality over advanced styling.
•	Persistence: Entries are saved in local storage (not a backend database).
________________________________________
Future Improvements
With more time, I’d add:
1.	User Auth
o	Sign-up/login to protect task history.
2.	Email Notifications
o	Alerts when the timer reaches a target duration.
3.	Advanced Analytics
o	Charts to visualize time distribution.
4.	Multi-device Sync
o	Firebase/backend integration for cross-device access.
________________________________________
Tech Stack
•	React + TypeScript
•	Vite 
•	Tailwind 
________________________________________
 Submission
 Submitted to Looped Automation as part of the technical challenge.

