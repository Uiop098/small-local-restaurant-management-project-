# small-local-restaurant-management-project-

🍲 Small Local Restaurant / Mess Management System

A lightweight, browser-based Mess & Meal Management System for recording daily meals, tracking attendance, managing guest meals, calculating charges, and exporting records to CSV/Excel-compatible format.

This project is designed as a simple local management dashboard that can be used by small messes, hostels, restaurants, food-service operators, or similar setups where meal consumption and billing need to be tracked without requiring a server or database.

---

📌 Overview

The Small Local Restaurant / Mess Management System provides a clean dashboard for maintaining a digital meal ledger.

Instead of maintaining meal records manually in notebooks or spreadsheets, users can:

- Record member meals
- Track eating, skipped, and guest meals
- Record room/block information
- Track guest headcount
- Automatically calculate meal charges
- Search records
- Filter records by meal type
- Filter records by status
- Edit records directly inside the table
- Delete individual records
- Import records from CSV
- Export records to CSV for Excel
- Automatically save data in browser LocalStorage
- View live operational statistics

The application runs entirely in the browser and does not currently require a backend server or external database.

---

✨ Features

📊 Dashboard KPIs

The dashboard displays live operational statistics:

- Total Entries
- Meals Served
- Meals Skipped
- Total Guest Headcount
- Total Billed Amount

The statistics are recalculated whenever the underlying records change.

---

🍽️ Meal Management

Create new meal records using the built-in form.

Each entry can contain:

Field| Description
Member Name| Name of the member
Room / Block| Room or accommodation identifier
Date| Date of the meal
Meal Type| Breakfast, Lunch, Snacks, or Dinner
Status| Eating, Skipped, or Guest
Guest Count| Number of guests
Charge| Automatically calculated amount

---

🥘 Supported Meal Types

The current interface supports:

- 🍳 Breakfast
- 🍛 Lunch
- 🍪 Snacks
- 🍽️ Dinner

The current default pricing configuration includes:

- Breakfast — ₹30
- Lunch — ₹60
- Snacks — ₹20
- Dinner — ₹60

Guest pricing is handled separately by the application's pricing rules.

---

👥 Guest Meal Management

Guest meals can be recorded separately from normal member meals.

The system allows the operator to specify the number of guests and calculates the corresponding charge automatically.

---

💰 Automatic Billing

Charges are calculated automatically according to:

- Meal type
- Member/guest status
- Guest count
- Skipped-meal rules

Skipped meals receive a ₹0 charge.

The total billed amount is automatically displayed on the dashboard.

---

🔎 Search

Search meal records by:

- Member name
- Room / block

The table updates dynamically as the user types.

---

🔽 Filtering

Records can be filtered by:

Meal type

- All Meals
- Breakfast
- Lunch
- Snacks
- Dinner

Status

- All Statuses
- Eating
- Skipped
- Guest

Both filters can be used together.

---

✏️ Direct Record Editing

Existing table records can be edited directly.

Editable fields include:

- Date
- Member name
- Room
- Guest count

Changes are automatically recalculated and saved.

---

🗑️ Delete Records

Individual records can be removed directly from the table.

There is also a Reset Data option for clearing the locally stored meal ledger.

---

💾 LocalStorage Persistence

The application uses the browser's LocalStorage API for data persistence.

Changes are automatically saved locally, allowing records to remain available after refreshing or reopening the page in the same browser environment.

No external database is required for the current version.

---

📥 CSV Import

Existing meal records can be imported using a CSV file.

The application includes its own CSV parser and processes fields such as:

- Entry ID
- Date
- Member Name
- Room Number
- Meal Type
- Status
- Guest Count
- Total Charge

---

📤 CSV / Excel Export

The complete meal ledger can be exported as a CSV file.

The exported file contains:

Entry ID
Date
Member Name
Room Number
Meal Type
Status
Guest Count
Total Charge (INR)

The generated CSV includes UTF-8 encoding support and can be opened using applications such as:

- Microsoft Excel
- Google Sheets
- LibreOffice Calc
- Other spreadsheet applications

---

🖥️ User Interface

The interface contains:

- Top navigation bar
- Application branding
- Import CSV button
- Export button
- Reset button
- KPI dashboard
- Meal entry form
- Search controls
- Filter controls
- Responsive data table
- Record actions
- Local-save indicator
- Record counter

The project uses a clean dashboard-oriented design with custom CSS styling.

---

🛠️ Technologies Used

Frontend

- HTML5
- CSS3
- JavaScript (Vanilla JS)

Browser APIs

- LocalStorage
- FileReader API
- Blob API
- URL API
- DOM API

Data Format

- JSON internally through LocalStorage
- CSV for import/export

Backend

None currently required.

The current application is completely client-side.

---

📁 Project Structure

small-local-restaurant-management-project-/
│
├── index.html
├── style.css
├── script.js
└── README.md

"index.html"

Contains the application's structure and UI.

It defines:

- Navigation
- KPI cards
- Meal entry form
- Search controls
- Filters
- Meal records table
- Footer/status indicators

"style.css"

Contains the application's visual styling, layout, dashboard components, forms, buttons, table styling, badges, and other UI elements.

"script.js"

Contains the main application logic, including:

- Data initialization
- LocalStorage handling
- Meal creation
- Billing calculations
- KPI calculations
- Search
- Filtering
- Inline editing
- Record deletion
- CSV export
- CSV import
- CSV parsing
- Data rendering

"README.md"

Project documentation and usage information.

---

⚙️ How It Works

The application's basic workflow is:

                    ┌────────────────────┐
                    │      Open App      │
                    └──────────┬─────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │ Load LocalStorage  │
                    └──────────┬─────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │ Display Dashboard  │
                    └──────────┬─────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
          Add Meal       Search/Filter    Import CSV
                │              │              │
                └──────────────┼──────────────┘
                               ▼
                    ┌────────────────────┐
                    │ Calculate Charges  │
                    └──────────┬─────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │ Save LocalStorage  │
                    └──────────┬─────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │ Update Dashboard   │
                    └────────────────────┘

---

💰 Billing Logic

The application calculates charges according to the selected meal and status.

Normal Member

Member Charge = Meal Rate

Skipped Meal

Charge = ₹0

Guest Meal

Charge = Member Meal Rate + (Guest Count × Guest Rate)

The charge is recalculated whenever relevant record information is changed.

---

💾 Data Storage

Records are stored locally in the browser using:

localStorage

The application's data is serialized as JSON.

Conceptually:

Application
     │
     ▼
JavaScript Records
     │
     ▼
JSON.stringify()
     │
     ▼
Browser LocalStorage

When the application starts:

LocalStorage
     │
     ▼
JSON.parse()
     │
     ▼
Application Records
     │
     ▼
Dashboard

Important

Because the current version uses LocalStorage:

- Data belongs to the current browser/device environment.
- Clearing browser site data can remove stored records.
- Data is not synchronized between devices.
- There is currently no centralized database.
- Multiple users cannot share the same live dataset.

For production use, a backend/database would be recommended.

---

🚀 Getting Started

Option 1 — Open Directly

Download or clone the repository and open:

index.html

in a modern web browser.

No package installation is required.

---

Option 2 — Run a Local Server

If Python is installed:

python3 -m http.server 8000

Then open:

http://localhost:8000

---

Option 3 — Termux

Clone the repository:

git clone https://github.com/Uiop098/small-local-restaurant-management-project-.git

Enter the project:

cd small-local-restaurant-management-project-

Start a local server:

python3 -m http.server 8080

Open:

http://localhost:8080

---

🌐 Deployment

Because this is a static HTML/CSS/JavaScript application, it can be deployed to static hosting platforms.

Examples include:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel
- Any standard static web host

No PHP, Node.js, or database server is required for the current version.

---

🔐 Privacy

The current application does not require an external account or send meal records to a remote server.

Records are stored locally using browser LocalStorage.

However, users should avoid storing highly sensitive or confidential information because browser LocalStorage is not designed to be a secure database.

---

⚠️ Current Limitations

The current version is intentionally lightweight and client-side.

No backend

There is currently no:

- PHP backend
- Node.js backend
- REST API
- MySQL database
- PostgreSQL database

Local-only storage

Data is stored in the browser rather than on a centralized server.

No authentication

There is currently no:

- Admin login
- Staff login
- User accounts
- Role-based permissions

No cloud synchronization

Records do not automatically synchronize between:

- Phones
- Computers
- Browsers
- Multiple staff members

---

🔮 Future Improvements

Possible future versions could add:

Backend

- PHP backend
- REST API
- MySQL/PostgreSQL database
- Server-side validation

Authentication

- Admin login
- Staff accounts
- Role-based permissions
- Password security

Advanced Reports

- Daily reports
- Weekly reports
- Monthly reports
- Member-wise billing
- Room-wise reports
- Meal-wise statistics
- Revenue charts

Database Features

- Permanent cloud storage
- Automatic backups
- Multi-device synchronization
- Transaction history

Additional Management

- Member registration
- Room management
- Monthly billing
- Payment tracking
- Outstanding balances
- Attendance reports

UI Improvements

- Dark mode
- Mobile-first improvements
- Charts and analytics
- Dashboard customization
- Notifications
- Print-friendly reports

---

📊 Example Use Case

A small hostel mess can use the application like this:

Member arrives for lunch
        ↓
Staff enters member name
        ↓
Select room/block
        ↓
Select Lunch
        ↓
Select Eating
        ↓
Record Meal
        ↓
Charge calculated automatically
        ↓
Dashboard statistics updated
        ↓
Data saved locally

For a guest:

Select Guest Meal
        ↓
Enter guest count
        ↓
System calculates guest charges
        ↓
Record saved
        ↓
Total billed amount updated

---

📄 CSV Example

The exported CSV follows a structure similar to:

Entry ID,Date,Member Name,Room Number,Meal Type,Status,Guest Count,Total Charge (INR)
101,2026-09-04,Rohit Sharma,B-204,Lunch,Eating,0,60
102,2026-09-04,Amit Kumar,A-102,Dinner,Guest,2,180
103,2026-09-04,Karan Verma,C-305,Lunch,Skipped,0,0

---

🧪 Project Status

Status: 🟢 Functional / Prototype

The current version provides the core meal-ledger functionality and can be used as a foundation for a larger restaurant, hostel mess, or food-service management application.

---

📋 Current Version

Project Type: Local Web Application
Architecture: Client-side
Storage: Browser LocalStorage
Data Exchange: CSV
Frontend: HTML5 + CSS3 + Vanilla JavaScript
Backend: None
Database: None

---

🤝 Contributing

Contributions and improvements are welcome.

A basic workflow:

git clone https://github.com/Uiop098/small-local-restaurant-management-project-.git

cd small-local-restaurant-management-project-

git checkout -b feature/your-feature

# Make your changes

git add .

git commit -m "Add your feature"

git push origin feature/your-feature

Then create a Pull Request on GitHub.

---

🐛 Bug Reports

If you find a problem, open an issue and include:

1. Description of the problem
2. Steps to reproduce it
3. Browser/device used
4. Expected behavior
5. Actual behavior
6. Screenshot if applicable

---

💡 Feature Requests

Feature suggestions are welcome.

When suggesting a feature, explain:

- What problem it solves
- How it should work
- Why it would be useful
- Any UI or workflow requirements

---

👨‍💻 Author

Uiop098

GitHub:

https://github.com/Uiop098

Project repository:

https://github.com/Uiop098/small-local-restaurant-management-project-

---

📜 License

No explicit open-source license has currently been specified for this repository.

If you intend to allow others to freely use, modify, and redistribute the project, consider adding an appropriate license such as the MIT License.

---

⭐ Support the Project

If you find this project useful:

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest improvements
- 🔧 Submit improvements
- 📢 Share the project

---

🏁 Final Notes

This project is designed as a simple starting point for a small-scale meal and mess management system.

Its client-side architecture keeps the application lightweight and easy to deploy, while the modular JavaScript structure provides a foundation for adding a backend, authentication, database, analytics, and multi-user functionality in future versions.

---

Built with ❤️ using HTML, CSS & Vanilla JavaScript.